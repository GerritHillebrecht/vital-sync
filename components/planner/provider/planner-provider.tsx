"use client";

import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import {
  getCompany,
  getShiftService,
  getShiftsInRangeForService,
  getWorkspace,
} from "@/lib/data-access/client";
import dayjs from "@/lib/dayjs";
import { groupShifts } from "@/lib/utils";
import { GroupedShifts, Shift, Workspace } from "@/models";
import { Company } from "@/models/company";
import { ShiftService } from "@/models/shiftService";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import {
  RealtimePostgresChangesPayload,
  RealtimePostgresDeletePayload,
  RealtimePostgresInsertPayload,
  RealtimePostgresUpdatePayload,
} from "@supabase/supabase-js";

const supabase = createClient();

interface PlannerContextType {
  company_id?: Company["id"];
  company: Company | null;

  workspace_id?: Workspace["id"];
  workspace: Workspace | null;

  shiftService_id?: ShiftService["id"];
  shiftService: ShiftService | null;

  shifts: Shift[];
  setShifts: (shifts: Shift[]) => void;
  groupedShifts: Record<ShiftService["id"], Record<string, Shift[]>> | null;
  shiftsLoading: boolean;

  startDate: Date;
  endDate: Date;
  currentMonth: number;
  daysInMonth: number;

  updateSearchParams: (state: "prev" | "next" | "today") => void;
}
interface PlannerContextProviderProps {
  children: ReactNode;
}

const defaultContextValue: PlannerContextType = {
  updateSearchParams: () => {},
  startDate: dayjs().startOf("month").toDate(),
  endDate: dayjs().endOf("month").toDate(),
  currentMonth: new Date().getMonth() + 1,
  company: null,
  workspace: null,
  shiftService: null,
  shifts: [],
  groupedShifts: null,
  shiftsLoading: true,
  setShifts: () => {},
  daysInMonth: 0,
};
const PlannerContext = createContext<PlannerContextType>(defaultContextValue);

