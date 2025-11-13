import { Card } from "@/components/ui/card";
import { Cloud, CloudRain, Sun } from "lucide-react";

const cities = [
  { name: "Copenhagen", condition: "Mostly Sunny", temp: 28, icon: "sunny" },
  { name: "Beijing", condition: "Cloudy", temp: 18, icon: "cloudy" },
  { name: "Jerusalem", condition: "Sunny", temp: 31, icon: "sunny" },
];

export const OtherCities = () => {
  const getIcon = (icon: string) => {
    switch (icon) {
      case "sunny":
        return <Sun className="w-6 h-6 text-weather-sunny" />;
      case "cloudy":
        return <Cloud className="w-6 h-6 text-weather-cloudy" />;
      case "rainy":
        return <CloudRain className="w-6 h-6 text-weather-rainy" />;
      default:
        return <Sun className="w-6 h-6" />;
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Other large cities</h3>
          <span className="text-xs text-muted-foreground">Show All →</span>
        </div>

        <div className="space-y-3">
          {cities.map((city) => (
            <div 
              key={city.name}
              className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg hover:bg-secondary/80 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                {getIcon(city.icon)}
                <div>
                  <div className="text-sm font-medium">{city.name}</div>
                  <div className="text-xs text-muted-foreground">{city.condition}</div>
                </div>
              </div>
              <div className="text-lg font-semibold">{city.temp}°</div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
