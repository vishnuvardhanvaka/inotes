import React from "react";
import howitworksimg from '../assets/howitworks.svg'
function HowItWorks(){
    return(
        <div className="w-full bg-white py-16 px-4">
            <div className="max-w-[1240px] mx-auto p-4 flex justify-center mb-4">
                <h1 className="md:text-4xl  sm:text-3xl text-2xl font-bold p-3 bg-[#00df9e] rounded-3xl">What iNotes do?</h1>
            </div>
            <div className="max-w-[1240px] mx-auto grid">
                <img className="mx-auto my-4" src={howitworksimg} alt='/' />
                <div className="max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8">
                    <div className="md:w-full w-[85%] mx-auto bg-[#ADD8E6] flex flex-col justify-center p-4 rounded-3xl shadow-xl">
                        <h2 className="text-2xl font-medium text-center py-4">Step-1</h2>
                        <p className="md:text-[1rem]">Embark on your exciting parenting adventure by signing up for a free account and creating your personalized profile. Join our vibrant community of parents who are eager to connect, learn, and grow together.</p>
                        
                    </div>
                    <div className="md:w-full w-[85%] mx-auto bg-[#ADD8E6] flex flex-col justify-center p-4 rounded-3xl shadow-xl">
                        <h2 className="text-2xl font-medium text-center py-4">Step-2</h2>
                        <p className="md:text-[1rem]">Unleash the power of connection as you engage with Mira, our extraordinary chatbot companion, who will guide and support you through your unique parenting adventure.</p>
                        
                    </div>
                    <div className="md:w-full w-[85%] mx-auto bg-[#ADD8E6] flex flex-col justify-center p-4 rounded-3xl shadow-xl">
                        <h2 className="text-2xl font-medium text-center py-4">Step-3</h2>
                        <p className="md:text-[1rem]">Ignite your parenting prowess as you unlock a treasure trove of expert advice, invaluable resources, and a vibrant community of passionate and compassionate parents just like you.</p>
                        
                    </div>
                </div>

            </div>
        </div>
    )
}
export default HowItWorks;