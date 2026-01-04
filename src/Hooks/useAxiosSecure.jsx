
import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const instance = axios.create({
    baseURL: 'https://movie-master-pro-server-self.vercel.app'
})



const useAxiosSecure = () => {
    const { user, logOutUser } = useAuth();
const navigate = useNavigate();
    useEffect(() => {
    const requestInterceptors=   instance.interceptors.request.use((config) => {
            const token = user.accessToken
            if(token){
    
            config.headers.authorization = `Bearer ${token}`
            }
      
            return config
        })

const responseInterceptors =  instance.interceptors.response.use(res => {
return res;
}, err => {

const status = err.status;
if(status===401 || status === 403){
    logOutUser()
    .then( ()=>{
        navigate('/login')
    })
}

})

        return () => {
            instance.interceptors.request.eject(requestInterceptors)
            instance.interceptors.response.eject(responseInterceptors)
        }

    }, [user, navigate, logOutUser])


    return instance;

}
export default useAxiosSecure