import React, {ChangeEvent, FC, KeyboardEvent, memo, useEffect, useState} from "react";


type ProfileStatusPropsType = {
    status: string
    updateUserStatus: (status: string) => void
}

export const ProfileStatusWithHooks: FC<ProfileStatusPropsType> = memo(({
                                                                            status,
                                                                            updateUserStatus
                                                                        }) => {
        let [editMode, setEditMode] = useState(false)
        let [newStatus, setStatus] = useState(status)

        useEffect(() => {
            setStatus(status)
        }, [status])

        const onActivateInputDblClick = () => {
            setEditMode(true)
        }

        const onActivateSpanBlur = () => {
            setEditMode(false)
            updateUserStatus(status)
        }
        const onActivateSpanKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
            if (e.code === "Enter") {
                onActivateSpanBlur()
            }
        }

        const updateStatus = (e: ChangeEvent<HTMLInputElement>) => {
            setStatus(e.currentTarget.value)
        }

        return (
            <div>
                {editMode
                    ? <input value={newStatus} autoFocus onBlur={onActivateSpanBlur}
                             onChange={updateStatus} onKeyPress={onActivateSpanKeyPress}/>
                    : <span onDoubleClick={onActivateInputDblClick}>{newStatus || '----'}</span>}

            </div>
        )
    }
)