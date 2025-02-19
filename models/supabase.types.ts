export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      accounts: {
        Row: {
          auth_id: string
          avatar: string | null
          created_at: string
          firstname: string
          id: string
          lastname: string
          selected_company: string | null
        }
        Insert: {
          auth_id: string
          avatar?: string | null
          created_at?: string
          firstname: string
          id?: string
          lastname: string
          selected_company?: string | null
        }
        Update: {
          auth_id?: string
          avatar?: string | null
          created_at?: string
          firstname?: string
          id?: string
          lastname?: string
          selected_company?: string | null
        }
        Relationships: []
      }
      accounts_companies: {
        Row: {
          account_id: string
          company_id: string
          created_at: string
        }
        Insert: {
          account_id: string
          company_id: string
          created_at?: string
        }
        Update: {
          account_id?: string
          company_id?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "accounts_companies_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "accounts_companies_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          address: string | null
          created_at: string
          email: string | null
          firstname: string
          id: string
          lastname: string
          phone_number: string | null
          workspace_id: string
        }
        Insert: {
          address?: string | null
          created_at?: string
          email?: string | null
          firstname: string
          id?: string
          lastname: string
          phone_number?: string | null
          workspace_id: string
        }
        Update: {
          address?: string | null
          created_at?: string
          email?: string | null
          firstname?: string
          id?: string
          lastname?: string
          phone_number?: string | null
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "clients_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          company_name: string
          created_at: string
          id: string
          short_name: string | null
        }
        Insert: {
          company_name: string
          created_at?: string
          id?: string
          short_name?: string | null
        }
        Update: {
          company_name?: string
          created_at?: string
          id?: string
          short_name?: string | null
        }
        Relationships: []
      }
      companies_employees: {
        Row: {
          company_id: string
          created_at: string
          employee_id: string
        }
        Insert: {
          company_id: string
          created_at?: string
          employee_id: string
        }
        Update: {
          company_id?: string
          created_at?: string
          employee_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "companies_employees_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "companies_employees_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      employees: {
        Row: {
          created_at: string
          email: string | null
          firstname: string
          id: string
          lastname: string | null
          phone_number: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          firstname: string
          id?: string
          lastname?: string | null
          phone_number?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          firstname?: string
          id?: string
          lastname?: string | null
          phone_number?: string | null
        }
        Relationships: []
      }
      serviceRequirements: {
        Row: {
          client_id: string
          created_at: string
          days_of_week: string
          end_time: string
          icon: string | null
          id: string
          service_name: string
          start_time: string
        }
        Insert: {
          client_id: string
          created_at?: string
          days_of_week: string
          end_time: string
          icon?: string | null
          id?: string
          service_name: string
          start_time: string
        }
        Update: {
          client_id?: string
          created_at?: string
          days_of_week?: string
          end_time?: string
          icon?: string | null
          id?: string
          service_name?: string
          start_time?: string
        }
        Relationships: [
          {
            foreignKeyName: "serviceRequirements_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      shifts: {
        Row: {
          created_at: string
          date: string
          employee_id: string
          end_time: string | null
          id: string
          shiftService_id: string
          start_time: string | null
        }
        Insert: {
          created_at?: string
          date: string
          employee_id: string
          end_time?: string | null
          id?: string
          shiftService_id?: string
          start_time?: string | null
        }
        Update: {
          created_at?: string
          date?: string
          employee_id?: string
          end_time?: string | null
          id?: string
          shiftService_id?: string
          start_time?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shifts_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shifts_shiftService_id_fkey"
            columns: ["shiftService_id"]
            isOneToOne: false
            referencedRelation: "shiftServices"
            referencedColumns: ["id"]
          },
        ]
      }
      shiftServices: {
        Row: {
          created_at: string
          end_time: string
          icon_color: string
          icon_shape: string
          id: string
          service_name: string
          shift_service_type_id: string
          start_time: string
          weekdays: string
          workspace_id: string
        }
        Insert: {
          created_at?: string
          end_time: string
          icon_color?: string
          icon_shape?: string
          id?: string
          service_name: string
          shift_service_type_id: string
          start_time: string
          weekdays: string
          workspace_id: string
        }
        Update: {
          created_at?: string
          end_time?: string
          icon_color?: string
          icon_shape?: string
          id?: string
          service_name?: string
          shift_service_type_id?: string
          start_time?: string
          weekdays?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "shiftServices_shift_service_type_id_fkey"
            columns: ["shift_service_type_id"]
            isOneToOne: false
            referencedRelation: "shiftServiceType"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shiftServices_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      shiftServices_clients: {
        Row: {
          client_id: string
          created_at: string
          shiftService_id: string
        }
        Insert: {
          client_id: string
          created_at?: string
          shiftService_id: string
        }
        Update: {
          client_id?: string
          created_at?: string
          shiftService_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "shiftServices_clients_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shiftServices_clients_shiftService_id_fkey"
            columns: ["shiftService_id"]
            isOneToOne: false
            referencedRelation: "shiftServices"
            referencedColumns: ["id"]
          },
        ]
      }
      shiftServiceType: {
        Row: {
          created_at: string
          end_time: string
          id: string
          start_time: string
          type_name: string
        }
        Insert: {
          created_at?: string
          end_time: string
          id?: string
          start_time: string
          type_name: string
        }
        Update: {
          created_at?: string
          end_time?: string
          id?: string
          start_time?: string
          type_name?: string
        }
        Relationships: []
      }
      teammembers: {
        Row: {
          created_at: string
          employee_id: string
          team_id: string
        }
        Insert: {
          created_at?: string
          employee_id: string
          team_id: string
        }
        Update: {
          created_at?: string
          employee_id?: string
          team_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "teammembers_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "teammembers_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      teams: {
        Row: {
          client_id: string
          created_at: string
          id: string
          team_name: string
        }
        Insert: {
          client_id: string
          created_at?: string
          id?: string
          team_name: string
        }
        Update: {
          client_id?: string
          created_at?: string
          id?: string
          team_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "teams_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      workspaces: {
        Row: {
          company_id: string
          created_at: string
          id: string
          workspace_name: string
          workspace_type_id: string
        }
        Insert: {
          company_id: string
          created_at?: string
          id?: string
          workspace_name: string
          workspace_type_id: string
        }
        Update: {
          company_id?: string
          created_at?: string
          id?: string
          workspace_name?: string
          workspace_type_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workspace_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workspace_workspace_type_fkey"
            columns: ["workspace_type_id"]
            isOneToOne: false
            referencedRelation: "workspaceTypes"
            referencedColumns: ["id"]
          },
        ]
      }
      workspaceTeam: {
        Row: {
          created_at: string
          employee_id: string
          workspace_id: string
        }
        Insert: {
          created_at?: string
          employee_id: string
          workspace_id: string
        }
        Update: {
          created_at?: string
          employee_id?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workspace_team_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workspace_team_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      workspaceTypes: {
        Row: {
          created_at: string
          id: string
          name: string
          short_name: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          short_name?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          short_name?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
