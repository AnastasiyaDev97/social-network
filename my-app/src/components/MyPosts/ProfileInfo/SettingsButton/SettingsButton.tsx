import React, {FC, memo, useState} from "react";
import style from "../ProfileInfo.module.scss";

export const SettingsButton: FC = memo(() => {

   /* const [isSettingsShow, setIsSettingsShow] = useState(false)

    const onSettingsBtnClick = () => {
        setIsSettingsShow(true)
    }

    const onSettingsMouseLeave = () => setIsSettingsShow(false)*/

    return (


        <div className={style.settingsIcon}>
             {/*{isSettingsShow && <ul className={style.settingsBlock}
                                                   onMouseLeave={onSettingsMouseLeave}>
                                  <li onClick={onEditLiClick}>Edit Post</li>
                                <li onClick={onDeleteLiClick}>Delete Post</li>
                            </ul>
                            }*/}</div>
    )
})