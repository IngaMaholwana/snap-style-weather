import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, Cloud, Wind } from "lucide-react";
import { WeatherData } from "@/types/weather";

interface WeatherAlertsProps {
  weatherData: WeatherData;
}

export const WeatherAlerts = ({ weatherData }: WeatherAlertsProps) => {
  const alerts = [];

  // Check for high wind
  if (weatherData.windspeed > 25) {
    alerts.push({
      icon: <Wind className="h-4 w-4" />,
      title: "High Wind Warning",
      description: `Wind speeds of ${Math.round(weatherData.windspeed)} mph expected.`,
    });
  }

  // Check for high precipitation
  if (weatherData.precipprob > 70) {
    alerts.push({
      icon: <Cloud className="h-4 w-4" />,
      title: "Heavy Rain Alert",
      description: `${weatherData.precipprob}% chance of precipitation.`,
    });
  }

  // Check for extreme UV
  if (weatherData.uvindex > 8) {
    alerts.push({
      icon: <AlertTriangle className="h-4 w-4" />,
      title: "High UV Index",
      description: `UV Index of ${weatherData.uvindex}. Use sun protection.`,
    });
  }

  if (alerts.length === 0) return null;

  return (
    <div className="space-y-3 animate-fade-in">
      {alerts.map((alert, index) => (
        <Alert key={index} variant="destructive">
          {alert.icon}
          <AlertTitle>{alert.title}</AlertTitle>
          <AlertDescription>{alert.description}</AlertDescription>
        </Alert>
      ))}
    </div>
  );
};
