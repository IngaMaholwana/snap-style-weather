import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, ResponsiveContainer } from "recharts";
import { DayWeather } from "@/types/weather";

interface PrecipitationChartProps {
  precipitation: DayWeather[];
}

export const PrecipitationChart = ({ precipitation }: PrecipitationChartProps) => {
  const data = precipitation.map((day) => ({
    name: new Date(day.datetime).toLocaleDateString("en-US", { weekday: "short" }),
    value: day.precipprob,
  }));

  const avgUvIndex = Math.round(
    precipitation.reduce((sum, day) => sum + day.uvindex, 0) / precipitation.length
  );
  
  const avgVisibility = Math.round(
    precipitation.reduce((sum, day) => sum + day.visibility, 0) / precipitation.length
  );

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Precipitation</h3>
          <div className="text-xs text-muted-foreground">Next 7 Days</div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="text-xs text-muted-foreground">Rain Probability (%)</span>
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
            <div className="text-xs text-muted-foreground">Conditions</div>
            <div className="text-sm font-medium capitalize">{precipitation[0].conditions}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">UV Index</div>
            <div className="text-sm font-medium">{avgUvIndex}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Visibility</div>
            <div className="text-sm font-medium">{avgVisibility} km</div>
          </div>
        </div>
      </div>
    </Card>
  );
};
