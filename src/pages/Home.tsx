import React from 'react'
import { useAuth } from "../context/authentication/AuthContext.tsx";

const Home = () =>{
    const { isAuthenticated, user }= useAuth()

    return(
        <div>

                {user ? <h1>Welcome back to the charactersheet app, {user.username}!</h1> : <h1>Welcome to the charactersheet app</h1>}
                {isAuthenticated ? <h2><a href="/app">Continue to the app here.</a></h2> : <h2><a href="/auth">Please sign in to continue.</a></h2>}

  
        </div>
    )
}

export default Home;