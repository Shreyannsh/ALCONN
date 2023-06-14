import './App.css';

import {Routes,Route} from 'react-router-dom'

import SideBar from './Compnents/SideBar/SideBar';
import Home from './Pages/Home/Home';
import Explore from './Pages/Explore/Explore';
import Bookmarks from './Pages/Bookmarks/Bookmarks';
import LikedPost from './Pages/LikedPost/LikedPost';
import LandingPage from './Pages/LandingPage/LandingPage';
import { useContext, useState } from 'react';
import { authContext } from './Context/authContext/authContext';


function App() {

  const {isLogin} = useContext(authContext);
 
  return (
    <div className="App">

      
     { isLogin ?
       <div className='mainPage'>
        <div> <SideBar /></div>
        <Routes>
          <Route path='/home' element={ <Home />}/>
          <Route path='/explore' element={<Explore />} />
          <Route path ='/bookmarks' element={<Bookmarks />} />
          <Route path='/likedpost' element={< LikedPost/>} />
        </Routes>
        </div>
       : <LandingPage />
      }
     
     
      
      
  

      
    </div>
  );
}

export default App;