import React, { useRef, useEffect, useState } from "react";

import mapboxgl from "!mapbox-gl";
import UTMLatLng from "utm-latlng";

import { degreeDmsConvertor } from "utils";

// import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.setRTLTextPlugin(
  "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js",
  null,
  true // Lazy load the plugin
);

const utmHandler = new UTMLatLng();

const Map = ({
  getPosition,
  handleChange,
  options: {
    demicalPrecision = {
      degree: 5,
      dms: 2,
      utm: 3
    },
    zoom = 5,
    center = { lng: 53.688, lat: 32.4279 },
    scrollZoom = { around: "center" },
    ...restOptions
  }
}) => {
  const [coordinate, setCoordinate] = useState({
    degree: {
      lat: parseFloat(center.lat.toFixed(demicalPrecision.degree)),
      lng: parseFloat(center.lng.toFixed(demicalPrecision.degree))
    },
    dms: {
      lat: degreeDmsConvertor.degree2Dms(center.lat, demicalPrecision.dms),
      lng: degreeDmsConvertor.degree2Dms(center.lng, demicalPrecision.dms)
    },
    utm: utmHandler.convertLatLngToUtm(
      center.lat,
      center.lng,
      demicalPrecision.utm
    )
  });

  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      // style: "mapbox://styles/mapbox/streets-v11",
      // style: "mapbox://styles/alivp/cl2yekfxw000d14qgua8pzwo5",
      style: "http://tile.romaak.net/styles/klokantech-basic/style.json",
      zoom,
      center,
      scrollZoom,
      ...restOptions
    });

    getPosition &&
      map.current.on("moveend", () => {
        const { lng, lat } = map.current.getCenter();

        setCoordinate({
          degree: {
            lat: parseFloat(lat.toFixed(demicalPrecision.degree)),
            lng: parseFloat(lng.toFixed(demicalPrecision.degree))
          },
          dms: {
            lat: degreeDmsConvertor.degree2Dms(lat, demicalPrecision.dms),
            lng: degreeDmsConvertor.degree2Dms(lng, demicalPrecision.dms)
          },
          utm: utmHandler.convertLatLngToUtm(lat, lng, demicalPrecision.utm)
        });
      });
    mapContainer.current.childNodes[2].remove();
  }, [center]);

  useEffect(() => {
    handleChange(coordinate);
  }, [coordinate]);

  return (
    <div>
      {getPosition && (
        <div
          style={{
            direction: "ltr",
            fontSize: 15,
            textAlign: "center",
            backgroundColor: "rgba(35, 55, 75, 0.9)",
            padding: "6px 12px",
            zIndex: 1,
            top: 0,
            left: 0,
            margin: 12,
            borderRadius: 4
          }}
        >
          <label style={{ color: "#fff", fontFamily: "monospace" }}>
            Longitude: {coordinate.degree.lng} | Latitude:{" "}
            {coordinate.degree.lat}
          </label>
          <br />
          <label style={{ color: "#fff", fontFamily: "monospace" }}>
            Longitude: {coordinate.dms.lng[0]} {coordinate.dms.lng[1]}{" "}
            {coordinate.dms.lng[2]} | Latitude: {coordinate.dms.lat[0]}{" "}
            {coordinate.dms.lat[1]} {coordinate.dms.lat[2]}
          </label>
          <br />
          <label style={{ color: "#fff", fontFamily: "monospace" }}>
            X: {coordinate.utm.Easting} | Y: {coordinate.utm.Northing} | Zone:{" "}
            {coordinate.utm.ZoneNumber}
          </label>
        </div>
      )}
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {getPosition && (
          <i
            className="fad fa-map-marker-alt"
            style={{ position: "absolute", fontSize: 40, marginBottom: 40 }}
          />
        )}
        <div
          ref={mapContainer}
          className="map-container"
          style={{ width: "100%", height: 500 }}
        />
      </div>
    </div>
  );
};

// set default props
Map.defaultProps = {
  options: {
    zoom: 5,
    center: { lng: 53.688, lat: 32.4279 },
    scrollZoom: { around: "center" },
    demicalPrecision: {
      degree: 5,
      dms: 2,
      utm: 3
    }
  }
};

export default Map;
