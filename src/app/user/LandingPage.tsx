import React from "react"
import AboutSection from "@/components/section/AboutSection"
import ActivitySection from "@/components/section/ActivitySection"
import HeroSection from "@/components/section/HeroSection"
import { PromoBanner } from "@/components/section/PromoSection"

export const LandingPage = () => {
    return(
        <>
            <HeroSection/>
            <AboutSection/>
            <PromoBanner/>
            <ActivitySection/>
        </>
    )
}