/* eslint-disable */
// @ts-nocheck

"use client";

import { useGLTF, useTexture } from "@react-three/drei";
import { extend, useFrame, useThree } from "@react-three/fiber";
import {
  BallCollider,
  CuboidCollider,
  RapierRigidBody,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

extend({ MeshLineGeometry, MeshLineMaterial });

const bandPath = "/assets/lanyard/band.jpg";
const tagPath = "/assets/lanyard/tag.glb";

useGLTF.preload(tagPath);
useTexture.preload(bandPath);

// Make RigidBody physics a bit more realistic
const segmentProps = {
  type: "dynamic",
  canSleep: true,
  colliders: false,
  angularDamping: 2,
  linearDamping: 2,
} as const;

export default function Badge({
  maxSpeed = 50,
  minSpeed = 10,
  // user = { firstName: "John", lastName: "Doe" },
}) {
  // References for the band and the joints
  const band = useRef<THREE.Mesh<MeshLineGeometry, MeshLineMaterial>>(null);
  const fixed = useRef<RapierRigidBody>(null);
  const j1 = useRef<RapierRigidBody>(null);
  const j2 = useRef<RapierRigidBody>(null);
  const j3 = useRef<RapierRigidBody>(null);

  // Reference for the card and some vector values
  const card = useRef<RapierRigidBody>(null);
  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();
  const [dragged, drag] = useState<THREE.Vector3 | false>(false);
  const [hovered, hover] = useState(false);

  const { nodes, materials } = useGLTF(tagPath);
  const texture = useTexture(bandPath);
  const { width, height } = useThree((state) => state.size);

  // A Catmull-Rom curve
  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ])
  );

  // Connect band joints
  //@ts-expect-error null-initialization avoidance
  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  //@ts-expect-error null-initialization avoidance
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  //@ts-expect-error null-initialization avoidance
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);

  // Connect card to band
  //@ts-expect-error null-initialization avoidance
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.45, 0],
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? "grabbing" : "grab";
      return () => void (document.body.style.cursor = "auto");
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (
      !fixed.current ||
      !j1.current ||
      !j2.current ||
      !j3.current ||
      !band.current ||
      !card.current
    )
      return;

    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }

    // Fix most of the band jitter when over pulling the card (https://codesandbox.io/s/sweet-galois-3fw3wq?file=/App.js:3796-3849)
    const [j1Lerped, j2Lerped] = [j1, j2].map((ref) => {
      if (ref.current) {
        const lerped = new THREE.Vector3().copy(ref.current.translation());

        const clampedDistance = Math.max(
          0.1,
          Math.min(1, lerped.distanceTo(ref.current.translation()))
        );

        return lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      }
    });

    // Calculate Catmull curve for band
    curve.points[0].copy(j3.current.translation());
    curve.points[1].copy(j2Lerped ?? j2.current.translation());
    curve.points[2].copy(j1Lerped ?? j1.current.translation());
    curve.points[3].copy(fixed.current.translation());
    band.current.geometry.setPoints(curve.getPoints(32));

    // Tilt the card back towards the screen
    ang.copy(card.current.angvel());
    rot.copy(card.current.rotation());
    card.current.setAngvel(
      { x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z },
      false
    );
  });

  curve.curveType = "chordal";
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      <group position={[0, 3, 0]}>
        {/* Band */}
        <RigidBody ref={fixed} type="fixed" position={[0, 0, 0]} />
        <RigidBody position={[0.5, 0, 0]} {...segmentProps} ref={j1}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} {...segmentProps} ref={j2}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} {...segmentProps} ref={j3}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        {/* Card */}
        <RigidBody
          ref={card}
          {...segmentProps}
          type={dragged ? "kinematicPosition" : "dynamic"}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={() => drag(false)}
            onPointerDown={(evt) =>
              card.current &&
              drag(
                new THREE.Vector3()
                  .copy(evt.point)
                  .sub(vec.copy(card.current.translation()))
              )
            }
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                // @ts-expect-error geometry/map are not declared?
                map={materials.base.map}
                map-anisotropy={16}
                clearcoat={1}
                clearcoatRoughness={0.15}
                roughness={0.3}
                metalness={0.5}
              />
            </mesh>
            {/* <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                clearcoat={1}
                clearcoatRoughness={0.15}
                roughness={0.3}
                metalness={0.5}
              >
                <RenderTexture attach="map" height={2000} width={2000}>
                  <BadgeTexture user={user} />
                </RenderTexture>
              </meshPhysicalMaterial>
            </mesh> */}
            <mesh
              // @ts-expect-error geometry/map are not declared?
              geometry={nodes.clip.geometry}
              material={materials.metal}
              material-roughness={0.3}
            />
            {/* @ts-expect-error geometry/map are not declared? */}
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color={new THREE.Color("white")}
          depthTest={false}
          resolution={[width, height]}
          useMap
          map={texture}
          repeat={[-3, 1]}
          lineWidth={1}
        />
      </mesh>
    </>
  );
}

// function BadgeTexture({
//   user,
// }: {
//   user: { firstName: string; lastName: string };
// }) {
//   const planeWidth = 1;
//   const textureAspect = 1; // Passe diese Werte an deine Geometrie an
//   return (
//     <>
//       <PerspectiveCamera
//         makeDefault
//         manual
//         aspect={1.05}
//         position={[0.49, 0.22, 2]}
//       />
//       <mesh>
//         <planeGeometry args={[planeWidth, -planeWidth / textureAspect]} />
//         {/* Falls du einen Basis-AlphaMap-Texture hast, kannst du diesen hier laden und einsetzen */}
//         <meshBasicMaterial transparent alphaMap={null} side={THREE.BackSide} />
//       </mesh>
//       <Center bottom right>
//         <Resize maxHeight={0.45} maxWidth={0.925}>
//           <Text3D
//             bevelEnabled={false}
//             bevelSize={0}
//             font="/assets/lanyard/Geist_Regular.json"
//             height={0}
//             rotation={[0, Math.PI, Math.PI]}
//           >
//             {user.firstName}
//           </Text3D>
//           <Text3D
//             bevelEnabled={false}
//             bevelSize={0}
//             font="/assets/lanyard/Geist_Regular.json"
//             height={0}
//             position={[0, 1.4, 0]}
//             rotation={[0, Math.PI, Math.PI]}
//           >
//             {user.lastName}
//           </Text3D>
//         </Resize>
//       </Center>
//     </>
//   );
// }
