import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const WeatherTabs = () => {
  return (
    <div className="flex items-center justify-between px-6 py-4">
      <Tabs defaultValue="week" className="w-auto">
        <TabsList className="bg-secondary">
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="tomorrow">Tomorrow</TabsTrigger>
          <TabsTrigger value="week">Next 7 days</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Forecast</span>
          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">Hourly</span>
        </div>
        <span className="text-sm text-muted-foreground">Chance of rain</span>
      </div>
    </div>
  );
};
