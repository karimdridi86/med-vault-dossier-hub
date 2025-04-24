
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PatientVitalCard from "@/components/PatientVitalCard";
import MedicationList from "@/components/MedicationList";
import AppointmentCard from "@/components/AppointmentCard";
import { 
  CalendarPlus, 
  FilePen, 
  Phone, 
  Mail, 
  MapPin, 
  CalendarDays,
  Clock,
  Printer,
  Share
} from "lucide-react";

// Mock patient data
const patientData = {
  id: "1",
  name: "Emma Johnson",
  age: 42,
  gender: "Female",
  birthDate: "10/15/1981",
  phone: "(555) 123-4567",
  email: "emma.johnson@example.com",
  address: "123 Main Street, Cityville, State 12345",
  insuranceProvider: "MediCare Plus",
  insuranceNumber: "MC-478912356",
  conditions: ["Hypertension", "High Cholesterol", "Insomnia"],
  allergies: ["Penicillin", "Peanuts"],
  bloodType: "O+",
  lastVisit: "May 8, 2025",
  primaryDoctor: "Dr. Sarah Reynolds",
  status: "Active",
  priority: "urgent" as const,
};

// Mock data for vitals
const vitalsData = [
  {
    title: "Blood Pressure",
    currentValue: "138/85",
    unit: "mmHg",
    status: "warning" as const,
    data: [
      { date: "Jan", value: 125 },
      { date: "Feb", value: 130 },
      { date: "Mar", value: 128 },
      { date: "Apr", value: 132 },
      { date: "May", value: 138 },
    ],
    color: "#3B82F6",
  },
  {
    title: "Heart Rate",
    currentValue: "72",
    unit: "bpm",
    status: "normal" as const,
    data: [
      { date: "Jan", value: 75 },
      { date: "Feb", value: 78 },
      { date: "Mar", value: 73 },
      { date: "Apr", value: 70 },
      { date: "May", value: 72 },
    ],
    color: "#EF4444",
  },
  {
    title: "Blood Glucose",
    currentValue: "110",
    unit: "mg/dL",
    status: "normal" as const,
    data: [
      { date: "Jan", value: 115 },
      { date: "Feb", value: 112 },
      { date: "Mar", value: 118 },
      { date: "Apr", value: 108 },
      { date: "May", value: 110 },
    ],
    color: "#F59E0B",
  },
  {
    title: "Temperature",
    currentValue: "98.6",
    unit: "°F",
    status: "normal" as const,
    data: [
      { date: "Jan", value: 98.4 },
      { date: "Feb", value: 98.7 },
      { date: "Mar", value: 99.1 },
      { date: "Apr", value: 98.3 },
      { date: "May", value: 98.6 },
    ],
    color: "#8B5CF6",
  },
];

// Mock data for medications
const medicationsData = [
  {
    id: "1",
    name: "Lisinopril",
    dosage: "10mg, once daily",
    frequency: "Morning",
    startDate: "Jan 15, 2025",
    status: "active" as const,
  },
  {
    id: "2",
    name: "Atorvastatin",
    dosage: "20mg, once daily",
    frequency: "Evening",
    startDate: "Feb 3, 2025",
    status: "active" as const,
  },
  {
    id: "3",
    name: "Zolpidem",
    dosage: "5mg, as needed",
    frequency: "Before bed",
    startDate: "Mar 10, 2025",
    endDate: "May 10, 2025",
    status: "completed" as const,
  },
];

// Mock data for appointments
const appointmentsData = [
  {
    id: "1",
    patientName: "Emma Johnson",
    patientId: "1",
    date: "Tomorrow",
    time: "10:30 AM",
    status: "scheduled" as const,
    type: "Follow-up",
  },
  {
    id: "2",
    patientName: "Emma Johnson",
    patientId: "1",
    date: "May 8, 2025",
    time: "1:15 PM",
    status: "completed" as const,
    type: "Check-up",
  },
  {
    id: "3",
    patientName: "Emma Johnson",
    patientId: "1",
    date: "Apr 22, 2025",
    time: "3:30 PM",
    status: "completed" as const,
    type: "Consultation",
  },
];

const PatientDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("overview");

  // In a real app, we would fetch the patient data based on the ID
  // For now, we'll just use our mock data

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src="" />
            <AvatarFallback className="bg-medical-purple text-white text-xl">
              {patientData.name.split(" ").map((n) => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{patientData.name}</h1>
              <Badge 
                variant="outline" 
                className={patientData.priority === 'urgent' 
                  ? 'bg-amber-100 text-amber-800' 
                  : patientData.priority === 'critical' 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-green-100 text-green-800'
                }
              >
                {patientData.priority}
              </Badge>
            </div>
            <p className="text-muted-foreground">
              {patientData.age} years • {patientData.gender} • ID: {patientData.id}
            </p>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button 
            variant="outline" 
            className="gap-2"
            size="sm"
          >
            <CalendarPlus className="h-4 w-4" />
            <span>New Appointment</span>
          </Button>
          <Button 
            variant="outline" 
            className="gap-2"
            size="sm"
          >
            <FilePen className="h-4 w-4" />
            <span>Add Note</span>
          </Button>
          <Button size="sm">Update Record</Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="records">Medical Records</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-1">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-4">Patient Information</h3>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{patientData.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{patientData.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{patientData.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CalendarDays className="h-4 w-4 text-muted-foreground" />
                      <span>Born: {patientData.birthDate}</span>
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t">
                    <p className="text-sm font-medium mb-1">Insurance Information</p>
                    <p className="text-sm">{patientData.insuranceProvider}</p>
                    <p className="text-sm text-muted-foreground">Policy: {patientData.insuranceNumber}</p>
                  </div>
                  
                  <div className="pt-2 border-t">
                    <p className="text-sm font-medium mb-1">Medical Conditions</p>
                    <div className="flex flex-wrap gap-1">
                      {patientData.conditions.map((condition) => (
                        <Badge key={condition} variant="outline" className="font-normal">
                          {condition}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t">
                    <p className="text-sm font-medium mb-1">Allergies</p>
                    <div className="flex flex-wrap gap-1">
                      {patientData.allergies.map((allergy) => (
                        <Badge key={allergy} variant="destructive" className="font-normal">
                          {allergy}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t">
                    <div className="flex justify-between">
                      <p className="text-sm">Blood Type</p>
                      <p className="text-sm font-medium">{patientData.bloodType}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm">Last Visit</p>
                      <p className="text-sm font-medium">{patientData.lastVisit}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm">Primary Doctor</p>
                      <p className="text-sm font-medium">{patientData.primaryDoctor}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="md:col-span-2 space-y-6">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold">Vital Signs</h2>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Last updated: Today, 9:15 AM</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {vitalsData.map((vital) => (
                    <PatientVitalCard key={vital.title} {...vital} />
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="font-semibold mb-4">Medications</h2>
                <MedicationList medications={medicationsData} />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold">Upcoming Appointments</h2>
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </div>
                <div className="space-y-3">
                  {appointmentsData
                    .filter((appt) => appt.status === "scheduled")
                    .map((appointment) => (
                      <AppointmentCard
                        key={appointment.id}
                        appointment={appointment}
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="records" className="min-h-[300px] flex items-center justify-center">
          <div className="text-center">
            <h3 className="font-semibold text-xl mb-2">Medical Records</h3>
            <p className="text-muted-foreground">Full medical history and records will appear here.</p>
            <div className="flex justify-center gap-2 mt-4">
              <Button variant="outline" size="sm">
                <Printer className="h-4 w-4 mr-2" />
                Print Records
              </Button>
              <Button variant="outline" size="sm">
                <Share className="h-4 w-4 mr-2" />
                Share Records
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="appointments" className="min-h-[300px] flex items-center justify-center">
          <div className="text-center">
            <h3 className="font-semibold text-xl mb-2">Appointment History</h3>
            <p className="text-muted-foreground">All appointments and scheduled visits will appear here.</p>
            <Button className="mt-4">
              <CalendarPlus className="h-4 w-4 mr-2" />
              Schedule New Appointment
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="billing" className="min-h-[300px] flex items-center justify-center">
          <div className="text-center">
            <h3 className="font-semibold text-xl mb-2">Billing Information</h3>
            <p className="text-muted-foreground">Patient billing and insurance claims will appear here.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientDetail;
