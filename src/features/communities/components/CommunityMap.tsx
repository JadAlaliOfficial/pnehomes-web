// CommunityMap.tsx
"use client";

import {useEffect, useMemo, useRef, useState} from "react";
import {APIProvider, Map, AdvancedMarker, Pin, InfoWindow, useMap} from "@vis.gl/react-google-maps";
import type { Community } from "@/features/communities/api";
import { MarkerClusterer } from "@googlemaps/markerclusterer";

type CommunityWithCoords = Community & {
  id: string | number;      // <- add number here (if your API returns numbers)
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
          id="communities-map" // lets useMap() target this instance if needed
          
          defaultCenter={center}
          defaultZoom={10}
          gestureHandling="greedy"
          disableDefaultUI={false}
        >
          {/* Imperative map effects (clusterer + fit bounds) */}
          <MapEffects points={withCoords} />

          {/* Visible markers & info windows (React side) */}
          {withCoords.map((c) => (
            <AdvancedMarker
              key={c.id}
              position={{ lat: c.latitude, lng: c.longitude }}
              onClick={() => setOpenId(c.id)}
            >
              <Pin scale={openId === c.id ? 1.5 : 1} />
            </AdvancedMarker>
          ))}

          {withCoords.map((c) =>
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
                      From ${Number(c["starting-price"]).toLocaleString()}
                    </div>
                  )}
                  <a href={`/communities/${c.slug}`} className="mt-2 inline-block text-blue-600 hover:underline">
                    View community →
                  </a>
                </div>
              </InfoWindow>
            ) : null
          )}
        </Map>
      </div>
    </APIProvider>
  );
}

function MapEffects({ points }: { points: CommunityWithCoords[] }) {
  const map = useMap(); // gives you google.maps.Map once ready
  const clustererRef = useRef<MarkerClusterer | null>(null);

  // Create clusterer once the map is available
  useEffect(() => {
    if (!map) return;
    if (!clustererRef.current) {
      clustererRef.current = new MarkerClusterer({ map });
    }
  }, [map]);

  // Update clustered markers when data changes
  useEffect(() => {
    if (!map || !clustererRef.current) return;

    // build native AdvancedMarkerElements for the clusterer
    const markers = points.map((c) => {
      const marker = new google.maps.marker.AdvancedMarkerElement({
        position: { lat: c.latitude, lng: c.longitude },
        title: c.title,
      });
      return marker;
    });

    clustererRef.current.clearMarkers();
    clustererRef.current.addMarkers(markers);

    // fit to bounds
    if (points.length === 0) return;
    if (points.length === 1) {
      map.setCenter({ lat: points[0].latitude, lng: points[0].longitude });
      map.setZoom(12);
      return;
    }
    const b = new google.maps.LatLngBounds();
    points.forEach((c) => b.extend({ lat: c.latitude, lng: c.longitude }));
    map.fitBounds(b);
  }, [map, points]);

  return null;
}
