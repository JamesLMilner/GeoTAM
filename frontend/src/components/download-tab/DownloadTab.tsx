import { h } from "preact";
import style from "./style.module.css";
import { useCallback, useMemo } from "preact/hooks";
import { GeoJSONStoreFeatures } from "terra-draw";
 import { FeatureCollection } from "geojson";
import { Button } from "../button/Button";

const DownloadTab = ({ features }: { features: GeoJSONStoreFeatures[]}) => {
  const featureCollection = useMemo(
    () => ({
      type: "FeatureCollection",
      features,
    } as FeatureCollection),
    [features]
  );

  const downloadJSON = useCallback(
    (json: Record<string, any>, filename: string) => {
      const data = JSON.stringify(json, null, 4);
      const blob = new Blob([data], { type: "text/plain" });
      const jsonObjectUrl = URL.createObjectURL(blob);
      const anchorEl = document.createElement("a");
      anchorEl.href = jsonObjectUrl;
      anchorEl.download = filename;
      anchorEl.click();
      URL.revokeObjectURL(jsonObjectUrl);
    },
    []
  );
  
  const downloadGeoJSON = () => {
    const today = new Date()
      .toISOString()
      .replace(/:/g, "-")
      .replace("Z", "")
      .replace("T", "_")
      .replace(".", "_")

    downloadJSON(featureCollection, `geotam_${today}.geojson`) 
  }

  return (
    <div class={style.container}>
      <div class={style.downloadTextContainer}>
       <p>
          Download your features as a GeoJSON file. This file can be imported into other GIS software like QGIS, ArcGIS, or Google Earth.
        </p>
      </div>
      <div class={style.downloadContainer}>
        <Button label={'Download'} onClick={downloadGeoJSON} />
      </div>

    </div>
  );
};

export default DownloadTab;
