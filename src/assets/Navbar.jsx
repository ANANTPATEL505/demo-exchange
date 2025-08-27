import React from 'react'
import { Link } from 'react-router-dom';
export default function Navbar(){

return(
    <div className="text-white h-[52px] w-full flex  backdrop-blur-sm justify-between px-5">
      <div className='flex  gap-x-14'>
          <div className="h-9 w-[82px] mb-[15px]"><Link to="/">
          <img src="" className="logo" alt="home" />
          </Link>
          
          </div>
          
          <div className='flex'>
            <ul className='flex items-center  gap-4 text-white '>

             <li>Markets</li>
              
              <li className='nav-com flex items-center h-[52px]'>
                <button className="dropdown" data-bs-toggle="collapse" aria-expanded="true" aria-current="true">Buy crypto</button>
                <span className='arrow'></span>

                <div className="dropdown-menu img mt-[195px]">
                  <a className="dropdown-item " href="/">P2P</a>
                  <p className='nav-dtx h-5'>Buy/Sell with zero trading fees via 100+ payment methods</p>
                  <span className='text-sm text-white px-2'>________________________________</span>
                  <a className="dropdown-item" href="/">Express Buy</a>
                  <p className='nav-dtx'>Visa, Mastercard and others</p>
                </div>

              </li>   

              <li className='nav-com flex items-center h-[52px]'>
                <button className="dropdown" data-bs-toggle="collapse" aria-expanded="true" aria-current="true">Trade</button>
                <span className='arrow'></span>

                <div className="dropdown-menu img mt-[197px]">
                  <a className="dropdown-item" href="trade/BINANCE:BTCUSDT">Spot</a>
                  <p className='nav-dtx h-2'>Buy and sell crypto with ease</p>
                  <span className='text-sm text-white px-2'>________________________________</span>
                  <a className="dropdown-item" href="/">USD M-Futures</a>
                  <p className='nav-dtx'>Trade perpetual and expiry futures with leverage</p>
                </div>
              </li>

              <li >
              <Link to="/swap">Swap</Link>
              </li>
              <Link to="/bridge">Bridge</Link>
              <li>
              <Link to="/learn">learn</Link>
              </li>
              <li>
              <Link to="/rank">Ranking</Link>
              </li>
            </ul>
          
          </div>
      </div>
          <div className='fcen gap-3'>
          <Link to="/reg">Sign UP</Link>
            <span className='text-xl'>|</span>
            <Link to="/login">Log IN</Link>
          </div>  
    </div>
)}