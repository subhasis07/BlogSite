import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function Header() {
    const{userInfo,setUserInfo}=useContext(UserContext)
    useEffect(()=>{
        fetch('http://localhost:4000/profile',{
            credentials:'include',
        }).then(response =>{
            response.json().then(userInfo =>{
                setUserInfo(userInfo)
            })
        })
    },[])

    const username=userInfo?.username;
    function logout() {
        fetch('http://localhost:4000/logout', {
          credentials: 'include',
          method: 'POST',
        });
        setUserInfo(null);
    }
    return(
        <header>
            <Link to="/" className="logo">My Blog</Link>
            <nav>
                {username && (
                    <>
                        <Link to="/create">Create new Post</Link>
                        <a onClick={logout}>Logout ({username})</a>
                    </>
                )}
                {!username &&(
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
                
            </nav>
        </header> 
    )
}