
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { cn } from "@/lib/utils";

interface PatientVitalCardProps {
  title: string;
  currentValue: string | number;
  unit: string;
  status: "normal" | "warning" | "critical";
  data: { date: string; value: number }[];
  color?: string;
  className?: string;
}

const PatientVitalCard = ({
  title,
  currentValue,
  unit,
  status,
  data,
  color = "#3B82F6",
  className,
}: PatientVitalCardProps) => {
  const statusStyles = {
    normal: "text-green-600",
    warning: "text-amber-600",
    critical: "text-red-600",
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <span
          className={cn(
            "text-xs font-medium px-2 py-0.5 rounded-full",
            status === "normal" && "bg-green-100 text-green-800",
            status === "warning" && "bg-amber-100 text-amber-800",
            status === "critical" && "bg-red-100 text-red-800"
          )}
        >
          {status}
        </span>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline">
          <span className="text-2xl font-bold">{currentValue}</span>
          <span className="text-sm text-muted-foreground ml-1">{unit}</span>
        </div>

        <div className="h-24 mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis
                dataKey="date"
                hide
              />
              <YAxis hide domain={["dataMin - 10", "dataMax + 10"]} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-2 border rounded shadow-sm text-xs">
                        <p>{`${payload[0].payload.date}`}</p>
                        <p className="font-medium">{`${payload[0].value} ${unit}`}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke={color}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientVitalCard;
