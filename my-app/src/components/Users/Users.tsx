import {usersDataType, UsersPageType} from "../../redux/store";
import React, {ChangeEvent} from "react"
import s from './User.module.css'

export type UsersPropsType = {
    followUser: (id: number) => void
    users: Array<usersDataType>
    unFollowUser: (id: number) => void
    setUsers: (users: Array<usersDataType>) => void
}
export const Users = (props: UsersPropsType) => {
    if(props.users.length===0){
    props.setUsers([{
            id: 1,
            photoUrl:'https://klike.net/uploads/posts/2019-03/1551511784_4.jpg',
            name: 'Nastya',
            followed: true,
            status: 'student',
            location: {city: 'Minsk', country: 'Belarus'},
        },
        {id: 2, photoUrl:'https://klike.net/uploads/posts/2019-03/1551511784_4.jpg',
            name: 'Dima', followed: true, status: 'kitty', location: {city: 'Minsk', country: 'Belarus'},},
        {id: 3, photoUrl:'https://klike.net/uploads/posts/2019-03/1551511784_4.jpg',
            name: 'Olya', followed: false, status: 'sister', location: {city: 'Mogilev', country: 'Belarus'},},])}
    return (
        <div>
            {props.users.map(m => <div key={m.id}>
                <span>
                    <div><img src={m.photoUrl} className={s.userPhoto}/></div>
                    <div>{m.followed ? <button onClick={() => {
                            props.unFollowUser(m.id)
                        }}>Unfollow</button>
                        : <button onClick={() => {
                            props.followUser(m.id)
                        }}>Follow</button>}</div>
                </span>
                    <span>
                    <div>{m.name}</div>
                    <div>{m.status}</div>
                </span>
                    <span>
                    <div>{m.location.country}</div>
                    <div>{m.location.city}</div>
                </span>
                </div>
            )}
        </div>
    )
}