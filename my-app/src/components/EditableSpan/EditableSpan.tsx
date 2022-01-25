import {ChangeEvent, FC, KeyboardEvent, memo, useState} from "react";

type EditableSpanT = {
    title: string
    updateTitle: (newTitle: string) => void
    myStyle: string
}

export const EditableSpan: FC<EditableSpanT> = memo(({title, updateTitle, myStyle}) => {
    const [text, setText] = useState(title)
    let [edit, setEdit] = useState(true)

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
    }

    const activateInputMode = () => {
        setEdit(false)
    }

    const activateSpanMode = () => {
        setEdit(true)
        updateTitle(text)
    }

    const onActivateSpanKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === "Enter") {
            activateSpanMode()
        }
    }

    return (
        edit ?
            <span onDoubleClick={activateInputMode} className={myStyle}>{title}</span>
            : <input value={text} onBlur={activateSpanMode} autoFocus onChange={onInputChange}
                     onKeyPress={onActivateSpanKeyPress}/>
    )
})