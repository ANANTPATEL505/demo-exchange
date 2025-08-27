import { useNavigate } from "react-router-dom";
export default function Homepage() {
    const navigate =useNavigate();

    const handleSymbolClick = async (symbol) => {
        try {
            // Simulate an API query (you can replace this with an actual API call)
            console.log(`Fetching data for ${symbol}...`);
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated delay

            // Redirect to Trade page with the selected symbol
            navigate(`/trade/${symbol}`);
        } catch (error) {
            console.error('Error fetching symbol data:', error);
        }
    };
    return (
        <div className="homepage">
            <div className="f-con px-28">
                <div className="text-white pt-28">
                    <h1 className="w-2/4 font-bold text-5xl pl-32 leading-tight">
                        Decentralized, Secure and Limitless  Welcome to the Future of Blockchain</h1>

                    <div className="pl-32  w-2/4 pt-12 gap-2 text-lg font-normal flex">
                        <div className="w-3/5">
                            <input className='w-64 h-12 rounded-sm px-3 text-white bg-transparent border-2 white' type="textbox" placeholder="Email address"></input>
                        </div>
                        <div className=" fcen pl-6 w-32 h-12 bg-white text-black  rounded-full">
                            <button type="submit">try</button>
                        </div>

                    </div>
                </div>

            </div>
            <div className="flex gap-2">
                <button onClick={() => handleSymbolClick("BINANCE:BTCUSDT")} className="p-2 bg-blue-500 text-white">
                    BTC/USDT
                </button>
                <button onClick={() => handleSymbolClick("BINANCE:ETHUSDT")} className="p-2 bg-green-500 text-white">
                    ETH/USDT
                </button>
                <button onClick={() => handleSymbolClick("BINANCE:BNBUSDT")} className="p-2 bg-orange-500 text-white">
                    BNB/USDT
                </button>
            </div>

        </div>

    )
}