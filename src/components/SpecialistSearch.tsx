
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Search } from "lucide-react";

// Mock data - in a real app, this would come from your backend
const specialistsList = [
  {
    id: 1,
    name: "Dr. Marie Laurent",
    cin: "AB123456",
    specialty: "Cardiologue",
    phone: "0612345678",
    address: "15 Rue de la Santé, Paris",
  },
  {
    id: 2,
    name: "Dr. Thomas Dubois",
    cin: "CD789012",
    specialty: "Dermatologue",
    phone: "0623456789",
    address: "28 Avenue Médical, Lyon",
  },
  {
    id: 3,
    name: "Dr. Sophie Martin",
    cin: "EF345678",
    specialty: "Neurologue",
    phone: "0634567890",
    address: "42 Boulevard Santé, Marseille",
  },
];

interface SpecialistSearchProps {
  onSelect: (specialist: typeof specialistsList[0]) => void;
  specialty?: string;
}

const SpecialistSearch = ({ onSelect, specialty }: SpecialistSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredSpecialists = specialistsList
    .filter(specialist => 
      specialty ? specialist.specialty.toLowerCase() === specialty.toLowerCase() : true)
    .filter(specialist =>
      searchQuery === "" ? true :
      specialist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      specialist.cin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      specialist.phone.includes(searchQuery) ||
      specialist.address.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Rechercher par nom, CIN, téléphone ou adresse..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-8"
        />
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>CIN</TableHead>
              <TableHead>Spécialité</TableHead>
              <TableHead>Téléphone</TableHead>
              <TableHead>Adresse</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSpecialists.map((specialist) => (
              <TableRow 
                key={specialist.id}
                className="cursor-pointer hover:bg-muted"
                onClick={() => onSelect(specialist)}
              >
                <TableCell>{specialist.name}</TableCell>
                <TableCell>{specialist.cin}</TableCell>
                <TableCell>{specialist.specialty}</TableCell>
                <TableCell>{specialist.phone}</TableCell>
                <TableCell>{specialist.address}</TableCell>
              </TableRow>
            ))}
            {filteredSpecialists.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  Aucun spécialiste trouvé
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SpecialistSearch;
