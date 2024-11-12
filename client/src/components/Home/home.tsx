import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { getUserData } from '../../redux/userSlice';

export default function home() {
    const { user } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    const userName = user? user.name: "";
    if(user){
        console.log("user",user);
    }

    // useEffect(() => {
    //     dispatch(getUserData());
    //   }, [dispatch]);
   
    
  return (
    <div>

        <p> Hello {userName}</p>
    </div>
  )
}
