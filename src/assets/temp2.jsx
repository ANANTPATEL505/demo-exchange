import React, { useState } from "react";
import { ethers } from "ethers";

const UNISWAP_ROUTER = "0xE592427A0AEce92De3Edee1F18E0157C05861564"; // Uniswap V3
const USDC = "0xaf88d065e77c8cC2239327C5EDb3A432268e5831"; // USDC (Arbitrum)
const ARBITRUM_CHAIN_ID = 42161;

export default function UniswapSwap() {
  const [wallet, setWallet] = useState(null);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask not installed");
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const network = await provider.getNetwork();

    if (network.chainId !== ARBITRUM_CHAIN_ID) {
      alert("Please switch to Arbitrum");
      return;
    }

    const address = await signer.getAddress();
    setWallet({ provider, signer, address });
  };

  const swapETHForUSDC = async () => {
    if (!wallet) return alert("Connect wallet first");

    const abi = [
      "function exactInputSingle(tuple(address tokenIn,address tokenOut,uint24 fee,address recipient,uint256 deadline,uint256 amountIn,uint256 amountOutMinimum,uint160 sqrtPriceLimitX96)) payable returns (uint256 amountOut)"
    ];

    const router = new ethers.Contract(UNISWAP_ROUTER, abi, wallet.signer);
    const deadline = Math.floor(Date.now() / 1000) + 300; // 5 min
    const amountIn = ethers.parseEther("0.0001");

    const params = {
      tokenIn: ethers.ZeroAddress,
      tokenOut: USDC,
      fee: 500, // 0.05%
      recipient: wallet.address,
      deadline,
      amountIn,
      amountOutMinimum: 0n,
      sqrtPriceLimitX96: 0n,
    };

    try {
      const tx = await router.exactInputSingle(params, {
        value: amountIn,
        gasLimit: 300000,
      });

      console.log("Swap tx sent:", tx.hash);
      await tx.wait();
      alert("Swap complete!");
    } catch (err) {
      console.error("Swap error:", err);
      alert("Swap failed (see console).");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h3>Swap ETH → USDC (Arbitrum)</h3>
      <button onClick={connectWallet}>
        {wallet ? `Connected: ${wallet.address.slice(0, 6)}...` : "Connect Wallet"}
      </button>
      <br /><br />
      <button onClick={swapETHForUSDC} disabled={!wallet}>
        Swap 0.01 ETH to USDC
      </button>
    </div>
  );
}
