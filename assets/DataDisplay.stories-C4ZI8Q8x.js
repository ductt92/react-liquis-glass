import{j as e}from"./jsx-runtime-SKoiH9zj.js";import{r as q}from"./index-DJO9vBfz.js";import{I,B as Re}from"./Button-CZxOoP0y.js";import{a6 as Ie,y as je,a as qe,C as j,B as ve,K as ze,S as Be,a7 as Pe,a8 as De,a9 as Le,J as Ee,aa as Ke,T as U,a4 as Fe,z as Oe,c as Ge}from"./Card-DqrLraUh.js";import{S as A,F as L}from"./Layout-CkPPsACS.js";import{C as ee,b as He}from"./Selection-CqGRrs-k.js";import{a as P,E as J,A as g,b as We,B as h,T as y,S as se,c as _e,D as Ve}from"./Display-BLNY7I4x.js";import{P as b}from"./Progress-BklSA23B.js";import{a as ae,c as f}from"./index-B8H_dQMV.js";import{u as Me}from"./ConfigProvider-BC9dizFH.js";import{P as Ue}from"./Navigation-B3phbEwk.js";import{T as te}from"./Overlay-CdO35eOe.js";import"./index-BO0JoVgK.js";import"./Popup-BjQa9cNG.js";function Ye(a,t){return typeof a=="number"&&typeof t=="number"?a-t:String(a??"").localeCompare(String(t??""),void 0,{numeric:!0})}function be({columns:a,dataSource:t,rowKey:c="key",loading:r,size:p="md",striped:v,bordered:N,pagination:l={},rowSelection:n,onRowClick:m,emptyText:T,sticky:o,scrollY:u,className:C,style:Ce}){const Q=Me(),[x,ke]=q.useState({key:"",order:null}),z=l&&l.pageSize||10,[W,Ne]=ae(l?l.current:void 0,1,l?s=>{var i;return(i=l.onChange)==null?void 0:i.call(l,s,z)}:void 0),[w,we]=ae(n==null?void 0:n.selectedRowKeys,[]),_=(s,i)=>typeof c=="function"?c(s):s[c]??i,E=q.useMemo(()=>{const s=a.find(d=>d.key===x.key);if(!s||!x.order||!s.sorter)return t;const i=s.dataIndex??s.key,k=typeof s.sorter=="function"?s.sorter:(d,R)=>Ye(d[i],R[i]),S=[...t].sort(k);return x.order==="descend"?S.reverse():S},[t,a,x]),V=l&&l.total!=null,M=l&&!V?E.slice((W-1)*z,W*z):E,Se=s=>ke(i=>({key:s,order:i.key!==s?"ascend":i.order==="ascend"?"descend":i.order==="descend"?null:"ascend"})),X=s=>{var i;we(s),(i=n==null?void 0:n.onChange)==null||i.call(n,s,t.filter((k,S)=>s.includes(_(k,S))))},B=M.map((s,i)=>_(s,i)),Z=B.length>0&&B.every(s=>w.includes(s)),Ae=!Z&&B.some(s=>w.includes(s));return e.jsxs("div",{className:f("lg-table-wrapper lg-glass",`lg-table-${p}`,N&&"lg-table-bordered",v&&"lg-table-striped",C),style:Ce,children:[e.jsx(P,{spinning:!!r,children:e.jsx("div",{className:"lg-table-scroll",style:u?{maxHeight:u,overflowY:"auto"}:void 0,children:e.jsxs("table",{className:"lg-table",children:[e.jsx("thead",{className:f((o||u)&&"lg-table-sticky"),children:e.jsxs("tr",{children:[n&&e.jsx("th",{className:"lg-table-selection",children:e.jsx(ee,{checked:Z,indeterminate:Ae,"aria-label":Q.selectAll,onChange:s=>X(s?Array.from(new Set([...w,...B])):w.filter(i=>!B.includes(i)))})}),a.map(s=>e.jsx("th",{style:{width:s.width,textAlign:s.align},className:f(s.sorter&&"lg-table-sortable"),"aria-sort":x.key===s.key&&x.order?x.order==="ascend"?"ascending":"descending":void 0,onClick:s.sorter?()=>Se(s.key):void 0,children:e.jsxs("span",{className:"lg-table-th",children:[s.title,s.sorter&&e.jsxs("span",{className:"lg-table-sorter",children:[e.jsx(Ie,{className:f(x.key===s.key&&x.order==="ascend"&&"lg-on")}),e.jsx(je,{className:f(x.key===s.key&&x.order==="descend"&&"lg-on")})]})]})},s.key))]})}),e.jsxs("tbody",{children:[M.length===0&&e.jsx("tr",{children:e.jsx("td",{colSpan:a.length+(n?1:0),className:"lg-table-empty",children:T??e.jsx(J,{})})}),M.map((s,i)=>{const k=_(s,i),S=w.includes(k);return e.jsxs("tr",{className:f(S&&"lg-table-row-selected",m&&"lg-table-row-clickable"),onClick:m?()=>m(s,i):void 0,children:[n&&e.jsx("td",{className:"lg-table-selection",onClick:d=>d.stopPropagation(),children:e.jsx(ee,{checked:S,"aria-label":Q.selectRow,onChange:d=>X(d?[...w,k]:w.filter(R=>R!==k))})}),a.map(d=>{const R=s[d.dataIndex??d.key];return e.jsx("td",{style:{textAlign:d.align},className:f(d.ellipsis&&"lg-table-ellipsis"),children:d.render?d.render(R,s,i):R},d.key)})]},k)})]})]})})}),l&&(V?l.total:E.length)>z&&e.jsx("div",{className:"lg-table-pagination",children:e.jsx(Ue,{...l,current:W,pageSize:z,total:V?l.total:E.length,onChange:s=>Ne(s),size:"sm"})})]})}be.__docgenInfo={description:"",methods:[],displayName:"Table",props:{columns:{required:!0,tsType:{name:"Array",elements:[{name:"TableColumn",elements:[{name:"T"}],raw:"TableColumn<T>"}],raw:"TableColumn<T>[]"},description:""},dataSource:{required:!0,tsType:{name:"Array",elements:[{name:"T"}],raw:"T[]"},description:""},rowKey:{required:!1,tsType:{name:"union",raw:"keyof T | ((record: T) => React.Key)",elements:[{name:"T"},{name:"unknown"}]},description:"",defaultValue:{value:"'key'",computed:!1}},loading:{required:!1,tsType:{name:"boolean"},description:""},size:{required:!1,tsType:{name:"union",raw:"'sm' | 'md'",elements:[{name:"literal",value:"'sm'"},{name:"literal",value:"'md'"}]},description:"",defaultValue:{value:"'md'",computed:!1}},striped:{required:!1,tsType:{name:"boolean"},description:""},bordered:{required:!1,tsType:{name:"boolean"},description:""},pagination:{required:!1,tsType:{name:"union",raw:"false | Omit<PaginationProps, 'total'> & { total?: number }",elements:[{name:"literal",value:"false"},{name:"intersection",raw:"Omit<PaginationProps, 'total'> & { total?: number }",elements:[{name:"Omit",elements:[{name:"PaginationProps"},{name:"literal",value:"'total'"}],raw:"Omit<PaginationProps, 'total'>"},{name:"signature",type:"object",raw:"{ total?: number }",signature:{properties:[{key:"total",value:{name:"number",required:!1}}]}}]}]},description:"`false` to disable. Defaults to client-side pagination with pageSize 10.",defaultValue:{value:"{}",computed:!1}},rowSelection:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  selectedRowKeys?: React.Key[];
  onChange?: (keys: React.Key[], rows: T[]) => void;
}`,signature:{properties:[{key:"selectedRowKeys",value:{name:"Array",elements:[{name:"ReactKey",raw:"React.Key"}],raw:"React.Key[]",required:!1}},{key:"onChange",value:{name:"signature",type:"function",raw:"(keys: React.Key[], rows: T[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"ReactKey",raw:"React.Key"}],raw:"React.Key[]"},name:"keys"},{type:{name:"Array",elements:[{name:"T"}],raw:"T[]"},name:"rows"}],return:{name:"void"}},required:!1}}]}},description:""},onRowClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(record: T, index: number) => void",signature:{arguments:[{type:{name:"T"},name:"record"},{type:{name:"number"},name:"index"}],return:{name:"void"}}},description:""},emptyText:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},sticky:{required:!1,tsType:{name:"boolean"},description:""},scrollY:{required:!1,tsType:{name:"union",raw:"number | string",elements:[{name:"number"},{name:"string"}]},description:""},className:{required:!1,tsType:{name:"string"},description:""},style:{required:!1,tsType:{name:"ReactCSSProperties",raw:"React.CSSProperties"},description:""}}};function Y({dataSource:a,renderItem:t,header:c,footer:r,bordered:p,inset:v=!0,size:N="md",emptyText:l,className:n,children:m}){const T=a&&t?a.map((u,C)=>e.jsx(q.Fragment,{children:t(u,C)},C)):m,o=a&&a.length===0;return e.jsxs("div",{className:f("lg-list",`lg-list-${N}`,v&&"lg-glass lg-list-inset",p&&"lg-list-bordered",n),children:[c&&e.jsx("div",{className:"lg-list-header",children:c}),o?e.jsx("div",{className:"lg-list-empty",children:l??e.jsx(J,{})}):e.jsx("ul",{className:"lg-list-items",children:T}),r&&e.jsx("div",{className:"lg-list-footer",children:r})]})}const D=({prefix:a,title:t,description:c,extra:r,actions:p,clickable:v,className:N,children:l,onClick:n,...m})=>e.jsxs("li",{className:f("lg-list-item",(v||n)&&"lg-list-item-clickable",N),onClick:n,tabIndex:v||n?0:void 0,onKeyDown:n?T=>T.key==="Enter"&&n(T):void 0,...m,children:[a&&e.jsx("span",{className:"lg-list-item-prefix",children:a}),e.jsxs("div",{className:"lg-list-item-main",children:[t&&e.jsx("div",{className:"lg-list-item-title",children:t}),c&&e.jsx("div",{className:"lg-list-item-desc",children:c}),l]}),r&&e.jsx("span",{className:"lg-list-item-extra",children:r}),p&&e.jsx("span",{className:"lg-list-item-actions",children:p}),v&&e.jsx(qe,{className:"lg-list-item-chevron"})]}),$=({items:a,activeKey:t,defaultActiveKey:c=[],onChange:r,accordion:p,separated:v,className:N})=>{const[l,n]=q.useState(c),m=t??l,T=o=>{const u=m.includes(o)?m.filter(C=>C!==o):p?[o]:[...m,o];t||n(u),r==null||r(u)};return e.jsx("div",{className:f("lg-collapse",v?"lg-collapse-separated":"lg-glass",N),children:a.map(o=>{const u=m.includes(o.key);return e.jsxs("div",{className:f("lg-collapse-item",u&&"lg-open",v&&"lg-glass",o.disabled&&"lg-disabled"),children:[e.jsxs("button",{type:"button",className:"lg-collapse-header","aria-expanded":u,disabled:o.disabled,onClick:()=>T(o.key),children:[e.jsx(je,{className:"lg-collapse-arrow"}),e.jsx("span",{className:"lg-collapse-label",children:o.label}),o.extra&&e.jsx("span",{className:"lg-collapse-extra",onClick:C=>C.stopPropagation(),children:o.extra})]}),e.jsx("div",{className:"lg-collapse-panel",role:"region","aria-hidden":!u,children:e.jsx("div",{className:"lg-collapse-panel-inner",children:e.jsx("div",{className:"lg-collapse-body",children:o.children})})})]},o.key)})})};Y.__docgenInfo={description:"",methods:[],displayName:"List",props:{dataSource:{required:!1,tsType:{name:"Array",elements:[{name:"T"}],raw:"T[]"},description:""},renderItem:{required:!1,tsType:{name:"signature",type:"function",raw:"(item: T, index: number) => React.ReactNode",signature:{arguments:[{type:{name:"T"},name:"item"},{type:{name:"number"},name:"index"}],return:{name:"ReactReactNode",raw:"React.ReactNode"}}},description:""},header:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},footer:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},bordered:{required:!1,tsType:{name:"boolean"},description:""},inset:{required:!1,tsType:{name:"boolean"},description:'iOS "inset grouped" style glass list.',defaultValue:{value:"true",computed:!1}},size:{required:!1,tsType:{name:"union",raw:"'sm' | 'md'",elements:[{name:"literal",value:"'sm'"},{name:"literal",value:"'md'"}]},description:"",defaultValue:{value:"'md'",computed:!1}},emptyText:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},className:{required:!1,tsType:{name:"string"},description:""},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};D.__docgenInfo={description:"",methods:[],displayName:"ListItem",props:{prefix:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},title:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},description:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},extra:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},actions:{required:!1,tsType:{name:"Array",elements:[{name:"ReactReactNode",raw:"React.ReactNode"}],raw:"React.ReactNode[]"},description:""},clickable:{required:!1,tsType:{name:"boolean"},description:"Show a chevron and hover state."}},composes:["Omit"]};$.__docgenInfo={description:"",methods:[],displayName:"Collapse",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"CollapseItem"}],raw:"CollapseItem[]"},description:""},activeKey:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},defaultActiveKey:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:"",defaultValue:{value:"[]",computed:!1}},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(keys: string[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"string"}],raw:"string[]"},name:"keys"}],return:{name:"void"}}},description:""},accordion:{required:!1,tsType:{name:"boolean"},description:"Only one panel open at a time."},separated:{required:!1,tsType:{name:"boolean"},description:"Separate glass cards instead of one grouped card."},className:{required:!1,tsType:{name:"string"},description:""}}};const us={title:"Data Display"},K={render:()=>e.jsxs("div",{className:"sb-grid",children:[e.jsxs(j,{title:"Avatar",children:[e.jsxs(A,{size:"md",wrap:!0,children:[e.jsx(g,{size:"sm",children:"A"}),e.jsx(g,{children:"TD"}),e.jsx(g,{size:"lg",status:"online",children:"LG"}),e.jsx(g,{shape:"square",src:"https://i.pravatar.cc/120?img=12"}),e.jsx(g,{status:"busy",src:"https://i.pravatar.cc/120?img=32"}),e.jsx(g,{})]}),e.jsx("div",{className:"sb-section-title",children:"Group"}),e.jsx(We,{max:4,children:["AN","BO","CY","DI","EL","FA"].map(a=>e.jsx(g,{children:a},a))})]}),e.jsxs(j,{title:"Badge",children:[e.jsxs(A,{size:"lg",wrap:!0,children:[e.jsx(h,{count:5,children:e.jsx(I,{"aria-label":"bell",icon:e.jsx(ve,{})})}),e.jsx(h,{count:120,children:e.jsx(I,{"aria-label":"mail",icon:e.jsx(ze,{})})}),e.jsx(h,{dot:!0,children:e.jsx(I,{"aria-label":"settings",icon:e.jsx(Be,{})})}),e.jsx(h,{count:8,color:"primary"})]}),e.jsxs(L,{vertical:!0,gap:"xs",style:{marginTop:16},children:[e.jsx(h,{status:"success",text:"Operational"}),e.jsx(h,{status:"processing",text:"Deploying"}),e.jsx(h,{status:"warning",text:"Degraded"}),e.jsx(h,{status:"error",text:"Outage"}),e.jsx(h,{status:"default",text:"Unknown"})]})]}),e.jsxs(j,{title:"Tag / Chip",children:[e.jsxs(A,{wrap:!0,children:[e.jsx(y,{children:"Default"}),e.jsx(y,{color:"primary",children:"Primary"}),e.jsx(y,{color:"success",icon:e.jsx(Pe,{}),children:"Success"}),e.jsx(y,{color:"warning",children:"Warning"}),e.jsx(y,{color:"danger",closable:!0,children:"Closable"}),e.jsx(y,{color:"#bf5af2",variant:"filled",children:"Custom"}),e.jsx(y,{color:"info",variant:"outline",children:"Outline"}),e.jsx(y,{variant:"glass",children:"Glass"})]}),e.jsx("div",{className:"sb-section-title",children:"Checkable"}),e.jsx($e,{})]})]})},$e=()=>{const[a,t]=q.useState(["Design"]);return e.jsx(A,{wrap:!0,children:["Design","Engineering","Marketing","Sales"].map(c=>e.jsx(y,{color:"primary",checked:a.includes(c),onCheckedChange:r=>t(r?[...a,c]:a.filter(p=>p!==c)),children:c},c))})},F={render:()=>e.jsxs("div",{className:"sb-grid",children:[e.jsx(j,{title:"Line progress",children:e.jsxs(L,{vertical:!0,gap:"md",children:[e.jsx(b,{percent:30,"aria-label":"Upload progress"}),e.jsx(b,{percent:55,status:"active"}),e.jsx(b,{percent:100}),e.jsx(b,{percent:70,status:"exception"}),e.jsx(b,{percent:64,strokeColor:["#ff375f","#ff9f0a"],size:"lg"}),e.jsx(b,{percent:60,steps:8})]})}),e.jsx(j,{title:"Circle & dashboard",children:e.jsxs(A,{size:"lg",wrap:!0,children:[e.jsx(b,{type:"circle",percent:75}),e.jsx(b,{type:"circle",percent:100,size:"sm"}),e.jsx(b,{type:"dashboard",percent:62,strokeColor:["#30d158","#0a84ff"]})]})}),e.jsx(j,{title:"Statistic",children:e.jsxs(L,{justify:"space-between",children:[e.jsx(se,{title:"Active users",value:112893,trend:{value:"8.2%",direction:"up"}}),e.jsx(se,{title:"Churn",value:2.4,precision:1,suffix:"%",trend:{value:"0.3%",direction:"down"}})]})}),e.jsxs(j,{title:"Spin & Skeleton",children:[e.jsxs(A,{size:"lg",children:[e.jsx(P,{size:"sm"}),e.jsx(P,{}),e.jsx(P,{size:"lg",tip:"Loading…"})]}),e.jsx("div",{style:{marginTop:16},children:e.jsx(Ke,{avatar:!0,paragraph:{rows:2}})})]}),e.jsx(j,{title:"Spin wrapping content",children:e.jsx(P,{spinning:!0,children:e.jsx(U,{type:"secondary",children:"This content is blurred while loading. Lorem ipsum dolor sit amet consectetur adipisicing elit."})})}),e.jsx(j,{title:"Empty",children:e.jsx(J,{description:"No messages yet",children:e.jsx(Re,{variant:"filled",color:"primary",size:"sm",children:"Compose"})})})]})},Je=["Admin","Editor","Viewer"],Qe=["active","invited","disabled"],Xe=["Anna Nguyen","Bao Tran","Chris Le","Duy Pham","Emma Vo","Finn Hoang","Gia Do","Hana Bui","Ivy Dang","Jack Ngo","Khoa Ly","Linh Mai","Minh Ha","Nam Vu"],Te=Xe.map((a,t)=>({key:t,name:a,email:`${a.split(" ")[0].toLowerCase()}@glass.dev`,role:Je[t%3],status:Qe[t%3],age:22+t*7%30})),O={name:"Table",render:()=>{const[a,t]=q.useState([]),c=[{key:"name",title:"Name",sorter:!0,render:r=>e.jsxs(L,{align:"center",gap:"sm",children:[e.jsx(g,{size:"sm",children:r.split(" ").map(p=>p[0]).join("")}),r]})},{key:"email",title:"Email",render:r=>e.jsx(U,{type:"secondary",children:r})},{key:"age",title:"Age",sorter:!0,align:"right",width:80},{key:"role",title:"Role",render:r=>e.jsx(y,{color:r==="Admin"?"primary":"default",children:r})},{key:"status",title:"Status",render:r=>e.jsx(h,{status:r==="active"?"success":r==="invited"?"processing":"default",text:r})},{key:"actions",title:"",align:"right",render:()=>e.jsxs(A,{size:"xs",children:[e.jsx(te,{title:"Edit",children:e.jsx(I,{size:"sm",variant:"text","aria-label":"Edit",icon:e.jsx(Oe,{})})}),e.jsx(te,{title:"Delete",children:e.jsx(I,{size:"sm",variant:"text",color:"danger","aria-label":"Delete",icon:e.jsx(Ge,{})})})]})}];return e.jsxs(L,{vertical:!0,gap:"sm",children:[e.jsxs(U,{type:"secondary",children:[a.length," selected"]}),e.jsx(be,{columns:c,dataSource:Te,pagination:{pageSize:6},rowSelection:{selectedRowKeys:a,onChange:t}})]})}},G={render:()=>e.jsxs("div",{className:"sb-grid",children:[e.jsxs(Y,{header:"Settings",children:[e.jsx(D,{prefix:e.jsx(g,{size:30,shape:"square",color:"#0a84ff",icon:e.jsx(De,{})}),title:"Wi-Fi",extra:"Home",clickable:!0}),e.jsx(D,{prefix:e.jsx(g,{size:30,shape:"square",color:"#ff375f",icon:e.jsx(ve,{})}),title:"Notifications",clickable:!0}),e.jsx(D,{prefix:e.jsx(g,{size:30,shape:"square",color:"#30d158",icon:e.jsx(Le,{})}),title:"Privacy",extra:e.jsx(He,{size:"sm",defaultChecked:!0})})]}),e.jsx(Y,{dataSource:Te.slice(0,4),renderItem:a=>e.jsx(D,{prefix:e.jsx(g,{size:"sm",children:a.name[0]}),title:a.name,description:a.email,actions:[e.jsx(I,{variant:"text",size:"sm","aria-label":"Star",icon:e.jsx(Ee,{})},"s")]})}),e.jsx($,{accordion:!0,defaultActiveKey:["1"],items:[{key:"1",label:"What is liquid glass?",children:"A translucent material that blurs, tints and refracts what is behind it."},{key:"2",label:"Does it support dark mode?",children:'Yes — wrap your app in <ConfigProvider theme="dark">.'},{key:"3",label:"Disabled panel",children:"…",disabled:!0}]}),e.jsx($,{separated:!0,items:[{key:"a",label:"Separated A",children:"Content A"},{key:"b",label:"Separated B",children:"Content B"}]})]})},H={render:()=>e.jsxs("div",{className:"sb-grid",children:[e.jsx(j,{title:"Timeline",children:e.jsx(_e,{items:[{label:"09:00",children:"Project created"},{label:"10:30",children:"Design review passed",color:"success"},{label:"13:15",children:"Build failed",color:"danger"},{label:"14:00",children:"Hotfix deployed",dot:e.jsx(Fe,{}),color:"warning"}],pending:"Waiting for QA…"})}),e.jsx(j,{title:"Descriptions",style:{gridColumn:"span 2"},children:e.jsx(Ve,{column:3,items:[{label:"Customer",children:"Anna Nguyen"},{label:"Plan",children:e.jsx(y,{color:"primary",children:"Pro"})},{label:"Status",children:e.jsx(h,{status:"success",text:"Active"})},{label:"Address",children:"12 Glass Street, District 1, HCMC",span:2},{label:"Renewal",children:"2026-12-01"}]})})]})};var re,ie,le;K.parameters={...K.parameters,docs:{...(re=K.parameters)==null?void 0:re.docs,source:{originalSource:`{
  render: () => <div className="sb-grid">
      <Card title="Avatar">
        <Space size="md" wrap>
          <Avatar size="sm">A</Avatar>
          <Avatar>TD</Avatar>
          <Avatar size="lg" status="online">LG</Avatar>
          <Avatar shape="square" src="https://i.pravatar.cc/120?img=12" />
          <Avatar status="busy" src="https://i.pravatar.cc/120?img=32" />
          <Avatar />
        </Space>
        <div className="sb-section-title">Group</div>
        <AvatarGroup max={4}>
          {['AN', 'BO', 'CY', 'DI', 'EL', 'FA'].map(n => <Avatar key={n}>{n}</Avatar>)}
        </AvatarGroup>
      </Card>
      <Card title="Badge">
        <Space size="lg" wrap>
          <Badge count={5}><IconButton aria-label="bell" icon={<BellIcon />} /></Badge>
          <Badge count={120}><IconButton aria-label="mail" icon={<MailIcon />} /></Badge>
          <Badge dot><IconButton aria-label="settings" icon={<SettingsIcon />} /></Badge>
          <Badge count={8} color="primary" />
        </Space>
        <Flex vertical gap="xs" style={{
        marginTop: 16
      }}>
          <Badge status="success" text="Operational" />
          <Badge status="processing" text="Deploying" />
          <Badge status="warning" text="Degraded" />
          <Badge status="error" text="Outage" />
          <Badge status="default" text="Unknown" />
        </Flex>
      </Card>
      <Card title="Tag / Chip">
        <Space wrap>
          <Tag>Default</Tag>
          <Tag color="primary">Primary</Tag>
          <Tag color="success" icon={<CheckCircleIcon />}>Success</Tag>
          <Tag color="warning">Warning</Tag>
          <Tag color="danger" closable>Closable</Tag>
          <Tag color="#bf5af2" variant="filled">Custom</Tag>
          <Tag color="info" variant="outline">Outline</Tag>
          <Tag variant="glass">Glass</Tag>
        </Space>
        <div className="sb-section-title">Checkable</div>
        <CheckableTags />
      </Card>
    </div>
}`,...(le=(ie=K.parameters)==null?void 0:ie.docs)==null?void 0:le.source}}};var ne,ce,oe;F.parameters={...F.parameters,docs:{...(ne=F.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  render: () => <div className="sb-grid">
      <Card title="Line progress">
        <Flex vertical gap="md">
          <Progress percent={30} aria-label="Upload progress" />
          <Progress percent={55} status="active" />
          <Progress percent={100} />
          <Progress percent={70} status="exception" />
          <Progress percent={64} strokeColor={['#ff375f', '#ff9f0a']} size="lg" />
          <Progress percent={60} steps={8} />
        </Flex>
      </Card>
      <Card title="Circle & dashboard">
        <Space size="lg" wrap>
          <Progress type="circle" percent={75} />
          <Progress type="circle" percent={100} size="sm" />
          <Progress type="dashboard" percent={62} strokeColor={['#30d158', '#0a84ff']} />
        </Space>
      </Card>
      <Card title="Statistic">
        <Flex justify="space-between">
          <Statistic title="Active users" value={112893} trend={{
          value: '8.2%',
          direction: 'up'
        }} />
          <Statistic title="Churn" value={2.4} precision={1} suffix="%" trend={{
          value: '0.3%',
          direction: 'down'
        }} />
        </Flex>
      </Card>
      <Card title="Spin & Skeleton">
        <Space size="lg">
          <Spin size="sm" />
          <Spin />
          <Spin size="lg" tip="Loading…" />
        </Space>
        <div style={{
        marginTop: 16
      }}>
          <Skeleton avatar paragraph={{
          rows: 2
        }} />
        </div>
      </Card>
      <Card title="Spin wrapping content">
        <Spin spinning>
          <Text type="secondary">This content is blurred while loading. Lorem ipsum dolor sit amet consectetur adipisicing elit.</Text>
        </Spin>
      </Card>
      <Card title="Empty"><Empty description="No messages yet"><Button variant="filled" color="primary" size="sm">Compose</Button></Empty></Card>
    </div>
}`,...(oe=(ce=F.parameters)==null?void 0:ce.docs)==null?void 0:oe.source}}};var de,pe,me;O.parameters={...O.parameters,docs:{...(de=O.parameters)==null?void 0:de.docs,source:{originalSource:`{
  name: 'Table',
  render: () => {
    const [sel, setSel] = React.useState<React.Key[]>([]);
    const columns: TableColumn<User>[] = [{
      key: 'name',
      title: 'Name',
      sorter: true,
      render: (v: string) => <Flex align="center" gap="sm"><Avatar size="sm">{v.split(' ').map(p => p[0]).join('')}</Avatar>{v}</Flex>
    }, {
      key: 'email',
      title: 'Email',
      render: (v: string) => <Text type="secondary">{v}</Text>
    }, {
      key: 'age',
      title: 'Age',
      sorter: true,
      align: 'right',
      width: 80
    }, {
      key: 'role',
      title: 'Role',
      render: (v: string) => <Tag color={v === 'Admin' ? 'primary' : 'default'}>{v}</Tag>
    }, {
      key: 'status',
      title: 'Status',
      render: (v: User['status']) => <Badge status={v === 'active' ? 'success' : v === 'invited' ? 'processing' : 'default'} text={v} />
    }, {
      key: 'actions',
      title: '',
      align: 'right',
      render: () => <Space size="xs">
            <Tooltip title="Edit"><IconButton size="sm" variant="text" aria-label="Edit" icon={<EditIcon />} /></Tooltip>
            <Tooltip title="Delete"><IconButton size="sm" variant="text" color="danger" aria-label="Delete" icon={<TrashIcon />} /></Tooltip>
          </Space>
    }];
    return <Flex vertical gap="sm">
        <Text type="secondary">{sel.length} selected</Text>
        <Table columns={columns} dataSource={users} pagination={{
        pageSize: 6
      }} rowSelection={{
        selectedRowKeys: sel,
        onChange: setSel
      }} />
      </Flex>;
  }
}`,...(me=(pe=O.parameters)==null?void 0:pe.docs)==null?void 0:me.source}}};var ue,ge,xe;G.parameters={...G.parameters,docs:{...(ue=G.parameters)==null?void 0:ue.docs,source:{originalSource:`{
  render: () => <div className="sb-grid">
      <List header="Settings">
        <ListItem prefix={<Avatar size={30} shape="square" color="#0a84ff" icon={<WifiIcon />} />} title="Wi-Fi" extra="Home" clickable />
        <ListItem prefix={<Avatar size={30} shape="square" color="#ff375f" icon={<BellIcon />} />} title="Notifications" clickable />
        <ListItem prefix={<Avatar size={30} shape="square" color="#30d158" icon={<LockIcon />} />} title="Privacy" extra={<Switch size="sm" defaultChecked />} />
      </List>
      <List dataSource={users.slice(0, 4)} renderItem={u => <ListItem prefix={<Avatar size="sm">{u.name[0]}</Avatar>} title={u.name} description={u.email} actions={[<IconButton key="s" variant="text" size="sm" aria-label="Star" icon={<StarIcon />} />]} />} />
      <Collapse accordion defaultActiveKey={['1']} items={[{
      key: '1',
      label: 'What is liquid glass?',
      children: 'A translucent material that blurs, tints and refracts what is behind it.'
    }, {
      key: '2',
      label: 'Does it support dark mode?',
      children: 'Yes — wrap your app in <ConfigProvider theme="dark">.'
    }, {
      key: '3',
      label: 'Disabled panel',
      children: '…',
      disabled: true
    }]} />
      <Collapse separated items={[{
      key: 'a',
      label: 'Separated A',
      children: 'Content A'
    }, {
      key: 'b',
      label: 'Separated B',
      children: 'Content B'
    }]} />
    </div>
}`,...(xe=(ge=G.parameters)==null?void 0:ge.docs)==null?void 0:xe.source}}};var he,ye,fe;H.parameters={...H.parameters,docs:{...(he=H.parameters)==null?void 0:he.docs,source:{originalSource:`{
  render: () => <div className="sb-grid">
      <Card title="Timeline">
        <Timeline items={[{
        label: '09:00',
        children: 'Project created'
      }, {
        label: '10:30',
        children: 'Design review passed',
        color: 'success'
      }, {
        label: '13:15',
        children: 'Build failed',
        color: 'danger'
      }, {
        label: '14:00',
        children: 'Hotfix deployed',
        dot: <ClockIcon />,
        color: 'warning'
      }]} pending="Waiting for QA…" />
      </Card>
      <Card title="Descriptions" style={{
      gridColumn: 'span 2'
    }}>
        <Descriptions column={3} items={[{
        label: 'Customer',
        children: 'Anna Nguyen'
      }, {
        label: 'Plan',
        children: <Tag color="primary">Pro</Tag>
      }, {
        label: 'Status',
        children: <Badge status="success" text="Active" />
      }, {
        label: 'Address',
        children: '12 Glass Street, District 1, HCMC',
        span: 2
      }, {
        label: 'Renewal',
        children: '2026-12-01'
      }]} />
      </Card>
    </div>
}`,...(fe=(ye=H.parameters)==null?void 0:ye.docs)==null?void 0:fe.source}}};const gs=["AvatarsBadgesTags","ProgressAndStats","TableStory","ListsAndCollapse","TimelineDescriptions"];export{K as AvatarsBadgesTags,G as ListsAndCollapse,F as ProgressAndStats,O as TableStory,H as TimelineDescriptions,gs as __namedExportsOrder,us as default};
