import { WeatherHeader } from "@/components/WeatherHeader";
import { WeatherTabs } from "@/components/WeatherTabs";
import { ForecastCard } from "@/components/ForecastCard";
import { PrecipitationChart } from "@/components/PrecipitationChart";
import { GlobalMap } from "@/components/GlobalMap";
import { OtherCities } from "@/components/OtherCities";

const Index = () => {
  const weekForecast = [
    { day: "Monday", date: "11:42 PM", high: 16, low: 8, condition: "sunny" as const, precipitation: 0, isToday: true },
    { day: "Tue", high: 10, condition: "partly-cloudy" as const },
    { day: "Wed", high: 15, condition: "partly-cloudy" as const },
    { day: "Thu", high: 11, condition: "cloudy" as const },
    { day: "Fri", high: 18, condition: "partly-cloudy" as const },
    { day: "Sat", high: 12, condition: "rainy" as const },
    { day: "Sun", high: 10, condition: "rainy" as const },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <WeatherHeader />
      <WeatherTabs />
      
      <main className="px-6 py-6 space-y-6">
        {/* Forecast Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
          {weekForecast.map((forecast, index) => (
            <ForecastCard key={index} {...forecast} />
          ))}
        </div>

        {/* Charts and Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <PrecipitationChart />
          <GlobalMap />
          <OtherCities />
        </div>
      </main>
    </div>
  );
};

export default Index;
