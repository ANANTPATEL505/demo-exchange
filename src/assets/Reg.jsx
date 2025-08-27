import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Reg() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();  // Fix case for preventDefault
        axios.post('http://localhost:3000/reg', { name, email, pass })  // Fix missing protocol
            .then(result => console.log(result))
            .catch(err => console.log(err));
        navigate('/login')
    };

    return (
        <>
            <div className="fcen h-screen">



                {/* Use onSubmit in the form */}
                <form onSubmit={handleSubmit} className=" border-2 h-4/6 w-1/4 rounded-lg p-4">
                    <div className="  felx justify-evenly h-4/6 px-2">
                        <div className="fcen h-1/5 font-normal text-4xl py-5 text-white">Register</div>
                        <div className=" flex flex-col my-4 gap-11">
                            <div className="flex  border-white border-b-2 justify-between">
                                <input className="logitem" type="text" onChange={(e) => setName(e.target.value)} placeholder="Your username" />
                                <img className="relative h-7 w-7" src="wired-outline-21-avatar-hover-jumping.png" alt="avatar" />
                            </div>

                            <div className="flex  border-white border-b-2 justify-between">
                                <input className="logitem" type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Your email" />
                                <img className="relative h-7 w-7 pb-1" src="unlock1.png" alt="email" />
                            </div>

                            <div className="flex  border-white border-b-2 justify-between">
                                <input className="logitem" type="password" onChange={(e) => setPass(e.target.value)} placeholder="Your Password" />
                                <img className="relative h-7 w-7 pb-1" src="unlock1.png" alt="password" />
                            </div>
                        </div>
                        <div className="h-1/4 fcen pt-4">
                            {/* Button should only have type="submit" */}
                            <button className="w-3/5 font-medium h-12 rounded-full bg-white" type="submit">Register</button>
                        </div>
                    </div>
                </form>
            </div>

        </>
    );
}
