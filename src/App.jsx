
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Movies from './Components/Movies/Movies';
import Trending from './Components/Trending/Trending';
import Discover from './Components/Discover/Discover';
import MovieDetails from "./Components/MovieDetails/MovieDetails";
import GetStarted from "./Components/GetStarted/GetStarted"
import Login from './Components/Login/Login';
import Search from './Components/Search/Search';
import Watchlist from './Components/Watchlist/Watchlist';


const router = createBrowserRouter([{
  path: "/", element: <Layout />,
  children: [
    {index: true, element: <Home />},
    {path: "home", element: <Home />},
    {path: "movies", element: <Movies />},
    { path: "movie/:id", element: <MovieDetails /> },
    {path: "discover", element: <Discover />},
    {path: "trending", element: <Trending/>},
    {path: "getstarted", element: <GetStarted />},
    {path: "login", element: <Login />},
    {path: "/search", element: <Search />},
    {path: "/watchlist", element: <Watchlist />},
    
  ]
}
]);


export function App() {



  return <RouterProvider router={router} />;
}

export default App
