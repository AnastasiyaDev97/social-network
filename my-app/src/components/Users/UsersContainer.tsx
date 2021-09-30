import {connect} from "react-redux";

import {actionsType, stateType, usersDataType} from "../../redux/store";
import {
    changePageAC,
    followUserAC,
    setTotalUsersCountAC,
    setUsersAC,
    unFollowUserAC
} from "../../redux/reducer/user-reducer";
import {Users} from "./Users";

type mapDispatchToPropsType={
    followUser: (id: number) => void
    unFollowUser: (id: number) => void
    setUsers: (users: Array<usersDataType>) => void
    setTotalUsersCount: (totalUsersCount: number) => void
    changePage:(currentPage:number)=>void
}
type mapStateToPropsType={
    items: Array<usersDataType>
    pageSize:number
    totalUserCount:number
    currentPage:number

}
export type PropsType=mapStateToPropsType&mapDispatchToPropsType

let mapStateToProps=(state:stateType)=>{

    return{
        items:state.UsersPage.items,
        pageSize:state.UsersPage.pageSize,
        totalUserCount:state.UsersPage.totalUserCount,
        currentPage:state.UsersPage.currentPage
    }
}
let mapDispatchToProps=(dispatch:(action: actionsType) => void)=>{

return{
    followUser:(id:number)=>{dispatch(followUserAC(id))},
    unFollowUser:(id:number)=>{dispatch(unFollowUserAC(id))},
    setUsers:(users:Array<usersDataType>)=>{dispatch(setUsersAC(users))},
    setTotalUsersCount:(totalUsersCount:number)=>{dispatch(setTotalUsersCountAC(totalUsersCount))},
    changePage:(currentPage:number)=>{dispatch(changePageAC(currentPage))}
}
}
export let UsersContainer=connect(mapStateToProps,mapDispatchToProps)(Users)