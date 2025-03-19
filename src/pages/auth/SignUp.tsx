import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../services/api.ts";
import { z } from "zod";

// Validation schema
const signUpSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "password must be at least 6 characters long"),
});

/* HUSKAT: Remember ot implement options to sign up with OAuth sources (google and discord) */
const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<
    { [key: string]: string | null }
  >({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); // add input to form data
    setValidationErrors({ ...validationErrors, [e.target.name]: null }); // clear error on input change
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("click");
    
    e.preventDefault();
    setError(null);

    const result = signUpSchema.safeParse(formData);
    if (!result.success) {
      // extract errors for display
      const newErrors: { [key: string]: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path.length > 0) {
          newErrors[err.path[0]] = err.message;
        }
      });
      setValidationErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      await auth.signUp(formData.username, formData.email, formData.password);
      navigate("/auth/signin"); // Redirect to sign in if successful
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          {validationErrors.username && (
            <p className="error">{validationErrors.username}</p>
          )}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {validationErrors.email && (
            <p className="error">{validationErrors.email}</p>
          )}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {validationErrors.password && (
            <p className="error">{validationErrors.password}</p>
          )}
        </div>
        {error && <p className="error">{error}</p>}{" "}
        {/* Show API error messages */}

        <button
        className="btn border-2"
          type="submit"
          onSubmit={handleSubmit}
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign up!"}
        </button>
      </form>
      <p>
        Already have an account? <a href="/auth/signin">Sign in!</a>
      </p>

      {/* HUSKAT implement Oauth logic */}
      <button onClick={() => alert("Coming soon")} className="oauth-btn">
        Sign up with Google
      </button>
      <button onClick={() => alert("Coming soon")} className="oauth-btn">
        Sign up with Discord
      </button>
    </div>
  );
};

export default SignUp;
