
import { useNavigate } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import { toast, ToastContainer } from 'react-toastify';

const Register = () => {

const {user, setUser,createUser} = useAuth()
const navigate = useNavigate()

const handleCreateUser=(e)=>{
e.preventDefault();
const email = e.target.email.value;
const password = e.target.password.value;
console.log('email or password', email, password)
createUser(email, password)
.then(result => {
  console.log(result.user)
  setUser(result.user)
  toast.success('Your Registration succeed. Welcome to Our Website!')
  navigate('/')
  
})
.catch(error => {
  console.log(error)
toast.error('Registration failed!')
})

}

    return (
              <div className="hero bg-base-200 min-h-screen">
                <ToastContainer></ToastContainer>
  <div className="hero-content flex-col ">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Login now!</h1>
    
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
     <form onSubmit={handleCreateUser}>
         <fieldset className="fieldset">
          <label className="label">Email</label>
          <input type="email" className="input" name='email' placeholder="Email" />
          <label className="label">Password</label>
          <input type="password" className="input" name='password' placeholder="Password" />
          <div><a className="link link-hover">Forgot password?</a></div>
          <button className="btn btn-neutral mt-4">Submit</button>
        </fieldset>
     </form>
      </div>
    </div>
  </div>
</div>
    );
};

export default Register;