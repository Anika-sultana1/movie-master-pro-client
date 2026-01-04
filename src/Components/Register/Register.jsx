import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import bgImage from "../../assets/register-backround.jpg";
import FullScreenLoader from "../FullScreenLoader";

const Register = () => {
  const axios = useAxiosSecure();
  const { setUser, createUser, updateUser, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setError("");

    const name = e.target.name.value;
    const photoUrl = e.target.photoUrl.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (password.length < 6)
      return setError("Password must be at least 6 characters");
    if (!/[A-Z]/.test(password))
      return setError("Password must contain one uppercase letter");
    if (!/[a-z]/.test(password))
      return setError("Password must contain one lowercase letter");

    try {
      setLoading(true);

      const result = await createUser(email, password);
      const user = result.user;

      await updateUser({ displayName: name, photoURL: photoUrl });
      setUser({ ...user, displayName: name, photoURL: photoUrl });

      await axios.post("/users", {
        name,
        email: user.email,
        image: photoUrl,
      });

      toast.success("Registration successful. Welcome!");
      navigate("/");
    } catch (err) {
      setError("Registration failed. Please try again");
      toast.error("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      const result = await signInWithGoogle();
      const user = result.user;

      setUser(user);

      await axios.post("/users", {
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
      });

      toast.success("Registration successful. Welcome!");
      navigate("/");
    } catch {
      toast.error("Google sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen pt-16 flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <title>MOVIEMASTERpro | Sign Up</title>
      <div className="absolute inset-0 bg-black/60" />

      {loading && <FullScreenLoader />}

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-[380px] mt-8 mb-8 rounded-[24px] bg-black/85 backdrop-blur-xl p-6 text-white shadow-2xl"
      >
        {/* Header */}
        <div className="relative text-center mb-6">
          <h1 className="text-3xl font-semibold tracking-wide">
            Movie Master Pro
          </h1>
          <span className="absolute right-6 top-0 text-[10px] bg-emerald-300 text-black px-2 py-0.5 rounded-full">
            BETA
          </span>
          <p className="text-gray-400 text-sm mt-2">
            Create your account to continue
          </p>
        </div>

        <form onSubmit={handleCreateUser} className="space-y-4">
          {/* Name */}
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            className="w-full h-[44px] rounded-full bg-gray-800 px-4 text-sm outline-none focus:ring-2 focus:ring-emerald-300"
            required
          />

          {/* Email */}
          <input
            name="email"
            type="email"
            placeholder="Email address"
            className="w-full h-[44px] rounded-full bg-gray-800 px-4 text-sm outline-none focus:ring-2 focus:ring-emerald-300"
            required
          />

          {/* Photo URL */}
          <input
            name="photoUrl"
            type="text"
            placeholder="Photo URL"
            className="w-full h-[44px] rounded-full bg-gray-800 px-4 text-sm outline-none focus:ring-2 focus:ring-emerald-300"
          />

          {/* Password */}
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
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="text-sm text-gray-400 text-center mt-3">
          Already have an account?{" "}
          <Link to="/login" className="text-emerald-300 hover:underline">
            Login
          </Link>
        </p>

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
          <span className="text-sm">Sign up with Google</span>
        </button>
      </motion.div>
    </div>
  );
};

export default Register;
