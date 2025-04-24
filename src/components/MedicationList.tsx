
import { Check, Clock, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  status: "active" | "completed" | "scheduled";
}

interface MedicationListProps {
  medications: Medication[];
  showAddButton?: boolean;
}

const MedicationList = ({ medications, showAddButton = true }: MedicationListProps) => {
  const statusIcon = {
    active: <Clock className="h-4 w-4 text-amber-500" />,
    completed: <Check className="h-4 w-4 text-green-500" />,
    scheduled: <Clock className="h-4 w-4 text-blue-500" />,
  };

  const statusText = {
    active: "Active",
    completed: "Completed",
    scheduled: "Scheduled",
  };

  return (
    <div className="space-y-2">
      {medications.map((medication) => (
        <div
          key={medication.id}
          className="rounded-md border bg-white p-3 flex items-center justify-between"
        >
          <div>
            <h3 className="font-medium">{medication.name}</h3>
            <div className="text-sm text-muted-foreground">{medication.dosage}</div>
            <div className="flex items-center gap-3 mt-1 text-xs">
              <span>{medication.frequency}</span>
              <span>
                {medication.startDate}
                {medication.endDate ? ` - ${medication.endDate}` : ""}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center">
              {statusIcon[medication.status]}
              <span className="text-sm ml-1">{statusText[medication.status]}</span>
            </div>
          </div>
        </div>
      ))}

      {showAddButton && (
        <Button variant="outline" className="w-full" size="sm">
          <Plus className="h-4 w-4 mr-1" />
          Add Medication
        </Button>
      )}
    </div>
  );
};

export default MedicationList;
