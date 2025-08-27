import React, { useState, useContext } from "react";
import ChainModel from "./scom/Cmodel";
import ChainModel2 from "./scom/Cmodel2";
import TokenModal1 from "./Tmodel1";
import TokenModal2 from "./Tmodel2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { PriceContext } from '../data'; // Adjust the import path accordingly

export default function Bridge() {
    const { cryptoData } = useContext(PriceContext); // Get crypto data from context

    const [selectedChain, setSelectedChain] = useState();
    const [showChainModal, setShowChainModal] = useState(false);
    const [selectedChain2, setSelectedChain2] = useState();
    const [showChainModal2, setShowChainModal2] = useState(false);
    const [selectedToken1, setSelectedToken1] = useState();
    const [selectedToken2, setSelectedToken2] = useState();
    const [showTokenModal1, setShowTokenModal1] = useState(false);
    const [showTokenModal2, setShowTokenModal2] = useState(false);
    const [amountToken1, setAmountToken1] = useState('');
    const [amountToken2, setAmountToken2] = useState('');

    const navigate =useNavigate();

    const handleSelectChain = (chain) => {
        setSelectedChain(chain);
        setShowChainModal(false);
    };

    const handleSelectChain2 = (chain) => {
        setSelectedChain2(chain);
        setShowChainModal2(false);
    };

    const handleSelectToken1 = (token) => {
        setSelectedToken1(token);
        setShowTokenModal1(false);
        calculateAmount(token, amountToken1);
    };

    const handleSelectToken2 = (token) => {
        setSelectedToken2(token);
        setShowTokenModal2(false);
        calculateAmount(selectedToken1, amountToken1);
    };

    const calculateAmount = (token1, amount) => {
        if (token1 && selectedToken2) {
            const token1Price = token1.current_price; // Update to use current_price from context
            const token2Price = selectedToken2.current_price; // Update to use current_price from context
            const equivalentAmount = (amount * token1Price) / token2Price;
            setAmountToken2(equivalentAmount.toFixed(3));
        }
    };

    const handlebridge = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:3000/bridge", {
                selectedChain,
                selectedChain2,
                selectedToken1,
                selectedToken2,
                amountToken1,
                amountToken2,
            })
            .then((result) => console.log(result))
            .catch((err) => console.log(err));
    };

    return (
        <div className="fcen h-screen img">
            <div className="border- h-3/4 w-1/3 rounded-lg">
                <form onSubmit={handlebridge} className="grid grid-rows-7 gap-3 h-full p-16">
                    {/* Select Chain 1 */}
                    <div className="row-span-1 bgb border-1 rounded-xl flex pl-5">
                        <button onClick={() => setShowChainModal(true)} className="text-white h-full px-1 gap-1 flex fcen">
                            <div className="flex fcen gap-2">
                                {selectedChain ? (
                                    <>
                                        <img className="h-8 w-8" src={selectedChain.image} alt={selectedChain.text} />
                                        <p className="text-white">{selectedChain.text}</p>
                                    </>
                                ) : (
                                    <p className="text-white">Select Chain</p>
                                )}
                            </div>
                            <div className="h-3 w-4 fcen arrow"></div>
                        </button>
                        <ChainModel
                            show={showChainModal}
                            handleClose={() => setShowChainModal(false)}
                            handleSelectChain={handleSelectChain}
                        />
                    </div>

                    {/* Select Token 1 */}
                    <div className="row-span-2 bgb border-1 rounded-lg flex">
                        <div className="pl-7 py-4 flex flex-col justify-between h-full w-3/5">
                            <div className="h-2/3">
                                <input
                                    className="h-3/4 border-transparent outline-0 text-white text-2xl bgb w-full"
                                    type="text"
                                    placeholder="0"
                                    value={amountToken1}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setAmountToken1(value);
                                        calculateAmount(selectedToken1, value);
                                    }}
                                />
                            </div>
                            <div className="w-1/3">
                                <p className="text-xs font-normal text-slate-300">${(selectedToken1?.current_price * amountToken1).toFixed(2)}</p>
                            </div>
                        </div>
                        <div className="fcen w-2/5">
                            <button onClick={() => setShowTokenModal1(true)} className="text-white flex fcen gap-2 h-full px-1">
                                {selectedToken1 ? (
                                    <>
                                        <img className="h-8 w-8" src={`/logo/${selectedToken1.name.toLowerCase()}.png`}/>

                                        <span>{selectedToken1.name.toUpperCase()}</span>
                                    </>
                                ) : (
                                    <span>Select Token</span>
                                )}
                            </button>
                        </div>
                        <TokenModal1
                            show={showTokenModal1}
                            handleClose={() => setShowTokenModal1(false)}
                            handleSelectToken1={handleSelectToken1}
                            cryptoData={cryptoData} // Pass cryptoData directly
                        />
                    </div>

                    {/* Select Chain 2 */}
                    <div className="row-span-1 bgb border-1 rounded-xl flex pl-5">
                        <button onClick={() => setShowChainModal2(true)} className="text-white h-full px-1 gap-1 flex fcen">
                            <div className="flex fcen gap-2">
                                {selectedChain2 ? (
                                    <>
                                        <img className="h-8 w-8" src={selectedChain2.image} alt={selectedChain2.text} />
                                        <p className="text-white">{selectedChain2.text}</p>
                                    </>
                                ) : (
                                    <p className="text-white">Select Chain</p>
                                )}
                            </div>
                            <div className="h-3 w-4 fcen arrow"></div>
                        </button>
                        <ChainModel2
                            show={showChainModal2}
                            handleClose={() => setShowChainModal2(false)}
                            handleSelectChain2={handleSelectChain2}
                        />
                    </div>

                    {/* Select Token 2 */}
                    <div className="row-span-2 bgb border-1 rounded-lg flex">
                        <div className="pl-7 py-4 flex flex-col justify-between h-full w-3/5">
                            <div className="h-2/3">
                                <input
                                    className="h-3/4 border-transparent outline-0 text-white text-2xl bgb w-full"
                                    type="text"
                                    placeholder="0"
                                    value={amountToken2}
                                    onChange={(e) => setAmountToken2(e.target.value)}
                                />
                            </div>
                            <div className="w-1/3">
                                <p className="text-xs font-normal text-slate-300">${selectedToken2 ? selectedToken2.current_price.toFixed(2) : 'Select Token'}</p>
                            </div>
                        </div>
                        <div className="fcen w-2/5">
                            <button onClick={() => setShowTokenModal2(true)} className="text-white flex fcen gap-2 h-full px-1">
                                {selectedToken2 ? (
                                    <>
                                        <img className="h-8 w-8" src={`/logo/${selectedToken2.name.toLowerCase()}.png`}/>
                                        <span>{selectedToken2.name.toUpperCase()}</span>
                                    </>
                                ) : (
                                    <span>Select Token</span>
                                )}
                            </button>
                        </div>
                        <TokenModal2
                            show={showTokenModal2}
                            handleClose={() => setShowTokenModal2(false)}
                            handleSelectToken2={handleSelectToken2}
                            cryptoData={cryptoData} // Pass cryptoData directly if needed
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="row-span-1 fcen">
                         <button onClick={()=>navigate('/Swap1')} className="w-2/4 h-full bgb border-2 rounded-full text-white">
                                SWAP
                            </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
