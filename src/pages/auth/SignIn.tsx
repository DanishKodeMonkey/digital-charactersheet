import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { auth } from "../../services/api.ts";
import { z } from "zod";

// Validation schema
// HUSKAT update to include validation for oauth when implemented
const signInSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const SignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<
    { [key: string]: string | null }
  >({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Updates form state, and clears validation errors until a neww one occours
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setValidationErrors({ ...validationErrors, [e.target.name]: null });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setError(null);

    // Validate current state of formData using zod validation
    const result = signInSchema.safeParse(formData);
    if (!result.success) {
      // Creates newErrors object, inserts error messages from validation, updates validationError state
      const newErrors: { [key: string]: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path.length > 0) {
          newErrors[err.path[0]] = err.message;
        }
      });
      setValidationErrors(newErrors);
      return; // End on validation error
    }

    // Validation success
    // Starts process to send authentication post to API
    setLoading(true);
    try {
      const response = await auth.signIn(formData.email, formData.password);
      localStorage.setItem("access_token", response.access_token);
      localStorage.setItem("refresh_token", response.refresh_token);
      navigate("/home");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
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
        {error && <p className="error">{error}</p>} {/* Submit error */}
        <button
          type="submit"
          disabled={loading || Object.keys(validationErrors).length > 0}
        >
          {loading
            ? "Signing in..."
            : Object.keys(validationErrors).length > 0
            ? "Changes required "
            : "Sign In"}
        </button>
      </form>
      <p>
        Don't have an account? <a href="/auth/signup">Sign up!</a>
      </p>

      {/* HUSKAT: Implement Oauth logic */}
      <button onClick={() => alert("Coming soon")} className="oath-btn">
        Sign in with Google
      </button>
      <button onClick={() => alert("Coming soon")} className="oath-btn">
        Sign in with Discord
      </button>
    </div>
  );
};

export default SignIn;
