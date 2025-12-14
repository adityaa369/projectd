import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapBoxProps {
  pickup?: { lat: number; lng: number; label: string };
  destination?: { lat: number; lng: number; label: string };
  onPickupChange?: (coords: { lat: number; lng: number }) => void;
  onDestinationChange?: (coords: { lat: number; lng: number }) => void;
}

const MapBox = ({ pickup, destination, onPickupChange, onDestinationChange }: MapBoxProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const pickupMarker = useRef<mapboxgl.Marker | null>(null);
  const destMarker = useRef<mapboxgl.Marker | null>(null);
  const [mapToken, setMapToken] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('mapbox_token') || '';
    }
    return '';
  });
  const [tokenSaved, setTokenSaved] = useState(() => {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('mapbox_token');
    }
    return false;
  });

  const saveToken = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('mapbox_token', mapToken);
      setTokenSaved(true);
      window.location.reload();
    }
  };

  useEffect(() => {
    if (!mapContainer.current || !tokenSaved) return;

    mapboxgl.accessToken = mapToken;

    const defaultCenter: [number, number] = pickup
      ? [pickup.lng, pickup.lat]
      : [77.5946, 12.9716]; // Bangalore default

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: defaultCenter,
      zoom: 13,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add pickup marker
    if (pickup) {
      pickupMarker.current = new mapboxgl.Marker({ color: '#22c55e' })
        .setLngLat([pickup.lng, pickup.lat])
        .setPopup(new mapboxgl.Popup().setHTML(`<strong>${pickup.label}</strong>`))
        .addTo(map.current);
    }

    // Add destination marker
    if (destination) {
      destMarker.current = new mapboxgl.Marker({ color: '#ef4444' })
        .setLngLat([destination.lng, destination.lat])
        .setPopup(new mapboxgl.Popup().setHTML(`<strong>${destination.label}</strong>`))
        .addTo(map.current);
    }

    // Draw route if both points exist
    if (pickup && destination && map.current) {
      map.current.on('load', () => {
        const routeCoords: [number, number][] = [
          [pickup.lng, pickup.lat],
          [destination.lng, destination.lat]
        ];

        map.current?.addSource('route', {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: routeCoords
            }
          }
        });

        map.current?.addLayer({
          id: 'route',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#0A84FF',
            'line-width': 4,
            'line-dasharray': [2, 1]
          }
        });

        // Fit bounds to show both markers
        const bounds = new mapboxgl.LngLatBounds()
          .extend([pickup.lng, pickup.lat])
          .extend([destination.lng, destination.lat]);

        map.current?.fitBounds(bounds, { padding: 80 });
      });
    }

    return () => {
      map.current?.remove();
    };
  }, [tokenSaved, pickup, destination]);

  if (!tokenSaved) {
    return (
      <div className="w-full h-full bg-secondary/30 rounded-xl flex flex-col items-center justify-center p-6">
        <p className="text-foreground font-medium mb-4 text-center">
          Enter your Mapbox Public Token to enable maps
        </p>
        <p className="text-muted-foreground text-sm mb-4 text-center">
          Get your free token at <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">mapbox.com</a>
        </p>
        <input
          type="text"
          placeholder="pk.eyJ1..."
          value={mapToken}
          onChange={(e) => setMapToken(e.target.value)}
          className="w-full max-w-md px-4 py-3 rounded-xl border border-border bg-card text-foreground mb-3"
        />
        <button
          onClick={saveToken}
          disabled={!mapToken}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-xl font-medium disabled:opacity-50"
        >
          Save Token
        </button>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="absolute inset-0 rounded-xl" />
    </div>
  );
};

export default MapBox;
