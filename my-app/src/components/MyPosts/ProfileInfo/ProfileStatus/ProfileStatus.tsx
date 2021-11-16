import React from "react";

type ProfileStatusPropsType = {
    status: string
}

export class ProfileStatus extends React.Component<ProfileStatusPropsType> {
    state = {
        editMode: false
    }
    activateInputHandler = () => {
        this.setState({editMode: true})
    }
    activateSpanHandler=()=>{
        this.setState({editMode: false})
    }
    updateStatus=()=>{

    }
    render() {
        return (
            <div>
                {this.state.editMode
                ?<input value={this.props.status} autoFocus onBlur={this.activateSpanHandler} onChange={this.updateStatus}/>
                :<span onDoubleClick={this.activateInputHandler}>{this.props.status}</span>}

            </div>
        )
    }
}