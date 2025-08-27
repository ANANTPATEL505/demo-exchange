
import {useState, useEffect } from "react";
import Web3 from "web3";
export default function Temp() {

    const [web3Api,setWeb3Api]=useState({
        provider:null,
        web3:null
    });

    const [account,setaccount]=useState(null);

    useEffect(() => {
        const loadprovider = async () => {
            let provider = null;
            if (window.ethereum) {
                provider = window.ethereum;
                try {
                    await provider.enable();
                } catch {
                    console.log("user is not allowed");
                }
            }else if(window.web3){
                provider=window.web3.currentprovider;

            }else if(!process.env.production){
                provider=new Web3.provider.httpprovider("http://localhost:7545");
            }

            setWeb3Api({
                web3 : new Web3(provider),
                provider,

            });

        };
        loadprovider();

    }, []);

    useEffect(()=>{
        const getaccount =async()=>{
            const account = await web3Api.web3.eth.getAccounts()
            setaccount(account[0])
        }
        web3Api.web3 && getaccount()
    },[web3Api.web3])
    
    return (
        <>
            <body class=" img ">

                <div class="card text-center">
                    <div class="card-header">Funding</div>
                    <div class="card-body">
                        <h5 class="card-title">Balance: ETH </h5>
                        <p class="card-text">
                            Account : {account ? account : "not conneted"}
                        </p>
                        {/* <button
            type="button"
            class="btn btn-success"
            onClick={async () => {
              const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
              });
              console.log(accounts);
            }}
          >
            Connect to metamask
          </button> */}
                        <div className="fcen gap-2">
                            <button type="button" class="btn btn-success " onClick={async () => {
                                const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
                                console.log(accounts);
                            }}>
                                connect to metamask
                            </button>

                            <button type="button" class="btn btn-success " onClick={""}>
                                Transfer
                            </button>

                            <button type="button" class="btn btn-primary " onClick={""}>
                                Withdraw
                            </button>
                        </div>
                    </div>
                    <div class="card-footer text-muted">Code Eater</div>
                </div>

            </body>
        </>

    )
}