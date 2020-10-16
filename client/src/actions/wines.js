import { apiUrl } from "../config";
import { NEW_FORM } from "./forms";
import {linkWorks} from '../utils'
import {defaultWineImg} from '../config'

export const SEARCH_WINES = "SEARCH_WINES";
export const MATCHING_WINES = "MATCHING_WINES";
export const WINE_DETAILS = "WINE_DETAILS";
export const TOGGLE_FOLLOW = "TOGGLE_FOLLOW";
export const WINE_RESET = "WINE_RESET";
export const WINE_STORES = "WINE_STORES";
export const REMOVE_WINE_DATA = "REMOVE_WINE_DATA";

export const searchWines = (data) => async (dispatch) => {
  const res = await fetch(`${apiUrl}/wines/matches`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (res.ok) {
    const { form } = data;
    let matches = await res.json();

    //IMPLEMENTATION of the check below not working yet; picture loading error still shown
    // This conditional checks if the images are able to load from the user's browser.
    // If not, a default image is used.
    if (matches.length >= 1) {
      const firstInstance = matches[0];
      if (!linkWorks(firstInstance.primary_image)) {
        for (let match of matches) {
          match.primary_image = defaultWineImg;
          match.photos = null;
        }
      }
    }

    dispatch({ type: MATCHING_WINES, matches, form });
  }
};

export const wineDetails = (token, wineId) => async (dispatch) => {
  const res = await fetch(`${apiUrl}/wines/${wineId}`, {
    method: "get",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (res.ok) {
    let wine = await res.json();
    if (typeof wine !== "object") return;

    //IMPLEMENTATION of the check below not working yet; picture loading error still shown
    // This conditional checks if the images are able to load from the user's browser.
    // If not, a default image is used.
    
    if (!linkWorks(wine.primary_image)) {
        wine.primary_image = defaultWineImg;
        wine.photos = null;
    }
    dispatch({ type: WINE_DETAILS, wine });
  }
};

export const followWine = (token, wineId) => async (dispatch) => {
  const res = await fetch(`${apiUrl}/follows`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(wineId),
  });

  if (res.ok) {
    let following = await res.json();
    dispatch({ type: TOGGLE_FOLLOW, following });
  }
};

export const findStores = (wineId) => async (dispatch) => {
  const res = await fetch(`${apiUrl}/wines/${wineId}/find-stores`);

  if (res.ok) {
    const stores = await res.json();

    dispatch({ type: WINE_STORES, stores, wineId });
  }
};
