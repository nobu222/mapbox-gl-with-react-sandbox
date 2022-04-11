import "mapbox-gl/dist/mapbox-gl.css";
import "./styles.css";
import mapboxgl, { NavigationControl } from "mapbox-gl";
import { FC, useCallback, useEffect, useState } from "react";
mapboxgl.accessToken = "";

const MapRender: FC = () => {
  const [map, setMap] = useState<mapboxgl.Map>();
  useEffect(() => {
    if (document.getElementById("map")) {
      const mapInstance = new mapboxgl.Map({
        container: "map", // container ID
        style: "mapbox://styles/mapbox/light-v10", // style URL
        center: [-74.5, 40], // starting position [lng, lat]
        zoom: 1 // starting zoom
      });
      mapInstance.addControl(new NavigationControl());

      setMap(mapInstance);
    }
  }, []);
  const setLang = useCallback(() => {
    if (map) {
      const language = "ja";
      map.setLayoutProperty("country-label", "text-field", [
        "get",
        `name_${language}`
      ]);
      console.log(map.getLayoutProperty("country-label", "text-field"));
    }
  }, [map]);
  useEffect(() => {
    if (map) {
      map.on("click", setLang);
    }
  }, [map, setLang]);

  return null;
};

export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <div id="map">
        map here.
        <MapRender />
      </div>
    </div>
  );
}
