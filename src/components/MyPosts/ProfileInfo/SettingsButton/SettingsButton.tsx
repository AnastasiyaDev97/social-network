import { FC, memo } from "react";
import style from "../ProfileInfo.module.scss";

export const SettingsButton: FC = memo(() => {
  /* const [isSettingsShow, setIsSettingsShow] = useState(false)

    const onSettingsBtnClick = () => {
        setIsSettingsShow(true)
    }

    const onSettingsMouseLeave = () => setIsSettingsShow(false)*/

  return <div className={style.settingsIcon}></div>;
});
