"use client";
import Image from "next/image";

// src/components/LandingPage/PromoSection.tsx
const AboutSection = () => {
   
    return (
        <>
        <section id="about" className="relative min-h-screen overflow-hidden bg-gray-100">
            <div
               
                className="absolute inset-0 bg-cover md:bg-contain opacity-50 lg:scale-150 bg-center z-[1] bg-no-repeat"
            ></div>
            <div className="container relative z-20 px-10 py-16 mx-auto">
                <div className="flex flex-col items-center justify-center gap-10 px-6 py-10 rounded-lg md:flex-row bg-primary-300/75">
                    <div className="w-full p-3">
                        <h1 className="text-3xl font-normal text-accent-100 font-bigtittle">
                            Discover the World of Art and Culture with <span className="font-travelyouu">TravelYouuu</span>
                        </h1>
                        <h1 className="text-6xl font-bold text-white font-bigtittle">About Us</h1>
                        <p className="font-sans text-justify text-white">
                            At <span className="font-travelyouu">TravelYouuu</span>, we’re dedicated to curating travel experiences that immerse you in the
                            rich arts and vibrant cultures of destinations around the globe. From exploring the ancient
                            temples of Asia to experiencing the lively art scenes of Europe and Africa’s captivating
                            traditions, each tour is designed to bring you closer to the heart of every country’s heritage.
                            <br /><br />
                            Whether you’re a history buff, an art enthusiast, or simply curious about new cultures, our
                            tours offer unique, authentic encounters that leave a lasting impact. Don’t miss the chance to
                            embark on a journey that’s more than sightseeing—it’s a cultural immersion.
                            <br /><br />
                            Book now and enjoy a 15% discount on purchases from our partners for the first 50 travelers!
                        </p>
                    </div>
                    <div className="relative flex justify-center w-full p-3">
                            <>
                                <div className="absolute top-0 left-0 transform -translate-x-2 translate-y-10 md:hover:scale-110 drop-shadow-lg hover:z-30">
                                <Image
                                    src={`/img/hero.webp`}
                                    alt="Cultural Landscape 3"
                                    width={256}
                                    height={256}
                                    className="border-4 border-white rounded-lg shadow-lg"
                                    />
                                </div>
                                <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-8 md:hover:scale-110 drop-shadow-lg hover:z-30">
                                <Image
                                    src={`/img/hero.webp`}
                                    alt="Cultural Landscape 3"
                                    width={256}
                                    height={256}
                                    className="border-4 border-white rounded-lg shadow-lg"
                                    />
                                </div>
                                <div className="relative z-10 drop-shadow-lg md:hover:scale-110">
                                <Image
                                    src={`/img/hero.webp`}
                                    alt="Cultural Landscape 3"
                                    width={256}
                                    height={256}
                                    className="border-4 border-white rounded-lg shadow-lg"
                                    />
                                </div>
                            </>
                    </div>
                </div>
            </div>
        </section>
        {/* Additional content omitted for brevity */}
    </>
    );
  };
  
  export default AboutSection;
  