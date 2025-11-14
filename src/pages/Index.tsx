import { WeatherHeader } from "@/components/WeatherHeader";
import { WeatherTabs } from "@/components/WeatherTabs";
import { ForecastCard } from "@/components/ForecastCard";
import { PrecipitationChart } from "@/components/PrecipitationChart";
import { InteractiveMap } from "@/components/InteractiveMap";
import { OtherCities } from "@/components/OtherCities";
import { HourlyForecast } from "@/components/HourlyForecast";
import { WeatherAlerts } from "@/components/WeatherAlerts";
import { useWeather } from "@/hooks/useWeather";
import { useFavoriteCities } from "@/hooks/useFavoriteCities";
import { Skeleton } from "@/components/ui/skeleton";
import { weatherService } from "@/services/weatherService";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const Index = () => {
  const { weatherData, isLoading, error, setLocation, detectLocation } = useWeather();
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavoriteCities();

  const handleSearch = (location: string) => {
    setLocation(location);
  };

  const handleToggleFavorite = () => {
    if (!weatherData) return;
    
    const cityData = {
      name: `${weatherData.city}, ${weatherData.country}`,
      coordinates: { lat: 0, lng: 0 }, // Would need to store actual coordinates
    };

    if (isFavorite(cityData.name)) {
      removeFavorite(cityData.name);
    } else {
      addFavorite(cityData);
    }
  };

  const handleMapLocationSelect = async (lat: number, lng: number) => {
    const data = await weatherService.getWeatherByCoordinates(lat, lng);
    setLocation(`${lat},${lng}`);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load weather data. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (isLoading || !weatherData) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="p-6 space-y-6">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-12 w-full" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
            {[...Array(7)].map((_, i) => (
              <Skeleton key={i} className="h-40" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const currentDay = weatherData.days[0];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <WeatherHeader
        city={weatherData.city}
        country={weatherData.country}
        onSearch={handleSearch}
        onDetectLocation={detectLocation}
        isFavorite={isFavorite(`${weatherData.city}, ${weatherData.country}`)}
        onToggleFavorite={handleToggleFavorite}
      />
      <WeatherTabs />
      
      <main className="px-6 py-6 space-y-6">
        {/* Weather Alerts */}
        <WeatherAlerts weatherData={weatherData} />

        {/* Forecast Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
          {weatherData.days.map((day, index) => {
            const date = new Date(day.datetime);
            const dayName = index === 0 
              ? "Today" 
              : date.toLocaleDateString("en-US", { weekday: "short" });
            
            return (
              <ForecastCard
                key={index}
                day={dayName}
                date={index === 0 ? date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }) : undefined}
                high={Math.round(day.tempmax)}
                low={Math.round(day.tempmin)}
                condition={day.icon}
                precipitation={day.precipprob}
                isToday={index === 0}
              />
            );
          })}
        </div>

        {/* Hourly Forecast */}
        {currentDay.hours && <HourlyForecast hours={currentDay.hours} />}

        {/* Charts and Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <PrecipitationChart precipitation={weatherData.days} />
          <InteractiveMap 
            center={[20, 0]} 
            onLocationSelect={handleMapLocationSelect} 
          />
          <OtherCities onCitySelect={handleSearch} favorites={favorites} />
        </div>
      </main>
    </div>
  );
};

export default Index;
