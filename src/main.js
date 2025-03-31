import { clearGallery, createGallery } from "./js/render-functions";
import { fetchImages } from "./js/pixabay-api";
import iziToast from "izitoast/dist/js/iziToast.min.js";
import "izitoast/dist/css/iziToast.min.css";
const form = document.querySelector(".form");
const loadMoreBtn = document.querySelector(".load-more");
const loader = document.querySelector(".loader");
const per_page = 15;
let page = 1;
let query = '';
let totalHits = 0;
let totalLoaded = 0;

function showLoader() {
    loader.style.display = "block";
}
function hideLoader() {
    loader.style.display = "none";
}
function showLoadMoreButton() {
    loadMoreBtn.style.display = "block";
}
function hideLoadMoreButton() {
    loadMoreBtn.style.display = "none";
}

hideLoadMoreButton();

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    query = event.target.elements["search-text"].value.trim();
    if (!query) return;
    clearGallery();
    page = 1;
    totalLoaded = 0;
    showLoader();
    hideLoadMoreButton();
    try {
        const data = await fetchImages(query, page);
        totalHits = data.totalHits;
        createGallery(data.hits);
        totalLoaded += data.hits.length;
        event.target.reset();
        if (data.hits.lenght > 15 && totalLoaded < totalHits) {
            showLoadMoreButton();
        }
    } catch {
        iziToast.error({ title: "Error", message: "Failed to fetch images" });
    } finally {
        hideLoader();
        
  }
});

loadMoreBtn.addEventListener("click", async () => {
    if (totalLoaded = totalHits) return;
    page += 1;
    showLoader();
    try {
        const data = await fetchImages(query, page, per_page);
        createGallery(data.hits, true);
        totalLoaded += data.hits.length;
        if (totalLoaded >= totalHits) {
            hideLoadMoreButton();
            iziToast.info({ title: "Info", message: "We're sorry, but you've reached the end of search results.", position: "bottomRight" });
        }
        smoothScroll();
    } catch (error) {
        iziToast.error({ title: "Error", message: "Failed to fetch more images.", position: "topRight" });
    } finally {
        hideLoader();
    }
});

function smoothScroll() {
  const galleryItem = document.querySelector(".gallery-item");
  if (galleryItem) {
    const { height } = galleryItem.getBoundingClientRect();
    window.scrollBy({ top: height * 2, behavior: "smooth" });
  }
}