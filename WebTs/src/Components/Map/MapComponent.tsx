import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import customIcon from "../../Components/Map/custom-icon/customIcon";

interface MapComponentProps {
  height: string;
  width: string;
}

const MapComponent: React.FC<MapComponentProps> = ({ height, width }) => {
  const markers: { position: LatLngExpression; label: string }[] = [
    { position: [31.629472, -7.981084], label: "Marrakesh" },
    { position: [33.57311, -7.589843], label: "Casablanca" },
    { position: [34.020882, -6.84165], label: "Rabat" },
  ];

  return (
    <MapContainer className="rounded-xl"
      center={[31.629472, -7.981084]}
      zoom={6.2}
      style={{ height, width }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
      />
      {markers.map((marker, index) => (
        <Marker key={index} position={marker.position} icon={customIcon}>
          <Popup>{marker.label}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
