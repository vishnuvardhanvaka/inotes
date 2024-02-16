import React from "react";
function AboutUs(){
    return(
        <div className="w-full py-[1rem] px-4 bg-white mx-auto">
            <div className="max-w-[1240px] mx-auto p-4 flex justify-center mb-4">
                <h1 className="md:text-4xl  sm:text-3xl text-2xl font-bold p-3 bg-[#00df9e] rounded-3xl">About Us</h1>
            </div>
            <div className="max-w-[1240px] mx-auto grid my-5">
                <div className="flex flex-col justify-center">
                    <h1 className="md:text-3xl sm:text-3xl text-2xl py-2">Who We Are:</h1>
                    <p className=" md:text-[1rem] pl-2 text-left p-0 m-0">We are a team of passionate parents, tech enthusiasts, and child-rearing experts dedicated to revolutionizing the way parents navigate the ups and downs of parenting. With our expertise and innovative solutions, we aim to be your trusted partner in every step of your parenting adventure.</p>
                </div>
            </div>
            <div className="max-w-[1240px] mx-auto grid my-5">
                <div className="flex flex-col justify-center">
                    <h1 className="md:text-3xl sm:text-3xl text-2xl py-2">Our Vision:</h1>
                    <p className=" md:text-[1rem] pl-2 text-left p-0 m-0">At Mira Parent Pal, we envision a world where parents feel confident, supported, and inspired as they raise their children. We strive to create a community that celebrates the joys of parenthood, offers guidance through challenges, and fosters meaningful connections among parents.</p>
                </div>
            </div>
            <div className="max-w-[1240px] mx-auto grid my-5">
                <div className="flex flex-col justify-center">
                    <h1 className="md:text-3xl sm:text-3xl text-2xl py-2">Introducing Mira, Your Parenting Companion:</h1>
                    <p className=" md:text-[1rem] pl-2 text-left p-0 m-0">Meet Mira, your ultimate parenting companion. Mira is an intelligent chatbot powered by advanced artificial intelligence, designed to provide you with personalized guidance, expert advice, and a listening ear whenever you need it. With Mira by your side, you'll have access to a wealth of knowledge, parenting tips, and resources tailored to your unique needs.</p>
                </div>
            </div>
            <div className="max-w-[1240px] mx-auto grid my-5">
                <div className="flex flex-col justify-center">
                    <h1 className="md:text-3xl sm:text-3xl text-2xl py-2">Our Promise to You:</h1>
                    <p className=" md:text-[1rem] pl-2 text-left p-0 m-0">At Mira Parent Pal, we promise unwavering support, trusted expertise, and a sense of community throughout your parenting journey. Our goal is to make parenting a joyful experience, filled with confidence, love, and memorable moments. Join our community of like-minded parents, connect with others, share experiences, and find solace in knowing that you're not alone.</p>
                </div>
            </div>
        </div>
    )
}
export default AboutUs;