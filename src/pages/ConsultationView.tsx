import { useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, FileText, Send, CalendarPlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

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

const specialistOptions = [
  { value: "cardiologist", label: "Cardiologue" },
  { value: "dermatologist", label: "Dermatologue" },
  { value: "neurologist", label: "Neurologue" },
  { value: "ophthalmologist", label: "Ophtalmologue" },
  { value: "orthopedist", label: "Orthopédiste" },
  { value: "psychiatrist", label: "Psychiatre" },
  { value: "radiologist", label: "Radiologue" },
];

const certificateTypes = [
  { value: "work", label: "Arrêt de travail" },
  { value: "school", label: "Certificat scolaire" },
  { value: "sport", label: "Certificat sportif" },
  { value: "other", label: "Autre" },
];

const medicalCertificateSchema = z.object({
  startDate: z.string().min(1, "Date de début requise"),
  numberOfDays: z.number().min(1, "Nombre de jours requis"),
  type: z.string().min(1, "Type de certificat requis"),
  reason: z.string().min(1, "Motif requis"),
});

const referralSchema = z.object({
  specialist: z.string().min(1, "Spécialiste requis"),
  reason: z.string().min(1, "Motif requis"),
});

const ConsultationView = () => {
  const { id } = useParams();
  const [consultation] = useState(mockConsultation);
  const [isShowingMedicalCertificate, setIsShowingMedicalCertificate] = useState(false);
  const [isShowingReferral, setIsShowingReferral] = useState(false);
  const [isShowingNewAppointment, setIsShowingNewAppointment] = useState(false);
  const [selectedSpecialist, setSelectedSpecialist] = useState(null);

  const medicalCertificateForm = useForm({
    resolver: zodResolver(medicalCertificateSchema),
  });

  const referralForm = useForm({
    resolver: zodResolver(referralSchema),
  });

  const calculateEndDate = (startDate: string, days: number) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
  };

  const calculateReturnDate = (startDate: string, days: number) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + days + 1);
    return date.toISOString().split('T')[0];
  };

  const handleMedicalCertificateSubmit = (data) => {
    const endDate = calculateEndDate(data.startDate, data.numberOfDays);
    const returnDate = calculateReturnDate(data.startDate, data.numberOfDays);
    console.log("Medical certificate data:", {
      ...data,
      endDate,
      returnDate,
    });
    setIsShowingMedicalCertificate(false);
  };

  const handleReferralSubmit = (data) => {
    console.log("Referral data:", {
      ...data,
      specialist: selectedSpecialist,
    });
    setIsShowingReferral(false);
  };

  const handleNewAppointment = (data) => {
    console.log("New appointment data:", data);
    setIsShowingNewAppointment(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Consultation</h1>
        <Badge variant="outline" className="bg-green-100 text-green-800">
          {consultation.status}
        </Badge>
      </div>

      <div className="flex gap-4 mb-6">
        <Dialog open={isShowingMedicalCertificate} onOpenChange={setIsShowingMedicalCertificate}>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex gap-2">
              <FileText className="h-4 w-4" />
              Certificat médical
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Créer un certificat médical</DialogTitle>
            </DialogHeader>
            <form onSubmit={medicalCertificateForm.handleSubmit(handleMedicalCertificateSubmit)} className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="type">Type de certificat</Label>
                  <Select onValueChange={(value) => medicalCertificateForm.setValue("type", value)} defaultValue={medicalCertificateForm.getValues("type")}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner le type" />
                    </SelectTrigger>
                    <SelectContent>
                      {certificateTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="startDate">Date de début</Label>
                  <Input
                    type="date"
                    id="startDate"
                    {...medicalCertificateForm.register("startDate")}
                  />
                </div>
                <div>
                  <Label htmlFor="numberOfDays">Nombre de jours</Label>
                  <Input
                    type="number"
                    id="numberOfDays"
                    {...medicalCertificateForm.register("numberOfDays", { valueAsNumber: true })}
                  />
                </div>
                <div>
                  <Label htmlFor="reason">Motif</Label>
                  <Textarea
                    id="reason"
                    {...medicalCertificateForm.register("reason")}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsShowingMedicalCertificate(false)}>
                  Annuler
                </Button>
                <Button type="submit">Créer le certificat</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog open={isShowingReferral} onOpenChange={setIsShowingReferral}>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex gap-2">
              <Send className="h-4 w-4" />
              R��férer
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Référer à un spécialiste</DialogTitle>
            </DialogHeader>
            <form onSubmit={referralForm.handleSubmit(handleReferralSubmit)} className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="specialist">Spécialité</Label>
                  <Select 
                    onValueChange={(value) => {
                      referralForm.setValue("specialist", value);
                      setSelectedSpecialist(null);
                    }} 
                    defaultValue={referralForm.getValues("specialist")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une spécialité" />
                    </SelectTrigger>
                    <SelectContent>
                      {specialistOptions.map((specialist) => (
                        <SelectItem key={specialist.value} value={specialist.value}>
                          {specialist.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {referralForm.watch("specialist") && (
                  <SpecialistSearch
                    specialty={specialistOptions.find(s => s.value === referralForm.getValues("specialist"))?.label}
                    onSelect={(specialist) => setSelectedSpecialist(specialist)}
                  />
                )}

                {selectedSpecialist && (
                  <div className="p-3 bg-muted rounded-md">
                    <p className="font-medium">Spécialiste sélectionné:</p>
                    <p>{selectedSpecialist.name} - {selectedSpecialist.phone}</p>
                    <p className="text-sm text-muted-foreground">{selectedSpecialist.address}</p>
                  </div>
                )}

                <div>
                  <Label htmlFor="referralReason">Motif</Label>
                  <Textarea
                    id="referralReason"
                    {...referralForm.register("reason")}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsShowingReferral(false)}>
                  Annuler
                </Button>
                <Button type="submit" disabled={!selectedSpecialist}>Envoyer</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog open={isShowingNewAppointment} onOpenChange={setIsShowingNewAppointment}>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex gap-2">
              <CalendarPlus className="h-4 w-4" />
              Nouveau rendez-vous
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Planifier un nouveau rendez-vous</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="appointmentDate">Date</Label>
                <Input type="date" id="appointmentDate" />
              </div>
              <div>
                <Label htmlFor="appointmentTime">Heure</Label>
                <Input type="time" id="appointmentTime" />
              </div>
              <div>
                <Label htmlFor="appointmentType">Type de consultation</Label>
                <Input id="appointmentType" placeholder="Ex: Suivi, Contrôle..." />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsShowingNewAppointment(false)}>
                  Annuler
                </Button>
                <Button onClick={handleNewAppointment}>Planifier</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
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
