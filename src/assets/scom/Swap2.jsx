import { useNavigate } from "react-router-dom"
export default function Swap2() {
    const navigate=useNavigate();
    return (
        <>
            <div className="h-screen img fcen">
                <div className=" h-1/2 w-1/2 text-white content flex justify-center font-bold text-6xl"> Tansaction Success
                    <button className="text-2xl fcen" onClick={()=>navigate('/swap')}>Back</button>
                </div>
            </div>
        </>
    )
}