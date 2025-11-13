import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, ResponsiveContainer } from "recharts";

const data = [
  { name: "Mon", value: 30 },
  { name: "Tue", value: 45 },
  { name: "Wed", value: 60 },
  { name: "Thu", value: 35 },
  { name: "Fri", value: 55 },
  { name: "Sat", value: 75 },
  { name: "Sun", value: 40 },
];

export const PrecipitationChart = () => {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Precipitation</h3>
          <div className="text-xs text-muted-foreground">This Week</div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="text-xs text-muted-foreground">Rain</span>
          </div>
          
          <ResponsiveContainer width="100%" height={120}>
            <BarChart data={data}>
              <XAxis 
                dataKey="name" 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <Bar 
                dataKey="value" 
                fill="hsl(var(--primary))" 
                radius={[4, 4, 0, 0]}
                maxBarSize={20}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-2 border-t border-border/50">
          <div>
            <div className="text-xs text-muted-foreground">Sunny</div>
            <div className="text-sm font-medium">5hrs</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">UV Index</div>
            <div className="text-sm font-medium">4</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Visibility</div>
            <div className="text-sm font-medium">10 km</div>
          </div>
        </div>
      </div>
    </Card>
  );
};
