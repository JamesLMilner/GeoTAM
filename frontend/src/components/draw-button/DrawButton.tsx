import { h } from "preact";
import style from "./style.module.css";
 import selectIcon from "../../assets/icons/select.svg";
import rectangleIcon from "../../assets/icons/rectangle.svg";
import polygonIcon from "../../assets/icons/polygon.svg";
import freehandIcon from "../../assets/icons/freehand.svg";
import circleIcon from "../../assets/icons/circle.svg";

const icons = {
  select: selectIcon,
  rectangle: rectangleIcon,
  polygon: polygonIcon,
  freehand: freehandIcon,
  circle: circleIcon,
} as const

const DrawButton = ({
  mode,
  currentMode,
  changeMode,
  label,
  hiddenOnTouch,
}: {
  mode: string;
  currentMode: string;
  changeMode: (mode: string) => void;
  label?: string;
  hiddenOnTouch?: boolean;
}) => {
  let classes = style.button;

  if (hiddenOnTouch) {
    classes = `${style.hiddenOnMobile} ${classes}`;
  }

  if (currentMode === mode) {
    classes = `${style.active} ${classes}`;
  }

  return (
    <button
      id={mode}
      class={classes}
      onClick={() => {
        changeMode(mode);
      }}
    >
      <img src={icons[mode as keyof typeof icons]} width="15px" height="15px" />
      {label ? label : titleCase(mode)}
    </button>
  );
};

function titleCase(str: string) {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default DrawButton;
