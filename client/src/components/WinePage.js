import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import {
  wineDetails,
  followWine,
  findStores,
  REMOVE_WINE_DATA,
} from "../actions/wines";
import Loading from "./Loading";
import FindStoreModal from "./FindStoreModal";
import { FIND_WINE_MODAL } from "../actions/modals";

const AboutSection = ({ title, content }) => {
  return (
    <div className="about-section">
      <span className="wine-content-title">{title}</span>
      <span className="wine-content">{content}</span>
    </div>
  );
};
const WineAbout = ({ wine }) => {
  return (
    <>
      <h1 className="title is-2 wine-page-title">{wine.name}</h1>
      <h3 className="subtitle is-5">{wine.winery}</h3>
      {wine.avg_price ? (
        <h3 className="subtitle is-5">{`$${wine.avg_price}`}</h3>
      ) : (
        <></>
      )}
      <header className="about-header  title is-3">About</header>
      <AboutSection title="Vintage" content={wine.vintage}></AboutSection>
      <AboutSection title="Verietal" content={wine.verietal}></AboutSection>
      <AboutSection title="Country" content={wine.country}></AboutSection>
      {wine.state_province ? (
        <AboutSection
          title="State / Province"
          content={wine.state_province}
        ></AboutSection>
      ) : (
        <></>
      )}
      {wine.region ? (
        <AboutSection title="Region" content={wine.region}></AboutSection>
      ) : (
        <></>
      )}
      {wine.community_rank && wine.community_rank !== "None" ? (
        <AboutSection
          title="Snooth Community Ranking (out of 5)"
          content={wine.community_rank}
        ></AboutSection>
      ) : (
        <></>
      )}
      {wine.description ? (
        <AboutSection title="Details" content={wine.description}></AboutSection>
      ) : (
        <></>
      )}
      {wine.pairings ? (
        <AboutSection
          title="Food Pairings"
          content={wine.pairings.split(",").map((pairing, ind) => {
            if (pairing.endsWith("Recipe")) {
              pairing = pairing.slice(0, pairing.length - 7);
            }
            return <p key={ind}>- {pairing}</p>;
          })}
        ></AboutSection>
      ) : (
        <></>
      )}
    </>
  );
};

const WinePage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { token } = useSelector((state) => state.auth);
  const { wine, wineStoresId, matches } = useSelector((state) => state.wines);

  const [fetchedDetails, setFetchedDetails] = useState(false);

  useEffect(() => {
    if (fetchedDetails || !token) return;
    dispatch(wineDetails(token, id));
    setFetchedDetails(true);
    return () => dispatch({ type: REMOVE_WINE_DATA });
  });

  const toggleFollow = (event) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch(followWine(token, wine.id));
  };

  const toggleFindStoreModal = (event) => {
    event.stopPropagation();
    dispatch({ type: FIND_WINE_MODAL, display: "block" });

    if (wineStoresId !== id) {
      dispatch(findStores(id));
    }
  };

  if (!wine || !fetchedDetails) return <Loading></Loading>;
  let photosArr = [wine.primary_image];
  if (wine.photos) {
    photosArr = [...photosArr, ...wine.photos.split(",")];
  }
  return (
    <main>
      <FindStoreModal id={id}></FindStoreModal>
      <div id="shadow"></div>
      <div className="container is-widescreen">
        <div id="wine-page-buttons" className="buttons">
          {matches ? (
            <NavLink to="/matches" className="back-to-matches">
              {`< Matches`}
            </NavLink>
          ) : (
            <span></span>
          )}
          <div>
            <a onClick={toggleFindStoreModal}>Find It!</a>
            <a className="toggle-follow" onClick={toggleFollow}>
              {wine.user_follows ? (
                <i className="fas fa-heart follow-heart"></i>
              ) : (
                <i className="far fa-heart follow-heart"></i>
              )}
              <span>{wine.user_follows ? "   Following" : "   Follow"}</span>
            </a>
          </div>
        </div>
        <div className="columns is-gapless">
          <div id="wine-pictures-container" className="column is-half">
            <div id="carousel-container">
              <Carousel>
                {photosArr.map((photo, ind) => {
                  return (
                    <img
                      key={ind}
                      className="wine-page-image"
                      src={photo}
                    ></img>
                  );
                })}
              </Carousel>
            </div>
          </div>
          <div id="wine-details-container" className="column is-half">
            <WineAbout wine={wine}></WineAbout>
          </div>
        </div>
      </div>
    </main>
  );
};

export default WinePage;
