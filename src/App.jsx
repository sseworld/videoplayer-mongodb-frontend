import { useContext, useState } from 'react';
// import ScriptTag from 'react-script-tag'

import { Navigate, Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import "../src/assets/main.css"

// Context Import
import { DarkModeContext } from './context/DarkModeContext';
import { AuthContext } from './context/authContext';

// Pages Import
import Sidebar from './components/jsx/Sidebar';
import Try from './components/jsx/Try';
import Header from './components/jsx/Header';
import Footer from './components/jsx/Footer';
import About from './components/jsx/About';
import Login from './pages/jsx/Login/Login';
import Register from './pages/jsx/Register/Register';
import Contact from './pages/jsx/Contact';
import Teacher from './pages/jsx/Teacher';
import Courses from './pages/jsx/Courses';
import ViewTeachers from './pages/jsx/ViewTeachers';
import Home from './pages/jsx/Home';
import PlayDetails from './pages/jsx/PlayDetails';
import Watch from './pages/jsx/Watch';
import Profile from './pages/jsx/Profile';
import TotalPlaylist from './pages/jsx/TotalPlaylist';
import TotalLikes from './pages/jsx/TotalLikes';

function App() {

  const [ activeMenu, setActiveMenu ] = useState(null);
  const { darkMode } = useContext(DarkModeContext);
  const queryClient = new QueryClient();
  const { currentUser } = useContext(AuthContext);
  const [ menuOpenV, setMenuOpenV ] = useState(false)

  const Layout = () =>{
    return(
      <QueryClientProvider client={queryClient} >
        <div className={`theme-${darkMode ? "dark" : "light"}`}>
          <Header setMenuOpenV={setMenuOpenV} activeMenu={activeMenu} setActiveMenu={setActiveMenu}/>
          <Sidebar setMenuOpenV={setMenuOpenV} activeMenu={activeMenu} menuOpenV={menuOpenV} />
          <Outlet />
          <Footer />
        </div>
      </QueryClientProvider>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if(!currentUser){
      return <Navigate to="/login" />
    };

    return children;
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute><Layout /></ProtectedRoute>,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/Home",
          element: <Home />,
        },
        {
          path: "/About",
          element: <About />,
        },
        {
          path: "/Courses",
          element: <Courses />,
        },
        {
          path: "/Courses/:id",
          element: <PlayDetails />,
        },
        {
          path: "/watch/:id",
          element: <Watch />,
        },
        {
          path: "/Teacher",
          element: <Teacher />,
        },
        {
          path: "/Teacher/:id",
          element: <ViewTeachers />,
        },
        {
          path: "/Contact",
          element: <Contact />,
        },
        {
          path: "/Profile",
          element: <Profile />,
        },
        {
          path: "/Profile/Playlist",
          element: <TotalPlaylist />,
        },
        {
          path: "/Profile/Liked",
          element: <TotalLikes />,
        },
      ]
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />
    },
  ]);

  return (
    <>
    <RouterProvider router={router} />
    {/* <ScriptTag type="text/javascript" src="../src/assets/s1" /> */}
  </>
  )
}

export default App
