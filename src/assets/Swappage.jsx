import React, {useState } from "react";
import ChainModel from "./scom/Cmodel";
import TokenModal1 from "./Tmodel1";
import TokenModal2 from "./Tmodel2";
import { useNavigate } from "react-router-dom";


export default function Swap() {
    const [selectedChain, setSelectedChain] = useState();
    const [selectedToken1, setSelectedToken1] = useState();
    const [selectedToken2, setSelectedToken2] = useState();
    const [showChainModal, setShowChainModal] = useState(false);
    const [showTokenModal1, setShowTokenModal1] = useState(false);
    const [showTokenModal2, setShowTokenModal2] = useState(false);
    const [amountToken1, setAmountToken1] = useState(); // State for Token 1 amount
    const [amountToken2, setAmountToken2] = useState(); // State for Token 2 amount

    const handleSelectChain = (chain) => {
        setSelectedChain(chain);
        setShowChainModal(false);
    };

    const handleSelectToken1 = (token) => {
        setSelectedToken1(token);
        setShowTokenModal1(false);
        calculateAmount(token, amountToken1); // Calculate equivalent amount for Token 2
    };

    const handleSelectToken2 = (token) => {
        setSelectedToken2(token);
        setShowTokenModal2(false);
        calculateAmount(selectedToken1, amountToken1); // Calculate equivalent amount for Token 2
    };
    const navigate =useNavigate();

    // Function to calculate equivalent Token 2 amount based on Token 1 amount and selected tokens
    const calculateAmount = (token1, amount) => {
        if (token1 && selectedToken2) {
            const token1Price = token1.current_price; // Update to use current_price from context
            const token2Price = selectedToken2.current_price; // Update to use current_price from context
            const equivalentAmount = (amount * token1Price) / token2Price;
            setAmountToken2(equivalentAmount.toFixed(3));
        }
    };
    

    return (
        <>
            <div className="fcen h-screen img">
                <div className="border-2 h-3/4 w-1/3 rounded-lg">
                    <div className="grid grid-rows-6 gap-3 h-full p-16">
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
                                            calculateAmount(selectedToken1, value); // Recalculate on input change
                                        }}
                                    />
                                </div>
                                <div className="w-1/3">
                                <p className="text-xs font-normal text-slate-300">${selectedToken1 ? selectedToken1.current_price.toFixed(2) : '0.00'}</p>
                                </div>
                            </div>
                            <div className="fcen w-2/5">
                                <button onClick={() => setShowTokenModal1(true)} className="text-white flex fcen gap-2 h-full px-1">
                                    {selectedToken1 ? (
                                        <>
                                            <img className="h-8 w-8" src={selectedToken1.image} alt={selectedToken1.text} />
                                            <span>{selectedToken1.text}</span>
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
                            />
                        </div>


                        <div className="row-span-2 bgb border-1 rounded-lg flex">
                            <div className="pl-7 py-4 flex flex-col justify-between h-full w-3/5">
                                <div className="h-2/3">
                                    <input
                                        className="h-3/4 border-transparent outline-0 text-white text-2xl bgb w-full"
                                        type="text"
                                        placeholder="0"
                                        value={amountToken2}
                                        readOnly // Making this field read-only as it auto-calculates
                                    />
                                </div>
                                <div className="w-1/3">
                                <p className="text-xs font-normal text-slate-300">${selectedToken2 ? selectedToken2.current_price.toFixed(2) : '0.00'}</p>
                                </div>
                            </div>
                            <div className="fcen w-2/5">
                                <button onClick={() => setShowTokenModal2(true)} className="text-white h-full flex fcen gap-2 px-1">
                                    {selectedToken2 ? (
                                        <>
                                            <img className="h-8 w-8" src={selectedToken2.image} alt={selectedToken2.text} />
                                            <span>{selectedToken2.text}</span>
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
                            />
                        </div>

                        <div className="row-span-1 fcen pt-2">
                            <button onClick={()=>navigate('/Swap1')} className="w-2/4 h-full bgb border-2 rounded-full text-white">
                                SWAP
                            </button>
                        </div>
                    </div>
                </div>
            </div>
    
        </>
    );
}
