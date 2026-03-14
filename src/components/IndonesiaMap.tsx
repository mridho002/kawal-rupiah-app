'use client'

import { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';

// Project markers data
const PROJECT_MARKERS = [
  {
    id: 1,
    lat: -6.9175,
    lng: 107.6191,
    title: "Pengadaan Laptop Kab. Bandung",
    category: "Pengadaan IT",
    anomaly: true,
    markup: "+51%",
    value: "Rp 2.1M",
  },
  {
    id: 2,
    lat: -7.2575,
    lng: 112.7521,
    title: "Pembangunan Jembatan Surabaya",
    category: "Infrastruktur",
    anomaly: false,
    value: "Rp 8.4M",
  },
  {
    id: 3,
    lat: -0.5071,
    lng: 117.1531,
    title: "Renovasi RS Samarinda",
    category: "Kesehatan",
    anomaly: true,
    markup: "+38%",
    value: "Rp 4.2M",
  },
  {
    id: 4,
    lat: -5.1477,
    lng: 119.4327,
    title: "Drainase Makassar Utara",
    category: "Infrastruktur",
    anomaly: false,
    value: "Rp 1.8M",
  },
  {
    id: 5,
    lat: -2.5916,
    lng: 140.6690,
    title: "Pengadaan Alkes Jayapura",
    category: "Kesehatan",
    anomaly: true,
    markup: "+62%",
    value: "Rp 3.5M",
  },
  {
    id: 6,
    lat: -8.6500,
    lng: 115.2167,
    title: "Renovasi SD Denpasar",
    category: "Infrastruktur",
    anomaly: false,
    value: "Rp 950Jt",
  },
  {
    id: 7,
    lat: 3.5952,
    lng: 98.6722,
    title: "Pengadaan Server Medan",
    category: "Pengadaan IT",
    anomaly: false,
    value: "Rp 2.8M",
  },
  {
    id: 8,
    lat: -6.2088,
    lng: 106.8456,
    title: "Proyek Flyover Jakarta",
    category: "Infrastruktur",
    anomaly: true,
    markup: "+44%",
    value: "Rp 15.2M",
  },
];

// Dynamically load Leaflet to avoid SSR issues
function LeafletMap() {
  const [mapReady, setMapReady] = useState(false);
  const [hoveredMarker, setHoveredMarker] = useState<number | null>(null);
  const [L, setL] = useState<typeof import('leaflet') | null>(null);
  const [Components, setComponents] = useState<typeof import('react-leaflet') | null>(null);

  useEffect(() => {
    // Dynamically import leaflet  
    Promise.all([
      import('leaflet'),
      import('react-leaflet'),
    ]).then(([leaflet, reactLeaflet]) => {
      // Fix default icon paths
      delete (leaflet.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
      leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      });
      
      setL(leaflet);
      setComponents(reactLeaflet);
      setMapReady(true);
    });
  }, []);

  if (!mapReady || !L || !Components) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#E8F1FA]">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-8 h-8 border-3 border-[#0069D9] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-slate-500 font-medium">Memuat peta Indonesia...</p>
        </div>
      </div>
    );
  }

  const { MapContainer, TileLayer, CircleMarker, Popup, Tooltip: MapTooltip } = Components;

  const createAnomalyIcon = (isAnomaly: boolean) => {
    return L.divIcon({
      className: 'custom-marker',
      html: `<div style="
        width: ${isAnomaly ? '20px' : '14px'}; 
        height: ${isAnomaly ? '20px' : '14px'}; 
        background: ${isAnomaly ? '#C0392B' : '#27AE60'};
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        ${isAnomaly ? 'animation: pulse-red 2s infinite;' : ''}
      "></div>`,
      iconSize: [isAnomaly ? 20 : 14, isAnomaly ? 20 : 14],
      iconAnchor: [isAnomaly ? 10 : 7, isAnomaly ? 10 : 7],
    });
  };

  return (
    <MapContainer
      center={[-2.5, 118]}
      zoom={5}
      style={{ width: '100%', height: '100%' }}
      zoomControl={true}
      scrollWheelZoom={true}
      attributionControl={false}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      
      {PROJECT_MARKERS.map((marker) => (
        <CircleMarker
          key={marker.id}
          center={[marker.lat, marker.lng]}
          radius={marker.anomaly ? 10 : 7}
          pathOptions={{
            color: marker.anomaly ? '#C0392B' : '#27AE60',
            fillColor: marker.anomaly ? '#C0392B' : '#27AE60',
            fillOpacity: 0.8,
            weight: 2,
          }}
          eventHandlers={{
            mouseover: () => setHoveredMarker(marker.id),
            mouseout: () => setHoveredMarker(null),
          }}
        >
          <Popup>
            <div style={{ minWidth: '180px', padding: '4px' }}>
              {marker.anomaly && (
                <div style={{ background: '#C0392B', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold', marginBottom: '6px', textAlign: 'center', letterSpacing: '0.5px' }}>
                  ⚠️ ANOMALI HARGA {marker.markup}
                </div>
              )}
              <p style={{ fontWeight: 'bold', fontSize: '12px', color: '#0D1B3E', margin: '0 0 4px 0' }}>{marker.title}</p>
              <p style={{ fontSize: '11px', color: '#64748b', margin: '0 0 2px 0' }}>{marker.category}</p>
              <p style={{ fontSize: '11px', color: '#0069D9', fontWeight: 'bold', margin: '0' }}>Nilai: {marker.value}</p>
            </div>
          </Popup>
          <MapTooltip direction="top" offset={[0, -10]} opacity={0.95}>
            <span style={{ fontWeight: 'bold', fontSize: '11px' }}>
              {marker.anomaly ? '🔴 ' : '🟢 '}{marker.title}
            </span>
          </MapTooltip>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}

export default function IndonesiaMap() {
  return (
    <div className="w-full h-full relative">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css"
      />
      <style>{`
        .leaflet-popup-content-wrapper {
          border-radius: 12px !important;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15) !important;
          border: 1px solid #e2e8f0 !important;
        }
        .leaflet-popup-tip {
          box-shadow: 0 2px 8px rgba(0,0,0,0.1) !important;
        }
        .leaflet-tooltip {
          border-radius: 8px !important;
          padding: 4px 10px !important;
          border: 1px solid #e2e8f0 !important;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1) !important;
        }
        @keyframes pulse-red {
          0%, 100% { box-shadow: 0 0 0 0 rgba(192, 57, 43, 0.7); }
          50% { box-shadow: 0 0 0 8px rgba(192, 57, 43, 0); }
        }
      `}</style>
      <LeafletMap />
    </div>
  );
}
