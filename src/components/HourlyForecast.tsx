import { Card } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { WeatherConditions } from "@/types/weather";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { Cloud, CloudRain, Sun, Wind } from "lucide-react";

interface HourlyForecastProps {
  hours: WeatherConditions[];
}

export const HourlyForecast = ({ hours }: HourlyForecastProps) => {
  const getWeatherIcon = (icon: string) => {
    if (icon.includes("rain")) return <CloudRain className="w-5 h-5 text-primary" />;
    if (icon.includes("cloud")) return <Cloud className="w-5 h-5 text-muted-foreground" />;
    return <Sun className="w-5 h-5 text-weather-sunny" />;
  };

  const chartData = hours.map((hour) => ({
    time: new Date(hour.datetime).toLocaleTimeString("en-US", {
      hour: "numeric",
      hour12: true,
    }),
    temp: Math.round(hour.temp),
    precip: hour.precipprob,
    wind: hour.windspeed,
  }));

  return (
    <Card className="p-6 animate-fade-in">
      <h3 className="text-lg font-semibold mb-4">Hourly Forecast</h3>
      
      {/* Temperature Chart */}
      <div className="mb-6">
        <p className="text-sm text-muted-foreground mb-2">Temperature</p>
        <ResponsiveContainer width="100%" height={150}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="time" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Area
              type="monotone"
              dataKey="temp"
              stroke="hsl(var(--primary))"
              fillOpacity={1}
              fill="url(#tempGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Hourly Cards */}
      <ScrollArea className="w-full">
        <div className="flex gap-4 pb-4">
          {hours.map((hour, index) => (
            <Card
              key={index}
              className="min-w-[120px] p-4 bg-secondary/50 hover:bg-secondary transition-colors"
            >
              <div className="text-center space-y-2">
                <p className="text-sm font-medium">
                  {new Date(hour.datetime).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    hour12: true,
                  })}
                </p>
                <div className="flex justify-center">{getWeatherIcon(hour.icon)}</div>
                <p className="text-2xl font-bold">{Math.round(hour.temp)}°</p>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <div className="flex items-center justify-center gap-1">
                    <CloudRain className="w-3 h-3" />
                    <span>{hour.precipprob}%</span>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <Wind className="w-3 h-3" />
                    <span>{Math.round(hour.windspeed)} mph</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </Card>
  );
};
