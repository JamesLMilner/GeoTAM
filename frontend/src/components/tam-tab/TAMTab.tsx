import { h } from "preact";
import style from "./style.module.css";
import area from "@turf/area";
import length from "@turf/length";
import polygonToLine from "@turf/polygon-to-line";
import { GeoJSONStoreFeatures } from "terra-draw";
import { Feature, Polygon } from "geojson";

const TAMTab = ({
  features,
}: {
  features: GeoJSONStoreFeatures[];
}) => {

  const areaOfInterest = features.find((feature) =>  feature?.geometry.type === 'Polygon' && (
    feature?.properties.mode === 'polygon' ||
    feature?.properties.mode === 'rectangle' ||
    feature?.properties.mode === 'circle' || 
    feature?.properties.mode === 'freehand'
  ));

  const boundary = areaOfInterest && polygonToLine(areaOfInterest as Feature<Polygon>);

  const businesses = features.filter((feature) =>  feature?.geometry.type === 'Point' && feature?.properties.mode === 'point');

  return (
    <div class={style.container}>
      <div class={style.current}>
        <h3 class={style.header}>Area of Interest</h3>
        <span class={style.row}>
          <span class={style.type}>Coordinates</span>
          {areaOfInterest && areaOfInterest.geometry.type === "Polygon"
            ? areaOfInterest.geometry.coordinates[0].length
            : "N/A"}
        </span>
        <span class={style.row}>
          <span class={style.type}>Area (m2)</span>
          {areaOfInterest && areaOfInterest.geometry.type === "Polygon"
            ? area(areaOfInterest).toFixed(2)
            : "N/A"}
        </span>
        <span class={style.row}>
          <span class={style.type}>Perimeter (km)</span>
          {boundary? length(boundary, { units: 'kilometers' }).toFixed(2)
            : "N/A"}
        </span>

        <h3 class={style.header}>Businesses</h3>
        <span class={style.row}>
          <span class={style.type}>Count</span>
          {businesses ? businesses.length
            : "N/A"}
        </span>
      </div>
    </div>
  );
};

export default TAMTab;
