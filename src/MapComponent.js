////import React, { useEffect, useState } from 'react';
////import L from 'leaflet';
////
////const MapComponent = () => {
////  const [marker, setMarker] = useState(null);
////  const [map, setMap] = useState(null);
////
////  useEffect(() => {
////    const newMap = L.map('map', { center: [15.5, 75.5], zoom: 7 });
////
////    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
////      maxZoom: 19,
////      attribution: '© OpenStreetMap'
////    }).addTo(newMap);
////
////    setMap(newMap);
////
////    fetch('/wgg.geojsonl.json')
////      .then(response => response.text())
////      .then(text => {
////        const features = text.split('\n').filter(line => line.trim()).map(line => {
////          try {
////            return JSON.parse(line);
////          } catch (error) {
////            console.error('Error parsing line:', line, error);
////            return null;
////          }
////        }).filter(feature => feature !== null);
////
////        if (features.length > 0) {
////          const geoJsonLayer = L.geoJSON(features, {
////            style: {
////              color: 'blue',
////              weight: 2,
////              fillColor: 'blue',
////              fillOpacity: 0.5,
////            }
////          }).addTo(newMap);
////          newMap.fitBounds(geoJsonLayer.getBounds());
////
////          newMap.on('click', (event) => {
////            const clickedLatLng = event.latlng;
////            const isInside = geoJsonLayer.getLayers().some(layer => {
////              return layer.getBounds().contains(clickedLatLng);
////            });
////
////            if (isInside) {
////              console.log('Clicked inside highlighted area:', clickedLatLng);
////              if (marker) {
////                marker.setLatLng(clickedLatLng);
////                console.log('Marker moved to:', clickedLatLng);
////              } else {
////                const newMarker = L.marker(clickedLatLng).addTo(newMap);
////                setMarker(newMarker);
////                console.log('Marker created at:', clickedLatLng);
////              }
////            } else {
////              console.log('Clicked outside highlighted area');
////            }
////          });
////        } else {
////          console.error('No valid GeoJSON features found.');
////        }
////      })
////      .catch(error => console.error('Error loading GeoJSON Lines:', error));
////
////    return () => {
////      newMap.remove();
////    };
////  }, [marker]);
////
////  return <div id="map" style={{ height: '100vh' }}></div>;
////};
////
////export default MapComponent;
//
//
//import React, { useEffect, useState } from 'react';
//import L from 'leaflet';
//
//const MapComponent = ({ threshold }) => {
//  const [map, setMap] = useState(null);
//  const [marker, setMarker] = useState(null);
//
//  useEffect(() => {
//    // Initialize map when component is first loaded
//    const newMap = L.map('map', { center: [15.5, 75.5], zoom: 7 });
//
//    // Set up the tile layer
//    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//      maxZoom: 19,
//      attribution: '© OpenStreetMap'
//    }).addTo(newMap);
//
//    setMap(newMap);
//
//    // Fetch GeoJSON data
//    fetch('/wgg.geojsonl.json')
//      .then(response => response.text())
//      .then(text => {
//        const features = text.split('\n').filter(line => line.trim()).map(line => {
//          try {
//            return JSON.parse(line);
//          } catch (error) {
//            console.error('Error parsing line:', line, error);
//            return null;
//          }
//        }).filter(feature => feature !== null);
//
//        if (features.length > 0) {
//          const geoJsonLayer = L.geoJSON(features, {
//            style: {
//              color: 'blue',
//              weight: 2,
//              fillColor: 'blue',
//              fillOpacity: 0.5,
//            }
//          }).addTo(newMap);
//          newMap.fitBounds(geoJsonLayer.getBounds());
//
//          // Click handler for placing markers
//          newMap.on('click', (event) => {
//            const clickedLatLng = event.latlng;
//            const isInside = geoJsonLayer.getLayers().some(layer => {
//              return layer.getBounds().contains(clickedLatLng);
//            });
//
//            if (isInside) {
//              console.log('Clicked inside highlighted area:', clickedLatLng);
//              if (marker) {
//                marker.setLatLng(clickedLatLng); // Move the existing marker
//                console.log('Marker moved to:', clickedLatLng);
//              } else {
//                const newMarker = L.marker(clickedLatLng).addTo(newMap);
//                setMarker(newMarker);
//                console.log('Marker created at:', clickedLatLng);
//              }
//            } else {
//              console.log('Clicked outside highlighted area');
//            }
//          });
//        } else {
//          console.error('No valid GeoJSON features found.');
//        }
//      })
//      .catch(error => console.error('Error loading GeoJSON:', error));
//
//    return () => {
//      newMap.remove();
//    };
//  }, [marker]);
//
//  // Effect when threshold value changes
//  useEffect(() => {
//    if (map && threshold) {
//      // Optionally adjust map or markers based on the threshold value
//      console.log('Threshold changed to:', threshold);
//      // Here you can add logic to change the map based on the threshold
//    }
//  }, [threshold, map]);
//
//  return <div id="map" style={{ height: '100vh' }}></div>;
//};
//
//export default MapComponent;

import React, { useEffect, useState } from 'react';
import L from 'leaflet';

const MapComponent = ({ onMapClick }) => {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    const newMap = L.map('map', { center: [15.5, 75.5], zoom: 7 });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(newMap);

    setMap(newMap);

    fetch('/wgg.geojsonl.json')
      .then(response => response.text())
      .then(text => {
        const features = text.split('\n').filter(line => line.trim()).map(line => {
          try {
            return JSON.parse(line);
          } catch (error) {
            console.error('Error parsing line:', line, error);
            return null;
          }
        }).filter(feature => feature !== null);

        if (features.length > 0) {
          const geoJsonLayer = L.geoJSON(features, {
            style: {
              color: 'blue',
              weight: 2,
              fillColor: 'blue',
              fillOpacity: 0.5,
            }
          }).addTo(newMap);
          newMap.fitBounds(geoJsonLayer.getBounds());

          newMap.on('click', (event) => {
            const clickedLatLng = event.latlng;
            const isInside = geoJsonLayer.getLayers().some(layer => {
              return layer.getBounds().contains(clickedLatLng);
            });

            if (isInside) {
              console.log('Clicked inside highlighted area:', clickedLatLng);
              if (marker) {
                marker.setLatLng(clickedLatLng); // Move the existing marker
                console.log('Marker moved to:', clickedLatLng);
              } else {
                const newMarker = L.marker(clickedLatLng).addTo(newMap);
                setMarker(newMarker);
                console.log('Marker created at:', clickedLatLng);
              }

              // Pass latitude and longitude back to ToolPage
              onMapClick(clickedLatLng.lat, clickedLatLng.lng);
            } else {
              console.log('Clicked outside highlighted area');
            }
          });
        } else {
          console.error('No valid GeoJSON features found.');
        }
      })
      .catch(error => console.error('Error loading GeoJSON:', error));

    return () => {
      newMap.remove();
    };
  }, [marker, onMapClick]); // Added onMapClick as a dependency

  return <div id="map" style={{ height: '100vh' }}></div>;
};

export default MapComponent;
