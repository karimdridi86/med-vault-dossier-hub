
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Clock, Calendar } from "lucide-react";

interface AppointmentCardProps {
  appointment: {
    id: string;
    patientName: string;
    patientId: string;
    patientImage?: string;
    date: string;
    time: string;
    status: 'scheduled' | 'in-progress' | 'completed' | 'canceled';
    type: string;
  };
  minimal?: boolean;
}

const AppointmentCard = ({ appointment, minimal = false }: AppointmentCardProps) => {
  const statusStyles = {
    'scheduled': 'bg-blue-100 text-blue-800',
    'in-progress': 'bg-amber-100 text-amber-800',
    'completed': 'bg-green-100 text-green-800',
    'canceled': 'bg-gray-100 text-gray-800',
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className={minimal ? "p-3" : "p-4"}>
        <div className="flex items-center gap-3">
          {!minimal && (
            <Avatar className="h-10 w-10">
              <AvatarImage src={appointment.patientImage} />
              <AvatarFallback className="bg-medical-blue text-white">
                {appointment.patientName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
          )}
          
          <div className="flex-1 min-w-0">
            {!minimal && (
              <h3 className="font-medium text-sm line-clamp-1">
                {appointment.patientName}
              </h3>
            )}
            
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <Badge variant="outline" className={`font-normal ${statusStyles[appointment.status]}`}>
                {appointment.status}
              </Badge>
              <Badge variant="secondary" className="font-normal text-xs">
                {appointment.type}
              </Badge>
            </div>
            
            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center text-xs text-muted-foreground">
                <Calendar className="h-3 w-3 mr-1" />
                {appointment.date}
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="h-3 w-3 mr-1" />
                {appointment.time}
              </div>
            </div>
          </div>
          
          {!minimal && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Reschedule</Button>
              <Button size="sm">Check In</Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AppointmentCard;
