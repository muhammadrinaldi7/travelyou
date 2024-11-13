"use client"

const HeroSection = () => {
  
    return (
        <>
        <section
                id="hero"
                className=" bg-background-light"
                style={{ backgroundImage: `url(/img/hero.webp)`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
                <div className="flex items-center max-w-screen-xl px-4 py-32 mx-auto">
                    <div className="max-w-xl mx-auto text-center">
                        <h1 className={`text-5xl font-tittle font-extrabold text-gray-800 md:text-7xl`}>
                        Explore More, Live More With <strong className="text-primary-300 font-travelyouu">TravelYouuu</strong>
                        </h1>

                        <p className="mt-4 sm:text-xl/relaxed">
                           Your Adventure, Your Way with <span className="font-travelyouu">TravelYouuu</span>
                        </p>

                        <div className="flex flex-wrap justify-center gap-4 mt-8">
                           <button className="p-4 font-bold text-white rounded-lg bg-primary-300 hover:bg-primary-100">Book Tour Now</button>
                        </div>
                    </div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className="shadow-primary-100"  viewBox="0 0 1440 320">
                    <path className="fill-gray-100"  fillOpacity="1" d="M0,160L40,170.7C80,181,160,203,240,197.3C320,192,400,160,480,160C560,160,640,192,720,181.3C800,171,880,117,960,117.3C1040,117,1120,171,1200,165.3C1280,160,1360,96,1400,64L1440,32L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path>
                </svg>
            </section>
    </>
    );
  };
  
  export default HeroSection;
  