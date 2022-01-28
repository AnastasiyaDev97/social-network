import {stateType} from "../../../redux/redux-store";
import {
    profileDataUserType,
    saveProfileAvatar, updateProfile,
    updateProfileThunkT,
    updateUserStatus
} from "../../../redux/reducer/profile-reducer";
import {Nullable} from "../../../types/Nullable";
import {ItemsUsersResponseType} from "../../../api/types";
import {connect} from "react-redux";
import {ProfileInfo} from "./ProfileInfo";

export type ProfileInfoPropsType = mapStateToPropsType & mapDispatchToPropsType

let mapStateToProps = (state: stateType) => ({
    profile: state.ProfilePage.profile,
    userIdAuth: state.auth.data.id,
    status: state.ProfilePage.status,
    users: state.UsersPage.items,
    totalUserCount: state.UsersPage.totalUserCount,
})


type mapStateToPropsType = {
    profile: profileDataUserType
    status: string
    userIdAuth: Nullable<number>
    users: Array<ItemsUsersResponseType>
    totalUserCount: number
}
type mapDispatchToPropsType = {
    updateUserStatus: (status: string) => void
    saveProfileAvatar: (newAvatar: File) => void
    updateProfile: (updateProfile: updateProfileThunkT) => void
}

export default connect<mapStateToPropsType, mapDispatchToPropsType, {}, stateType>
(mapStateToProps, {updateUserStatus,  saveProfileAvatar, updateProfile})(ProfileInfo);