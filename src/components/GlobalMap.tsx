import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";

export const GlobalMap = () => {
  return (
    <Card className="p-6 col-span-2">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Global map</h3>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>View visible</span>
            <span>14°C</span>
          </div>
        </div>

        <div className="relative h-64 bg-secondary/50 rounded-lg overflow-hidden">
          {/* Simplified map representation */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full">
              {/* Map pins */}
              <div className="absolute top-1/4 left-1/4">
                <MapPin className="w-4 h-4 text-primary" />
              </div>
              <div className="absolute top-1/3 right-1/3">
                <MapPin className="w-4 h-4 text-primary" />
              </div>
              <div className="absolute bottom-1/3 left-1/2">
                <MapPin className="w-4 h-4 text-primary" />
              </div>
              <div className="absolute top-1/2 right-1/4">
                <MapPin className="w-4 h-4 text-primary" />
              </div>

              {/* Info card */}
              <div className="absolute bottom-4 left-4 bg-card p-3 rounded-lg shadow-lg max-w-xs">
                <div className="text-xs font-medium mb-1">Explore global map of</div>
                <div className="text-xs text-muted-foreground mb-2">
                  sun, weather, and temperature
                </div>
                <button className="text-xs text-primary hover:underline">
                  Get started →
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Seattle, AU</span>
          <span>Show All →</span>
        </div>
      </div>
    </Card>
  );
};
