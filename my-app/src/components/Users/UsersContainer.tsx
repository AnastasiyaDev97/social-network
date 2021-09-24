import {connect} from "react-redux";
import {Users} from "./Users";
import {actionsType, stateType, usersDataType} from "../../redux/store";
import {followUserAC, setUsersAC, unFollowUserAC} from "../../redux/reducer/user-reducer";

let mapStateToProps=(state:stateType)=>{

    return{
        users:state.UsersPage.usersData
    }
}
let mapDispatchToProps=(dispatch:(action: actionsType) => void)=>{

return{
    followUser:(id:number)=>{dispatch(followUserAC(id))},
    unFollowUser:(id:number)=>{dispatch(unFollowUserAC(id))},
    setUsers:(users:Array<usersDataType>)=>{dispatch(setUsersAC(users))}
}
}
export let UsersContainer=connect(mapStateToProps,mapDispatchToProps)(Users)