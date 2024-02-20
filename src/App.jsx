import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import Movies from './Components/Movies/Movies';
import Details from './Components/Details/Details';
import Tvshows from './Components/Tvshows/Tvshows';
import People from './Components/People/People';
import About from './Components/About/About';
import Network from './Components/Network/Network';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Logout from './Components/Logout/Logout';
import Notfound from './Components/Notfound/Notfound';
import { Routes , Route,useNavigate , Navigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { useState ,useEffect } from 'react';
import TrendingContextProvider from './Store';


function App() {
  let [userData,setuserData] = useState(null);
  let navigate = useNavigate();

  function saveUserData(){
    let encodedToken = localStorage.getItem('userToken');
    let decodedToken = jwtDecode(encodedToken);
    setuserData(decodedToken)
  }
  useEffect(() => {
    if(localStorage.getItem('userToken')!=null){
      saveUserData();
    }
  }, [])
  function ProtectedRoute(props){
    if(localStorage.getItem('userToken')==null){
      return <Navigate to="/login" />
    }else{
      return props.children
    }
  }
  function logout(){
    localStorage.removeItem('userToken');
    setuserData(null);
    navigate('/login')

  }
  return (
    <div className="App">
      <Navbar userData={userData} logout={logout} />
      <div className="container">
      <TrendingContextProvider>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/Home' element={<Home />}></Route>
            <Route path='/movies' element={<Movies />}></Route>
            <Route path='/tvshows' element={<Tvshows />}></Route>
            <Route path='/people' element={<People />}></Route>
            <Route path='/details' element={<Details />}></Route>
            <Route path='/about' element={<About />}></Route>
            <Route path='/network' element={<Network />}></Route>
            <Route path='/login' element={<Login saveUserData={saveUserData} />}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/logout' element={<Logout />}></Route>
            <Route path='/notfound' element={<Notfound />}></Route>
            <Route path='*' element={<Notfound />}></Route>
          </Routes>
      </TrendingContextProvider>
      </div>
    </div>
  );
}

export default App;
