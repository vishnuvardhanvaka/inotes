import React from "react";
import pguide from '../assets/pguide.svg'
import expertAdvice from '../assets/expertAdvice.svg'
import csupport from '../assets/csupport.svg'
import resources from '../assets/resources.svg'
function OurServices(){
    return(
        <div className="w-full py-[5rem] px-4 bg-white mx-auto">
            <div className="max-w-[1240px] mx-auto p-4 flex justify-center mb-4">
                <h1 className="md:text-4xl  sm:text-3xl text-2xl font-bold p-3 bg-[#00df9e] rounded-3xl">Our Services</h1>
            </div>
            <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
                <img className="w-[350px] mx-auto my-4" src={pguide}  alt="/" />
                <div className="flex flex-col justify-center">
                    <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold py-2">Personalized Guidance</h1>
                    <p className="md:text-[1rem] text-left p-0 m-0">With Mira Parent Pal, you'll receive personalized guidance that is tailored to your specific needs. Our intelligent chatbot, Mira, takes into account your preferences, concerns, and parenting style to provide you with customized recommendations and support. Whether you're looking for newborn care tips, sleep training strategies, or advice on toddler development, Mira is here to guide you every step of the way.</p>
                </div>
            </div>
            <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
                <img className="w-[350px] mx-auto my-4" src={expertAdvice}  alt="/" />
                <div className="flex flex-col justify-center md:order-first">
                    <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold py-2">Expert Advice</h1>
                    <p className="md:text-[1rem] text-left p-0 m-0">Access the expertise of trusted professionals in the field of parenting through our platform. We have a network of experienced pediatricians, lactation consultants, child psychologists, and other specialists who provide evidence-based advice and insights. Get answers to your burning questions, learn about best practices, and stay informed about the latest research and trends in parenting.</p>
                </div>
                
            </div>
            <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
                <img className="w-[350px] mx-auto my-4" src={csupport}  alt="/" />
                <div className="flex flex-col justify-center">
                    <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold py-2">Supportive Community</h1>
                    <p className="md:text-[1rem] text-left p-0 m-0">Parenthood can sometimes feel overwhelming, but you're not alone. Join our vibrant community of parents who understand the ups and downs of raising children. Connect with other like-minded parents, share your experiences, and seek support and encouragement. Our community is a safe and inclusive space where you can build meaningful connections and find solace in knowing that others are going through similar journeys.</p>
                </div>
            </div>
            <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
                <img className="w-[350px] mx-auto my-4" src={resources}  alt="/" />
                <div className="flex flex-col justify-center md:order-first">
                    <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold py-2">Resources and Tools</h1>
                    <p className="md:text-[1rem] text-left p-0 m-0">We provide a wide range of valuable resources and tools to equip you with the knowledge and tools you need as a parent. Explore our library of articles, guides, and videos on various parenting topics, including baby care, child development, nutrition, and more. Additionally, take advantage of our interactive tools, such as growth trackers, milestone checklists, and development games, to actively participate in your child's growth and development.</p>
                </div>
                
            </div>
        </div>
    )
}
export default OurServices;