import{a as R,S as M,i as c}from"./assets/vendor-DqB7j7Ix.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function o(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerPolicy&&(a.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?a.credentials="include":e.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(e){if(e.ep)return;e.ep=!0;const a=o(e);fetch(e.href,a)}})();const $="51427214-d20a9ea979f3329601707c67f",I="https://pixabay.com/api/",O=15;async function y(s,t){const o={key:$,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:O};try{return(await R.get(I,{params:o})).data}catch{throw new Error("Failed to fetch images")}}const v=document.querySelector(".gallery"),L=document.querySelector(".loader-top"),b=document.querySelector(".loader-bottom"),w=document.querySelector(".load-more"),T=new M(".gallery a",{captionsData:"alt",captionDelay:250});function S(s){const t=s.map(({webformatURL:o,largeImageURL:r,tags:e,likes:a,views:l,comments:P,downloads:E})=>`
      <li class="gallery-item">
        <a href="${r}">
          <img src="${o}" alt="${e}" />
        </a>
        <div class="info-grid">
          <div class="info-item">
            <span class="label">Likes</span>
            <span class="value">${a}</span>
          </div>
          <div class="info-item">
            <span class="label">Views</span>
            <span class="value">${l}</span>
          </div>
          <div class="info-item">
            <span class="label">Comments</span>
            <span class="value">${P}</span>
          </div>
          <div class="info-item">
            <span class="label">Downloads</span>
            <span class="value">${E}</span>
          </div>
        </div>
      </li>`).join("");v.insertAdjacentHTML("beforeend",t),T.refresh()}function x(){v.innerHTML=""}function A(){L.classList.add("visible")}function h(){L.classList.remove("visible")}function H(){b.classList.add("visible")}function g(){b.classList.remove("visible")}function q(){w.classList.add("visible")}function m(){w.classList.remove("visible")}const B=document.querySelector(".form"),p=B.elements["search-text"],_=document.querySelector(".load-more");let f="",n=1;const d=15;let u=0;const i=new Set;B.addEventListener("submit",async s=>{s.preventDefault();const t=p.value.trim();if(!t){c.warning({message:"Please enter a search term!",position:"topRight"});return}f=t,n=1,i.clear(),x(),m(),A();try{const o=await y(f,n);if(h(),!o.hits.length){c.error({message:"Sorry, no images match your search query.",position:"topRight"});return}const r=o.hits.filter(e=>!i.has(e.id));r.forEach(e=>i.add(e.id)),S(r),p.value="",p.focus(),u=Math.ceil(o.totalHits/d),i.size<o.totalHits&&q()}catch(o){h(),c.error({message:"Oops! Something went wrong.",position:"topRight"}),console.error(o)}});_.addEventListener("click",async()=>{m(),H();const s=[];try{for(;s.length<d&&n<u;){n+=1;const o=(await y(f,n)).hits.filter(r=>!i.has(r.id));o.forEach(r=>i.add(r.id)),s.push(...o)}if(g(),!s.length){c.info({message:"You're already viewing all available results.",position:"topRight"});return}S(s.slice(0,d)),z(),n>=u||i.size>=u*d?(m(),c.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):q()}catch(t){g(),c.error({message:"Failed to load more images.",position:"topRight"}),console.error(t)}});function z(){const s=document.querySelector(".gallery-item");if(!s)return;const{height:t}=s.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
