import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './styles/style.css'
import Passengers from './pages/Passengers';
import AddPassenger from './pages/AddPassenger';
import UpdatePassenger from './pages/UpdatePassenger';
import Destinations from './pages/Destinations';
import UpdateDestination from './pages/UpdateDestination';
import AddDestination from './pages/AddDestination';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Destinations></Destinations>}></Route>
          <Route path='/addDestination' element={<AddDestination></AddDestination>}></Route>
          <Route path='/updateDestination/:id' element={<UpdateDestination></UpdateDestination>}></Route>
          <Route path='/Passengers/:id' element={<Passengers></Passengers>}></Route>
          <Route path='/addPassenger/:id' element={<AddPassenger></AddPassenger>}></Route>
          <Route path='/updatePassenger/:id' element={<UpdatePassenger></UpdatePassenger>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
