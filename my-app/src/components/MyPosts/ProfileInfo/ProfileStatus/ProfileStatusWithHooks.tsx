import React, {ChangeEvent, KeyboardEvent, useEffect, useState} from "react";


type ProfileStatusPropsType = {
    status: string
    updateUserStatus: (status: string) => any
}

export const ProfileStatusWithHooks=(props:ProfileStatusPropsType)=> {

    let [editMode,setEditMode]=useState(false)
    let [status,setStatus]=useState(props.status)
    const activateInputHandler = () => {
        setEditMode(true)
    }
   const activateSpanHandler = () => {
       setEditMode(false)
        props.updateUserStatus(status)
    }
    const onKeyPressActivateSpan = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === "Enter") {
            activateSpanHandler()
        }
    }
    const updateStatus = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus( e.currentTarget.value)
    }

    useEffect(()=>{
       setStatus(props.status)
    },[props.status])

            return (
            <div>
                {editMode
                    ? <input value={status} autoFocus onBlur={activateSpanHandler}
                             onChange={updateStatus} onKeyPress={onKeyPressActivateSpan}/>
                    : <span onDoubleClick={activateInputHandler}>{status || '----'}</span>}

            </div>
        )
    }
