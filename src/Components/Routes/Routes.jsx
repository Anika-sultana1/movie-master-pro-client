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
            Component: PrivacyPollicy,
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
            Component: Cookie,
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
            Component: UpdateMovieDetails,
        },
        {
            path: '/movies/add',
            Component: AddMovie,
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
    element: <DashboardHome></DashboardHome>
  }
]);