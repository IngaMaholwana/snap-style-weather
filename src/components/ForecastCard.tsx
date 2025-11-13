import { Cloud, CloudRain, Sun, CloudDrizzle, CloudSnow } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ForecastCardProps {
  day: string;
  date?: string;
  high: number;
  low?: number;
  condition: string;
  precipitation?: number;
  isToday?: boolean;
}

export const ForecastCard = ({ 
  day, 
  date, 
  high, 
  low, 
  condition, 
  precipitation,
  isToday 
}: ForecastCardProps) => {
  const getWeatherIcon = () => {
    const icon = condition.toLowerCase();
    if (icon.includes("clear") || icon.includes("sun")) {
      return <Sun className="w-12 h-12 text-weather-sunny animate-pulse" />;
    }
    if (icon.includes("rain")) {
      return <CloudRain className="w-12 h-12 text-primary animate-bounce" />;
    }
    if (icon.includes("snow")) {
      return <CloudSnow className="w-12 h-12 text-primary/70 animate-pulse" />;
    }
    if (icon.includes("cloud")) {
      return <Cloud className="w-12 h-12 text-muted-foreground" />;
    }
    if (icon.includes("partly")) {
      return <CloudDrizzle className="w-12 h-12 text-primary/80" />;
    }
    return <Sun className="w-12 h-12 text-weather-sunny" />;
  };

  return (
    <Card
      className={`p-4 text-center space-y-3 transition-all hover-scale ${
        isToday ? "bg-primary/10 border-primary/50 animate-fade-in" : "bg-secondary/50 animate-fade-in"
      } hover:bg-secondary hover:shadow-lg`}
    >
      <div>
        <p className="font-medium">{day}</p>
        {date && <p className="text-xs text-muted-foreground">{date}</p>}
      </div>

      <div className="flex justify-center">{getWeatherIcon()}</div>

      <div className="space-y-1">
        <div className="flex items-center justify-center gap-2">
          <span className="text-2xl font-bold">{high}°</span>
          {low !== undefined && (
            <span className="text-sm text-muted-foreground">{low}°</span>
          )}
        </div>
        {precipitation !== undefined && precipitation > 0 && (
          <div className="flex items-center justify-center gap-1 text-xs text-primary">
            <CloudRain className="w-3 h-3" />
            <span>{precipitation}%</span>
          </div>
        )}
      </div>
    </Card>
  );
};
