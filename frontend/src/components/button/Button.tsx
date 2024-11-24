
import { h } from "preact";
import style from "./style.module.css";


export const Button = (
    { label, onClick }: 
    { label: string, onClick: () => void }
) => <button class={style.button} onClick={onClick}>{label}</button>