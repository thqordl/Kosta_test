import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet default icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface Branch {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  distance: number;
}

interface BranchMapProps {
  branches: Branch[];
  onBranchClick: (branch: Branch) => void;
}

export function BranchMap({ branches, onBranchClick }: BranchMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize map only once
    if (!mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current).setView([37.5665, 126.9780], 11);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);
    }

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add new markers
    if (branches.length > 0) {
      const bounds = L.latLngBounds([]);

      branches.forEach((branch) => {
        const marker = L.marker([branch.lat, branch.lng])
          .addTo(mapRef.current!)
          .bindTooltip(
            `<div style="padding: 4px;">
              <div style="font-weight: 600; margin-bottom: 2px;">${branch.name}</div>
              <div style="font-size: 11px; color: #666;">${branch.distance}km</div>
            </div>`,
            {
              direction: 'top',
              offset: [0, -20],
            }
          );

        // Add click event handler
        marker.on('click', () => {
          onBranchClick(branch);
        });

        markersRef.current.push(marker);
        bounds.extend([branch.lat, branch.lng]);
      });

      // Fit map to show all markers
      mapRef.current.fitBounds(bounds, { padding: [50, 50] });
    }

    return () => {
      // Cleanup markers on unmount
      if (markersRef.current) {
        markersRef.current.forEach(marker => marker.remove());
      }
    };
  }, [branches, onBranchClick]);

  // Cleanup map on component unmount
  useEffect(() => {
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return <div ref={mapContainerRef} style={{ height: "100%", width: "100%" }} />;
}
