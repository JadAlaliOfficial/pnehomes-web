"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow, useMap } from "@vis.gl/react-google-maps";
import type { Community } from "@/features/communities/api";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import type { Marker } from "@googlemaps/markerclusterer";

type CommunityWithCoords = Community & {
  id: string | number;
  latitude: number;
  longitude: number;
};

type Props = { items: CommunityWithCoords[] };

export default function CommunityMap({ items }: Props) {
  const [openId, setOpenId] = useState<string | number | null>(null);

  const withCoords = useMemo(
    () => items.filter((c) => Number.isFinite(c.latitude) && Number.isFinite(c.longitude)),
    [items]
  );

  const center = useMemo(() => {
    if (withCoords.length === 0) return { lat: 39.5, lng: -98.35 };
    return { lat: withCoords[0].latitude, lng: withCoords[0].longitude };
  }, [withCoords]);

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <div className="h-[60vh] w-full overflow-hidden rounded-lg shadow">
        <Map
          id="communities-map"
          mapId="DEMO_MAP_ID"
          defaultCenter={center}
          defaultZoom={10}
          gestureHandling="greedy"
          disableDefaultUI={false}
        >
          <ClusteredMarkers 
            points={withCoords} 
            openId={openId}
            setOpenId={setOpenId}
          />
        </Map>
      </div>
    </APIProvider>
  );
}

function ClusteredMarkers({ 
  points, 
  openId, 
  setOpenId 
}: { 
  points: CommunityWithCoords[];
  openId: string | number | null;
  setOpenId: (id: string | number | null) => void;
}) {
  const map = useMap();
  const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});
  const clusterer = useRef<MarkerClusterer | null>(null);

  // Initialize MarkerClusterer
  useEffect(() => {
    if (!map) return;
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({ map });
    }
  }, [map]);

  // Update clustered markers when markers change
  useEffect(() => {
    if (!clusterer.current) return;
    
    clusterer.current.clearMarkers();
    clusterer.current.addMarkers(Object.values(markers));
  }, [markers]);

  // Fit bounds when points change
  useEffect(() => {
    if (!map || points.length === 0) return;

    if (points.length === 1) {
      map.setCenter({ lat: points[0].latitude, lng: points[0].longitude });
      map.setZoom(12);
      return;
    }

    const bounds = new google.maps.LatLngBounds();
    points.forEach((c) => bounds.extend({ lat: c.latitude, lng: c.longitude }));
    map.fitBounds(bounds);
  }, [map, points]);

  const setMarkerRef = (marker: Marker | null, key: string) => {
    if (marker && markers[key]) return;
    if (!marker && !markers[key]) return;

    setMarkers((prev) => {
      if (marker) {
        return { ...prev, [key]: marker };
      } else {
        const newMarkers = { ...prev };
        delete newMarkers[key];
        return newMarkers;
      }
    });
  };

  return (
    <>
      {points.map((c) => (
        <AdvancedMarker
          key={c.id}
          position={{ lat: c.latitude, lng: c.longitude }}
          onClick={() => setOpenId(c.id)}
          ref={(marker) => setMarkerRef(marker, String(c.id))}
        >
          <Pin scale={openId === c.id ? 1.5 : 1} />
        </AdvancedMarker>
      ))}

      {points.map((c) =>
        openId === c.id ? (
          <InfoWindow
            key={`iw-${c.id}`}
            position={{ lat: c.latitude, lng: c.longitude }}
            onCloseClick={() => setOpenId(null)}
          >
            <div style={{ minWidth: 220 }}>
              <strong className="block">{c.title}</strong>
              <div className="text-sm text-gray-600">{c.city}</div>
              {c["starting-price"] && (
                <div className="mt-1 font-semibold">
                  From ${Number(c["starting-price"].replace(/[^0-9]/g, '')).toLocaleString()}
                </div>
              )}
              <a href={`/communities/${c.slug}`} className="mt-2 inline-block text-blue-600 hover:underline">
                View community →
              </a>
            </div>
          </InfoWindow>
        ) : null
      )}
    </>
  );
}
