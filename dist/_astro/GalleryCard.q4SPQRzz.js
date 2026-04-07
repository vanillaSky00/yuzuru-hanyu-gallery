import{r}from"./index.CVf8TyFT.js";var N={exports:{}},g={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var $=r,D=Symbol.for("react.element"),G=Symbol.for("react.fragment"),Y=Object.prototype.hasOwnProperty,U=$.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,W={key:!0,ref:!0,__self:!0,__source:!0};function _(o,a,l){var n,c={},p=null,d=null;l!==void 0&&(p=""+l),a.key!==void 0&&(p=""+a.key),a.ref!==void 0&&(d=a.ref);for(n in a)Y.call(a,n)&&!W.hasOwnProperty(n)&&(c[n]=a[n]);if(o&&o.defaultProps)for(n in a=o.defaultProps,a)c[n]===void 0&&(c[n]=a[n]);return{$$typeof:D,type:o,key:p,ref:d,props:c,_owner:U.current}}g.Fragment=G;g.jsx=_;g.jsxs=_;N.exports=g;var t=N.exports;const A=200,q=180;function B(){try{return sessionStorage.getItem("hanyu_muted")==="true"}catch{return!1}}function F(o){try{sessionStorage.setItem("hanyu_muted",String(o))}catch{}window.dispatchEvent(new CustomEvent("hanyu-mute-change",{detail:o}))}function H({title:o,year:a,slug:l,cover:n,coverPosition:c,intro:p,tags:d=[],size:R="medium",previewVideo:w,previewPoster:j,fill:C=!1}){const[x,b]=r.useState(!1),[i,y]=r.useState(B),[S,T]=r.useState("right"),v=r.useRef(null),m=r.useRef(null),u=r.useRef(null),f=r.useRef(null),L=r.useCallback(()=>{clearTimeout(f.current),u.current=setTimeout(()=>{if(v.current){const e=v.current.getBoundingClientRect(),s=window.innerWidth<1100?360:460,z=window.innerWidth-e.right,I=e.left;T(z<s+16&&I>=s+16?"left":"right")}b(!0)},A)},[]),k=r.useCallback(()=>{clearTimeout(u.current),f.current=setTimeout(()=>{b(!1)},q)},[]),O=r.useCallback(()=>clearTimeout(f.current),[]),P=r.useCallback(e=>{e.key==="Escape"&&(b(!1),clearTimeout(u.current)),(e.key==="Enter"||e.key===" ")&&h(e)},[]);r.useEffect(()=>{const e=m.current;e&&(x?(e.muted=i,e.play().catch(()=>{e.muted=!0,y(!0),e.play().catch(()=>{})})):(e.pause(),e.currentTime=0))},[x]),r.useEffect(()=>{m.current&&(m.current.muted=i)},[i]),r.useEffect(()=>{const e=s=>y(s.detail);return window.addEventListener("hanyu-mute-change",e),()=>window.removeEventListener("hanyu-mute-change",e)},[]),r.useEffect(()=>()=>{clearTimeout(u.current),clearTimeout(f.current)},[]);const h=e=>{e?.preventDefault?.(),window.location.href=`/${l}/`},M={portrait:"9/16",tall:"3/4",medium:"4/5",square:"1/1",wide:"5/4",landscape:"3/2",cinematic:"16/9",panoramic:"21/9",strip:"3/1"}[R]||"4/5",E=c||"50% 35%";return t.jsxs("div",{className:"gallery-card",ref:v,onMouseEnter:L,onMouseLeave:k,onKeyDown:P,onClick:h,tabIndex:0,role:"article","aria-label":`${o}, ${a}`,style:C?{height:"100%"}:{aspectRatio:M},children:[t.jsx("img",{src:n,alt:o,className:"card-img",style:{objectPosition:E},loading:"lazy"}),t.jsx("div",{className:"card-overlay",children:t.jsxs("div",{className:"card-info",children:[d.slice(0,3).map(e=>t.jsx("span",{className:"tag-chip",children:e},e)),t.jsx("h3",{className:"card-title",children:o}),t.jsx("span",{className:"card-year",children:a})]})}),x&&t.jsxs("div",{className:`popover popover-${S}`,onMouseEnter:O,onMouseLeave:k,onClick:e=>{e.stopPropagation(),h()},role:"region","aria-label":`Preview: ${o}`,children:[t.jsxs("div",{className:"pop-text",children:[t.jsx("h3",{className:"pop-title",children:o}),t.jsx("span",{className:"pop-year",children:a}),t.jsx("div",{className:"pop-tags",children:d.slice(0,5).map(e=>t.jsx("span",{className:"tag-chip",children:e},e))}),t.jsx("p",{className:"pop-intro",children:p}),t.jsx("a",{href:`/${l}/`,className:"pop-cta",onClick:e=>{e.stopPropagation(),h()},children:"Read more →"})]}),t.jsx("div",{className:"pop-media-wrap",children:w?t.jsxs("div",{className:"pop-media-inner",children:[t.jsx("video",{ref:m,src:w,poster:j||n,muted:i,loop:!0,playsInline:!0,preload:"metadata",className:"pop-video",onError:()=>{}}),t.jsx("button",{className:"mute-btn",onClick:e=>{e.stopPropagation();const s=!i;y(s),F(s)},"aria-label":i?"Unmute video":"Mute video",children:i?"🔇 Unmute":"🔊 Mute"})]}):t.jsx("img",{src:j||n,alt:o,className:"pop-poster",style:{objectPosition:E}})})]}),t.jsx("style",{children:`
        .gallery-card {
          position: relative;
          break-inside: avoid;
          margin-bottom: 14px;
          border-radius: 12px;
          overflow: visible;
          cursor: pointer;
          outline: none;
        }
        .gallery-card:focus-visible { box-shadow: 0 0 0 2px #c9a76d; }

        .card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 12px;
          display: block;
          transition: transform .35s ease, filter .35s ease;
        }
        .gallery-card:hover .card-img {
          transform: scale(1.025);
          filter: brightness(.88);
        }

        .card-overlay {
          position: absolute;
          inset: 0;
          border-radius: 12px;
          background: linear-gradient(to top, rgba(0,0,0,.72) 0%, rgba(0,0,0,0) 50%);
          display: flex;
          align-items: flex-end;
          padding: 1rem;
          pointer-events: none;
        }
        .card-info { display: flex; flex-direction: column; gap: .25rem; }
        .card-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.15rem;
          font-weight: 400;
          color: #f0e8db;
          line-height: 1.2;
        }
        .card-year {
          font-size: .65rem;
          letter-spacing: .18em;
          text-transform: uppercase;
          color: rgba(200,185,165,.7);
        }

        /* ── Popover ── */
        .popover {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 100;
          width: 460px;
          background: #1c1a18;
          border: 1px solid rgba(255,255,255,.09);
          border-radius: 14px;
          box-shadow: 0 20px 60px rgba(0,0,0,.65);
          display: flex;
          gap: 0;
          overflow: hidden;
          pointer-events: auto;
          animation: popIn .18s ease;
        }
        @keyframes popIn {
          from { opacity: 0; transform: translateY(-50%) scale(.96); }
          to   { opacity: 1; transform: translateY(-50%) scale(1); }
        }
        .popover-right { left: calc(100% + 12px); }
        .popover-left  { right: calc(100% + 12px); }

        .pop-text {
          flex: 1;
          padding: 1.2rem 1rem 1.2rem 1.2rem;
          display: flex;
          flex-direction: column;
          gap: .45rem;
          min-width: 0;
        }
        .pop-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.1rem;
          font-weight: 400;
          color: #f0e8db;
          line-height: 1.25;
        }
        .pop-year {
          font-size: .62rem;
          letter-spacing: .16em;
          text-transform: uppercase;
          color: rgba(200,185,165,.6);
        }
        .pop-tags { display: flex; flex-wrap: wrap; gap: .3rem; }
        .pop-intro {
          font-size: .82rem;
          line-height: 1.55;
          color: #a89d90;
          font-style: italic;
          margin-top: .1rem;
        }
        .pop-cta {
          margin-top: auto;
          font-size: .7rem;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: #c9a76d;
          text-decoration: none;
          transition: opacity .2s;
        }
        .pop-cta:hover { opacity: .75; }

        .pop-media-wrap {
          width: 190px;
          flex-shrink: 0;
          background: #111;
          position: relative;
        }
        .pop-media-inner { width: 100%; height: 100%; position: relative; }
        .pop-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .pop-poster {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .mute-btn {
          position: absolute;
          bottom: .5rem;
          right: .5rem;
          background: rgba(0,0,0,.65);
          color: #e2d9cc;
          border: 1px solid rgba(255,255,255,.15);
          border-radius: 999px;
          padding: .22em .65em;
          font-size: .65rem;
          letter-spacing: .06em;
          cursor: pointer;
          transition: background .2s;
        }
        .mute-btn:hover { background: rgba(0,0,0,.85); }

        @media (max-width: 560px) {
          .popover { display: none; }
        }
        @media (max-width: 1100px) {
          .popover { width: 360px; }
          .pop-media-wrap { width: 150px; }
        }
      `})]})}export{H as default};
