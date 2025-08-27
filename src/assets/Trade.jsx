import React from 'react';
import { useParams } from 'react-router-dom';
import TradingViewWidget from './TradingViewWidget';

export default function Trade() {
    const { symbol } = useParams(); // Get the symbol from the URL

    return (
        <>
            <div className="h-screen  p-1">
                <div className="h-full flex gap-1 w-full">

                    {/* Left section */}
                    <div className="basis-3/4 flex flex-col gap-2 w-full p-1 h-full">
                        <div className="basis-1/12 bg-white rounded w-full h-full">

                        </div>
                        <div className="basis-4/5 rounded p-1 w-full h-full">
                            <TradingViewWidget symbol={symbol} />
                        </div>
                    </div>

                    {/* Right section */}
                    <div className="basis-1/4 fcen flex-col w-full p-1 gap-1 h-full">
                        <div className='border-b-[1px] px-3 gap-2 bg-white w-full h-full fcen rounded basis-1/12'>
                            <div className='basis-1/2 bg-black h-1/2 rounded'>cross

                            </div>
                            <div className='basis-1/2 bg-black h-1/2 rounded'>cross

                            </div>
                        </div>
                        
                        <div className='basis-6/12 rounded bg-white h-full w-full'>
                            <div></div>
                            <div className='flex flex-col px-3 h-1/5 gap-1'>
                                <label>order price</label>
                                <div className='fcen border-2 rounded h-full pl-2'>
                                    <input className='w-4/5 outline-none' type='text' placeholder='0'></input>
                                    <div>usdt</div>
                                </div>
                            
                            <div>
                                
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
