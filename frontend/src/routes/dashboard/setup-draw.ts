import {
  TerraDraw,
  TerraDrawMapLibreGLAdapter,
  TerraDrawSelectMode,
  TerraDrawPolygonMode,
  TerraDrawCircleMode,
  TerraDrawFreehandMode,
  ValidateNotSelfIntersecting,
  TerraDrawRectangleMode,
  HexColor,
  TerraDrawPointMode,
  TerraDrawRenderMode,
} from "terra-draw";
import maplibregl from "maplibre-gl";
import { Validation } from "terra-draw/dist/common";

export function setupDraw(map: maplibregl.Map) {

  const ColorScheme = {
    Green: "#365943" as HexColor,
    White: "#ffffff" as HexColor,
    Orange: "#eb5e55" as HexColor,
    OffWhite: '#f3f3f3' as HexColor, 
    Grey: '#9f9f9f' as HexColor
  };

  const PolygonValidation: Validation = (feature, { updateType }) => {
    if (updateType === "finish" || updateType === "commit") {
      return ValidateNotSelfIntersecting(feature);
    }
    return true
  }

  return new TerraDraw({
    tracked: true,
    adapter: new TerraDrawMapLibreGLAdapter({
      map,
      coordinatePrecision: 9,
    }),
    modes: [
      new TerraDrawSelectMode({
        flags: {
          polygon: {
            feature: {
              scaleable: true,
              rotateable: true,
              draggable: true,
              coordinates: {
                midpoints: true,
                draggable: true,
                deletable: true,
              },
            },
          },
          circle: {
            feature: {
              draggable: true,
            },
          },
          rectangle: {
            feature: {
              draggable: true,
              coordinates: {
                resizable: 'opposite'
              }
            }
          },
          freehand: {
            feature: {
              draggable: true,
            },
          },
        },
        styles: {
          selectedPolygonColor: ColorScheme.Green,
          selectedPolygonFillOpacity: 0.5,
          selectedPolygonOutlineColor: ColorScheme.Green,
          selectedPolygonOutlineWidth: 3,
          selectionPointOutlineColor: ColorScheme.White,
          selectionPointColor: ColorScheme.Green,
          midPointColor: ColorScheme.White,
          midPointOutlineColor: ColorScheme.Green,
        }
      }),
      new TerraDrawPointMode({
        styles: {
          pointColor: ColorScheme.Orange,
          pointOutlineColor: ColorScheme.White,
          pointOutlineWidth: 2,
        }
      }),
      new TerraDrawRectangleMode({
        validation: PolygonValidation,
        styles: {
          fillColor: ColorScheme.Green,
          fillOpacity: 0.4,
          outlineColor: ColorScheme.Green,
          outlineWidth: 2,
        }
      }),
      new TerraDrawPolygonMode({
        pointerDistance: 30,
        validation: PolygonValidation,
        styles: {
          closingPointColor: ColorScheme.Green,
          fillColor: ColorScheme.Green,
          fillOpacity: 0.4,
          outlineColor: ColorScheme.Green,
          outlineWidth: 2,
        }
      }),
      new TerraDrawCircleMode({
        validation: PolygonValidation,
        styles: {
          fillColor: ColorScheme.Green,
          fillOpacity: 0.4,
          outlineColor: ColorScheme.Green,
          outlineWidth: 2,
        }
      }),
      new TerraDrawRenderMode({
        modeName: 'manchester',
        styles: {
          polygonFillColor: ColorScheme.OffWhite,
          polygonFillOpacity: 0.2,
          polygonOutlineColor: ColorScheme.Grey,
          polygonOutlineWidth: 2,
        }
      }),
      new TerraDrawFreehandMode({
        minDistance: 10,
        pointerDistance: 40,
        validation: PolygonValidation,
        styles: {
          closingPointColor: ColorScheme.Green,
          fillColor: ColorScheme.Green,
          fillOpacity: 0.4,
          outlineColor: ColorScheme.Green,
          outlineWidth: 2,
        }

      }),
    ],
  });
}
