import React from "react";
import {
    useQueries,
    useQueryClient,
    QueryClient,
    dehydrate,
} from "react-query";
import axios from "axios";

import { StyledListCarousel } from "Components/Top/StyledListCarousel";
import { StyledMainHeader } from "Components/Top/StyledMainHeader";
import { StyledSection } from "Components/Top/StyledSection";
import { DifferentGenres } from "Components/Top/TopAnime/DifferentGenres";
import { jikanQueries } from "JikanQueries";
import topStyle from "Style/Top/top.module.scss";
import { TopFromlist } from "Components/Top/TopFromList";
import { useAuth } from "Feature/Authorize/Authorize";
import { getAllGenres } from "genres";
import { CustomHead } from "Components/Global/CustomHead";

function TopAnime({
    genres,
    currentlyAiringAnime,
    popularAnime,
    upcomingAnime,
}) {
    const [userData, _] = useAuth(true);

    return (
        <>
            <CustomHead
                description={"Discover Huge Library of Anime"}
                url={"topanime"}
                contentTitle={"Top Anime | Animeworld"}
            />
            <div className={topStyle["container-topsection"]}>
                <StyledMainHeader
                    content={{
                        text: ["AnIme", "WORLD"],
                        isanimateable: true,
                        subtext: "it's anime EVERYWHERE...",
                    }}
                />
                <div
                    className={`${topStyle["section"]} ${topStyle["section-1"]}`}>
                    <StyledSection
                        data={currentlyAiringAnime}
                        switch_details={"anime"}
                        text_={"Top Airing"}
                        headerColor={"#9579f0"}
                        subHeadingText={"Latest toppers"}
                    />
                    <div
                        className={`${topStyle["anime-character"]} ${topStyle["character-1"]}`}>
                        <img src={"/AnimeCharacter1.png"} alt="" />
                    </div>
                    <div
                        className={`${topStyle["custom-shape-divider-bottom-1668163489"]} ${topStyle["custom-shape-divider"]}`}>
                        <svg
                            data-name="Layer 1"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 1200 120"
                            preserveAspectRatio="none">
                            <path
                                d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                                class={topStyle["shape-path-1"]}></path>
                        </svg>
                    </div>
                </div>
                <div
                    className={`${topStyle["section"]} ${topStyle["section-2"]}`}>
                    <StyledSection
                        data={upcomingAnime}
                        switch_details={"anime"}
                        text_={"Top Upcoming"}
                        headerColor={"#d9a3ee"}
                        subHeadingText={"Something to look forward too"}
                    />
                    <div
                        className={`${topStyle["custom-shape-divider-bottom-1668170175"]} ${topStyle["custom-shape-divider"]}`}>
                        <svg
                            data-name="Layer 1"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 1200 120"
                            preserveAspectRatio="none">
                            <path
                                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                                className={topStyle["shape-path-2"]}></path>
                        </svg>
                    </div>
                    <div
                        className={`${topStyle["anime-character"]} ${topStyle["character-2"]}`}>
                        <img src={"/AnimeCharacter2.png"} alt="" />
                    </div>
                </div>
                <div
                    className={`${topStyle["section"]} ${topStyle["section-3"]}`}>
                    <StyledSection
                        data={popularAnime}
                        switch_details={"anime"}
                        text_={"Most Popular"}
                        headerColor={"#ec95bb"}
                        subHeadingText={"All time favorites"}
                    />
                </div>
                <div
                    className={`${topStyle["section"]} ${topStyle["section-5"]}`}>
                    <h2 className={topStyle["main-heading"]}>
                        From your inventory
                    </h2>
                </div>
                <div
                    className={`${topStyle["section"]} ${topStyle["section-6"]}`}>
                    <TopFromlist
                        switchLists={"anime"}
                        userId={userData?.userID}
                    />
                </div>
                <section
                    className={`${topStyle["section"]} ${topStyle["section-7"]}`}>
                    <DifferentGenres genres={genres} />
                </section>
            </div>
        </>
    );
}

export async function getStaticProps() {
    const client = new QueryClient();
    const genres = [...getAllGenres().keys()];
    try {
       

        const upcomingAnime = await client.fetchQuery(
            "upcoming_anime",
            () => jikanQueries("top_anime", null, ["upcoming", 1, 20]),
            { retry: 1 }
        );

        const currentlyAiringAnime = await client.fetchQuery(
            "airing_anime",
            () => jikanQueries("top_anime", null, ["airing", 1, 20]),
            { retry: 1 }
        );

        const popularAnime = await client.fetchQuery(
            "popular_anime",
            () => jikanQueries("top_anime", null, ["bypopularity", 1, 20]),
            { retry: 1 }
        );

        return {
            props: {
                upcomingAnime,
                popularAnime,
                currentlyAiringAnime,
                genres,
            },
            revalidate: 20,
        };
    } catch (error) {
        return {
            notFound: true,
        };
    }
}

export default TopAnime;
