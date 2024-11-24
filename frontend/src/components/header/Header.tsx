import { h } from "preact";
import style from "./style.module.css";
import { Button } from "../button/Button";

const Header = ({onLogout} :{ onLogout: () => void} ) => {
  return <header class={style.header}>
    <div class={style.nav}>
      <h1 class={style.title}>GeoTAM</h1>
    </div>
    <div class={style.right}>
      <div class={style.links}>
        <a href="https://www.github.com/JamesLMilner/GeoTAM">
          GitHub 
        </a>
        <a href="https://www.rebalance.earth/geotam-challenge">
          About 
        </a>
      </div>
      <Button label={'Logout'} onClick={onLogout} />
    </div>
  </header>
}

export default Header;
