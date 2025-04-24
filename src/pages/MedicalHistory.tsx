
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download, ClipboardList, CalendarDays } from "lucide-react";

// Mock data - in a real app, we'd fetch based on the ID from the URL
const patientData = {
  id: "1",
  name: "Emma Johnson",
  age: 42,
  gender: "Female",
};

const medicalHistoryData = [
  {
    id: "1",
    date: "May 8, 2025",
    type: "Check-up",
    provider: "Dr. Sarah Reynolds",
    notes: "Patient reports feeling generally well. Blood pressure slightly elevated at 138/85 mmHg. Discussed lifestyle modifications including reduced sodium intake and increased exercise. Continuing current medication regimen. Follow-up in 3 months.",
    vitals: {
      bloodPressure: "138/85 mmHg",
      heartRate: "72 bpm",
      temperature: "98.6°F",
      respiratoryRate: "16 breaths/min",
      weight: "145 lbs",
      height: "5'6\"",
      bmi: "23.4",
    },
    diagnosis: ["Hypertension, controlled", "Hyperlipidemia"],
  },
  {
    id: "2",
    date: "Feb 15, 2025",
    type: "Follow-up",
    provider: "Dr. Sarah Reynolds",
    notes: "Follow-up for hypertension management. Patient adhering to medication schedule. Reports occasional headaches. Blood pressure 135/82 mmHg. Lipid panel within normal limits. Continue current treatment plan.",
    vitals: {
      bloodPressure: "135/82 mmHg",
      heartRate: "76 bpm",
      temperature: "98.4°F",
      respiratoryRate: "18 breaths/min",
      weight: "147 lbs",
      height: "5'6\"",
      bmi: "23.7",
    },
    diagnosis: ["Hypertension, controlled"],
  },
  {
    id: "3",
    date: "Nov 10, 2024",
    type: "Emergency Visit",
    provider: "Dr. James Wilson",
    notes: "Patient presented with severe headache, dizziness, and blood pressure of 160/95 mmHg. CT scan negative for acute intracranial pathology. Diagnosed with hypertensive urgency. IV labetalol administered with good response. Discharged with increased dosage of lisinopril and urgent follow-up with primary care.",
    vitals: {
      bloodPressure: "160/95 mmHg",
      heartRate: "92 bpm",
      temperature: "99.1°F",
      respiratoryRate: "22 breaths/min",
      weight: "149 lbs",
    },
    diagnosis: ["Hypertensive urgency"],
    prescriptions: [
      {
        name: "Lisinopril",
        dosage: "20mg daily (increased from 10mg)",
        instructions: "Take in the morning",
      }
    ]
  },
  {
    id: "4",
    date: "Sep 5, 2024",
    type: "Annual Physical",
    provider: "Dr. Sarah Reynolds",
    notes: "Comprehensive annual examination. Patient reports good health overall with occasional fatigue. Physical examination unremarkable except for slightly elevated blood pressure. Lab work shows mild hypercholesterolemia. Initiated on atorvastatin 10mg daily. Recommended lifestyle modifications.",
    vitals: {
      bloodPressure: "132/80 mmHg",
      heartRate: "74 bpm",
      temperature: "98.6°F",
      respiratoryRate: "16 breaths/min",
      weight: "146 lbs",
      height: "5'6\"",
      bmi: "23.6",
    },
    diagnosis: ["Essential hypertension", "Hyperlipidemia"],
    prescriptions: [
      {
        name: "Atorvastatin",
        dosage: "10mg daily",
        instructions: "Take in the evening",
      }
    ],
    labResults: [
      {
        test: "Complete Blood Count",
        result: "Within normal limits",
      },
      {
        test: "Comprehensive Metabolic Panel",
        result: "Within normal limits",
      },
      {
        test: "Lipid Panel",
        result: "Total Cholesterol: 228 mg/dL (elevated)",
        details: "LDL: 145 mg/dL (elevated), HDL: 55 mg/dL, Triglycerides: 140 mg/dL"
      },
    ],
  },
];

const MedicalHistory = () => {
  const { id } = useParams<{ id: string }>();

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
              <Badge variant="outline" className="bg-blue-100 text-blue-800">
                Medical Records
              </Badge>
            </div>
            <p className="text-muted-foreground">
              {patientData.age} years • {patientData.gender} • ID: {patientData.id}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
          <Button>Complete History</Button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ClipboardList className="h-5 w-5 text-medical-blue" />
          <h2 className="font-semibold text-lg">Medical Records</h2>
        </div>
        <div className="text-sm text-muted-foreground flex items-center gap-1">
          <CalendarDays className="h-4 w-4" />
          <span>Showing {medicalHistoryData.length} records</span>
        </div>
      </div>

      <Accordion type="single" collapsible className="space-y-4">
        {medicalHistoryData.map((record) => (
          <AccordionItem 
            value={record.id} 
            key={record.id}
            className="border rounded-lg overflow-hidden bg-white"
          >
            <AccordionTrigger className="px-4 py-3 hover:bg-slate-50">
              <div className="flex items-center justify-between w-full text-left">
                <div className="flex items-center gap-4">
                  <div className="w-20 text-sm font-medium">{record.date}</div>
                  <div>
                    <p className="font-medium">{record.type}</p>
                    <p className="text-sm text-muted-foreground">{record.provider}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                    {record.diagnosis[0]}
                  </Badge>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="border-t px-4 py-4 space-y-4">
              <div>
                <h3 className="text-sm font-semibold mb-2">Clinical Notes</h3>
                <p className="text-sm">{record.notes}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-2">Vital Signs</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {Object.entries(record.vitals).map(([key, value]) => (
                    <div key={key} className="bg-slate-50 p-2 rounded-md">
                      <p className="text-xs text-muted-foreground capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                      <p className="text-sm font-medium">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {record.diagnosis && (
                <div>
                  <h3 className="text-sm font-semibold mb-2">Diagnosis</h3>
                  <div className="flex flex-wrap gap-2">
                    {record.diagnosis.map((diagnosis, index) => (
                      <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700">
                        {diagnosis}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {record.prescriptions && (
                <div>
                  <h3 className="text-sm font-semibold mb-2">Prescriptions</h3>
                  <div className="space-y-2">
                    {record.prescriptions.map((prescription, index) => (
                      <div key={index} className="border p-2 rounded-md">
                        <p className="text-sm font-medium">{prescription.name}</p>
                        <p className="text-sm">{prescription.dosage}</p>
                        <p className="text-xs text-muted-foreground">
                          {prescription.instructions}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {record.labResults && (
                <div>
                  <h3 className="text-sm font-semibold mb-2">Laboratory Results</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Test</TableHead>
                        <TableHead>Result</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {record.labResults.map((lab, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{lab.test}</TableCell>
                          <TableCell>
                            {lab.result}
                            {lab.details && (
                              <p className="text-xs text-muted-foreground">
                                {lab.details}
                              </p>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default MedicalHistory;
