import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import Home from "../Home/Home";
import AllMovies from "../AllMovies/AllMovies";
import MyCollection from "../MyCollection/MyCollection";
import ErrorPage from "../ErrorPage/ErrorPage";
import Login from "../Login/Login";
import Register from "../Register/Register";
import ViewDetails from "../ViewDetails/ViewDetails";
import UpdateMovieDetails from "../UpdateMovieDetails/UpdateMovieDetails";
import PrivateRoutes from "./PrivateRoutes";
import Watchlist from "../AllMovies/Watchlist";
import Services from "../ExtraSections/Services";
import Blog from "../ExtraSections/Blog";
import PrivacyPollicy from "../ExtraSections/PrivacyPollicy";
import AboutPlatform from "../AboutPlatform/About";
import Contact from "../ExtraSections/Contact";
import Cookie from "../ExtraSections/Cookie";
import Testimonial from "../ExtraSections/Testimonial";
import NewsLetter from "../ExtraSections/NewsLetter";
import DashboardHome from "../dashboard/DashboardHome";
import ProfileSettings from "../ProfileSettings";
import MovieManagement from "../MovieManagement";
import DashboardLayout from "../dashboard/DashboardLayout";
import MyMovies from "../myMovies/MyMovies";
import AdminRoutes from "./AdminRoutes";
import AddMovies from "../AddMovies/AddMovies";



export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
        {
            
            index:true,
            Component: Home,
        },
        {
            path: '/allmovies',
            Component: AllMovies,
        },
        {
            path: '/services',
            Component:Services,
        },
        {
            path: '/blogs',
            Component: Blog,
        },
        {
            path: '/privacy-policy',
            element: <PrivateRoutes><PrivacyPollicy></PrivacyPollicy></PrivateRoutes>,
        },
        {
            path: '/about',
            Component: AboutPlatform,
        },
        {
            path: '/contact',
            Component: Contact,
        },
        {
            path: '/testimonial',
            Component: Testimonial,
        },
        {
            path: '/news-letter',
            Component: NewsLetter,
        },
        {
            path: '/cookies',
            element: <PrivateRoutes><Cookie></Cookie></PrivateRoutes>,
        },
        {
            path: '/myCollection',
            element: <PrivateRoutes><MyCollection></MyCollection></PrivateRoutes>,
        },
        {
            path: '/myWatchlist',
            element: <PrivateRoutes><Watchlist></Watchlist></PrivateRoutes>,
        },
        {
            path: '/movies/update/:id',
            element: <PrivateRoutes><UpdateMovieDetails></UpdateMovieDetails></PrivateRoutes>,
        },
        {
            path: '/movies/add',
            element:<PrivateRoutes><AddMovies></AddMovies></PrivateRoutes>,
        },
        {
            path: '/movies/:id',
          element: <ViewDetails></ViewDetails>
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
  {
    
    path: 'dashboard',
    element: <DashboardLayout></DashboardLayout>,
    children: [
        {
            index:true,
            element:<DashboardHome></DashboardHome>,
        }
        ,
        {
            path: '/dashboard/profile-settings',
            element: <PrivateRoutes><ProfileSettings></ProfileSettings></PrivateRoutes>
        },
        {
            path: '/dashboard/my-movies',
            element: <PrivateRoutes><MyMovies></MyMovies></PrivateRoutes>
        },
        {
            path: '/dashboard/movie-management',
            element: <AdminRoutes><MovieManagement></MovieManagement></AdminRoutes>
        }
    ]
  }
]);