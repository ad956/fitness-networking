import React, { useEffect, useState, useRef, Suspense } from "react";
import { Card, CardBody, CardHeader, Input, Button } from "@nextui-org/react";
import { LuSearch, LuMapPin, LuTarget } from "react-icons/lu";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import useFindGyms from "@hooks/useFindGyms.js";

// Custom icon for current location
const currentLocationIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
  iconSize: [32, 32],
});

function GymMap({ selectedGym, moveToCurrentLocation }) {
  const mapRef = useRef(null);
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const location = { lat: coords.latitude, lng: coords.longitude };
        setCurrentLocation(location);
        moveToCurrentLocation(location);
      },
      () => alert("Could not get location")
    );
  }, []);

  function MoveToCurrentLocationButton() {
    const map = useMap();
    return (
      <Button
        isIconOnly
        className="absolute top-4 right-4 z-[1000] bg-white p-2 rounded-lg shadow-md"
        onClick={() => {
          if (currentLocation) {
            map.flyTo([currentLocation.lat, currentLocation.lng], 14);
          }
        }}
      >
        <LuTarget size={20} />
      </Button>
    );
  }

  useEffect(() => {
    if (selectedGym && mapRef.current) {
      mapRef.current.flyTo([selectedGym.lat, selectedGym.lng], 14);
    }
  }, [selectedGym]);

  return (
    <MapContainer
      center={[26.9124, 75.7873]}
      zoom={12}
      style={{ height: "500px", width: "100%" }}
      ref={mapRef}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MoveToCurrentLocationButton />
      {currentLocation && (
        <Marker
          position={[currentLocation.lat, currentLocation.lng]}
          icon={currentLocationIcon}
        >
          <Popup>You are here</Popup>
        </Marker>
      )}
    </MapContainer>
  );
}

export default function NearByGyms() {
  const [search, setSearch] = useState("");
  const [selectedGym, setSelectedGym] = useState(null);
  const { data: gyms = [], isLoading, isError } = useFindGyms();

  const filteredGyms = gyms.filter((gym) =>
    gym.name.toLowerCase().includes(search.toLowerCase())
  );

  const moveToCurrentLocation = (location) => {
    setSelectedGym({ lat: location.lat, lng: location.lng });
  };

  return (
    <Card className="w-full mb-6">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col gap-1 w-full">
          <h4 className="text-lg font-bold">Find Nearby Gyms</h4>
          <Input
            classNames={{
              base: "max-w-full sm:max-w-[44%]",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Search locations..."
            size="sm"
            startContent={<LuSearch size={18} />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardBody>
        <div className="relative w-full h-[500px] flex">
          {/* Map Section */}
          <div className="w-[75%] h-full bg-gray-100 rounded-lg overflow-hidden">
            <Suspense fallback={<LoadingMaps />}>
              <GymMap
                selectedGym={selectedGym}
                moveToCurrentLocation={moveToCurrentLocation}
              />
            </Suspense>
          </div>
          {/* List Section */}
          <div className="w-[25%] p-4 bg-white shadow-md overflow-auto">
            {isLoading ? (
              <p className="text-gray-500">Loading gyms...</p>
            ) : isError ? (
              <p className="text-red-500">Failed to load gyms</p>
            ) : filteredGyms.length > 0 ? (
              filteredGyms.map((gym) => (
                <Button
                  key={gym.id}
                  variant="ghost"
                  className="w-full justify-start text-left mb-3"
                  onClick={() => setSelectedGym(gym)}
                >
                  <LuMapPin className="mr-2" /> {gym.name}
                </Button>
              ))
            ) : (
              <p className="text-gray-500">No gyms found</p>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

function LoadingMaps() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center">
        <LuMapPin className="w-12 h-12 mx-auto text-gray-400" />
        <p className="mt-2 text-gray-500">Map view will be displayed here</p>
      </div>
    </div>
  );
}
