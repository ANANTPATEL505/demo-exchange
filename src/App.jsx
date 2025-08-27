import './App.css';
import Navbar from './assets/Navbar';
import Homepage from './assets/homepage';
import Swap from './assets/Swappage';
import Login from './assets/Login';
import Reg from './assets/Reg';
import Bridge from './assets/bridge';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Rank from './assets/Rank';
import Data from './data'; // Import the Data component
import Test from './assets/TradingViewWidget';
import Swap1 from './assets/scom/Swap1';
import Trade from './assets/Trade';
import Admin from './assets/Admin';
import Temp from './assets/temp';
import Temp2 from './assets/temp2';


function App() {
  return (
    <Data> {/* Wrap your app with the Data context provider */}
      <BrowserRouter> {/* Move BrowserRouter to wrap Navbar and Routes */}
        <div className="app">
          <div className='img'>
            <Navbar /> {/* Navbar is now inside BrowserRouter */}
            <Routes>
              <Route index element={<Homepage />} />
              <Route path="/swap" element={<Swap />} />
              <Route path="/login" element={<Login />} />
              <Route path="/bridge" element={<Bridge />} />
              <Route path="/test" element={<Test />} />
              <Route path="/rank" element={<Rank />} />
              <Route path="/reg" element={<Reg />} />
              <Route path="/swap1" element={<Swap1 />} />
              <Route path="/add" element={<Admin />} />
              <Route path="/trade/:symbol" element={<Trade />} />
              <Route path="/temp" element={<Temp />} />
              <Route path="/temp2" element={<Temp2 />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </Data>
  );
}

export default App;
