
import { useState } from "react";
import { 
  CalendarDays, 
  Users, 
  ClipboardCheck, 
  Activity, 
  ArrowRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import StatCard from "@/components/StatCard";
import PatientCard from "@/components/PatientCard";
import AppointmentCard from "@/components/AppointmentCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Mock data
const patientsData = [
  {
    id: "1",
    name: "Emma Johnson",
    age: 42,
    gender: "Female",
    condition: "Hypertension",
    priority: "urgent" as const,
    phone: "(555) 123-4567",
    nextAppointment: "Tomorrow, 10:30 AM",
  },
  {
    id: "2",
    name: "Michael Chen",
    age: 65,
    gender: "Male",
    condition: "Diabetes Type 2",
    priority: "normal" as const,
    phone: "(555) 987-6543",
    nextAppointment: "Jun 10, 2:15 PM",
  },
  {
    id: "3",
    name: "Sofia Rodriguez",
    age: 29,
    gender: "Female",
    condition: "Pregnancy",
    priority: "normal" as const,
    phone: "(555) 456-7890",
  },
];

const appointmentsData = [
  {
    id: "1",
    patientName: "Emma Johnson",
    patientId: "1",
    date: "Today",
    time: "10:30 AM",
    status: "in-progress" as const,
    type: "Follow-up",
  },
  {
    id: "2",
    patientName: "Robert Williams",
    patientId: "4",
    date: "Today",
    time: "1:45 PM",
    status: "scheduled" as const,
    type: "Consultation",
  },
  {
    id: "3",
    patientName: "Maria Garcia",
    patientId: "5",
    date: "Today",
    time: "3:15 PM",
    status: "scheduled" as const,
    type: "Check-up",
  },
];

const chartData = [
  { name: "Mon", patients: 15, appointments: 20 },
  { name: "Tue", patients: 18, appointments: 25 },
  { name: "Wed", patients: 12, appointments: 17 },
  { name: "Thu", patients: 21, appointments: 26 },
  { name: "Fri", patients: 19, appointments: 22 },
  { name: "Sat", patients: 8, appointments: 10 },
  { name: "Sun", patients: 5, appointments: 7 },
];

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState("week");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Select
          value={timeRange}
          onValueChange={setTimeRange}
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Patients"
          value="1,294"
          description="Active patient records"
          icon={<Users className="h-5 w-5 text-medical-blue" />}
          trend={{ value: 12, positive: true }}
        />
        <StatCard
          title="Appointments"
          value="42"
          description="Scheduled for this week"
          icon={<CalendarDays className="h-5 w-5 text-medical-amber" />}
          trend={{ value: 8, positive: true }}
        />
        <StatCard
          title="Medical Records"
          value="86"
          description="Updates in last 30 days"
          icon={<ClipboardCheck className="h-5 w-5 text-medical-green" />}
          trend={{ value: 5, positive: true }}
        />
        <StatCard
          title="Critical Cases"
          value="7"
          description="Require immediate attention"
          icon={<Activity className="h-5 w-5 text-medical-red" />}
          trend={{ value: 3, positive: false }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg border p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-lg">Patient & Appointment Activity</h2>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="patients" fill="#3B82F6" name="Patients" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="appointments" fill="#F59E0B" name="Appointments" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-lg">Recent Patients</h2>
              <Button variant="ghost" size="sm" className="text-xs" asChild>
                <a href="/patients">
                  View All <ArrowRight className="h-3 w-3 ml-1" />
                </a>
              </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {patientsData.map(patient => (
                <PatientCard key={patient.id} patient={patient} />
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-lg">Today's Appointments</h2>
              <Button variant="ghost" size="sm" className="text-xs" asChild>
                <a href="/appointments">
                  View All <ArrowRight className="h-3 w-3 ml-1" />
                </a>
              </Button>
            </div>
            <div className="space-y-3">
              {appointmentsData.map(appointment => (
                <AppointmentCard key={appointment.id} appointment={appointment} minimal />
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg border p-4">
            <h2 className="font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <Button className="w-full bg-medical-blue hover:bg-medical-blue/90">
                New Patient
              </Button>
              <Button className="w-full" variant="outline">
                Schedule Appointment
              </Button>
              <Button className="w-full" variant="outline">
                Create Medical Record
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
