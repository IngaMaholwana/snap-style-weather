import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";

interface GlobalMapProps {
  city?: string;
  country?: string;
}

export const GlobalMap = ({ city, country }: GlobalMapProps) => {
  return (
    <Card className="p-6 col-span-2">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Global map</h3>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>Weather locations</span>
          </div>
        </div>

        <div className="relative h-64 bg-secondary/50 rounded-lg overflow-hidden">
          {/* Simplified map representation */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full bg-gradient-to-br from-zinc-900 to-zinc-800">
              {/* Map pins */}
              <div className="absolute top-1/4 left-1/4 animate-pulse">
                <MapPin className="w-4 h-4 text-primary fill-primary" />
              </div>
              <div className="absolute top-1/3 right-1/3 animate-pulse" style={{ animationDelay: '0.2s' }}>
                <MapPin className="w-4 h-4 text-primary fill-primary" />
              </div>
              <div className="absolute bottom-1/3 left-1/2 animate-pulse" style={{ animationDelay: '0.4s' }}>
                <MapPin className="w-4 h-4 text-primary fill-primary" />
              </div>
              <div className="absolute top-1/2 right-1/4 animate-pulse" style={{ animationDelay: '0.6s' }}>
                <MapPin className="w-4 h-4 text-primary fill-primary" />
              </div>

              {/* Info card */}
              <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm p-3 rounded-lg shadow-lg max-w-xs border border-border">
                <div className="text-xs font-medium mb-1">Global Weather</div>
                <div className="text-xs text-muted-foreground mb-2">
                  Track weather across major cities worldwide
                </div>
                {city && country && (
                  <div className="text-xs text-primary font-medium">
                    📍 {city}, {country}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{city && country ? `${city}, ${country}` : 'Select a location'}</span>
          <span className="text-primary cursor-pointer hover:underline">Explore →</span>
        </div>
      </div>
    </Card>
  );
};
