import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Employee } from "@/models";
import { Mail, Phone } from "lucide-react";

export function EmployeeCard({ employee }: { employee: Employee }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {employee.firstname} {employee.lastname}
        </CardTitle>
        <CardDescription>
          {employee.email && (
            <p className="flex items-center gap-x-1">
              <Mail size={16} />
              <span>{employee.email}</span>
            </p>
          )}
          {employee.phone_number && (
            <p className="flex items-center gap-x-1">
              <Phone size={16} />
              <span>{employee.phone_number}</span>
            </p>
          )}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
