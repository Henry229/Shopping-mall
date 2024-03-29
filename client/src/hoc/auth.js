import React, { useEffect } from 'react';
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth } from '../_actions/user_action';

export default function (SpecificComponent, option, adminRoute = null) {
  //null    =>  아무나 출입이 가능한 페이지
  //true    =>  로그인한 유저만 출입이 가능한 페이지
  //false   =>  로그인한 유저는 출입 불가능한 페이지
  function AuthenticationCheck(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let user = useSelector(state => state.user)
    useEffect(() => {
      dispatch(auth())
        .then(async response => {
          console.log(response)
          //로그인하지 않은 상태
          if ( await !response.payload.isAuth) {
            if (option) {
                navigate('/login')
            }
          } else {
              //로그인 한 상태 
              if (adminRoute && !response.payload.isAdmin) {
                  navigate('/')
              } else {
                  if (option === false)
                      navigate('/')
              }
          }  
        })
    },[])
    return (
      <SpecificComponent {...props} user={user} />
    )
  }
  return AuthenticationCheck
}