import axios from "axios"

const instance = axios.create({
    baseURL: 'https://movie-master-pro-server-self.vercel.app'
})

const useAxios = ()=>{
return instance;
}

export default useAxios;