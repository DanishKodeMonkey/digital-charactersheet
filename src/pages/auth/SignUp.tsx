import React, {useState} from 'react'
import {useNavigate} from "react-router-dom"
import { auth } from "../../services/api.ts"
import * as validator from "validator"


/* HUSKAT: Remember ot implement options to sign up with OAuth sources (google and discord) */
const SignUp: React.FC = () =>{
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    })
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setFormData({...formData, [e.target.name]: e.target.value})

    }

    const validateForm = () =>{
        // Validates all fields


        if(!validator.isLength(formData.username, {min: 3 })){
            setError("Username must be at least 3 characters long")
            return false;
        }
        if(!validator.isEmail(formData.email)){
            setError("invalid email address")
            return false
        }
        if(!validator.isStrongPassword(formData.password, {minLength: 6})){
            setError("Password must be at least 6 characters long")
            return false;
        }        
        setError(null);
        return true
    }

    const handleSubmit = async(e: React.FormEvent) =>{
        e.preventDefault()
        
        if(!validateForm()) return

        setLoading(true)
        try{
            await auth.signUp(formData.username, formData.email, formData.password)
            navigate("/auth/signin") // Redirect to sign in if successful
        }catch(err){
            setError(err.message)
        }finally{
            setLoading(false)
        }
    }

    return(
        <div className="container">
            <h1>Sign up</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text" name="username" value={formData.username} onChange={handleChange} required />

                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                {error && <p className="error">{error}</p>} {/* Show API error messages */}    

                <button type="submit" disabled={loading}>{loading ? "Signing up..." : "Sign up!"}</button>        
                </form>
                <p>Already have an account? <a href="/auth/signin">Sign in!</a></p>
        </div>
    )
}

export default SignUp;