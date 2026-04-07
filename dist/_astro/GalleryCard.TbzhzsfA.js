import{r as t}from"./index.CVf8TyFT.js";var E={exports:{}},h={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var L=t,$=Symbol.for("react.element"),D=Symbol.for("react.fragment"),Y=Object.prototype.hasOwnProperty,G=L.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,U={key:!0,ref:!0,__self:!0,__source:!0};function R(a,o,l){var s,n={},c=null,p=null;l!==void 0&&(c=""+l),o.key!==void 0&&(c=""+o.key),o.ref!==void 0&&(p=o.ref);for(s in o)Y.call(o,s)&&!U.hasOwnProperty(s)&&(n[s]=o[s]);if(a&&a.defaultProps)for(s in o=a.defaultProps,o)n[s]===void 0&&(n[s]=o[s]);return{$$typeof:$,type:a,key:c,ref:p,props:n,_owner:G.current}}h.Fragment=D;h.jsx=R;h.jsxs=R;E.exports=h;var r=E.exports;const A=200,q=180;function B(){try{return sessionStorage.getItem("hanyu_muted")==="true"}catch{return!1}}function _(a){try{sessionStorage.setItem("hanyu_muted",String(a))}catch{}}function W({title:a,year:o,slug:l,cover:s,coverPosition:n,intro:c,tags:p=[],size:C="medium",previewVideo:y,previewPoster:v,fill:S=!1}){const[g,x]=t.useState(!1),[i,j]=t.useState(B),[T,O]=t.useState("right"),b=t.useRef(null),d=t.useRef(null),m=t.useRef(null),u=t.useRef(null),P=t.useCallback(()=>{clearTimeout(u.current),m.current=setTimeout(()=>{if(b.current){const e=b.current.getBoundingClientRect();O(e.left>window.innerWidth*.55?"left":"right")}x(!0)},A)},[]),w=t.useCallback(()=>{clearTimeout(m.current),u.current=setTimeout(()=>{x(!1)},q)},[]),M=t.useCallback(()=>clearTimeout(u.current),[]),z=t.useCallback(e=>{e.key==="Escape"&&(x(!1),clearTimeout(m.current)),(e.key==="Enter"||e.key===" ")&&f(e)},[]);t.useEffect(()=>{const e=d.current;e&&(g?(e.muted=i,e.play().catch(()=>{e.muted=!0,j(!0),_(!0),e.play().catch(()=>{})})):(e.pause(),e.currentTime=0))},[g]),t.useEffect(()=>{d.current&&(d.current.muted=i)},[i]),t.useEffect(()=>()=>{clearTimeout(m.current),clearTimeout(u.current)},[]);const f=e=>{e?.preventDefault?.(),window.location.href=`/${l}/`},I={portrait:"9/16",tall:"3/4",medium:"4/5",square:"1/1",wide:"5/4",landscape:"3/2",cinematic:"16/9",panoramic:"21/9",strip:"3/1"}[C]||"4/5",k=n||"50% 35%";return r.jsxs("div",{className:"gallery-card",ref:b,onMouseEnter:P,onMouseLeave:w,onKeyDown:z,onClick:f,tabIndex:0,role:"article","aria-label":`${a}, ${o}`,style:S?{height:"100%"}:{aspectRatio:I},children:[r.jsx("img",{src:s,alt:a,className:"card-img",style:{objectPosition:k},loading:"lazy"}),r.jsx("div",{className:"card-overlay",children:r.jsxs("div",{className:"card-info",children:[p.slice(0,3).map(e=>r.jsx("span",{className:"tag-chip",children:e},e)),r.jsx("h3",{className:"card-title",children:a}),r.jsx("span",{className:"card-year",children:o})]})}),g&&r.jsxs("div",{className:`popover popover-${T}`,onMouseEnter:M,onMouseLeave:w,onClick:e=>{e.stopPropagation(),f()},role:"region","aria-label":`Preview: ${a}`,children:[r.jsxs("div",{className:"pop-text",children:[r.jsx("h3",{className:"pop-title",children:a}),r.jsx("span",{className:"pop-year",children:o}),r.jsx("div",{className:"pop-tags",children:p.slice(0,5).map(e=>r.jsx("span",{className:"tag-chip",children:e},e))}),r.jsx("p",{className:"pop-intro",children:c}),r.jsx("a",{href:`/${l}/`,className:"pop-cta",onClick:e=>{e.stopPropagation(),f()},children:"Read more →"})]}),r.jsx("div",{className:"pop-media-wrap",children:y?r.jsxs("div",{className:"pop-media-inner",children:[r.jsx("video",{ref:d,src:y,poster:v||s,muted:i,loop:!0,playsInline:!0,preload:"metadata",className:"pop-video",onError:()=>{}}),r.jsx("button",{className:"mute-btn",onClick:e=>{e.stopPropagation();const N=!i;j(N),_(N)},"aria-label":i?"Unmute video":"Mute video",children:i?"🔇 Unmute":"🔊 Mute"})]}):r.jsx("img",{src:v||s,alt:a,className:"pop-poster",style:{objectPosition:k}})})]}),r.jsx("style",{children:`
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
      `})]})}export{W as default};
