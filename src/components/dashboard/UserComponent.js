import React, {useEffect, useRef, useState} from 'react'
import UserService from "../../services/UserService";


function User() {

    const [listUser, setListUser] = useState({data: [], loading: false});
    const [updateData, setUpdateData] = useState(0);

    useEffect(() => {
        UserService.list()
            .then(res => {
                // if (res.status === 200) {
                    setListUser({
                        data: res.data,
                        loading: true
                     })
                // } else {
                //     setListUser({...listUser, loading: false})
                // }
            })
            .catch(err => {
                // setIsError({error: true, message: err.toString()})
                setListUser({...listUser, loading: false})
            })

    }, [updateData]);

    return (
        <div>
            <p>Users</p>
            <ul>
                {listUser.data.map((user)=>{
                    return(
                        <li>{user.name}</li>
                    );
                })}
            </ul>
        </div>
    );
}

export default User;