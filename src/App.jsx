import { useEffect, useRef, useState } from 'react'
import {   createBrowserRouter,
  RouterProvider,
  Outlet, } from 'react-router-dom';

import Topnav from './components/Topnav/Topnav';
import Sidebar from './components/Sidebar/Sidebar';
import Search from './components/Search/Search';
import Footer from './components/Footer/Footer';
import Single from './components/Single/Single';
import Loader from './components/Loader/Loader';

import Home from './pages/Home/Home';
import Cooking from './pages/Cooking/Cooking';
import Resources from './pages/Resources/Resources';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';

import Profile from './pages/Profile/Profile';
import EditProfile from './pages/Profile/EditProfile';

import Order from './components/Order/Order';
import Cart from './components/Cart/Cart';

import { FaArrowUp } from 'react-icons/fa';
import SingleCooking from './pages/SingleCooking/SingleCooking';
import SingleRecipe from './pages/SingleRecipe/SingleRecipe';
import LoginForm from './pages/Auth/LoginForm';
import RegisterForm from './pages/Auth/RegisterForm';
import { UserContext } from './UserContext';
import Shop from './pages/Shop/Shop';
import Blogs from './pages/Blogs/Blogs';
import {ShareSocial} from 'react-share-social' 
import SingleBlog from './pages/SingleBlog/SingleBlog';
import NotFound from './pages/NotFound/NotFound';
import { readUser } from '../firebase';


const Layout = () => {
  const mainRef = useRef(null);
  const handleScroll = (e) => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
  })}
  return (
    <>
      <Topnav />
      <Search />
      <Single />
      <div className="main" ref={mainRef}>
        <Sidebar />
        <div className="page">
          <Outlet />
          <ShareSocial url ={window.location.href} socialTypes={['facebook','twitter','reddit','linkedin']} title={'share this page'} />
          <Footer />
        </div>
      </div>
      <button className="btn-top" onClick={() => handleScroll()} >
        <FaArrowUp/>
      </button>
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/shop",
        element: <Shop/>
      },
      {
        path: "/cooking",
        element: <Cooking/>
      },
      {
        path: "/cooking/:id",
        element: <SingleCooking/>
      },
      {
        path: "/blogs",
        element: <Blogs/>
      },
      {
        path: "/blogs/:id",
        element: <SingleBlog />
      },
      {
        path: "/resources",
        element: <Resources />
      },
      {
        path: "/about-us",
        element: <About/>
      },
      {
        path: "/contact-us",
        element: <Contact />
      },
      {
        path: "/recipes/:id",
        element: <SingleRecipe />
      },
      {
        path: "/cart",
        element: <Cart />
      },
    ]
  },
  {
    path: "/login",
    element: <LoginForm />
  },
  {
    path: "/get-started",
    element: <RegisterForm/>
  },
  {
    path: "/profile/:username",
    element:<Profile />
  },
  
  {
        path: "/profile/:username/edit",
        element: <EditProfile/>
  },
  {
    path: "*",
    element: <NotFound/>
  },
])

function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  
  function showNotification() {
    let notificationOptions = {
      body: 'Some Notification information',
      icon: '<img src=""/>'
    }
    let notif = new Notification('MyNutrition', notificationOptions);
  
    notif.onclick = () => {
      console.log('Notification clicked');
    }
  }

  function requestPermission() {
    console.log('Requesting permission...');
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
      }
    });
  }
  
  useEffect(() => {
    setTimeout(() =>{
      setLoading(!loading);
      //requestPermission();
      //showNotification();
    }, 1500);
  }, []);
  
  return (
    <UserContext.Provider value={{user, setUser}} >
      {
        loading && <Loader />
      }
      {!loading && <RouterProvider router={router} />}
    </UserContext.Provider>
  )
}

export default App