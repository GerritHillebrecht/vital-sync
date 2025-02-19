import { CalendarIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Client } from "@/models";
import Link from "next/link";
import { ReactNode } from "react";

interface PlannerRowClientHoverCardProps {
  children: ReactNode;
  client: Client;
}

export function PlannerRowClientHoverCard({
  children,
  client,
}: PlannerRowClientHoverCardProps) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage />
            <AvatarFallback>
              {client.firstname.charAt(0)}
              {client.lastname.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1 w-full">
            <h4 className="text-sm font-semibold">
              {client.firstname} {client.lastname}
            </h4>
            {client.phone_number && (
              <p className="text-sm">
                <Link href={`tel:${client.phone_number}`}>
                  {client.phone_number}
                </Link>
              </p>
            )}
            {client.email && (
              <p className="text-sm">
                <Link href={`mailto:${client.email}`}>{client.email}</Link>
              </p>
            )}
            <p className="text-sm">{client.address}</p>
            <div className="flex items-center pt-2">
              <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                Joined December 2021
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
