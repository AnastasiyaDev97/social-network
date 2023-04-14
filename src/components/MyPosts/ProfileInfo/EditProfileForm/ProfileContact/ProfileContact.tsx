import React, { ChangeEvent, FC, memo, MouseEvent, useState } from "react";
import style from "./ProfileContact.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import SuperInputText from "components/SuperInput/SuperInputText";
import { updateProfileThunkT } from "redux/reducer/profile/thunk";

type ProfileContactT = {
  link: string;
  icon: IconProp;
  updateProfile: (updateContact: updateProfileThunkT) => void;
  isOwner: boolean;
  name: string;
};

export const ProfileContact: FC<ProfileContactT> = memo(
  ({ link, icon, updateProfile, isOwner, name }) => {
    const [edit, setEdit] = useState(false);
    const [linkURL, setLinkURL] = useState(link);

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      setLinkURL(e.currentTarget.value);
    };

    const onInputBlur = () => {
      if (linkURL) {
        updateProfile({ [name]: linkURL });
      }
      setEdit(false);
    };

    const onLinkDblClick = (e: MouseEvent<HTMLAnchorElement>) => {
      if (isOwner && !link) {
        e.preventDefault();
        setEdit(true);
      }
    };

    const classNameForEmptyLink = !link && style.emptyLink;

    if (!link && !isOwner) {
      return <></>;
    }
    return (
      <>
        <a
          href={link}
          className={`${style.icon} ${classNameForEmptyLink}`}
          onClick={onLinkDblClick}
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon icon={icon} />
        </a>
        {edit && (
          <SuperInputText
            value={linkURL}
            onChange={onInputChange}
            className={style.input}
            autoFocus
            onBlur={onInputBlur}
          />
        )}
      </>
    );
  }
);
