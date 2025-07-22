import{a as g,S as h,i as n}from"./assets/vendor-67BWzQEt.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const y="51427214-d20a9ea979f3329601707c67f",v="https://pixabay.com/api/";function L(a){const s={key:y,q:a,image_type:"photo",orientation:"horizontal",safesearch:!0};return g.get(v,{params:s}).then(r=>r.data)}const u=document.querySelector(".gallery"),p=document.querySelector(".loader"),b=new h(".gallery a",{captionsData:"alt",captionDelay:250});function S(a){const s=a.map(({webformatURL:r,largeImageURL:i,tags:e,likes:t,views:o,comments:f,downloads:m})=>`
      <li class="gallery-item">
        <a href="${i}">
          <img src="${r}" alt="${e}" />
        </a>
        <div class="info-grid">
          <div class="info-item">
            <span class="label">Likes</span>
            <span class="value">${t}</span>
          </div>
          <div class="info-item">
            <span class="label">Views</span>
            <span class="value">${o}</span>
          </div>
          <div class="info-item">
            <span class="label">Comments</span>
            <span class="value">${f}</span>
          </div>
          <div class="info-item">
            <span class="label">Downloads</span>
            <span class="value">${m}</span>
          </div>
        </div>
      </li>`).join("");u.insertAdjacentHTML("beforeend",s),b.refresh()}function w(){u.innerHTML=""}function q(){p.classList.add("visible")}function l(){p.classList.remove("visible")}const d=document.querySelector(".form"),c=d.elements["search-text"];d.addEventListener("submit",a=>{a.preventDefault();const s=c.value.trim();if(!s){n.warning({message:"Please enter a search term!",position:"topRight"});return}w(),q(),L(s).then(r=>{if(l(),r.hits.length===0){n.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}S(r.hits)}).catch(r=>{l(),n.error({message:"Oops! Something went wrong.",position:"topRight"}),console.error(r)}).finally(()=>{l(),c.value=""})});
//# sourceMappingURL=index.js.map
