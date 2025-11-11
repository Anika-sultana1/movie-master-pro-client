import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import Home from "../Home/Home";
import AllMovies from "../AllMovies/AllMovies";
import MyCollection from "../MyCollection/MyCollection";
import ErrorPage from "../ErrorPage/ErrorPage";
import Login from "../Login/Login";
import Register from "../Register/Register";
import ViewDetails from "../ViewDetails/ViewDetails";
import AddMovie from "../AddMovies/AddMovies";
import UpdateMovieDetails from "../UpdateMovieDetails/UpdateMovieDetails";



export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
        {
            
            index:true,
            path: '/',
            Component: Home,
        },
        {
            path: '/allmovies',
            Component: AllMovies,
        },
        {
            path: '/myCollection',
            Component: MyCollection,
        },
        {
            path: '/movies/update/:id',
            Component: UpdateMovieDetails,
        },
        {
            path: '/movies/add',
            Component: AddMovie,
        },
        {
            path: '/movies/:id',
            Component: ViewDetails,
        },
        {
            path: '/login',
            Component: Login,
        },
        {
            path: '/register',
            Component: Register,
        },
    ]
  },
]);