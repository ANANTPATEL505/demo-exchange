import React, { useContext } from "react"; // Import useContext
import { PriceContext } from '../data'; // Import the context
import TradingViewWidget from './TradingViewWidget'; // Import the TradingViewWidget component

export default function Rank() {
    const { priceData, cryptoData, loading, error, tokenData } = useContext(PriceContext);

    if (loading) {
        return <div className="h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="h-screen">{error}</div>;
    }

    return (
        <div className="img p-36">
            <div className="rounded-xl flex-row px-3 w-full border-[3px]">
                {/* Header Row */}
                <div className="fcen w-full h-14 border-b-[3px] font-semibold text-white px-3 flex-row">
                    <div className="basis-1/12"># Rank</div>
                    <div className="basis-2/12">      Name</div>
                    <div className="basis-2/12">Price</div>
                    <div className="basis-2/12">24h %</div>
                    <div className="basis-2/12">Market Cap</div>
                    <div className="basis-2/12">Supply</div>
                    <div className="basis-3/12">            Charts</div>
                </div>

                {/* Display all tokens */}
                <div className="text-white h-full text-sm font-medium w-full px-3">
                    {cryptoData.map((coin, index) => {
                        // Remove the previous imageSrc definition
                        // const imageSrc = `/logo/${coin.name.toLowerCase()}.png`; 

                        const tokenSymbol = tokenData.find(token => token.name.toLowerCase() === coin.name.toLowerCase())?.symbol || '';

                        return (
                            <div key={index} className="mt-3">
                                {/* General Info */}
                                <div className="flex-row fcen h-28 border-b-[1px]">
                                    <div className="basis-1/12">        {index + 1}</div>
                                    <div className="basis-2/12 flex items-center">
                                        {/* Use coin.image directly */}
                                        <img src={coin.image} alt={coin.name} className="w-7 h-7 mr-3" />
                                        <div>
                                            {coin.name.charAt(0).toUpperCase() + coin.name.slice(1)}
                                        </div>
                                    </div>

                                    {/* Coin Price */}
                                    <div className="basis-2/12">
                                        {new Intl.NumberFormat('en-US', {
                                            style: 'currency',
                                            currency: 'USD',
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2
                                        }).format(
                                            priceData[index] ? (priceData[index] / 100000000).toFixed(2) : (coin.current_price).toFixed(2)
                                        )}
                                    </div>

                                    {/* 24h Change */}
                                    <div className={`basis-2/12 ${coin.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                        {coin.price_change_percentage_24h >= 0
                                            ? `+${coin.price_change_percentage_24h.toFixed(2)}%`
                                            : `${coin.price_change_percentage_24h.toFixed(2)}%`}
                                    </div>

                                    {/* Market Cap */}
                                    <div className="basis-2/12">
                                        {new Intl.NumberFormat('en-US', {
                                            style: 'currency',
                                            currency: 'USD',
                                            maximumFractionDigits: 0
                                        }).format(coin.market_cap)}
                                    </div>

                                    {/* Circulating Supply */}
                                    <div className="basis-2/12">
                                        {new Intl.NumberFormat('en-US').format(coin.circulating_supply)}
                                    </div>

                                    {/* Chart Section */}
                                    <div className="basis-3/12">
                                        {/* Pass the symbol from tokenData to TradingViewWidget */}
                                        <TradingViewWidget symbol={tokenSymbol} />
                                    </div>

                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