export function PlannerContextProvider({
  children,
}: PlannerContextProviderProps) {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const { company_id, workspace_id, shiftService_id } = useParams();

  const [startDate, setStartDate] = useState<Date>(
    dayjs().startOf("month").toDate()
  );
  const [endDate, setEndDate] = useState<Date>(dayjs().endOf("month").toDate());
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth() + 1
  );
  const [daysInMonth, setDaysInMonth] = useState<number>(0);

  const [company, setCompany] = useState<Company | null>(null);
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [shiftService, setShiftService] = useState<ShiftService | null>(null);
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [groupedShifts, setGroupedShifts] = useState<GroupedShifts | null>(
    null
  );
  const [shiftsLoading, setShiftsLoading] = useState<boolean>(true);

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchCompany(company_id: Company["id"]) {
      const { data: company } = await getCompany(company_id, abortController);

      setCompany(company);
      return company;
    }

    async function fetchShifts(company_id: Company["id"]) {
      setShiftsLoading(true);
      const { data: shifts } = await getShiftsInRangeForService(
        dayjs(startDate).toDate(),
        dayjs(endDate).toDate(),
        company_id,
        abortController
      );

      if (shifts) {
        setShifts(shifts);
        const groupedShifts = groupShifts(shifts);
        setGroupedShifts(groupedShifts);
      }

      setShiftsLoading(false);

      return shifts;
    }

    setCurrentMonth(
      dayjs(startDate).add(dayjs(endDate).diff(startDate, "month")).month()
    );
    if (company_id) {
      fetchCompany(company_id as Company["id"]);
      fetchShifts(company_id as Company["id"]);
    }

    const handleInsert = async (
      payload: RealtimePostgresInsertPayload<Shift>
    ) => {
      const shifts = await fetchShifts(company_id as Company["id"]);
      const newShift = shifts?.find((shift) => shift.id === payload.new.id);
      const { employee, shiftService, date } = newShift || {};

      toast.success(
        `${employee?.firstname} arbeitet am ${dayjs(date).locale("de").format("DD. MMM YYYY")} im ${shiftService?.shiftServiceType?.type_name} bei ${shiftService?.clients?.map((client) => client.firstname).join(" und ")}`
      );
    };

    const handleUpdate = async (
      payload: RealtimePostgresUpdatePayload<Shift>
    ) => {
      await fetchShifts(company_id as Company["id"]);
      console.log("shift updated", payload);
      toast.success(`Shift updated`);
    };

    const handleDelete = async (
      payload: RealtimePostgresDeletePayload<Shift>
    ) => {
      await fetchShifts(company_id as Company["id"]);
      console.log("shift deleted", payload);
      toast.success(`Shift deleted`);
    };

    const eventHandlers = {
      INSERT: (payload: RealtimePostgresChangesPayload<Shift>) =>
        handleInsert(payload as RealtimePostgresInsertPayload<Shift>),
      UPDATE: (payload: RealtimePostgresChangesPayload<Shift>) =>
        handleUpdate(payload as RealtimePostgresUpdatePayload<Shift>),
      DELETE: (payload: RealtimePostgresChangesPayload<Shift>) =>
        handleDelete(payload as RealtimePostgresDeletePayload<Shift>),
    } as const;

    const shiftSubscription = supabase
      .channel("shifts")
      .on<Shift>(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "shifts",
        },
        (payload) => eventHandlers[payload.eventType](payload)
      )
      .subscribe();

    return () => {
      abortController.abort();
      supabase.removeChannel(shiftSubscription);
    };
  }, [company_id, startDate, endDate]);

  useEffect(() => {
    setWorkspace(null);
    const abortController = new AbortController();

    async function fetchWorkspace(workspace_id: Workspace["id"]) {
      const { data: workspace } = await getWorkspace(
        workspace_id,
        abortController
      );

      setWorkspace(workspace);

      return workspace;
    }

    if (workspace_id) {
      fetchWorkspace(workspace_id as Workspace["id"]);
    }

    return () => abortController.abort();
  }, [workspace_id]);

  useEffect(() => {
    setShiftService(null);
    const abortController = new AbortController();

    async function fetchShiftService(shiftService_id: ShiftService["id"]) {
      const { data: shiftService } = await getShiftService(
        shiftService_id,
        abortController
      );

      setShiftService(shiftService);

      return shiftService;
    }

    if (shiftService_id) {
      fetchShiftService(shiftService_id as ShiftService["id"]);
    }

    return () => abortController.abort();
  }, [shiftService_id]);

  useEffect(() => {
    const start = searchParams.get("start");
    const end = searchParams.get("end");

    const startDate = start
      ? new Date(start)
      : dayjs().startOf("month").toDate();
    const endDate = end ? new Date(end) : dayjs().endOf("month").toDate();

    setStartDate(startDate);
    setEndDate(endDate);

    setDaysInMonth(dayjs(endDate).diff(dayjs(startDate), "day") + 1);
  }, [searchParams]);

  function updateSearchParams(state: "prev" | "next" | "today") {
    const params = new URLSearchParams(searchParams.toString());

    if (state === "today") {
      params.delete("start");
      params.delete("end");
    }

    if (state === "prev") {
      params.set(
        "start",
        dayjs(startDate ?? new Date())
          .subtract(1, "month")
          .startOf("month")
          .toISOString()
      );

      params.set(
        "end",
        dayjs(endDate ?? new Date())
          .subtract(1, "month")
          .endOf("month")
          .toISOString()
      );
    }

    if (state === "next") {
      params.set(
        "start",
        dayjs(startDate ?? new Date())
          .add(1, "month")
          .startOf("month")
          .toISOString()
      );

      params.set(
        "end",
        dayjs(endDate ?? new Date())
          .add(1, "month")
          .endOf("month")
          .toISOString()
      );
    }

    return router.push(`${pathName}?${params.toString()}`);
  }

  const plannerContextValue: PlannerContextType = {
    company_id: company_id as Company["id"] | undefined,
    company,

    workspace_id: workspace_id as Workspace["id"] | undefined,
    workspace,

    shiftService_id: shiftService_id as ShiftService["id"] | undefined,
    shiftService,

    shifts,
    setShifts,
    groupedShifts,
    shiftsLoading,

    startDate,
    endDate,
    currentMonth,
    daysInMonth,

    updateSearchParams,
  };

  return (
    <PlannerContext.Provider value={plannerContextValue}>
      {children}
    </PlannerContext.Provider>
  );
}

export function usePlanner() {
  const context = useContext(PlannerContext);

  if (context === defaultContextValue) {
    throw new Error(
      "usePlanner must be used within a PlannerContextProvider. " +
        "Make sure to wrap your component tree with PlannerContextProvider."
    );
  }

  return context;
}
