import{S as L,i as c,a as b}from"./assets/vendor-Dl8rzLp-.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const d of o.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&i(d)}).observe(document,{childList:!0,subtree:!0});function r(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(e){if(e.ep)return;e.ep=!0;const o=r(e);fetch(e.href,o)}})();const u=document.querySelector(".gallery");let w=new L(".gallery a");function p(t){if(t.length===0){c.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}const s=t.map(r=>`
        <li class="gallery-item">
            <a class="gallery-link" href="${r.largeImageURL}">
                <img
                    class="gallery-image"
                    src="${r.webformatURL}"
                    alt="${r.tags}"
                />
            </a>
            <div class="info">
                <p>Likes ${r.likes}</p>
                <p>Views ${r.views}</p>
                <p>Comments ${r.comments}</p>
                <p>Downloads ${r.downloads}</p>
            </div>
        </li>
    `).join("");u.insertAdjacentHTML("beforeend",s),w.refresh()}function E(){u.innerHTML=""}const S="49602759-053293c385f6a302d2cf848aa",v="https://pixabay.com/api/";async function y(t,s=1,r=15){try{return(await b.get(v,{params:{key:S,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:r,page:s}})).data}catch(i){throw console.error("Error fetching images:",i),i}}const q=document.querySelector(".form"),a=document.querySelector(".load-more"),m=document.querySelector(".loader"),$=15;let n=1,l="",f=0;a.style.display="none";function R(){const{height:t}=gallery.firstElementChild.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}function h(){m.style.display="block"}function g(){m.style.display="none"}q.addEventListener("submit",async t=>{if(t.preventDefault(),l=t.target.elements["search-text"].value.trim(),!!l){E(),n=1,a.style.display="none",h();try{const{hits:s,totalHits:r}=await y(l,n);f=r,p(s),t.target.reset(),(s.lenght=f)&&(a.style.display="block")}catch{c.error({title:"Error",message:"Failed to fetch images"})}finally{g()}}});a.addEventListener("click",async()=>{n+=1,h();try{const{hits:t}=await y(l,n);p(t),R(),n*$>=f&&(a.style.display="none",c.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"bottomRight"}))}catch{c.error({title:"Error",message:"Failed to fetch more images.",position:"topRight"})}finally{g()}});
//# sourceMappingURL=index.js.map
