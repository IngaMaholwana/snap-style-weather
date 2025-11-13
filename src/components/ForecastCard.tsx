import { Cloud, CloudRain, Sun, CloudDrizzle } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ForecastCardProps {
  day: string;
  date?: string;
  high: number;
  low?: number;
  condition: "sunny" | "cloudy" | "rainy" | "partly-cloudy";
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
    switch (condition) {
      case "sunny":
        return <Sun className="w-12 h-12 text-weather-sunny" />;
      case "cloudy":
        return <Cloud className="w-12 h-12 text-weather-cloudy" />;
      case "rainy":
        return <CloudRain className="w-12 h-12 text-weather-rainy" />;
      case "partly-cloudy":
        return <CloudDrizzle className="w-12 h-12 text-weather-cloudy" />;
      default:
        return <Sun className="w-12 h-12" />;
    }
  };

  return (
    <Card className={`p-4 ${isToday ? 'bg-primary/10 border-primary/20' : 'bg-card'}`}>
      <div className="space-y-3">
        <div className="text-sm font-medium">{day}</div>
        {isToday && date && (
          <div className="text-xs text-muted-foreground">{date}</div>
        )}
        
        <div className="flex justify-center py-2">
          {getWeatherIcon()}
        </div>
        
        <div className="space-y-1">
          <div className="text-3xl font-bold">{high}°</div>
          {low !== undefined && (
            <div className="text-sm text-muted-foreground">Low: {low}°</div>
          )}
        </div>

        {isToday && precipitation !== undefined && (
          <div className="space-y-2 pt-2 border-t border-border/50">
            <div className="text-xs text-muted-foreground">Precipitation</div>
            <div className="text-sm font-medium">{precipitation}%</div>
            <div className="text-xs text-muted-foreground">Humidity: 89%</div>
            <div className="text-xs text-muted-foreground">Wind: 8 mph</div>
          </div>
        )}
      </div>
    </Card>
  );
};
