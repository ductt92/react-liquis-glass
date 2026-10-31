import{j as e}from"./jsx-runtime-SKoiH9zj.js";import{r as i}from"./index-DJO9vBfz.js";import{B}from"./Button-CZxOoP0y.js";import{ag as Te,P as fe,o as je,ah as W,C,T as N,f as O,B as Se,p as Q,z as ke,b as Ce,h as qe}from"./Card-DqrLraUh.js";import{F as V,S as Ne}from"./Layout-CkPPsACS.js";import{s as Re,M as Be,m as z}from"./Toast-C5OHXVlZ.js";import{c as q}from"./index-B8H_dQMV.js";import{u as U,P as Fe,g as Ie,a as De}from"./ConfigProvider-BC9dizFH.js";import{T as Ee}from"./Overlay-CdO35eOe.js";import{B as He}from"./Display-BLNY7I4x.js";import{c as Ke}from"./client-CN2SRMON.js";import"./index-BO0JoVgK.js";import"./Popup-BjQa9cNG.js";const he=i.createContext(!1),k=i.forwardRef(function({icon:t,description:r,tooltip:o,type:l="default",shape:u="circle",badge:m,href:y,target:x,right:c=24,bottom:h=24,className:b,style:a,...p},f){const T=i.useContext(he),v=q("lg-float-btn lg-glass",`lg-float-btn-${l}`,`lg-float-btn-${u}`,r&&"lg-float-btn-with-desc",!T&&"lg-float-btn-fixed",b),d=T?a:{right:c,bottom:h,...a},s=e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"lg-float-btn-icon",children:t??e.jsx(fe,{})}),r&&e.jsx("span",{className:"lg-float-btn-desc",children:r}),m&&e.jsx(He,{count:m.count,dot:m.dot,className:"lg-float-btn-badge"})]}),g=y?e.jsx("a",{className:v,href:y,target:x,style:d,"aria-label":typeof o=="string"?o:void 0,children:s}):e.jsx("button",{ref:f,type:"button",className:v,style:d,"aria-label":typeof o=="string"?o:void 0,...p,children:s});return o?e.jsx(Ee,{title:o,placement:"left",children:g}):g}),$=({children:n,trigger:t,open:r,onOpenChange:o,icon:l,type:u="primary",shape:m="circle",right:y=24,bottom:x=24,className:c})=>{const[h,b]=i.useState(!1),a=t?r??h:!0,p=v=>{r===void 0&&b(v),o==null||o(v)},f=i.useRef(null);i.useEffect(()=>{if(t!=="click"||!a)return;const v=d=>{var s;return!((s=f.current)!=null&&s.contains(d.target))&&p(!1)};return document.addEventListener("mousedown",v),()=>document.removeEventListener("mousedown",v)},[t,a]);const T=i.Children.toArray(n);return e.jsx(he.Provider,{value:!0,children:e.jsxs("div",{ref:f,className:q("lg-float-group",t&&"lg-float-group-dial",a&&"lg-open",!t&&m==="square"&&"lg-float-group-square lg-glass",c),style:{right:y,bottom:x},onMouseEnter:t==="hover"?()=>p(!0):void 0,onMouseLeave:t==="hover"?()=>p(!1):void 0,children:[e.jsx("div",{className:"lg-float-group-items","aria-hidden":!a,children:T.map((v,d)=>e.jsx("div",{className:"lg-float-group-item",style:{transitionDelay:a?`${(T.length-1-d)*35}ms`:`${d*25}ms`},children:v},d))}),t&&e.jsx(k,{type:u,shape:m,"aria-expanded":a,"aria-label":a?"Close menu":"Open menu",icon:e.jsx("span",{className:q("lg-float-group-toggle",a&&"lg-open"),children:a?e.jsx(je,{}):l??e.jsx(fe,{})}),onClick:t==="click"?()=>p(!a):void 0})]})})},ge=({visibilityHeight:n=400,target:t,onClick:r,icon:o,tooltip:l,...u})=>{const m=U(),y=l===void 0?m.backToTop:l,[x,c]=i.useState(!1);return i.useEffect(()=>{const h=(t==null?void 0:t())??window,b=()=>h===window?window.scrollY:h.scrollTop,a=()=>c(b()>=n);return a(),h.addEventListener("scroll",a,{passive:!0}),()=>h.removeEventListener("scroll",a)},[t,n]),e.jsx(Fe,{children:e.jsx("div",{className:q("lg-backtop",x&&"lg-open"),children:e.jsx(k,{icon:o??e.jsx(Te,{}),tooltip:y,onClick:()=>{((t==null?void 0:t())??window).scrollTo({top:0,behavior:"smooth"}),r==null||r()},...u})})})},ye=({content:n,image:t,rotate:r=-22,gap:o=[100,100],width:l=140,height:u=64,font:m={},zIndex:y=9,className:x,style:c,children:h})=>{const[b,a]=i.useState(""),p=Array.isArray(n)?n:n?[n]:[],{color:f="rgba(120, 130, 160, 0.18)",fontSize:T=15,fontWeight:v=500,fontFamily:d="-apple-system, BlinkMacSystemFont, sans-serif"}=m;return i.useEffect(()=>{if(typeof document>"u")return;const s=window.devicePixelRatio||1,g=(o[0]+l)*s,w=(o[1]+u)*s,S=document.createElement("canvas");S.width=g,S.height=w;const j=S.getContext("2d");if(!j)return;j.translate(g/2,w/2),j.rotate(r*Math.PI/180);const I=()=>a(S.toDataURL());if(t){const R=new window.Image;R.crossOrigin="anonymous",R.referrerPolicy="no-referrer",R.onload=()=>{j.drawImage(R,-l*s/2,-u*s/2,l*s,u*s),I()},R.src=t;return}j.fillStyle=f,j.textAlign="center",j.textBaseline="middle",j.font=`${v} ${T*s}px ${d}`;const be=T*1.4*s;p.forEach((R,we)=>j.fillText(R,0,(we-(p.length-1)/2)*be)),I()},[p.join(`
`),t,r,o[0],o[1],l,u,f,T,v,d]),e.jsxs("div",{className:q("lg-watermark",x),style:c,children:[h,b&&e.jsx("div",{"aria-hidden":!0,className:"lg-watermark-layer",style:{zIndex:y,backgroundImage:`url(${b})`,backgroundSize:`${o[0]+l}px ${o[1]+u}px`}})]})},F=({size:n="md",className:t,...r})=>e.jsx("kbd",{className:q("lg-kbd lg-glass",`lg-kbd-${n}`,t),...r}),H=(n,t=2)=>String(Math.floor(n)).padStart(t,"0");function Me(n,t){let r=Math.max(0,n);const l=/D/.test(t.replace(/\[[^\]]*\]/g,""))?Math.floor(r/864e5):0;r-=l*864e5;const u=Math.floor(r/36e5);r-=u*36e5;const m=Math.floor(r/6e4);r-=m*6e4;const y=Math.floor(r/1e3),x=r-y*1e3,c=[];return t.replace(/\[([^\]]*)\]/g,(a,p)=>(c.push(p),`\0${c.length-1}\0`)).replace(/D+/g,String(l)).replace(/HH/g,H(u)).replace(/mm/g,H(m)).replace(/ss/g,H(y)).replace(/SSS/g,H(x,3)).replace(/\u0000(\d+)\u0000/g,(a,p)=>c[Number(p)])}const G=({title:n,value:t,format:r="HH:mm:ss",prefix:o,suffix:l,onFinish:u,onChange:m,valueStyle:y,className:x})=>{const c=typeof t=="number"?t:t.getTime(),[h,b]=i.useState(()=>Date.now()),a=i.useRef(!1),p=i.useRef({onFinish:u,onChange:m});return p.current={onFinish:u,onChange:m},i.useEffect(()=>{a.current=!1;const f=/SSS/.test(r)?33:250,T=setInterval(()=>{var d,s,g,w;const v=Date.now();b(v),(s=(d=p.current).onChange)==null||s.call(d,Math.max(0,c-v)),v>=c&&!a.current&&(a.current=!0,clearInterval(T),(w=(g=p.current).onFinish)==null||w.call(g))},f);return()=>clearInterval(T)},[c,r]),e.jsxs("div",{className:q("lg-statistic lg-countdown",x),children:[n&&e.jsx("div",{className:"lg-statistic-title",children:n}),e.jsxs("div",{className:"lg-statistic-value",style:y,role:"timer","aria-live":"off",children:[o&&e.jsx("span",{className:"lg-statistic-prefix",children:o}),e.jsx("span",{children:Me(c-h,r)}),l&&e.jsx("span",{className:"lg-statistic-suffix",children:l})]})]})},xe=n=>n.flatMap(t=>[t,...xe(t.children??[])]),ve=({items:n,offsetTop:t=0,getContainer:r,onChange:o,className:l,style:u})=>{const m=U(),[y,x]=i.useState(""),c=i.useRef(null),[h,b]=i.useState(null),a=i.useMemo(()=>xe(n),[n]),p=i.useRef(!1),f=i.useRef(o);f.current=o,i.useEffect(()=>{const d=(r==null?void 0:r())??window,s=()=>{if(p.current)return;const g=d===window?0:d.getBoundingClientRect().top;let w="";for(const S of a){const j=document.querySelector(S.href);j&&j.getBoundingClientRect().top-g<=t+8&&(w=S.href)}x(S=>{var j;return S!==w&&((j=f.current)==null||j.call(f,w)),w})};return s(),d.addEventListener("scroll",s,{passive:!0}),window.addEventListener("resize",s),()=>{d.removeEventListener("scroll",s),window.removeEventListener("resize",s)}},[a,t,r]),i.useLayoutEffect(()=>{var s;const d=(s=c.current)==null?void 0:s.querySelector(`[data-href="${CSS.escape(y)}"]`);b(d?{top:d.offsetTop,height:d.offsetHeight}:null)},[y]);const T=(d,s)=>{var I;const g=document.querySelector(s);if(!g)return;d.preventDefault();const w=(r==null?void 0:r())??window,S=w===window?0:w.getBoundingClientRect().top,j=w===window?window.scrollY:w.scrollTop;p.current=!0,x(s),(I=f.current)==null||I.call(f,s),w.scrollTo({top:j+g.getBoundingClientRect().top-S-t,behavior:"smooth"}),setTimeout(()=>p.current=!1,700)},v=(d,s)=>d.map(g=>e.jsxs("li",{children:[e.jsx("a",{href:g.href,"data-href":g.href,className:q("lg-anchor-link",y===g.href&&"lg-active"),style:{paddingLeft:14+s*14},onClick:w=>T(w,g.href),children:g.title}),g.children&&e.jsx("ul",{children:v(g.children,s+1)})]},g.key));return e.jsxs("nav",{className:q("lg-anchor",l),style:u,"aria-label":m.onThisPage,children:[e.jsx("span",{className:"lg-anchor-rail"}),h&&e.jsx("span",{className:"lg-anchor-indicator",style:{transform:`translateY(${h.top}px)`,height:h.height}}),e.jsx("ul",{ref:c,children:v(n,0)})]})};k.__docgenInfo={description:"",methods:[],displayName:"FloatButton",props:{icon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},description:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},tooltip:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},type:{required:!1,tsType:{name:"union",raw:"'default' | 'primary'",elements:[{name:"literal",value:"'default'"},{name:"literal",value:"'primary'"}]},description:"",defaultValue:{value:"'default'",computed:!1}},shape:{required:!1,tsType:{name:"union",raw:"'circle' | 'square'",elements:[{name:"literal",value:"'circle'"},{name:"literal",value:"'square'"}]},description:"",defaultValue:{value:"'circle'",computed:!1}},badge:{required:!1,tsType:{name:"signature",type:"object",raw:"{ count?: number; dot?: boolean }",signature:{properties:[{key:"count",value:{name:"number",required:!1}},{key:"dot",value:{name:"boolean",required:!1}}]}},description:""},href:{required:!1,tsType:{name:"string"},description:""},target:{required:!1,tsType:{name:"string"},description:""},right:{required:!1,tsType:{name:"number"},description:"Pixel offsets from the viewport corner. Ignored inside a FloatButtonGroup.",defaultValue:{value:"24",computed:!1}},bottom:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"24",computed:!1}}},composes:["Omit"]};$.__docgenInfo={description:"",methods:[],displayName:"FloatButtonGroup",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},trigger:{required:!1,tsType:{name:"union",raw:"'click' | 'hover'",elements:[{name:"literal",value:"'click'"},{name:"literal",value:"'hover'"}]},description:"Speed-dial mode. Without a trigger the buttons are always stacked."},open:{required:!1,tsType:{name:"boolean"},description:""},onOpenChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(open: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"open"}],return:{name:"void"}}},description:""},icon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},type:{required:!1,tsType:{name:"union",raw:"'default' | 'primary'",elements:[{name:"literal",value:"'default'"},{name:"literal",value:"'primary'"}]},description:"",defaultValue:{value:"'primary'",computed:!1}},shape:{required:!1,tsType:{name:"union",raw:"'circle' | 'square'",elements:[{name:"literal",value:"'circle'"},{name:"literal",value:"'square'"}]},description:"",defaultValue:{value:"'circle'",computed:!1}},right:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"24",computed:!1}},bottom:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"24",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};ge.__docgenInfo={description:"",methods:[],displayName:"BackTop",props:{visibilityHeight:{required:!1,tsType:{name:"number"},description:"Show after scrolling this many pixels.",defaultValue:{value:"400",computed:!1}},target:{required:!1,tsType:{name:"signature",type:"function",raw:"() => HTMLElement | Window | null",signature:{arguments:[],return:{name:"union",raw:"HTMLElement | Window | null",elements:[{name:"HTMLElement"},{name:"Window"},{name:"null"}]}}},description:"Scroll container. Defaults to window."},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}},composes:["Omit"]};ye.__docgenInfo={description:"",methods:[],displayName:"Watermark",props:{content:{required:!1,tsType:{name:"union",raw:"string | string[]",elements:[{name:"string"},{name:"Array",elements:[{name:"string"}],raw:"string[]"}]},description:""},image:{required:!1,tsType:{name:"string"},description:"Image URL used instead of text."},rotate:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"-22",computed:!1}},gap:{required:!1,tsType:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},description:"",defaultValue:{value:"[100, 100]",computed:!1}},width:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"140",computed:!1}},height:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"64",computed:!1}},font:{required:!1,tsType:{name:"signature",type:"object",raw:"{ color?: string; fontSize?: number; fontWeight?: number | string; fontFamily?: string }",signature:{properties:[{key:"color",value:{name:"string",required:!1}},{key:"fontSize",value:{name:"number",required:!1}},{key:"fontWeight",value:{name:"union",raw:"number | string",elements:[{name:"number"},{name:"string"}],required:!1}},{key:"fontFamily",value:{name:"string",required:!1}}]}},description:"",defaultValue:{value:"{}",computed:!1}},zIndex:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"9",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""},style:{required:!1,tsType:{name:"ReactCSSProperties",raw:"React.CSSProperties"},description:""},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};F.__docgenInfo={description:"Keyboard key chip, e.g. <Kbd>⌘</Kbd><Kbd>K</Kbd>.",methods:[],displayName:"Kbd",props:{size:{required:!1,tsType:{name:"union",raw:"'sm' | 'md'",elements:[{name:"literal",value:"'sm'"},{name:"literal",value:"'md'"}]},description:"",defaultValue:{value:"'md'",computed:!1}}}};G.__docgenInfo={description:"",methods:[],displayName:"Countdown",props:{title:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},value:{required:!0,tsType:{name:"union",raw:"number | Date",elements:[{name:"number"},{name:"Date"}]},description:"Target time (ms timestamp or Date)."},format:{required:!1,tsType:{name:"string"},description:"Tokens: D, HH, mm, ss, SSS. Text inside [brackets] is literal.",defaultValue:{value:"'HH:mm:ss'",computed:!1}},prefix:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},suffix:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},onFinish:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(remainingMs: number) => void",signature:{arguments:[{type:{name:"number"},name:"remainingMs"}],return:{name:"void"}}},description:""},valueStyle:{required:!1,tsType:{name:"ReactCSSProperties",raw:"React.CSSProperties"},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};ve.__docgenInfo={description:"",methods:[],displayName:"Anchor",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"AnchorItem"}],raw:"AnchorItem[]"},description:""},offsetTop:{required:!1,tsType:{name:"number"},description:"Distance from the top of the container at which a section becomes active.",defaultValue:{value:"0",computed:!1}},getContainer:{required:!1,tsType:{name:"signature",type:"function",raw:"() => HTMLElement | Window",signature:{arguments:[],return:{name:"union",raw:"HTMLElement | Window",elements:[{name:"HTMLElement"},{name:"Window"}]}}},description:"Scroll container. Defaults to window."},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(href: string) => void",signature:{arguments:[{type:{name:"string"},name:"href"}],return:{name:"void"}}},description:""},className:{required:!1,tsType:{name:"string"},description:""},style:{required:!1,tsType:{name:"ReactCSSProperties",raw:"React.CSSProperties"},description:""}}};const Pe={confirm:"var(--lg-warning)",info:"var(--lg-info)",success:"var(--lg-success)",warning:"var(--lg-warning)",error:"var(--lg-danger)"},Le=({kind:n,options:t,closing:r,onDone:o})=>{const l=U(),[u,m]=i.useState(!0),[y,x]=i.useState(!1),c=()=>{m(!1),setTimeout(o,300)};i.useEffect(()=>{r&&c()},[r]);const h=()=>{var f;(f=t.onCancel)==null||f.call(t),c()},b=async()=>{var T;const f=(T=t.onOk)==null?void 0:T.call(t);if(f&&typeof f.then=="function"){x(!0);try{await f}catch{x(!1);return}}c()},a=n==="confirm",p=t.icon??(a?e.jsx(W,{}):Re[n]);return e.jsxs(Be,{open:u,onClose:h,closable:!1,maskClosable:t.maskClosable??!1,width:t.width??416,onOk:b,okText:t.okText??l.ok,cancelText:t.cancelText??l.cancel,okLoading:y,okDanger:t.okDanger,className:"lg-confirm",footer:a?void 0:null,children:[e.jsxs("div",{className:"lg-confirm-body",children:[e.jsx("span",{className:"lg-confirm-icon",style:{color:Pe[n]},children:p}),e.jsxs("div",{className:"lg-confirm-main",children:[e.jsx("div",{className:"lg-confirm-title",children:t.title}),t.content&&e.jsx("div",{className:"lg-confirm-content",children:t.content})]})]}),!a&&e.jsx("div",{className:"lg-modal-footer lg-confirm-footer",children:e.jsx("button",{type:"button",className:"lg-btn lg-btn-filled lg-btn-primary lg-btn-md lg-glass",onClick:b,"data-autofocus":!0,children:e.jsx("span",{className:"lg-btn-label",children:t.okText??l.ok})})})]})};function D(n,t){if(typeof document>"u")return{close:()=>{},update:()=>{}};const r=document.createElement("div");document.body.appendChild(r);const o=Ke(r);let l=t,u=!1,m=!1;const y=()=>{m||(m=!0,setTimeout(()=>{o.unmount(),r.remove()}))},x=()=>{if(m)return;const{theme:c,refraction:h,vars:b,locale:a}=Ie.current;o.render(e.jsx(De,{theme:c,refraction:h,locale:a,style:{...b,display:"contents"},children:e.jsx(Le,{kind:n,options:l,closing:u,onDone:y})}))};return x(),{close:()=>{u=!0,x()},update:c=>{l={...l,...c},x()}}}const E=Object.assign(n=>D("confirm",n),{info:n=>D("info",n),success:n=>D("success",n),warning:n=>D("warning",n),error:n=>D("error",n)}),Ze={title:"Extras"},K={render:()=>e.jsxs(C,{title:"FloatButton",subtitle:"See the bottom-right corner — hover the speed dial, click the square group buttons",style:{minHeight:420},children:[e.jsx(N,{type:"secondary",children:"Float buttons are fixed to the viewport."}),e.jsx(k,{icon:e.jsx(W,{}),tooltip:"Help",right:100}),e.jsx(k,{icon:e.jsx(Se,{}),badge:{count:5},right:170,type:"primary",tooltip:"Notifications"}),e.jsx(k,{icon:e.jsx(Q,{}),description:"Chat",shape:"square",right:240}),e.jsxs($,{trigger:"hover",right:24,bottom:24,children:[e.jsx(k,{icon:e.jsx(ke,{}),tooltip:"Edit"}),e.jsx(k,{icon:e.jsx(Ce,{}),tooltip:"Share"}),e.jsx(k,{icon:e.jsx(Q,{}),tooltip:"Comment"})]}),e.jsxs($,{shape:"square",right:310,bottom:24,children:[e.jsx(k,{icon:e.jsx(qe,{})}),e.jsx(k,{icon:e.jsx(W,{})})]})]})},M={name:"BackTop",render:()=>e.jsxs(C,{title:"BackTop",subtitle:"Scroll down 200px",children:[e.jsx("div",{style:{height:1600},children:e.jsx(N,{type:"secondary",children:"Keep scrolling… the button appears at the bottom-right."})}),e.jsx(ge,{visibilityHeight:200})]})},P={name:"confirm()",render:()=>e.jsx(C,{title:"Imperative dialogs",children:e.jsxs(Ne,{wrap:!0,children:[e.jsx(B,{variant:"filled",color:"danger",onClick:()=>E({title:"Delete this file?",content:"It will be moved to Trash and deleted after 30 days.",okText:"Delete",okDanger:!0,onOk:()=>new Promise(n=>setTimeout(n,1e3)).then(()=>z.success("Deleted"))}),children:"confirm (async)"}),e.jsx(B,{onClick:()=>E.info({title:"Heads up",content:"This is an info dialog."}),children:"info"}),e.jsx(B,{onClick:()=>E.success({title:"Payment received",content:"Thanks for your order!"}),children:"success"}),e.jsx(B,{onClick:()=>E.warning({title:"Unsaved changes",content:"Your draft is stored locally."}),children:"warning"}),e.jsx(B,{onClick:()=>E.error({title:"Upload failed",content:"The server returned 500."}),children:"error"})]})})},L={name:"Watermark",render:()=>e.jsx(ye,{content:["Liquid Glass","Confidential"],children:e.jsxs(C,{title:"Quarterly report",style:{minHeight:280},children:[e.jsx(O,{type:"secondary",children:"This card is covered by a repeating, non-interactive watermark rendered from a canvas."}),e.jsx(B,{variant:"filled",color:"primary",children:"Still clickable"})]})})},_={name:"Kbd, Countdown, Copyable",render:()=>{const[n]=i.useState(()=>Date.now()+936e5+42e3),[t,r]=i.useState(()=>Date.now()+1e4);return e.jsxs("div",{className:"sb-grid",children:[e.jsx(C,{title:"Kbd",children:e.jsxs(V,{vertical:!0,gap:"sm",children:[e.jsxs(N,{children:["Search ",e.jsx(F,{children:"⌘"}),e.jsx(F,{children:"K"})]}),e.jsxs(N,{children:["Save ",e.jsx(F,{children:"Ctrl"}),"+",e.jsx(F,{children:"S"})]}),e.jsxs(N,{children:["Small ",e.jsx(F,{size:"sm",children:"Esc"})]})]})}),e.jsx(C,{title:"Countdown",children:e.jsxs(V,{vertical:!0,gap:"md",children:[e.jsx(G,{title:"Sale ends in",value:n,format:"D [days] HH:mm:ss"}),e.jsx(G,{title:"Ten seconds",value:t,format:"mm:ss:SSS",onFinish:()=>z.success("Finished!")}),e.jsx(B,{size:"sm",onClick:()=>r(Date.now()+1e4),children:"Restart"})]})}),e.jsx(C,{title:"Copyable text",children:e.jsxs(V,{vertical:!0,gap:"sm",children:[e.jsx(N,{copyable:!0,children:"npm install react-liquis-glass"}),e.jsx(N,{code:!0,copyable:{text:'import { Button } from "react-liquis-glass";'},children:"import Button"}),e.jsx(O,{copyable:{onCopy:()=>z.success("Copied paragraph")},children:"Copy this whole paragraph."})]})})]})}},A={name:"Anchor",render:()=>{const n=i.useRef(null),t=["intro","install","usage","theming","faq"];return e.jsxs(V,{gap:"lg",align:"flex-start",children:[e.jsx(C,{style:{flex:1},bodyStyle:{padding:0},children:e.jsx("div",{ref:n,style:{height:420,overflowY:"auto",padding:"8px 22px"},children:t.map(r=>e.jsxs("section",{id:`anchor-${r}`,style:{minHeight:320,paddingTop:12},children:[e.jsx(N,{strong:!0,style:{fontSize:18,textTransform:"capitalize"},children:r}),e.jsxs(O,{type:"secondary",children:["Section content for ",r,". Scroll this panel and watch the indicator follow."]})]},r))})}),e.jsx(C,{style:{width:220},title:"On this page",children:e.jsx(ve,{getContainer:()=>n.current,items:[{key:"intro",href:"#anchor-intro",title:"Introduction"},{key:"install",href:"#anchor-install",title:"Installation"},{key:"usage",href:"#anchor-usage",title:"Usage",children:[{key:"theming",href:"#anchor-theming",title:"Theming"}]},{key:"faq",href:"#anchor-faq",title:"FAQ"}]})})]})}};var Y,J,X;K.parameters={...K.parameters,docs:{...(Y=K.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  render: () => <Card title="FloatButton" subtitle="See the bottom-right corner — hover the speed dial, click the square group buttons" style={{
    minHeight: 420
  }}>
      <Text type="secondary">Float buttons are fixed to the viewport.</Text>
      <FloatButton icon={<QuestionCircleIcon />} tooltip="Help" right={100} />
      <FloatButton icon={<BellIcon />} badge={{
      count: 5
    }} right={170} type="primary" tooltip="Notifications" />
      <FloatButton icon={<MessageCircleIcon />} description="Chat" shape="square" right={240} />
      <FloatButtonGroup trigger="hover" right={24} bottom={24}>
        <FloatButton icon={<EditIcon />} tooltip="Edit" />
        <FloatButton icon={<ShareIcon />} tooltip="Share" />
        <FloatButton icon={<MessageCircleIcon />} tooltip="Comment" />
      </FloatButtonGroup>
      <FloatButtonGroup shape="square" right={310} bottom={24}>
        <FloatButton icon={<SearchIcon />} />
        <FloatButton icon={<QuestionCircleIcon />} />
      </FloatButtonGroup>
    </Card>
}`,...(X=(J=K.parameters)==null?void 0:J.docs)==null?void 0:X.source}}};var Z,ee,te;M.parameters={...M.parameters,docs:{...(Z=M.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  name: 'BackTop',
  render: () => <Card title="BackTop" subtitle="Scroll down 200px">
      <div style={{
      height: 1600
    }}>
        <Text type="secondary">Keep scrolling… the button appears at the bottom-right.</Text>
      </div>
      <BackTop visibilityHeight={200} />
    </Card>
}`,...(te=(ee=M.parameters)==null?void 0:ee.docs)==null?void 0:te.source}}};var re,ne,ae;P.parameters={...P.parameters,docs:{...(re=P.parameters)==null?void 0:re.docs,source:{originalSource:`{
  name: 'confirm()',
  render: () => <Card title="Imperative dialogs">
      <Space wrap>
        <Button variant="filled" color="danger" onClick={() => confirm({
        title: 'Delete this file?',
        content: 'It will be moved to Trash and deleted after 30 days.',
        okText: 'Delete',
        okDanger: true,
        onOk: () => new Promise(r => setTimeout(r, 1000)).then(() => message.success('Deleted'))
      })}>
          confirm (async)
        </Button>
        <Button onClick={() => confirm.info({
        title: 'Heads up',
        content: 'This is an info dialog.'
      })}>info</Button>
        <Button onClick={() => confirm.success({
        title: 'Payment received',
        content: 'Thanks for your order!'
      })}>success</Button>
        <Button onClick={() => confirm.warning({
        title: 'Unsaved changes',
        content: 'Your draft is stored locally.'
      })}>warning</Button>
        <Button onClick={() => confirm.error({
        title: 'Upload failed',
        content: 'The server returned 500.'
      })}>error</Button>
      </Space>
    </Card>
}`,...(ae=(ne=P.parameters)==null?void 0:ne.docs)==null?void 0:ae.source}}};var se,oe,ie;L.parameters={...L.parameters,docs:{...(se=L.parameters)==null?void 0:se.docs,source:{originalSource:`{
  name: 'Watermark',
  render: () => <Watermark content={['Liquid Glass', 'Confidential']}>
      <Card title="Quarterly report" style={{
      minHeight: 280
    }}>
        <Paragraph type="secondary">This card is covered by a repeating, non-interactive watermark rendered from a canvas.</Paragraph>
        <Button variant="filled" color="primary">Still clickable</Button>
      </Card>
    </Watermark>
}`,...(ie=(oe=L.parameters)==null?void 0:oe.docs)==null?void 0:ie.source}}};var le,ce,de;_.parameters={..._.parameters,docs:{...(le=_.parameters)==null?void 0:le.docs,source:{originalSource:`{
  name: 'Kbd, Countdown, Copyable',
  render: () => {
    const [deadline] = React.useState(() => Date.now() + 1000 * 60 * 60 * 26 + 1000 * 42);
    const [soon, setSoon] = React.useState(() => Date.now() + 10_000);
    return <div className="sb-grid">
        <Card title="Kbd">
          <Flex vertical gap="sm">
            <Text>Search <Kbd>⌘</Kbd><Kbd>K</Kbd></Text>
            <Text>Save <Kbd>Ctrl</Kbd>+<Kbd>S</Kbd></Text>
            <Text>Small <Kbd size="sm">Esc</Kbd></Text>
          </Flex>
        </Card>
        <Card title="Countdown">
          <Flex vertical gap="md">
            <Countdown title="Sale ends in" value={deadline} format="D [days] HH:mm:ss" />
            <Countdown title="Ten seconds" value={soon} format="mm:ss:SSS" onFinish={() => message.success('Finished!')} />
            <Button size="sm" onClick={() => setSoon(Date.now() + 10_000)}>Restart</Button>
          </Flex>
        </Card>
        <Card title="Copyable text">
          <Flex vertical gap="sm">
            <Text copyable>npm install react-liquis-glass</Text>
            <Text code copyable={{
            text: 'import { Button } from "react-liquis-glass";'
          }}>import Button</Text>
            <Paragraph copyable={{
            onCopy: () => message.success('Copied paragraph')
          }}>Copy this whole paragraph.</Paragraph>
          </Flex>
        </Card>
      </div>;
  }
}`,...(de=(ce=_.parameters)==null?void 0:ce.docs)==null?void 0:de.source}}};var ue,me,pe;A.parameters={...A.parameters,docs:{...(ue=A.parameters)==null?void 0:ue.docs,source:{originalSource:`{
  name: 'Anchor',
  render: () => {
    const ref = React.useRef<HTMLDivElement>(null);
    const sections = ['intro', 'install', 'usage', 'theming', 'faq'];
    return <Flex gap="lg" align="flex-start">
        <Card style={{
        flex: 1
      }} bodyStyle={{
        padding: 0
      }}>
          <div ref={ref} style={{
          height: 420,
          overflowY: 'auto',
          padding: '8px 22px'
        }}>
            {sections.map(s => <section key={s} id={\`anchor-\${s}\`} style={{
            minHeight: 320,
            paddingTop: 12
          }}>
                <Text strong style={{
              fontSize: 18,
              textTransform: 'capitalize'
            }}>{s}</Text>
                <Paragraph type="secondary">Section content for {s}. Scroll this panel and watch the indicator follow.</Paragraph>
              </section>)}
          </div>
        </Card>
        <Card style={{
        width: 220
      }} title="On this page">
          <Anchor getContainer={() => ref.current!} items={[{
          key: 'intro',
          href: '#anchor-intro',
          title: 'Introduction'
        }, {
          key: 'install',
          href: '#anchor-install',
          title: 'Installation'
        }, {
          key: 'usage',
          href: '#anchor-usage',
          title: 'Usage',
          children: [{
            key: 'theming',
            href: '#anchor-theming',
            title: 'Theming'
          }]
        }, {
          key: 'faq',
          href: '#anchor-faq',
          title: 'FAQ'
        }]} />
        </Card>
      </Flex>;
  }
}`,...(pe=(me=A.parameters)==null?void 0:me.docs)==null?void 0:pe.source}}};const et=["FloatButtons","BackTopStory","ConfirmStory","WatermarkStory","KbdCountdownCopy","AnchorStory"];export{A as AnchorStory,M as BackTopStory,P as ConfirmStory,K as FloatButtons,_ as KbdCountdownCopy,L as WatermarkStory,et as __namedExportsOrder,Ze as default};
