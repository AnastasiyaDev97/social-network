import {actionsType} from "../redux-store";

let initialState={
    sidebarData: []
}
export type sidebarPageType = {
    sidebarData: sidebarDataType
}
export type sidebarDataType = {}

export const sidebarReducer=(state:sidebarPageType=initialState,action:actionsType)=>{
    switch (action.type) {
        default:return state
    }
}

export default sidebarReducer