import React, { useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import './mapDisplay.css'
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { useStateValue } from '../../StateProvider';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

function Test({ location, search }) {
  const map = useMap();
  if (location) map.flyTo(location, 12);

  return location ? (
    <Marker
      draggable
      position={location}
      //ref={markerRef}
    >
      <Popup>You are here: {search}</Popup>
    </Marker>
  ) : null;
}

const MapDisplay = () => {
  const [loc, updLoc] = useState();
 const [{lat,lon},dispatch] = useStateValue();

  useEffect(() => {
    updLoc({lat,lon})
  }, [lat,lon]);
  return (
    <>
      <MapContainer
        center={loc || { lat: 50, lng: 30 }}
        zoom={loc ? 12 : 3}
        zoomControl={false}
        className='map'
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Test location={loc}/>
      </MapContainer>
    </>
  );
}

//  {

//   const [{lat,lon},dispatch] = useStateValue();

//   useEffect(() => {
//     map.flyTo(e.latlng, map.getZoom())
//   })

//   return (
//     <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} >
//   <TileLayer
//     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//     attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//   />
//   <Marker position={[lat, lon]}>
//     <Popup>
//       A pretty CSS3 popup. <br /> Easily customizable.
//     </Popup>
//   </Marker>
// </MapContainer>
//   )
// }

export default MapDisplay