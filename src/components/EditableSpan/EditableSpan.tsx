import { ChangeEvent, FC, KeyboardEvent, memo, useState } from "react";
import SuperInputText from "../SuperInput/SuperInputText";
import style from "./EditableSpan.module.scss";

type EditableSpanT = {
  title: string;
  updateTitle: (newTitle: string) => void;
  myStyle: string;
  isOwner: boolean;
};

export const EditableSpan: FC<EditableSpanT> = memo(
  ({ title, updateTitle, myStyle, isOwner }) => {
    const [text, setText] = useState(title);
    let [edit, setEdit] = useState(true);

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      setText(e.currentTarget.value);
    };

    const activateInputMode = () => {
      if (isOwner) {
        setEdit(false);
      }
    };

    const activateSpanMode = () => {
      setEdit(true);
      updateTitle(text || "----");
    };

    const onActivateSpanKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.code === "Enter") {
        activateSpanMode();
      }
    };

    return edit ? (
      <span onDoubleClick={activateInputMode} className={myStyle}>
        {title}
      </span>
    ) : (
      <SuperInputText
        value={text}
        onBlur={activateSpanMode}
        autoFocus
        onChange={onInputChange}
        onKeyPress={onActivateSpanKeyPress}
        className={style.input}
      />
    );
  }
);
