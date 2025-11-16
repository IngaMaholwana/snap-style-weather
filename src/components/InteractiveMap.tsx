import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapPin } from "lucide-react";

// Fix Leaflet default icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface InteractiveMapProps {
  center?: [number, number];
  onLocationSelect?: (lat: number, lng: number) => void;
}

const popularCities = [
  { name: "Seattle", coords: [47.6062, -122.3321] as [number, number] },
  { name: "New York", coords: [40.7128, -74.006] as [number, number] },
  { name: "London", coords: [51.5074, -0.1278] as [number, number] },
  { name: "Tokyo", coords: [35.6762, 139.6503] as [number, number] },
  { name: "Sydney", coords: [-33.8688, 151.2093] as [number, number] },
];

function MapController({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

export const InteractiveMap = ({ center = [20, 0], onLocationSelect }: InteractiveMapProps) => {
  const [mapCenter, setMapCenter] = useState<[number, number]>(center);

  useEffect(() => {
    setMapCenter(center);
  }, [center]);

  return (
    <Card className="p-6 col-span-2 animate-fade-in">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Global Weather Map</h3>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>Click any city for weather</span>
          </div>
        </div>

        <div className="relative h-96 rounded-lg overflow-hidden">
          <MapContainer
            center={mapCenter}
            zoom={2}
            style={{ height: "100%", width: "100%" }}
            className="rounded-lg"
          >
            <MapController center={mapCenter} />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            {popularCities.map((city) => (
              <Marker
                key={city.name}
                position={city.coords}
                eventHandlers={{
                  click: () => {
                    if (onLocationSelect) {
                      onLocationSelect(city.coords[0], city.coords[1]);
                    }
                  },
                }}
              >
                <Popup>
                  <div className="text-center">
                    <p className="font-semibold">{city.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Click to see weather
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </Card>
  );
};
