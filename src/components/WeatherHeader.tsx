import { MapPin, Search, Bell, Settings, Menu, Locate, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface WeatherHeaderProps {
  city: string;
  country: string;
  onSearch: (location: string) => void;
  onDetectLocation: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export const WeatherHeader = ({
  city,
  country,
  onSearch,
  onDetectLocation,
  isFavorite,
  onToggleFavorite,
}: WeatherHeaderProps) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      onSearch(searchValue);
      setSearchValue("");
    }
  };

  return (
    <header className="p-6 border-b border-border/50 animate-fade-in">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <MapPin className="w-5 h-5 text-primary" />
          <div>
            <h1 className="text-lg font-semibold">{city}</h1>
            <p className="text-xs text-muted-foreground">{country}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={onToggleFavorite}
          >
            <Star
              className={`w-5 h-5 ${
                isFavorite ? "fill-weather-sunny text-weather-sunny" : ""
              }`}
            />
          </Button>
        </div>

        <form onSubmit={handleSearch} className="flex-1 max-w-md">
          <div className="relative flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search location..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="pl-10 bg-secondary/50 border-none"
              />
            </div>
            <Button
              type="button"
              variant="secondary"
              size="icon"
              onClick={onDetectLocation}
              title="Detect my location"
            >
              <Locate className="w-4 h-4" />
            </Button>
          </div>
        </form>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Settings className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full md:hidden">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};
