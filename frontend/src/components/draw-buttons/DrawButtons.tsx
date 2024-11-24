import DrawButton from "../draw-button/DrawButton";
import { h } from "preact";
import style from "./style.module.css";

const MapButtons = ({
  mode,
  changeMode,
}: {
  mode: string;
  changeMode: (mode: string) => void;
}) => {
  return (
    <div class={style.buttons}>
      <DrawButton mode={"select"} currentMode={mode} changeMode={changeMode} />
      <DrawButton
        label={"Rectangle"}
        mode={"rectangle"}
        currentMode={mode}
        changeMode={changeMode}
        hiddenOnTouch={true}
      />
      <DrawButton mode={"polygon"} currentMode={mode} changeMode={changeMode} />
      <DrawButton
        mode={"freehand"}
        currentMode={mode}
        changeMode={changeMode}
        hiddenOnTouch={true}
      />
      <DrawButton
        mode={"circle"}
        currentMode={mode}
        changeMode={changeMode}
        hiddenOnTouch={true}
      />
    </div>
  );
};

export default MapButtons;
