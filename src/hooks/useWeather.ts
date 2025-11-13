import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { weatherService } from "@/services/weatherService";
import { WeatherData } from "@/types/weather";
import { toast } from "@/hooks/use-toast";

export const useWeather = (initialLocation: string = "Seattle, AU") => {
  const [location, setLocation] = useState(initialLocation);
  const [unit, setUnit] = useState<"metric" | "us">("metric");

  const { data: weatherData, isLoading, error, refetch } = useQuery<WeatherData>({
    queryKey: ["weather", location, unit],
    queryFn: () => weatherService.getWeather(location, unit),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  const detectLocation = async () => {
    try {
      const coords = await weatherService.getCurrentLocation();
      const data = await weatherService.getWeatherByCoordinates(coords.lat, coords.lng, unit);
      setLocation(`${coords.lat},${coords.lng}`);
      toast({
        title: "Location detected",
        description: `Weather for ${data.city}, ${data.country}`,
      });
    } catch (error) {
      toast({
        title: "Location error",
        description: "Could not detect your location. Please search manually.",
        variant: "destructive",
      });
    }
  };

  return {
    weatherData,
    isLoading,
    error,
    location,
    setLocation,
    unit,
    setUnit,
    detectLocation,
    refetch,
  };
};
