import React from "react";
function Testimonials(){
    return(
        <div className="w-full py-[1rem] px-4 bg-white mx-auto">
            <div className="max-w-[1240px] mx-auto p-4 flex justify-center mb-4">
                <h1 className="md:text-4xl  sm:text-3xl text-2xl font-bold p-3 bg-[#00df9e] rounded-3xl">Testimonials</h1>
            </div>
            <div className="max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8">
                <div className="md:w-full w-[90%] mx-auto bg-[#ADD8E6] flex flex-col justify-center p-4 rounded-3xl hover:scale-105 duration-300 shadow-xl">
                    <p className="md:text-[1rem]">Mira Parent Pal has been a lifesaver! The personalized guidance and supportive community have made my parenting journey more enjoyable and less overwhelming.” - Sarah, proud parent</p>
                    <h2 className="text-2xl font-medium text-center py-4">Nami</h2>
                </div>
                <div className="md:w-full w-[90%] mx-auto bg-[#ADD8E6] flex flex-col justify-center p-4 rounded-3xl hover:scale-105 duration-300 shadow-xl">
                    <p className="md:text-[1rem]">I love how Mira provides evidence-based advice and connects me with experts. It's like having a trusted friend by my side.” - David, happy dad</p>
                    <h2 className="text-2xl font-medium text-center py-4">Luffy</h2>
                </div>
                <div className="md:w-full w-[90%] mx-auto bg-[#ADD8E6] flex flex-col justify-center p-4 rounded-3xl hover:scale-105 duration-300 shadow-xl">
                    <p className="md:text-[1rem]">This app, my 24/7 parenting ally, answers late-night questions and guides me through the challenges of motherhood, making it a game-changer for any new mom.</p>
                    <h2 className="text-2xl font-medium text-center py-4">Robin</h2>
                </div>
            </div>
        </div>
    )
}
export default Testimonials;