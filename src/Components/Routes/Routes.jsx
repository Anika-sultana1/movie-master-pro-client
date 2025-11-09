import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import Home from "../Home/Home";
import AllMovies from "../AllMovies/AllMovies";
import MyCollection from "../MyCollection/MyCollection";
import ErrorPage from "../ErrorPage/ErrorPage";


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
        }
    ]
  },
]);