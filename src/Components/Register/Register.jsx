
import { useNavigate } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import { toast, ToastContainer } from 'react-toastify';
import useAxios from '../../Hooks/useAxios';

const Register = () => {
  const axios = useAxios();
  const { setUser, createUser, updateUser } = useAuth()
  const navigate = useNavigate()

  const handleCreateUser = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photoUrl = e.target.photoUrl.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log('email or password', email, password)
    createUser(email, password)
      .then(result => {
        const user = result.user;

        updateUser({ displayName: name, photoURL: photoUrl })
          .then(() => {

            setUser({ displayName: name, photoURL: photoUrl })

            const newUser = {
              name: user.displayName,
              email: user.email
            }
            axios.post('/users', newUser)
              .then(data => {
                console.log(data)
                toast.success('Your Registration succeed. Welcome to Our Website!')
                navigate('/')
              })

          })


      })
      .catch(error => {
        console.log(error)
        toast.error('Registration failed!')
      })

  }

  return (
    <div className="hero bg-base-200 min-h-screen pt-20">
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="hero-content flex-col">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold mb-2">Create Your Account</h1>
          <p className="text-gray-500">Join us and explore the movie world!</p>
        </div>

        <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleCreateUser} className="space-y-4">
              {/* Name */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Full Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Photo URL */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Photo URL</span>
                </label>
                <input
                  type="text"
                  name="photoUrl"
                  placeholder="https://example.com/photo.jpg"
                  className="input input-bordered w-full"
                />
              </div>

              {/* Password */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <button type="submit" className="btn btn-neutral w-full mt-2">
                Register
              </button>

              <div className="divider">OR</div>

              {/* Google */}
              <button className="btn bg-white text-black border-[#e5e5e5] text-center w-[300px]">
                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                Login with Google
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;