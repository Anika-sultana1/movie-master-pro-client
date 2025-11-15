import axios from "axios"

const instance = axios.create({
    baseURL: 'https://movie-master-pro-server-hazel.vercel.app'
})

const useAxios = ()=>{
return instance;
}

export default useAxios;