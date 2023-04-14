import preload from "assets/oval.svg";
import style from "./Preloader.module.scss";

const Preloader = () => {
  return <img src={preload} alt="preloader" className={style.imgPreload} />;
};

export default Preloader;
