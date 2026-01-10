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


  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleDemoLoginUser = ()=>{

    setEmail("rabeya@khatun.com")
    setPassword("Amirabeya")

  }
  const handleDemoLoginAdmin = ()=>{

    setEmail("admin@1.com")
    setPassword("Amiadmin")

  }

return (
  <div
    className="py-20 min-h-screen flex items-center justify-center bg-cover bg-center relative"
    style={{ backgroundImage: `url(${bgImage})` }}
  >
    <title>MOVIEMASTERpro | Login</title>
    {loading && <FullScreenLoader />}

    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="
        relative w-[380px] rounded-2xl
      
        backdrop-blur-xl
        p-6
        text-secondary
        shadow-2xl
      "
    >
      {/* Header */}
      <div className="relative text-center mb-6">
        <h1 className="text-3xl font-semibold text-highlight">
          Movie Master Pro
        </h1>
        <span className="
          absolute right-6 top-0 text-[10px]
          bg-primary text-black
          px-2 py-0.5 rounded-2xl
        ">
          BETA
        </span>
      </div>

      {/* Form */}
      <form onSubmit={handleSignInUser} className="space-y-4">
        <input
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          className="
            w-full h-[44px] rounded-2xl
     
            px-4 text-sm
            text-main
            placeholder:text-secondary
            outline-none
            focus:ring-2 focus:ring-primary
          "
          required
        />

        <input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="
            w-full h-[44px] rounded-2xl
          
            px-4 text-sm
            text-main
            placeholder:text-secondary
            outline-none
            focus:ring-2 focus:ring-primary
          "
          required
        />

        {error && (
          <p className="text-red-400 text-xs text-center">
            {error}
          </p>
        )}

<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  disabled={loading}
  className="
    w-full h-[44px] rounded-2xl
    bg-primary text-black
    font-semibold
    hover:bg-primary-100
    disabled:opacity-50
    transition-colors duration-300
  "
>
  {loading ? "Logging in..." : "Login"}
</motion.button>


      </form>

      {/* Sign up */}
<Link to="/register">
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="
      mt-3 w-full h-[44px] rounded-2xl
      border border-primary
      text-highlight
      bg-secondary
      hover:bg-primary-100
      hover:text-black
      transition-colors duration-300
    "
  >
    Sign Up
  </motion.button>
</Link>



      {/* Demo Login */}
<motion.button
  type="button"
  onClick={handleDemoLoginUser}
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="
    w-full h-[44px] rounded-2xl mt-2
    bg-dark
    text-secondary
    border border-primary/30
    hover:bg-primary-100
    hover:text-black
    hover:border-primary
    transition-all duration-300
  "
>
  Demo Login User
</motion.button>
      {/* Demo Login */}
<motion.button
  type="button"
  onClick={handleDemoLoginAdmin}
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="
    w-full h-[44px] rounded-2xl mt-2
    bg-dark
    text-secondary
    border border-primary/30
    hover:bg-primary-100
    hover:text-black
    hover:border-primary
    transition-all duration-300
  "
>
  Demo Login Admin
</motion.button>




      {/* Divider */}
      <div className="flex items-center gap-3 my-4 text-secondary text-sm">
        <div className="flex-1 h-px bg-dark" />
        or
        <div className="flex-1 h-px bg-dark" />
      </div>

      {/* Google */}
<motion.button
  onClick={handleGoogleSignIn}
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  disabled={loading}
  className="
    w-full h-[44px] rounded-2xl
    bg-dark
    flex items-center justify-center gap-2
    hover:bg-primary-100
    hover:text-black
    transition-colors duration-300
    disabled:opacity-50
  "
>
  <img
    src="https://www.svgrepo.com/show/475656/google-color.svg"
    className="w-4 h-4"
  />
  <span className="text-sm">Sign in with Google</span>
</motion.button>


    </motion.div>
  </div>
);

};

export default Login;
