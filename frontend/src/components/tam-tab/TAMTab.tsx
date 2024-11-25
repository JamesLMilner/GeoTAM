import { h } from "preact";
import style from "./style.module.css";
import area from "@turf/area";
import length from "@turf/length";
import polygonToLine from "@turf/polygon-to-line";
import { GeoJSONStoreFeatures } from "terra-draw";
import { Feature, Polygon } from "geojson";

const TAMTab = ({
  features,
  loadingTAM,
  errorTAM
}: {
  features: GeoJSONStoreFeatures[];
  loadingTAM: boolean;
  errorTAM: string;
}) => {

  const areaOfInterest = features.find((feature) =>  feature?.geometry.type === 'Polygon' && (
    feature?.properties.mode === 'polygon' ||
    feature?.properties.mode === 'rectangle' ||
    feature?.properties.mode === 'circle' || 
    feature?.properties.mode === 'freehand'
  ));

  const boundary = areaOfInterest && polygonToLine(areaOfInterest as Feature<Polygon>);

  const businesses = features.filter((feature) =>  feature?.geometry.type === 'Point' && feature?.properties.mode === 'point');
  const areaKM2 = areaOfInterest ? +(area(areaOfInterest) / 1_000_000).toFixed(2) : 'N/A'
  const perimeterM = boundary ? length(boundary, { units: 'kilometers' }).toFixed(2) : 'N/A'
  const businessesPerKM2 = areaKM2 !== 'N/A' ? (businesses.length / areaKM2).toFixed(0) : 'N/A'
  const turnovers: number[] = businesses.map((business) => business.properties.estimatedTurnover) as number[]
  const TAM = businesses && businesses.length ? parseInt(turnovers.reduce((a: any, b: any) => a + b, 0), 10)  : 'N/A'
  const averageTurnover = businesses && businesses.length ? parseInt((turnovers.reduce((a: any, b: any) => a + b, 0) / turnovers.length).toFixed(0), 10)  : 'N/A'

  return (
    <div class={style.container}>
      <div class={style.current}>
        <h3 class={style.header}>Area of Interest</h3>
        <span class={style.row}>
          <span class={style.type}>Total Polygon Coordinates</span>
          {areaOfInterest && areaOfInterest.geometry.type === "Polygon"
            ? areaOfInterest.geometry.coordinates[0].length
            : "N/A"}
        </span>
        <span class={style.row}>
          <span class={style.type}>Area (km²)</span>
          {areaKM2}
        </span>
        <span class={style.row}>
          <span class={style.type}>Perimeter (km)</span>
          {perimeterM}
        </span>
        
        {
          loadingTAM ? 
          <div className={style.tamContainer}><LoadingSpinner /></div> 
          :
          errorTAM ? 
            <div className={style.tamContainer}>
              <p className={style.errorText}>{errorTAM}</p>
            </div>
          : <div className={style.tamContainer}>
            <h3 class={style.header}>Businesses</h3>
            <span class={style.row}>
              <span class={style.type}>Count</span>
              {businesses ? businesses.length
                : "N/A"}
            </span>
            <span class={style.row}>
              <span class={style.type}>Businesses per km²</span>
              {businessesPerKM2}
            </span>
            <span class={style.row}>
              <span class={style.type}>Average Estimate Turnover (£)</span>
              {averageTurnover.toLocaleString()}
            </span>
            <span class={style.row}>
              <span class={style.type}>TAM (£)</span>
              {TAM ? TAM.toLocaleString() : "N/A"}
            </span>
          </div>
        }
      </div>
    </div>
  );
};



const LoadingSpinner: React.FC = () => {
  const spinnerStyle: React.CSSProperties = {
    width: '40px',
    height: '40px',
    border: '4px solid rgba(0, 0, 0, 0.1)',
    borderTop: '4px solid #eb5d55',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <div style={spinnerStyle} />
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};


export default TAMTab;
