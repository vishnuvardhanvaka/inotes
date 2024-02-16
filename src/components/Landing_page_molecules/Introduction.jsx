import React from "react";
import introBaby from '../assets/introBaby.svg'
import ai from '../assets/ai.jpg'
function Introduction(){
    return(
        <div className="w-full bg-white py-16 px-4">
            <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
                <img className="w-[500px] mx-auto my-4 rounded-3xl" src={ai}  alt="/" />
                <div className="flex flex-col justify-center">
                    
                    <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold py-2">Introducing iNotes</h1>
                    <p className="md:text-[1rem] text-left p-0 m-0">Welcome to our revolutionary all-in-one productivity platform! Our app combines powerful features designed to streamline your workflow, enhance productivity, and simplify your daily tasks. With intuitive navigation and a sleek interface, you can effortlessly manage your notes, documents, and tasks all in one place. Whether you're a student, professional, or entrepreneur, our app is your go-to solution for staying organized, productive, and on top of your game. Say goodbye to scattered files and endless searches – say hello to efficiency and peace of mind with our app. Welcome to the future of productivity.</p>
                    <button className="bg-black text-[#00df9e] w-[200px] rounded-md mx-auto md:mx-0 font-medium my-6 py-3">Get started</button>
                </div>
                
            </div>
        </div>
    )
}
export default Introduction;