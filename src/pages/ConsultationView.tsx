
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";

// Mock consultation data - in a real app this would come from an API
const mockConsultation = {
  id: "1",
  patientName: "Emma Johnson",
  patientImage: "",
  date: "2025-04-24",
  time: "10:30 AM",
  type: "Check-up",
  status: "validated",
  notes: "",
  symptoms: [],
  prescription: "",
};

const ConsultationView = () => {
  const { id } = useParams();
  const [consultation] = useState(mockConsultation);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Consultation</h1>
        <Badge variant="outline" className="bg-green-100 text-green-800">
          {consultation.status}
        </Badge>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <Avatar className="h-12 w-12">
              <AvatarImage src={consultation.patientImage} />
              <AvatarFallback className="bg-medical-blue text-white">
                {consultation.patientName.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-semibold">{consultation.patientName}</h2>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {consultation.date}
                </span>
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {consultation.time}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Notes</h3>
              <textarea
                className="w-full min-h-[100px] p-3 rounded-md border"
                placeholder="Ajouter des notes..."
                value={consultation.notes}
              />
            </div>

            <div>
              <h3 className="font-semibold mb-2">Symptômes</h3>
              <textarea
                className="w-full min-h-[100px] p-3 rounded-md border"
                placeholder="Décrire les symptômes..."
                value={consultation.symptoms.join("\n")}
              />
            </div>

            <div>
              <h3 className="font-semibold mb-2">Ordonnance</h3>
              <textarea
                className="w-full min-h-[100px] p-3 rounded-md border"
                placeholder="Ajouter une ordonnance..."
                value={consultation.prescription}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline">Annuler</Button>
              <Button>Enregistrer</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConsultationView;
