"use client";

import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// SVG pin icon — avoids webpack broken-image issue with default leaflet icons
const pinIcon = L.divIcon({
  html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="28" height="42">
    <path d="M12 0C5.373 0 0 5.373 0 12c0 9 12 24 12 24S24 21 24 12C24 5.373 18.627 0 12 0z" fill="#ef4444"/>
    <circle cx="12" cy="12" r="5" fill="white"/>
  </svg>`,
  className: "",
  iconSize: [28, 42],
  iconAnchor: [14, 42],
  popupAnchor: [0, -42],
});

function ClickHandler({ onPick }: { onPick: (lat: number, lng: number) => void }) {
  useMapEvents({ click: (e) => onPick(e.latlng.lat, e.latlng.lng) });
  return null;
}

export function MapPicker({
  onLocationSelect,
}: {
  onLocationSelect: (address: string) => void;
}) {
  const [marker, setMarker] = useState<[number, number] | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePick = async (lat: number, lng: number) => {
    setMarker([lat, lng]);
    setLoading(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
        { headers: { "Accept-Language": "id" } },
      );
      const data = await res.json();
      onLocationSelect(data.display_name ?? `${lat.toFixed(6)}, ${lng.toFixed(6)}`);
    } catch {
      onLocationSelect(`${lat.toFixed(6)}, ${lng.toFixed(6)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative overflow-hidden">
      <MapContainer
        center={[-6.2, 106.816]}
        zoom={12}
        className="h-64 w-full"
        style={{ zIndex: 0 }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <ClickHandler onPick={handlePick} />
        {marker && <Marker position={marker} icon={pinIcon} />}
      </MapContainer>

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/70 text-xs font-semibold text-slate-500">
          Mencari alamat...
        </div>
      )}

      <p className="mt-2 text-center text-[11px] text-slate-400">
        Ketuk peta untuk menandai lokasi COD
      </p>
    </div>
  );
}
