import React from "react";

function Preloader() {
    let circleCommonClasses = 'h-2.5 w-2.5 bg-current   rounded-full';
    return (
        // // <section className="bg-white">
        // <div className="container flex items-center justify-center min-h-screen mx-auto">
        //     <div className="w-full max-w-md">
        //         <div
        //             className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        //             role="status">

        //         </div>
        //     </div>
        // </div>
        // // </section>

        <section className="bg-white dark:bg-gray-900">
            <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
                <div className="w-full max-w-md">
                    <div class="flex justify-center  md:justify-center">
                        <div
                            className="text-white inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                            role="status">
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
}
export default Preloader;

