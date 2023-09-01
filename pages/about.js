import { AnyIcons } from "Components/Global/AnyIcons/AnyIcons";
import { CustomHead } from "Components/Global/CustomHead";
import aboutStyle from "Style/About/about.module.scss";

const About = () => {
    return (
        <>
            <CustomHead
                description={"Chek what is Animeworld"}
                url={"about"}
                contentTitle={"About | Animeworld"}
            />
            <div className={aboutStyle["about-page-contianer"]}>
                <div className={aboutStyle["banner"]}>
                    <img src="/animeworld.svg" alt="" />
                </div>
                <p className={aboutStyle["main-details"]}>
                    Animeworld is a place for <b>Anime Lovers</b>.
                    <br /> It's a place where you can view any{" "}
                    <strong>Upcoming </strong>
                    anime or some of the <strong>Top</strong> ones. <br />
                    <br /> Want to checkout any of your favourite anime ? don't
                    worry we have <b>Live Search </b>
                    through which you can check details of any of your favourite
                    anime.
                    <br />
                    <br />
                    Want to checkout out about your favourite{" "}
                    <strong>Character</strong>? the character section got
                    information about <strong>Top </strong>
                    characters and much more....
                </p>
                <h3>
                    This Project is made using Jikan API -{" "}
                    <a
                        href="https://github.com/jikan-me/jikan"
                        target={"_blank"}
                        rel="noreferrer">
                        More details
                    </a>
                </h3>
               
{/* 
                <h3 className={aboutStyle["connect"]}>Connect with me</h3>
                <ul className={aboutStyle["social"]}>
                   

                    <a
                        href="https://github.com"
                        target={"_blank"}
                        rel="noreferrer">
                        <AnyIcons badgeIcon={"logo-github"} />
                    </a>
                    <a
                        href="https://twitter.com"
                        target={"_blank"}
                        rel="noreferrer">
                        <AnyIcons badgeIcon={"logo-twitter"} />
                    </a>
                </ul> */}
            </div>
        </>
    );
};

export default About;
