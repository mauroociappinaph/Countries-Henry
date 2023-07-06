import './App.css';
import {Route, Routes} from "react-router-dom"
import LandingPage from './Components/LandingPage/LandingPage';
import Home from './Components/Home/Home';
import FormPage from './Components/FormPage/FormPage';
import DetailPage from './Components/DetailPage/DetailPage';
import Error from './Components/Error/Error';
  
function App() {
  
  return (
    <div className="App">
      <Routes>
        <Route exact path= "/" element = {<LandingPage/>}/>
        <Route path= "/home" element = {<Home/>}/>
        <Route path= "/activities" element= {<FormPage/>}/>
        <Route path= "/countries/:id" element= {<DetailPage/>}/>
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;