import{S as b,i as n,a as S}from"./assets/vendor-Dl8rzLp-.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))p(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&p(d)}).observe(document,{childList:!0,subtree:!0});function o(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function p(t){if(t.ep)return;t.ep=!0;const s=o(t);fetch(t.href,s)}})();const y=document.querySelector(".gallery");let q=new b(".gallery a",{captionsData:"alt",captionDelay:250});function h(e){if(e.length===0){n.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}const r=e.map(o=>`
        <li class="gallery-item">
            <a class="gallery-link" href="${o.largeImageURL}">
                <img
                    class="gallery-image"
                    src="${o.webformatURL}"
                    alt="${o.tags}"
                />
            </a>
            <div class="info">
                <p>Likes ${o.likes}</p>
                <p>Views ${o.views}</p>
                <p>Comments ${o.comments}</p>
                <p>Downloads ${o.downloads}</p>
            </div>
        </li>
    `).join("");y.insertAdjacentHTML("beforeend",r),q.refresh()}function v(){y.innerHTML=""}const E="49602759-053293c385f6a302d2cf848aa",$="https://pixabay.com/api/",R=15;async function m(e,r=1){try{return(await S.get($,{params:{key:E,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:R,page:r}})).data}catch(o){throw console.error("Error fetching images:",o),o}}const B=document.querySelector(".form"),u=document.querySelector(".load-more"),g=document.querySelector(".loader"),I=15;let l=1,i="",c=0,a=0;function L(){g.style.display="block"}function w(){g.style.display="none"}function M(){u.style.display="block"}function f(){u.style.display="none"}f();B.addEventListener("submit",async e=>{if(e.preventDefault(),i=e.target.elements["search-text"].value.trim(),!!i){v(),l=1,a=0,L(),f();try{const r=await m(i,l);c=r.totalHits,h(r.hits),a+=r.hits.length,e.target.reset(),r.hits.lenght>15&&a<c&&M()}catch{n.error({title:"Error",message:"Failed to fetch images"})}finally{w()}}});u.addEventListener("click",async()=>{if(!(a=c)){l+=1,L();try{const e=await m(i,l,I);h(e.hits,!0),a+=e.hits.length,a>=c&&(f(),n.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"bottomRight"})),O()}catch{n.error({title:"Error",message:"Failed to fetch more images.",position:"topRight"})}finally{w()}}});function O(){const e=document.querySelector(".gallery-item");if(e){const{height:r}=e.getBoundingClientRect();window.scrollBy({top:r*2,behavior:"smooth"})}}
//# sourceMappingURL=index.js.map
