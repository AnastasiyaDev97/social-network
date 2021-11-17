import React, {ChangeEvent, KeyboardEvent} from "react";


type ProfileStatusPropsType = {
    status: string
    updateUserStatus: (status: string) => any
}

export class ProfileStatus extends React.Component<ProfileStatusPropsType> {
    state = {
        editMode: false,
        status: this.props.status,
    }
    activateInputHandler = () => {
        this.setState({editMode: true})
    }
    activateSpanHandler = () => {
        this.setState({editMode: false})
        this.props.updateUserStatus(this.state.status)
    }
    onKeyPressActivateSpan = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code==="Enter") {
            this.activateSpanHandler()
        }
    }

    updateStatus = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({status: e.currentTarget.value})
    }

    render() {
        return (
            <div>
                {this.state.editMode
                    ? <input value={this.state.status} autoFocus onBlur={this.activateSpanHandler}
                             onChange={this.updateStatus} onKeyPress={this.onKeyPressActivateSpan}/>
                    : <span onDoubleClick={this.activateInputHandler}>{this.props.status}</span>}

            </div>
        )
    }
}