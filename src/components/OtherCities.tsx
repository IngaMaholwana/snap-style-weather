import { Card } from "@/components/ui/card";
import { MapPin, Sun, Cloud, CloudRain, Star } from "lucide-react";
import { FavoriteCity } from "@/types/weather";
import { ScrollArea } from "@/components/ui/scroll-area";

interface OtherCitiesProps {
  onCitySelect: (city: string) => void;
  favorites: FavoriteCity[];
}

export const OtherCities = ({ onCitySelect, favorites }: OtherCitiesProps) => {
  const popularCities = [
    { name: "Copenhagen, Denmark", temp: 7, condition: "cloudy" as const },
    { name: "Beijing, China", temp: 11, condition: "sunny" as const },
    { name: "Jerusalem, Israel", temp: 14, condition: "rainy" as const },
    { name: "New York, USA", temp: 12, condition: "cloudy" as const },
    { name: "London, UK", temp: 9, condition: "rainy" as const },
  ];

  const getWeatherIcon = (condition: "sunny" | "cloudy" | "rainy") => {
    switch (condition) {
      case "sunny":
        return <Sun className="w-5 h-5 text-weather-sunny" />;
      case "cloudy":
        return <Cloud className="w-5 h-5 text-muted-foreground" />;
      case "rainy":
        return <CloudRain className="w-5 h-5 text-primary" />;
    }
  };

  return (
    <Card className="p-6 animate-fade-in">
      <h3 className="text-sm font-medium mb-4">Popular Cities</h3>
      <ScrollArea className="h-[400px]">
        <div className="space-y-4">
          {favorites.length > 0 && (
            <>
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4 text-weather-sunny fill-weather-sunny" />
                <p className="text-xs font-semibold text-muted-foreground uppercase">Favorites</p>
              </div>
              {favorites.map((city, index) => (
                <button
                  key={`fav-${index}`}
                  onClick={() => onCitySelect(city.name)}
                  className="w-full flex items-center justify-between p-3 rounded-lg bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-all hover-scale"
                >
                  <div className="flex items-center gap-3">
                    <Star className="w-4 h-4 text-weather-sunny fill-weather-sunny" />
                    <div className="text-left">
                      <p className="font-medium text-sm">{city.name}</p>
                    </div>
                  </div>
                </button>
              ))}
              <div className="my-4 border-t border-border/50"></div>
            </>
          )}
          
          {popularCities.map((city, index) => (
            <button
              key={index}
              onClick={() => onCitySelect(city.name)}
              className="w-full flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-all hover-scale"
            >
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-primary" />
                <div className="text-left">
                  <p className="font-medium text-sm">{city.name.split(",")[0]}</p>
                  <p className="text-xs text-muted-foreground">{city.name.split(",")[1]?.trim()}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {getWeatherIcon(city.condition)}
                <span className="text-lg font-semibold">{city.temp}°</span>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};
