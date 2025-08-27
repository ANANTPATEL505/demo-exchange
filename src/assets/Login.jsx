
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Login() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();  // Fix case for preventDefault
        axios.post('http://localhost:3000/login', { email, pass })  // Fix missing protocol
            .then(result => {
                console.log(result)
                if (result.data === "success") {
                    navigate("/rank")
                }
            })
            .catch(err => console.log(err))
    }
    const navigate = useNavigate();

    return (
        <>
            <div className="fcen h-screen">
                <form onSubmit={handleSubmit} className=" border-2 h-3/5 w-1/4 rounded-lg p-4">
                    <div className=" fcen h-1/5 font-normal text-4xl pt-2 text-white">LOGIN</div>
                    <div className="flex flex-col justify-evenly h-3/6 px-2">
                        <div className="flex border-white border-b-2 justify-between">
                            <input className="logitem" type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Your email" />
                            <img className="relative h-7 w-7 " src="wired-outline-21-avatar-hover-jumping.png"></img>
                        </div>
                        <div className="flex border-white border-b-2 justify-between">
                            <input className="logitem" type="password" onChange={(e) => setPass(e.target.value)} placeholder="Your Password" />
                            <img className="relative h-7 w-7 pb-1 " src="unlock1.png"></img>
                        </div>

                    </div>
                    <div className="h-1/5 fcen">
                        <button className="w-3/5 font-medium h-3/5 rounded-full bg-white" type="submit" >LOGIN</button>
                    </div>

                    <div className="fcen pt-2 text-white gap-2">
                        <p>New Here?</p>
                        <button className="underline underline-offset-2" onClick={() => navigate('/reg')}>Create an Account</button>
                    </div>
                </form>
            </div>
        </>
    )
}