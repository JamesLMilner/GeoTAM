import { h } from "preact";
import style from "./style.module.css";
import "maplibre-gl/dist/maplibre-gl.css";
import {
  useMemo,
  useRef,
  useEffect,
  useState,
  useCallback,
} from "preact/hooks";
import maplibregl from "maplibre-gl";
import { GeoJSONStoreFeatures } from "terra-draw";
import { setupDraw } from "./setup-draw";
import { setupMaplibreMap } from "./setup-maplibre";
import TAMTab from "../../components/tam-tab/TAMTab";
import DownloadTab from "../../components/download-tab/DownloadTab";
import DrawButtons from "../../components/draw-buttons/DrawButtons";
import { FeatureId } from "terra-draw/dist/store/store";
import Header from "../../components/header/Header";
import { OSMGreaterManchesterPolygon } from "./manchester-geojson";
import area from "@turf/area";
import { Feature, Polygon } from "geojson";

const manchesterCoordinates = { lat: 53.483959, lng: -2.244644, zoom: 13, };

const mapOptions = {
  id: "maplibre-map",
  minZoom: 7,
  maxZoom: 17,
  bounds: [
    [
      -2.293589602548309,
      53.45256594368598
    ],
    [
      -2.1931019386415755,
      53.50315412565925
    ],
  ] as [[number, number], [number, number]],
  ...manchesterCoordinates
};

