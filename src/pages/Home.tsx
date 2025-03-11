import React from 'react'
import { Navigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth.ts";

const Home = () =>{
    const isAuthenticated = useAuth();

    if(isAuthenticated) return <Navigate to="/app" />


    return(
        <div>
            <h1>Welcome to the Charactersheet app</h1>
            <a href="/auth">Please sign in, or sign up to continue</a>
        </div>
    )
}

export default Home;