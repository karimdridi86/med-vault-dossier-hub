
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import AppointmentCard from "@/components/AppointmentCard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Search, 
  Filter, 
  Plus, 
  CalendarDays 
} from "lucide-react";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// Mock appointment data
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
  {
    id: "4",
    patientName: "Michael Chen",
    patientId: "2",
    date: "Tomorrow",
    time: "9:00 AM",
    status: "scheduled" as const,
    type: "Lab Results",
  },
  {
    id: "5",
    patientName: "Sofia Rodriguez",
    patientId: "3",
    date: "Tomorrow",
    time: "11:30 AM",
    status: "scheduled" as const,
    type: "Pre-natal",
  },
  {
    id: "6",
    patientName: "David Wong",
    patientId: "6",
    date: "Jun 10, 2025",
    time: "2:00 PM",
    status: "scheduled" as const,
    type: "Check-up",
  },
  {
    id: "7",
    patientName: "Lisa Taylor",
    patientId: "7",
    date: "Jun 10, 2025",
    time: "4:30 PM",
    status: "scheduled" as const,
    type: "Consultation",
  },
];

const completedAppointments = [
  {
    id: "8",
    patientName: "Emma Johnson",
    patientId: "1",
    date: "May 8, 2025",
    time: "1:15 PM",
    status: "completed" as const,
    type: "Check-up",
  },
  {
    id: "9",
    patientName: "Michael Chen",
    patientId: "2",
    date: "May 5, 2025",
    time: "10:45 AM",
    status: "completed" as const,
    type: "Follow-up",
  },
  {
    id: "10",
    patientName: "Sofia Rodriguez",
    patientId: "3",
    date: "May 1, 2025",
    time: "9:30 AM",
    status: "completed" as const,
    type: "Pre-natal",
  },
];

const Appointments = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [activeTab, setActiveTab] = useState("upcoming");

  const filteredUpcomingAppointments = appointmentsData.filter(appointment => {
    const matchesSearch = appointment.patientName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === "all" || appointment.status === selectedStatus;
    
    // Filter by date would require proper date handling in a real app
    // For now, we'll skip that in this mockup
    
    return matchesSearch && matchesStatus;
  });

  const filteredCompletedAppointments = completedAppointments.filter(appointment => {
    return appointment.patientName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Appointments</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Appointment
        </Button>
      </div>

      <div className="bg-white rounded-lg border p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
            <Input
              placeholder="Search appointments..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <CalendarDays className="h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
            
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="canceled">Canceled</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming">
          <div className="space-y-6">
            <div>
              <h2 className="font-semibold text-lg mb-3">Today</h2>
              <div className="space-y-3">
                {filteredUpcomingAppointments
                  .filter(a => a.date === "Today")
                  .map(appointment => (
                    <AppointmentCard key={appointment.id} appointment={appointment} />
                  ))
                }
                {filteredUpcomingAppointments.filter(a => a.date === "Today").length === 0 && (
                  <p className="text-muted-foreground text-center py-4">No appointments scheduled for today.</p>
                )}
              </div>
            </div>
            
            <div>
              <h2 className="font-semibold text-lg mb-3">Tomorrow</h2>
              <div className="space-y-3">
                {filteredUpcomingAppointments
                  .filter(a => a.date === "Tomorrow")
                  .map(appointment => (
                    <AppointmentCard key={appointment.id} appointment={appointment} />
                  ))
                }
                {filteredUpcomingAppointments.filter(a => a.date === "Tomorrow").length === 0 && (
                  <p className="text-muted-foreground text-center py-4">No appointments scheduled for tomorrow.</p>
                )}
              </div>
            </div>
            
            <div>
              <h2 className="font-semibold text-lg mb-3">Upcoming</h2>
              <div className="space-y-3">
                {filteredUpcomingAppointments
                  .filter(a => a.date !== "Today" && a.date !== "Tomorrow")
                  .map(appointment => (
                    <AppointmentCard key={appointment.id} appointment={appointment} />
                  ))
                }
                {filteredUpcomingAppointments.filter(a => a.date !== "Today" && a.date !== "Tomorrow").length === 0 && (
                  <p className="text-muted-foreground text-center py-4">No upcoming appointments scheduled.</p>
                )}
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="completed">
          <div className="space-y-3">
            {filteredCompletedAppointments.map(appointment => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))}
            {filteredCompletedAppointments.length === 0 && (
              <p className="text-muted-foreground text-center py-4">No completed appointments found.</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Appointments;
