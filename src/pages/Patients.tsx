
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PatientCard from "@/components/PatientCard";
import { Badge } from "@/components/ui/badge";
import { Filter, Plus, Search } from "lucide-react";

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
  {
    id: "4",
    name: "Robert Williams",
    age: 58,
    gender: "Male",
    condition: "Heart Disease",
    priority: "critical" as const,
    phone: "(555) 234-5678",
    nextAppointment: "Today, 4:45 PM",
  },
  {
    id: "5",
    name: "David Wong",
    age: 37,
    gender: "Male",
    condition: "Asthma",
    priority: "normal" as const,
    phone: "(555) 876-5432",
  },
  {
    id: "6",
    name: "Maria Garcia",
    age: 52,
    gender: "Female",
    condition: "Rheumatoid Arthritis",
    priority: "urgent" as const,
    phone: "(555) 345-6789",
    nextAppointment: "Jun 15, 11:00 AM",
  },
];

const Patients = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<'all' | 'urgent' | 'critical'>('all');

  const filteredPatients = patientsData.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || patient.priority === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Patients</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add New Patient
        </Button>
      </div>

      <div className="bg-white rounded-lg border p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
            <Input
              placeholder="Search patients by name..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button 
              variant={filter === 'all' ? "default" : "outline"} 
              onClick={() => setFilter('all')}
            >
              All
            </Button>
            <Button 
              variant={filter === 'urgent' ? "default" : "outline"} 
              onClick={() => setFilter('urgent')}
              className="border-amber-300 text-amber-800 hover:text-amber-800"
            >
              <Badge className="bg-amber-200 text-amber-800 mr-1">
                {patientsData.filter(p => p.priority === 'urgent').length}
              </Badge>
              Urgent
            </Button>
            <Button 
              variant={filter === 'critical' ? "default" : "outline"}
              onClick={() => setFilter('critical')}
              className="border-red-300 text-red-800 hover:text-red-800"
            >
              <Badge className="bg-red-200 text-red-800 mr-1">
                {patientsData.filter(p => p.priority === 'critical').length}
              </Badge>
              Critical
            </Button>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {filteredPatients.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredPatients.map((patient) => (
            <PatientCard key={patient.id} patient={patient} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No patients found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Patients;
