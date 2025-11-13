import { MapPin, Search, Settings, Bell, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const WeatherHeader = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-border">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <div className="grid grid-cols-2 gap-0.5">
            <div className="w-1.5 h-1.5 bg-foreground rounded-sm"></div>
            <div className="w-1.5 h-1.5 bg-foreground rounded-sm"></div>
            <div className="w-1.5 h-1.5 bg-foreground rounded-sm"></div>
            <div className="w-1.5 h-1.5 bg-foreground rounded-sm"></div>
          </div>
        </Button>
        
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium">Seattle, Australia</span>
        </div>
      </div>

      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search city..." 
            className="pl-10 bg-secondary border-0"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Settings className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <Bell className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <User className="w-4 h-4" />
        </Button>
      </div>
    </header>
  );
};
