import style from "./Dialogs.module.scss";
import { FC, memo } from "react";
import { DialogItem } from "./Dialog/DialogItem";
import { MessageItem } from "./Message/Message";
import {
  dialogsDataType,
  messageDataType,
} from "../../redux/reducer/dialogs/dialog-reducer";
import { EMPTY_STRING } from "../../const";
import { useFormik } from "formik";
import SuperTextarea from "../SuperTextarea/SuperTextarea";
import SuperButton from "../SuperButton/SuperButton";

type DialogsPropsType = {
  dialogs: Array<dialogsDataType>;
  messages: Array<messageDataType>;
  addMessage: (newMessage: string) => void;
};

export const Dialogs: FC<DialogsPropsType> = memo(
  ({ dialogs, messages, addMessage }) => {
    let dialogsElements = dialogs.map(({ id, user }) => (
      <DialogItem key={id} number={id} user={user} />
    ));
    let messagesElements = messages.map(({ id, textMessage }) => (
      <MessageItem key={id} textMessage={textMessage} />
    ));

    const formik = useFormik({
      initialValues: {
        message: EMPTY_STRING,
      },

      onSubmit: (values) => {
        addMessage(values.message);
        formik.resetForm();
      },
    });

    return (
      <div className={style.dialogs}>

        <div className={style.dialogsItems}>{dialogsElements}</div>

        <div className={style.messagesBlock}>
          <div className={style.messages}>{messagesElements}</div>

          <div className={style.addMessageWrapper}>
            <form onSubmit={formik.handleSubmit} className={style.form}>
              <SuperTextarea
                placeholder={"add message"}
                {...formik.getFieldProps("message")}
                className={style.textarea}
              />
              <SuperButton>Send message</SuperButton>
            </form>
          </div>
        </div>
      </div>
    );
  }
);
