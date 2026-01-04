import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import bgImage from "../../assets/login-bg.jpg";
import FullScreenLoader from "../FullScreenLoader";

const Login = () => {
  const { signInUser, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const formatError = (message) => {
    if (message.includes("auth/invalid-credential"))
      return "Invalid email or password";
    if (message.includes("auth/user-not-found"))
      return "No account found with this email";
    return "Something went wrong. Please try again";
  };

  const handleSignInUser = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { email, password } = e.target;

    signInUser(email.value, password.value)
      .then(() => {
        toast.success("Successfully Logged In");
        navigate("/");
      })
      .catch((err) => {
        const msg = formatError(err.message);
        setError(msg);
        toast.error(msg);
      })
      .finally(() => setLoading(false));
  };

  const handleGoogleSignIn = () => {
    setLoading(true);
    setError("");

    signInWithGoogle()
      .then(() => {
        toast.success("Successfully Logged In");
        navigate("/");
      })
      .catch((err) => {
        const msg = formatError(err.message);
        setError(msg);
        toast.error(msg);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <title>MOVIEMASTERpro | Login</title>
      {loading && <FullScreenLoader />}

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-[380px] rounded-[24px] bg-black/85 backdrop-blur-xl p-6 text-white shadow-2xl"
      >
        <div className="relative text-center mb-6">
          <h1 className="text-3xl font-semibold">Movie Master Pro</h1>
          <span className="absolute right-6 top-0 text-[10px] bg-emerald-300 text-black px-2 py-0.5 rounded-full">
            BETA
          </span>
        </div>

        <form onSubmit={handleSignInUser} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email address"
            className="w-full h-[44px] rounded-full bg-gray-800 px-4 text-sm outline-none focus:ring-2 focus:ring-emerald-300"
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full h-[44px] rounded-full bg-gray-800 px-4 text-sm outline-none focus:ring-2 focus:ring-emerald-300"
            required
          />

          {error && (
            <p className="text-red-400 text-xs text-center">{error}</p>
          )}

          <button
            disabled={loading}
            className="w-full h-[44px] rounded-full bg-emerald-300 text-black font-semibold disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <Link to="/register">
          <button className="mt-3 w-full h-[44px] rounded-full border border-emerald-300 text-emerald-300 hover:bg-emerald-300 hover:text-black transition">
            Sign Up
          </button>
        </Link>

        <div className="flex items-center gap-3 my-4 text-gray-400 text-sm">
          <div className="flex-1 h-px bg-gray-600" />
          or
          <div className="flex-1 h-px bg-gray-600" />
        </div>

        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full h-[44px] rounded-full border border-gray-600 flex items-center justify-center gap-2 hover:bg-gray-800 transition disabled:opacity-50"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            className="w-4 h-4"
          />
          <span className="text-sm">Sign in with Google</span>
        </button>
      </motion.div>
    </div>
  );
};

export default Login;
