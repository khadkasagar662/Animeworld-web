import React from "react";
import { useEffect, useState, useRef } from "react";

import homeStyle from "Style/Home/home.module.scss";
import { Content } from "Components/Home/MainContent";
import { HomeExtraInformation } from "Components/Home/ExtraInformation";
import { HomeHeader } from "Components/Home/BigHeader";
import { Container } from "Style/EmotionComponents";
import { CustomHead } from "Components/Global/CustomHead";

export default function HomeMain() {
    const containerRef = useRef();
    const [isMotionEnabled, setIsMotionEnabled] = useState(
        typeof window !== "undefined" &&
        window?.matchMedia("(prefers-reduced-motion: reduce)").matches
    );

    useEffect(() => {
        setIsMotionEnabled(
            typeof window !== "undefined" &&
            window?.matchMedia("(prefers-reduced-motion: reduce)").matches
        );
    }, []);

    return (
        <>
            <CustomHead
                description={
                    "Discover Huge Library of Anime and see your favourite characters"
                }
                contentTitle={"Animeworld | Home of Anime"}
            />
            <div className={homeStyle["root-container"]}>
                <Container
                    ref={containerRef}
                    minHeight="108vh"
                    displyStyle="flex-center-hv"
                >
                    <Content isMotionEnabled={isMotionEnabled} />
                </Container>

                <HomeHeader />
                <HomeExtraInformation />
            </div>
        </>
    );
}
