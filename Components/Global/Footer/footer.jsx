import footerStyle from "Components/Global/Footer/footer.module.scss";
import Link from "next/link";

export function Footer() {
    return (
        <footer className={footerStyle["footer"]}>
            <div className={footerStyle["footer-inner"]}>
                <div className={footerStyle["logo-section"]}>
                    <Link href={"/"}>
                        <a className={footerStyle["logo-container"]}>
                            <img
                                src={"/animeworld.svg"}
                                alt="AnimeWorldlogo"
                            />
                        </a>
                    </Link>
                    <p>One place for all your anime-needs.</p>
                    {/* <div className={footerStyle["social-links"]}>
                        <Link
                            href={
                                ""
                            }>
                            <a target={"_blank"} rel="noreferrer">
                                <AnyIcons badgeIcon={"logo-linkedin"} />
                            </a>
                        </Link>
                        
                    </div> */}
                </div>
                <div className={footerStyle["nav-links"]}>
                    <div className={footerStyle["column"]}>
                        <h2 className={footerStyle["header"]}>Anime</h2>
                        <ul>
                            <li>
                                <Link href={"/topanime"}>
                                    <a>Topanime</a>
                                </Link>
                            </li>
                            <li>
                                <Link href={"/anime/top/all-time"}>
                                    <a>All time popular</a>
                                </Link>
                            </li>
                            <li>
                                <Link href={"/anime/top/upcoming"}>
                                    <a>popular upcoming</a>
                                </Link>
                            </li>
                            <li>
                                <Link href={"/anime/top/airing"}>
                                    <a>popular airing</a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className={footerStyle["column"]}>
                        <h2 className={footerStyle["header"]}>Characters</h2>
                        <ul>
                            <li>
                                <Link href={"/topcharacters"}>
                                    <a>Topcharacters</a>
                                </Link>
                            </li>
                            <li>
                                <Link href={"/character/top"}>
                                    <a>popular Characters</a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className={footerStyle["column"]}>
                        <h2 className={footerStyle["header"]}>About</h2>
                        <ul>
                            <li>
                                <Link href={"/about"}>
                                    <a>About AnimeWorld</a>
                                </Link>
                            </li>
                            <li>
                                <Link href={"/"}>
                                    <a>About Me</a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <h4 className={footerStyle["copyright"]}>
                Copyright &#169; {new Date().getFullYear()}, AnimeWorld
            </h4>
        </footer>
    );
}
