import { useRef } from "react";
import ranmdomTextStyle from "Components/Home/Style/RandomizedText.module.scss";

export function HomeHeader() {
  const homeContainerRef = useRef();

  return (
    <>
      <section
        className={ranmdomTextStyle["home-section-1"]}
        ref={homeContainerRef}
      >
        <div className={ranmdomTextStyle["main-text-container"]}>
          <h1 className={`${ranmdomTextStyle["random-header"]} header-1`}>
            <div className={ranmdomTextStyle["letter"]}>y</div>
            <div className={ranmdomTextStyle["letter"]}>o</div>
            <div className={ranmdomTextStyle["letter"]}>u</div>
            <div className={ranmdomTextStyle["letter"]}>r</div>
          </h1>
          <h1 className={`${ranmdomTextStyle["random-header"]} header-2`}>
            <div className={ranmdomTextStyle["letter"]}>o</div>
            <div className={ranmdomTextStyle["letter"]}>w</div>
            <div className={ranmdomTextStyle["letter"]}>n</div>
          </h1>
          <h1 className={`${ranmdomTextStyle["random-header"]} header-3`}>
            <div className={ranmdomTextStyle["letter"]}>w</div>
            <div className={ranmdomTextStyle["letter"]}>o</div>
            <div className={ranmdomTextStyle["letter"]}>r</div>
            <div className={ranmdomTextStyle["letter"]}>l</div>
            <div className={ranmdomTextStyle["letter"]}>d</div>
          </h1>
        </div>
        <div className={ranmdomTextStyle["para-container"]}>
          <p className={ranmdomTextStyle["random-para"]}>
            Explore a vast list of Anime and Characters. Comes with full details on them.
          </p>
        </div>
      </section>
    </>
  );
}
