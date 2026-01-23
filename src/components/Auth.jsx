import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  // sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../data/firebase";
import "../Auth.css";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleEmailAuth(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email.trim(), password);
      } else {
        await signInWithEmailAndPassword(auth, email.trim(), password);
      }
    } catch (err) {
      if (err.code === "auth/invalid-credential") {
        setError("Invalid email or password");
      } else if (err.code === "auth/email-already-in-use") {
        setError("This email is already registered. Try logging in.");
      } else if (err.code === "auth/weak-password") {
        setError("Password should be at least 6 characters");
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }

  // async function handleForgotPassword() {
  //   if (!email) {
  //     setError("Enter your email first to reset password.");
  //     return;
  //   }

  //   try {
  //     await sendPasswordResetEmail(auth, email.trim());
  //     setError("Password reset email sent. Check your inbox.");
  //   } catch (err) {
  //     if (err.code === "auth/user-not-found") {
  //       setError("No account found with this email.");
  //     } else if (err.code === "auth/invalid-email") {
  //       setError("Enter a valid email address.");
  //     } else {
  //       setError(err.message);
  //     }
  //   }
  // }


  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Trackmate</h1>
          <p>
            {isSignup
              ? "Lets quickly create your account!"
              : "Welcome back! Login to continue."}
          </p>
        </div>

        <form onSubmit={handleEmailAuth} className="auth-form">
          <label>
            Email
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label>
            Password
            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  // Eye Off
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a21.77 21.77 0 0 1 5.06-6.94" />
                    <path d="M1 1l22 22" />
                    <path d="M9.53 9.53a3.5 3.5 0 0 0 4.95 4.95" />
                    <path d="M14.47 14.47L9.53 9.53" />
                    <path d="M10.73 5.08A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a21.82 21.82 0 0 1-4.32 5.94" />
                  </svg>
                ) : (
                  // Eye
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
              
            </div>
          </label>

          {error && <div className="auth-error">{error}</div>}

          <button
            type="submit"
            className="primary-btn full-width"
            disabled={loading}
          >
            {loading
              ? isSignup
                ? "Signing up..."
                : "Logging in..."
              : isSignup
              ? "Sign up"
              : "Login"}
          </button>
        </form>
        
        {/* <div className="forgot-password">
          <span onClick={handleForgotPassword}>
            Forgot password?
          </span>
        </div> */}
        <div className="auth-footer">
          <p>
            {isSignup ? "Already have an account?" : "Don't have an account?"}
            <span
              className="auth-link"
              onClick={() => setIsSignup(!isSignup)}
            >
              {isSignup ?"Login" : "Sign up"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Auth;