const Dashboard = ({ authenticated }:{ authenticated: string }) => {
  const ref = useRef(null);
  const [map, setMap] = useState<undefined | maplibregl.Map>();
  const [mode, setMode] = useState<string>("static");
  const [expanded, setExpanded] = useState<boolean>(true);
  const [features, setFeatures] = useState<GeoJSONStoreFeatures[]>([]);
  const [tab, setTabState] = useState<"geotam" | "download">(localStorage.getItem(
    'tab') ? localStorage.getItem('tab') as 'geotam' | 'download' : "geotam"
  );
  const [businesses, setBusinesses] = useState<any[]>([]);

  const setTab = (newTab: 'geotam' | 'download') => {
    setTabState(newTab);
    localStorage.setItem('tab', newTab);
  }

  const onLogout = useCallback(() => {
    localStorage.removeItem('jwt');
    window.location.reload();
  }, []);

  useEffect(() => {
    const maplibreMap = setupMaplibreMap(mapOptions);
    maplibreMap.on("load", () => {
      setMap(maplibreMap);
    });
  }, []);

  const draw = useMemo(() => {
    if (map) {
      const terraDraw = setupDraw(map);
      terraDraw.start();

      terraDraw.addFeatures([OSMGreaterManchesterPolygon] as GeoJSONStoreFeatures[]);
      return terraDraw;
    }
  }, [map]);

  const changeMode = useCallback(
    (newMode: string) => {
      if (draw) {
        setMode(newMode);
        draw.setMode(newMode);
      }
    },
    [draw]
  );

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const updateAreaOfInterest = useCallback((id: string) => {
    if (!draw) {
      return
    }

    const areaOfInterest = draw.getSnapshot().find((feature) => feature.id === id);
    const areaSizeSqMeters = (area(areaOfInterest as Feature<Polygon>))

    if (areaSizeSqMeters > 1000000) {
      setError('Area too large, please try drawing a new smaller area of interest to find businesses')
      return
    }

    console.log({ authenticated })

    setLoading(true);
    fetch("/api/business", 
        { 
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authenticated}`
        },
        body: JSON.stringify(areaOfInterest) 
      }).then((response) => {
        if (response.status === 403 || response.status === 401) {
          onLogout()
        }

        return response.json()
      }).then((data) => {

      data.features.forEach((feature: any) => {
        feature.properties.type = 'business'
        feature.properties.mode = 'point'
      })

      setLoading(false)
      setBusinesses(data.features)
    }).catch((error) => {
      setLoading(false)
      console.log('Error!', error)
    })
  }, [draw, authenticated, onLogout])

  // Update the businesses on the map when the area of interest changes
  useEffect(() => {
    if (!draw) {
      return;
    }

    if (businesses.length === 0) {
      const toRemove = draw.getSnapshot().filter(({ properties }) => properties.type === 'business').map(({ id }) => id as string)
      draw.removeFeatures(toRemove)
    } else {
      const toAdd = businesses.filter(({ id }) => !draw.hasFeature(id))
      draw.addFeatures(toAdd)
    }

  }, [draw, businesses])

  useEffect(() => {
    if (!draw) {
      return
     }

    draw.on("finish", (id) => {
      updateAreaOfInterest(id as string)
    })
  }, [draw, updateAreaOfInterest])
 
  // We only want to wipe the businesses when the actual geometry of the Area of Interest changes
  const [areaOfInterestPolygon, setAreaOfInterestPolygon] = useState<GeoJSONStoreFeatures | undefined>();
  useEffect(() => {
     if (areaOfInterestPolygon) {
      setError('')
      setBusinesses([])
    }
  }, [areaOfInterestPolygon])

  useEffect(() => {
    if (!draw) {
      return
    }

    draw.on("change", (ids, type) => {

      // console.log('change', ids, type)

      if (type !== 'create' && type !== 'update') {
        return
      }

      const snapshot = draw.getSnapshot();
      const feature = snapshot.find((f) => ids.includes(f.id as string));

      if (feature?.geometry.type === 'Polygon' && (
        feature?.properties.mode === 'polygon' ||
        feature?.properties.mode === 'rectangle' ||
        feature?.properties.mode === 'circle' || 
        feature?.properties.mode === 'freehand' 
      )) {
        // Only update the area of interest if the geometry has changed
        setAreaOfInterestPolygon((existingFeature) => {
          if (
            !existingFeature ||
            JSON.stringify(existingFeature.geometry.coordinates) !== JSON.stringify(feature.geometry.coordinates)
          ) {
            return feature
          }
          return existingFeature
        })
      }

      // TODO: this is a bit of a hack to only count features and not selection helper geometries.
      // I think that 'f.geometry.type !== 'Point'' is only necessary because freehand doesn't assign closingPoint for some reason.
      const areaOfInterestFeatures = snapshot.filter((f) => f.geometry.type !== 'Point' && !f.properties.selectionPoint && !f.properties.midPoint && !f.properties.closingPoint && f.properties.mode !== 'manchester');

      if (areaOfInterestFeatures.length > 1) {
        draw.removeFeatures([areaOfInterestFeatures[0].id as FeatureId])
      } 

      const featuresToSet = snapshot.filter((f) => f.properties.type === 'business' || (f.geometry.type !== 'Point' && !f.properties.selectionPoint && !f.properties.midPoint && !f.properties.closingPoint ));
      setFeatures(featuresToSet);
    });

  }, [draw, setAreaOfInterestPolygon]);

  return <div>
    <Header onLogout={onLogout} />
 
    <div class={style.home}>
      <div class={expanded ? style.expanded : style.collapsed}>
        {!expanded && <button
          class={style.collapse}
          onClick={() => {
            setExpanded(!expanded);
          }}
        >
          {">"}
        </button>}
        <div class={expanded ? style.tabs : style.tabsHidden}>
          <div class={style.tabButtons}>
            <div>
              <span
                class={tab === "geotam" ? style.tabActive : style.tab}
                onClick={() => setTab("geotam")}
              >
                TAM
              </span>
              <span
                class={tab === "download" ? style.tabActive : style.tab}
                onClick={() => setTab("download")}
              >
                Download
              </span>
            </div>

            {expanded && <button
              class={style.collapse}
              onClick={() => {
                setExpanded(!expanded);
              }}
            >
              {"<"}
            </button>}
          
          </div>

          {tab === "geotam" ? (
            <TAMTab features={features} loadingTAM={loading} errorTAM={error} />
          ) : (
            <DownloadTab features={features} />
          )}
        </div>
      </div>
      <div ref={ref} class={style.map} id={mapOptions.id}>
        {draw ? <DrawButtons mode={mode} changeMode={changeMode} /> : null}
      </div>

    </div>
    </div>;
};

export default Dashboard;
