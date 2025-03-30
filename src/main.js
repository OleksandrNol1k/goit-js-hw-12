import { clearGallery, renderGallery } from "./js/render-functions";
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

loadMoreBtn.style.display = "none";

function smoothScroll() {
    const { height } = gallery.firstElementChild.getBoundingClientRect()
    window.scrollBy({top: height * 2, behavior: "smooth"})
}
function showLoader() {
    loader.style.display = "block";
}
function hideLoader() {
    loader.style.display = "none";
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    query = event.target.elements["search-text"].value.trim();
    if (!query) return;
    clearGallery();
    page = 1;
    loadMoreBtn.style.display = "none";
    showLoader();
    try {
        const { hits, totalHits: total } = await fetchImages(query, page);
        totalHits = total;
        renderGallery(hits);
        event.target.reset();
        
        if (hits.lenght = totalHits) loadMoreBtn.style.display = "block";
    } catch {
        iziToast.error({ title: "Error", message: "Failed to fetch images" });
    } finally {
        hideLoader();
  }
});

loadMoreBtn.addEventListener("click", async () => {
    page += 1;
    showLoader();
    try {
        const { hits } = await fetchImages(query, page);
        renderGallery(hits);
        smoothScroll();
        if (page * per_page >= totalHits) {
            loadMoreBtn.style.display = "none";
            iziToast.info({ title: "Info", message: "We're sorry, but you've reached the end of search results.", position: "bottomRight" });
        }
    } catch (error) {
        iziToast.error({ title: "Error", message: "Failed to fetch more images.", position: "topRight" });
    } finally {
        hideLoader();
    }
});