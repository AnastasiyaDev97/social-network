import React, {ChangeEvent, Component, KeyboardEvent} from "react";


type ProfileStatusPropsType = {
    status: string
    updateUserStatus: (status: string) => any
}
type localStateType = {
    editMode: boolean
    status: string
}

export class ProfileStatus extends Component<ProfileStatusPropsType> {
    state: localStateType = {
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
        if (e.code === "Enter") {
            this.activateSpanHandler()
        }
    }

    updateStatus = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({status: e.currentTarget.value})
    }

    componentDidUpdate(prevProps: Readonly<ProfileStatusPropsType>, prevState: Readonly<localStateType>) {
        if (prevProps.status !== this.props.status) {
            this.setState({status: this.props.status})
        }
    }

    render() {
        return (
            <div>
                {this.state.editMode
                    ? <input value={this.state.status} autoFocus onBlur={this.activateSpanHandler}
                             onChange={this.updateStatus} onKeyPress={this.onKeyPressActivateSpan}/>
                    : <span onDoubleClick={this.activateInputHandler}>{this.state.status || '----'}</span>
                }
            </div>
        )
    }
}