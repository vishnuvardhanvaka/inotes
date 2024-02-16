import React from "react";
import introBaby from '../assets/introBaby.svg'
function Introduction(){
    return(
        <div className="w-full bg-white py-16 px-4">
            <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
                <img className="w-[500px] mx-auto my-4" src={introBaby}  alt="/" />
                <div className="flex flex-col justify-center">
                    
                    <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold py-2">Introducing iNotes</h1>
                    <p className="md:text-[1rem] text-left p-0 m-0">Welcome to Mira Parent Pal! We're on a mission to empower and support parents on their incredible journey of raising children. At Mira Parent Pal, we combine cutting-edge technology with heartfelt human connection to make parenting a joyful and stress-free experience.At Mira Parent Pal, we understand that being a parent is a remarkable and transformative experience. We are here to support you every step of the way, providing guidance, resources, and a supportive community.</p>
                    <button className="bg-black text-[#00df9e] w-[200px] rounded-md mx-auto md:mx-0 font-medium my-6 py-3">Get started</button>
                </div>
                
            </div>
        </div>
    )
}
export default Introduction;