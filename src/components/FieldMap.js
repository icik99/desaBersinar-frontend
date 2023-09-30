import React from 'react'
import '../App.css';
import "leaflet/dist/leaflet.css"
import { MapContainer, TileLayer, useMap } from 'react-leaflet'

const FieldMap = () => {
  return (
    <MapContainer center={[-7.442715737441341, 109.17473342231702]} zoom={13}>
      <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  )
}

export default FieldMap