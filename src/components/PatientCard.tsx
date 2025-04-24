
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronRight, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PatientCardProps {
  patient: {
    id: string;
    name: string;
    age: number;
    gender: string;
    condition: string;
    priority: 'normal' | 'urgent' | 'critical';
    phone: string;
    nextAppointment?: string;
    image?: string;
  };
}

const PatientCard = ({ patient }: PatientCardProps) => {
  const navigate = useNavigate();
  
  const priorityColor = {
    normal: "bg-green-100 text-green-800",
    urgent: "bg-amber-100 text-amber-800",
    critical: "bg-red-100 text-red-800",
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="p-4 flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={patient.image} />
            <AvatarFallback className="bg-medical-purple text-white">
              {patient.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{patient.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {patient.age} years • {patient.gender}
                </p>
              </div>
              <Badge 
                className={`ml-2 ${priorityColor[patient.priority]}`}
                variant="outline"
              >
                {patient.priority}
              </Badge>
            </div>
            
            <div className="mt-1 flex flex-wrap items-center gap-y-1 gap-x-2">
              <Badge variant="secondary" className="font-normal">
                {patient.condition}
              </Badge>
              <div className="flex items-center text-xs text-muted-foreground">
                <Phone className="h-3 w-3 mr-1" />
                {patient.phone}
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t px-4 py-2 bg-muted/30 flex justify-between items-center">
          {patient.nextAppointment ? (
            <p className="text-xs">
              Next: <span className="font-medium">{patient.nextAppointment}</span>
            </p>
          ) : (
            <p className="text-xs text-muted-foreground">No upcoming appointments</p>
          )}
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(`/patients/${patient.id}`)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientCard;
