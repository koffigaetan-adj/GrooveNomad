import React, { useEffect, useRef, useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { rawFestivals } from '../hooks/festivals';

const containerStyle = {
  width: '100%',
  height: '600px',
  borderRadius: '20px',
  minHeight: '600px'
};

type Festival = {
  id: string;
  name: string;
  city: string;
  country: string;
  image: string;
  period: string;
  lat: number;
  lng: number;
};

const continentCenters: Record<string, { lat: number; lng: number }> = {
  Europe: { lat: 54.5260, lng: 15.2551 },
  Asia: { lat: 34.0479, lng: 100.6197 },
  America: { lat: 37.0902, lng: -95.7129 },
  Africa: { lat: 1.6508, lng: 17.6791 },
  Oceania: { lat: -30.0000, lng: 140.0000 }
};

const FestivalMapDynamic: React.FC = () => {
  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [selected, setSelected] = useState<Festival | null>(null);
  const [search] = useState('');
  const [continent, setContinent] = useState('');
  const mapRef = useRef<google.maps.Map | null>(null);
  const [mapCenter, setMapCenter] = useState({ lat: 48.8566, lng: 2.3522 });

  const geocodeWithGoogle = async (query: string): Promise<{ lat: number; lng: number } | null> => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(query)}&key=${apiKey}`);
    const data = await res.json();
    if (data.results && data.results.length > 0) {
      return {
        lat: data.results[0].geometry.location.lat,
        lng: data.results[0].geometry.location.lng
      };
    }
    return null;
  };

  useEffect(() => {
    async function enrichFestivals() {
      const enriched = await Promise.all(
        rawFestivals.map(async (f) => {
          const coords = await geocodeWithGoogle(`${f.name}, ${f.city}, ${f.country}`);
          return coords ? { ...f, ...coords } : null;
        })
      );
      setFestivals(enriched.filter(Boolean) as Festival[]);
    }
    enrichFestivals();
  }, []);

  const handleContinentChange = (selected: string) => {
    setContinent(selected);
    if (continentCenters[selected]) {
      setMapCenter(continentCenters[selected]);
    }
  };

  const filteredFestivals = festivals.filter(f =>
    (f.name.toLowerCase().includes(search.toLowerCase()) ||
     f.city.toLowerCase().includes(search.toLowerCase()) ||
     f.country.toLowerCase().includes(search.toLowerCase()) ||
     f.period.toLowerCase().includes(search.toLowerCase())) &&
    (continent === '' || 
      (continent === 'Europe' && f.lng >= -25 && f.lng <= 60) ||
      (continent === 'Asia' && f.lng > 60 && f.lng <= 180) ||
      (continent === 'America' && f.lng >= -170 && f.lng < -25) ||
      (continent === 'Africa' && f.lng > -20 && f.lng < 55 && f.lat < 35 && f.lat > -35) ||
      (continent === 'Oceania' && f.lng >= 110 && f.lng <= 180 && f.lat >= -50 && f.lat <= 0)
    )
  );

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={3}
        onLoad={map => { mapRef.current = map; }}
        onUnmount={() => { mapRef.current = null; }}
        onDragEnd={() => {
          if (mapRef.current) {
            const newCenter = mapRef.current.getCenter();
            if (newCenter) {
              setMapCenter({
                lat: newCenter.lat(),
                lng: newCenter.lng(),
              });
            }
          }
        }}
        options={{
  gestureHandling: 'greedy',
  fullscreenControl: false,
  mapTypeControl: false,
  streetViewControl: false,
  zoomControl: true,
  styles: [
    {
      featureType: 'administrative',
      elementType: 'labels',
      stylers: [{ visibility: 'on' }]
    },
    {
      featureType: 'landscape',
      elementType: 'labels',
      stylers: [{ visibility: 'on' }]
    },
    {
      featureType: 'country',
      elementType: 'labels.text',
      stylers: [{ visibility: 'on' }]
    },
    {
      featureType: 'continent',
      elementType: 'labels.text',
      stylers: [{ visibility: 'on' }]
    },
    {
      featureType: 'all',
      elementType: 'geometry',
      stylers: [{ visibility: 'simplified' }]
    },
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }]
    }
  ]
}}
      >
        
        <div className="absolute top-2 left-2 z-10 bg-white-900 border-2 border-white/30 backdrop-blur-sm rounded-full p-2 shadow text-sm">
          <select
            value={continent}
            onChange={(e) => handleContinentChange(e.target.value)}
            className="px-2 py-1 rounded-full text-violet-700 bg-white backdrop-blur-sm"
          >
            <option value="">🌍 Tous les continents</option>
            <option  value="Europe"> Europe</option>
            <option value="Asia"> Asie</option>
            <option value="America"> Amérique</option>
            <option value="Africa"> Afrique</option>
            <option value="Oceania"> Océanie</option>
            
            
          </select>
        </div>

        {filteredFestivals.map((f) => (
          <Marker
            key={f.id}
            position={{ lat: f.lat, lng: f.lng }}
            onClick={() => setSelected(f)}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 7,
              fillColor: selected?.id === f.id ? '#f132a8ff' : '#fb923c',
              fillOpacity: 1,
              strokeWeight:0
            }}
          />
        ))}

        {selected && (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => setSelected(null)}
          >
            <div className=" flex items-start space-x-3 max-w-xs">
              <img
                src={selected.image}
                alt={selected.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <h4 className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-400 font-semibold text-base">🎵 {selected.name}</h4>
                <p className="text-sm text-pink-700 mb-1">{selected.period}</p>
                <p className="text-sm text-gray-900">
                  {selected.city}, {selected.country}
                </p>
              </div>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default FestivalMapDynamic;
