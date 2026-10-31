import{j as e}from"./jsx-runtime-SKoiH9zj.js";import{r as i}from"./index-DJO9vBfz.js";import{B as Ye}from"./Button-CZxOoP0y.js";import{h as Xe,o as Ze,r as ea,y as aa,n as la,ab as ta,a5 as sa,c as ra,C as m,ac as na,ad as ia,X as oa,ae as da,U as Ue,K as ca,T as pe,af as ua}from"./Card-DqrLraUh.js";import{F as p,S as pa}from"./Layout-CkPPsACS.js";import{I as c,P as ma,S as ha,T as xa,a as fe}from"./Input-FYYi5_Gr.js";import{C as Z,c as ga,R as oe,d as de,b as R,S as ee,a as ce,e as Y}from"./Selection-CqGRrs-k.js";import{a as be,u as fa,n as ue,c as L}from"./index-B8H_dQMV.js";import{u as $e}from"./ConfigProvider-BC9dizFH.js";import{P as ba}from"./Popup-BjQa9cNG.js";import{D as ae,C as va}from"./DatePicker-uZbs4jBI.js";import{P as ja}from"./Progress-BklSA23B.js";import{F as ya,a as q}from"./Form-CslnVbkO.js";import{m as He}from"./Toast-C5OHXVlZ.js";import"./index-BO0JoVgK.js";import"./client-CN2SRMON.js";const B=l=>"options"in l,ve=l=>l.searchText??(typeof l.label=="string"||typeof l.label=="number"?String(l.label):String(l.value));function _e(l){const n=$e(),{options:s,placeholder:d,size:j="md",disabled:x,allowClear:N,showSearch:P,status:I,notFoundContent:te,className:E,style:se,prefix:O,getPopupContainer:re}=l,A=d??n.select,ne=te??n.noOptions,u=l.multiple===!0,[b,g]=be(l.value,l.defaultValue??(u?[]:null),l.onChange),[h,M]=be(l.open,!1,l.onOpenChange),[k,F]=i.useState(""),[y,C]=i.useState(0),t=fa("lg-select"),f=i.useRef(null),v=i.useRef(null),T=i.useMemo(()=>s.flatMap(a=>B(a)?a.options:[a]),[s]),o=ue(k.trim()),D=i.useMemo(()=>s.map(a=>B(a)?{...a,options:a.options.filter(r=>!o||ue(ve(r)).includes(o))}:!o||ue(ve(a)).includes(o)?a:null).filter(a=>!!a&&(!B(a)||a.options.length>0)),[s,o]),G=D.flatMap(a=>B(a)?a.options:[a]),S=u?b:b==null?[]:[b],W=a=>S.includes(a);i.useEffect(()=>{h?(C(Math.max(0,G.findIndex(a=>W(a.value)))),setTimeout(()=>{var a;return(a=f.current)==null?void 0:a.focus()},30)):F("")},[h]),i.useEffect(()=>{var a,r;(r=(a=v.current)==null?void 0:a.querySelector(`[data-idx="${y}"]`))==null||r.scrollIntoView({block:"nearest"})},[y]);const me=a=>{a.disabled||(u?g(W(a.value)?S.filter(r=>r!==a.value):[...S,a.value]):(g(a.value),M(!1)))},he=a=>{if(!x){if(!h&&(a.key==="Enter"||a.key===" "||a.key==="ArrowDown")){a.preventDefault(),M(!0);return}if(h)if(a.key==="ArrowDown")a.preventDefault(),C(r=>Math.min(G.length-1,r+1));else if(a.key==="ArrowUp")a.preventDefault(),C(r=>Math.max(0,r-1));else if(a.key==="Enter"){a.preventDefault();const r=G[y];r&&me(r)}else a.key==="Backspace"&&u&&!k&&S.length&&g(S.slice(0,-1))}};let xe=-1;const ge=a=>{xe++;const r=xe;return e.jsxs("div",{role:"option","data-idx":r,"aria-selected":W(a.value),"aria-disabled":a.disabled,className:L("lg-select-option",W(a.value)&&"lg-selected",r===y&&"lg-active",a.disabled&&"lg-disabled"),onMouseEnter:()=>C(r),onMouseDown:ie=>ie.preventDefault(),onClick:()=>me(a),children:[a.icon&&e.jsx("span",{className:"lg-select-option-icon",children:a.icon}),e.jsx("span",{className:"lg-select-option-label",children:a.label}),W(a.value)&&e.jsx(la,{className:"lg-select-option-check"})]},String(a.value))},Je=e.jsxs("div",{className:"lg-select-dropdown lg-glass lg-glass-strong",onKeyDown:he,children:[P&&e.jsxs("div",{className:"lg-select-search",children:[e.jsx(Xe,{}),e.jsx("input",{ref:f,value:k,placeholder:n.search,"aria-controls":t,onChange:a=>{F(a.target.value),C(0)}})]}),e.jsxs("div",{id:t,ref:v,role:"listbox","aria-multiselectable":u,className:"lg-select-list",children:[G.length===0&&e.jsx("div",{className:"lg-select-empty",children:ne}),D.map((a,r)=>B(a)?e.jsxs("div",{role:"group",className:"lg-select-group",children:[e.jsx("div",{className:"lg-select-group-label",children:a.label}),a.options.map(ge)]},r):ge(a))]})]}),w=S.map(a=>T.find(r=>r.value===a)).filter(Boolean),z=u?l.maxTagCount:void 0,Qe=z!=null?w.slice(0,z):w;return e.jsx(ba,{content:Je,open:h&&!x,onOpenChange:M,trigger:"click",placement:"bottomLeft",matchWidth:!0,offset:6,role:"presentation",getPopupContainer:re,children:e.jsxs("div",{role:"combobox",tabIndex:x?-1:0,"aria-expanded":h,"aria-controls":t,"aria-haspopup":"listbox","aria-disabled":x,className:L("lg-select lg-input lg-glass",`lg-input-${j}`,h&&"lg-select-open",I&&`lg-input-${I}`,x&&"lg-input-disabled",u&&"lg-select-multiple",E),style:se,onKeyDown:he,children:[O&&e.jsx("span",{className:"lg-input-prefix",children:O}),e.jsxs("div",{className:"lg-select-value",children:[w.length===0&&e.jsx("span",{className:"lg-select-placeholder",children:A}),!u&&w[0]&&e.jsxs("span",{className:"lg-select-single",children:[w[0].icon,w[0].label]}),u&&Qe.map(a=>e.jsxs("span",{className:"lg-select-tag",children:[a.label,e.jsx("button",{type:"button",tabIndex:-1,"aria-label":n.remove,onClick:r=>{r.stopPropagation(),g(S.filter(ie=>ie!==a.value))},children:e.jsx(Ze,{})})]},String(a.value))),u&&z!=null&&w.length>z&&e.jsxs("span",{className:"lg-select-tag",children:["+",w.length-z]})]}),N&&S.length>0&&!x?e.jsx("button",{type:"button",tabIndex:-1,"aria-label":n.clear,className:"lg-input-clear lg-select-clear",onClick:a=>{a.stopPropagation(),g(u?[]:null)},children:e.jsx(ea,{})}):e.jsx(aa,{className:"lg-select-arrow"})]})})}const V=_e;_e.__docgenInfo={description:"",methods:[],displayName:"SelectImpl"};const Ca=l=>l<1024?`${l} B`:l<1048576?`${(l/1024).toFixed(1)} KB`:`${(l/1048576).toFixed(1)} MB`;let Sa=0;const Ke=({accept:l,multiple:n,disabled:s,maxCount:d,fileList:j,defaultFileList:x=[],onChange:N,beforeUpload:P,customRequest:I,dragger:te=!0,hint:E,children:se,className:O,showList:re=!0})=>{const A=$e(),[ne,u]=i.useState(x),b=j??ne,g=i.useRef(b);g.current=b;const h=i.useRef(null),[M,k]=i.useState(!1),F=t=>{g.current=t,j||u(t),N==null||N(t)},y=(t,f)=>F(g.current.map(v=>v.uid===t?{...v,...f}:v)),C=t=>{if(!t||s)return;const v=Array.from(t).filter(o=>(P==null?void 0:P(o))!==!1).map(o=>({uid:`lg-up-${++Sa}`,name:o.name,size:o.size,type:o.type,file:o,status:I?"uploading":"done",percent:I?0:100}));let T=[...g.current,...v];d&&(T=T.slice(-d)),F(T),I&&v.forEach(o=>I(o.file,D=>y(o.uid,{percent:D})).then(D=>y(o.uid,{status:"done",percent:100,url:D||void 0})).catch(()=>y(o.uid,{status:"error"})))};return e.jsxs("div",{className:L("lg-upload",s&&"lg-disabled",O),children:[e.jsxs("div",{role:"button",tabIndex:s?-1:0,className:L(te?"lg-upload-dragger lg-glass":"lg-upload-trigger",M&&"lg-upload-drag"),onClick:()=>{var t;return!s&&((t=h.current)==null?void 0:t.click())},onKeyDown:t=>{var f;return(t.key==="Enter"||t.key===" ")&&((f=h.current)==null?void 0:f.click())},onDragOver:t=>{t.preventDefault(),k(!0)},onDragLeave:()=>k(!1),onDrop:t=>{t.preventDefault(),k(!1),C(t.dataTransfer.files)},children:[e.jsx("input",{ref:h,type:"file",hidden:!0,accept:l,multiple:n,onChange:t=>(C(t.target.files),t.target.value="")}),se??e.jsxs(e.Fragment,{children:[e.jsx(ta,{className:"lg-upload-icon"}),e.jsx("div",{className:"lg-upload-text",children:A.uploadHint}),E&&e.jsx("div",{className:"lg-upload-hint",children:E})]})]}),re&&b.length>0&&e.jsx("ul",{className:"lg-upload-list",children:b.map(t=>e.jsxs("li",{className:L("lg-upload-item lg-glass",t.status==="error"&&"lg-upload-error"),children:[e.jsx(sa,{}),e.jsxs("div",{className:"lg-upload-item-main",children:[e.jsx("div",{className:"lg-upload-item-name",children:t.name}),t.status==="uploading"?e.jsx(ja,{percent:t.percent??0,size:"sm",showInfo:!1}):e.jsx("div",{className:"lg-upload-item-meta",children:t.status==="error"?A.uploadFailed:Ca(t.size)})]}),e.jsx("button",{type:"button","aria-label":`Remove ${t.name}`,onClick:()=>F(b.filter(f=>f.uid!==t.uid)),children:e.jsx(ra,{})})]},t.uid))})]})};Ke.__docgenInfo={description:"",methods:[],displayName:"Upload",props:{accept:{required:!1,tsType:{name:"string"},description:""},multiple:{required:!1,tsType:{name:"boolean"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:""},maxCount:{required:!1,tsType:{name:"number"},description:""},fileList:{required:!1,tsType:{name:"Array",elements:[{name:"UploadFile"}],raw:"UploadFile[]"},description:""},defaultFileList:{required:!1,tsType:{name:"Array",elements:[{name:"UploadFile"}],raw:"UploadFile[]"},description:"",defaultValue:{value:"[]",computed:!1}},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(files: UploadFile[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"UploadFile"}],raw:"UploadFile[]"},name:"files"}],return:{name:"void"}}},description:""},beforeUpload:{required:!1,tsType:{name:"signature",type:"function",raw:"(file: File) => boolean",signature:{arguments:[{type:{name:"File"},name:"file"}],return:{name:"boolean"}}},description:"Return false to reject a file."},customRequest:{required:!1,tsType:{name:"signature",type:"function",raw:"(file: File, onProgress: (percent: number) => void) => Promise<string | void>",signature:{arguments:[{type:{name:"File"},name:"file"},{type:{name:"signature",type:"function",raw:"(percent: number) => void",signature:{arguments:[{type:{name:"number"},name:"percent"}],return:{name:"void"}}},name:"onProgress"}],return:{name:"Promise",elements:[{name:"union",raw:"string | void",elements:[{name:"string"},{name:"void"}]}],raw:"Promise<string | void>"}}},description:"Called for each accepted file. Report progress with `onProgress(0–100)`\nand resolve/reject to finish. Without it, files are marked done instantly."},dragger:{required:!1,tsType:{name:"boolean"},description:"Dragger (drop zone) style. Default true.",defaultValue:{value:"true",computed:!1}},hint:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},className:{required:!1,tsType:{name:"string"},description:""},showList:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}}}};const Ea={title:"Data Entry"},U={render:()=>e.jsx(m,{style:{maxWidth:560},children:e.jsxs(p,{vertical:!0,gap:"md",children:[e.jsx(c,{placeholder:"Basic input"}),e.jsx(c,{prefix:e.jsx(Ue,{}),placeholder:"With prefix & clear",allowClear:!0,defaultValue:"Liquid"}),e.jsx(c,{addonBefore:"https://",addonAfter:".com",placeholder:"mysite"}),e.jsx(c,{placeholder:"Max length + count",maxLength:20,showCount:!0}),e.jsx(ma,{placeholder:"Password"}),e.jsx(ha,{placeholder:"Search…",onSearch:l=>He.info(`Search: ${l}`)}),e.jsxs(p,{gap:"sm",children:[e.jsx(c,{size:"sm",placeholder:"Small"}),e.jsx(c,{placeholder:"Medium"}),e.jsx(c,{size:"lg",placeholder:"Large"})]}),e.jsxs(p,{gap:"sm",children:[e.jsx(c,{variant:"filled",placeholder:"Filled"}),e.jsx(c,{variant:"outline",placeholder:"Outline"})]}),e.jsx(c,{status:"error",placeholder:"Error status"}),e.jsx(c,{status:"warning",placeholder:"Warning status"}),e.jsx(c,{disabled:!0,placeholder:"Disabled"}),e.jsx(xa,{placeholder:"Auto-size textarea",autoSize:{minRows:2,maxRows:6},showCount:!0,maxLength:200}),e.jsxs(p,{gap:"sm",align:"center",children:[e.jsx(fe,{defaultValue:3,min:0,max:10,style:{width:160}}),e.jsx(fe,{defaultValue:9.99,step:.01,precision:2,prefix:"$",style:{width:180}})]})]})})},le=["Apple","Banana","Cherry","Grape","Mango","Orange","Peach","Pear"].map(l=>({label:l,value:l.toLowerCase()})),$={render:()=>{const[l,n]=i.useState("banana"),[s,d]=i.useState(["apple","mango"]);return e.jsx(m,{style:{maxWidth:560},children:e.jsxs(p,{vertical:!0,gap:"md",children:[e.jsx(V,{options:le,value:l,onChange:n,allowClear:!0,placeholder:"Pick a fruit"}),e.jsx(V,{multiple:!0,options:le,value:s,onChange:d,showSearch:!0,placeholder:"Multiple with search"}),e.jsx(V,{showSearch:!0,prefix:e.jsx(ua,{}),placeholder:"Grouped options",options:[{label:"Asia",options:[{label:"Vietnam",value:"vn"},{label:"Japan",value:"jp"},{label:"Korea",value:"kr"}]},{label:"Europe",options:[{label:"France",value:"fr"},{label:"Germany",value:"de",disabled:!0}]}]}),e.jsx(V,{options:le,disabled:!0,placeholder:"Disabled"}),e.jsxs(pe,{type:"secondary",children:["Value: ",l??"—"," · Multi: ",s.join(", ")]})]})})}},H={render:()=>e.jsxs("div",{className:"sb-grid",children:[e.jsx(m,{title:"Checkbox",children:e.jsxs(p,{vertical:!0,gap:"md",children:[e.jsx(Z,{defaultChecked:!0,children:"Remember me"}),e.jsx(Z,{indeterminate:!0,children:"Indeterminate"}),e.jsx(Z,{disabled:!0,children:"Disabled"}),e.jsx(ga,{options:["React","Vue","Svelte"],defaultValue:["React"]})]})}),e.jsx(m,{title:"Radio",children:e.jsxs(p,{vertical:!0,gap:"md",children:[e.jsx(oe,{options:["Daily","Weekly","Monthly"],defaultValue:"Weekly"}),e.jsx(oe,{optionType:"button",options:["Day","Week","Month"],defaultValue:"Day"}),e.jsxs(oe,{direction:"vertical",defaultValue:1,children:[e.jsx(de,{value:1,children:"Option A"}),e.jsx(de,{value:2,children:"Option B"}),e.jsx(de,{value:3,disabled:!0,children:"Option C (disabled)"})]})]})}),e.jsx(m,{title:"Switch",children:e.jsxs(pa,{wrap:!0,size:"md",children:[e.jsx(R,{defaultChecked:!0}),e.jsx(R,{}),e.jsx(R,{size:"sm",defaultChecked:!0}),e.jsx(R,{checkedChildren:"ON",unCheckedChildren:"OFF",defaultChecked:!0}),e.jsx(R,{loading:!0,defaultChecked:!0}),e.jsx(R,{disabled:!0})]})}),e.jsx(m,{title:"Segmented",children:e.jsxs(p,{vertical:!0,gap:"md",children:[e.jsx(ee,{options:["Daily","Weekly","Monthly","Yearly"]}),e.jsx(ee,{size:"sm",options:[{label:"List",value:"list",icon:e.jsx(na,{})},{label:"Grid",value:"grid",icon:e.jsx(ia,{})},{label:"Board",value:"board",icon:e.jsx(oa,{})}]}),e.jsx(ee,{block:!0,options:["Map","Transit","Satellite"]})]})}),e.jsx(m,{title:"Slider",children:e.jsxs(p,{vertical:!0,gap:"lg",children:[e.jsx(ce,{defaultValue:40}),e.jsx(ce,{range:!0,defaultValue:[20,70]}),e.jsx(ce,{defaultValue:30,step:10,marks:{0:"0°C",30:"30°C",60:"60°C",100:"100°C"},tooltip:l=>`${l}°C`})]})}),e.jsx(m,{title:"Rate",children:e.jsxs(p,{vertical:!0,gap:"md",children:[e.jsx(Y,{defaultValue:3}),e.jsx(Y,{allowHalf:!0,defaultValue:2.5,size:"lg"}),e.jsx(Y,{character:e.jsx(da,{}),defaultValue:4}),e.jsx(Y,{disabled:!0,defaultValue:4,size:"sm"})]})})]})},_={render:()=>{const[l,n]=i.useState(new Date);return e.jsxs(p,{gap:"lg",wrap:!0,align:"flex-start",children:[e.jsx(m,{title:"DatePicker",style:{width:320},children:e.jsxs(p,{vertical:!0,gap:"md",children:[e.jsx(ae,{value:l,onChange:n}),e.jsx(ae,{placeholder:"No weekends",disabledDate:s=>s.getDay()===0||s.getDay()===6}),e.jsx(ae,{format:"DD/MM/YYYY",placeholder:"DD/MM/YYYY"})]})}),e.jsx(va,{bordered:!0,value:l,onChange:n})]})}},K={name:"Upload",render:()=>e.jsx(m,{style:{maxWidth:520},children:e.jsx(Ke,{multiple:!0,hint:"Supports images and PDF up to 10MB (demo simulates progress)",customRequest:(l,n)=>new Promise(s=>{let d=0;const j=setInterval(()=>{d+=20,n(d),d>=100&&(clearInterval(j),s())},250)})})})},J={render:()=>e.jsx(m,{title:"Create account",style:{maxWidth:520},children:e.jsxs(ya,{onSubmit:l=>(l.preventDefault(),He.success("Submitted!")),children:[e.jsx(q,{label:"Full name",required:!0,children:e.jsx(c,{placeholder:"Jane Doe",prefix:e.jsx(Ue,{})})}),e.jsx(q,{label:"Email",required:!0,status:"error",help:"Please enter a valid email",children:e.jsx(c,{placeholder:"jane@example.com",prefix:e.jsx(ca,{}),defaultValue:"jane@"})}),e.jsx(q,{label:"Role",extra:"You can change this later",children:e.jsx(V,{options:[{label:"Designer",value:"d"},{label:"Engineer",value:"e"}],placeholder:"Choose a role"})}),e.jsx(q,{label:"Birthday",children:e.jsx(ae,{})}),e.jsx(q,{children:e.jsx(Z,{children:"I agree to the terms"})}),e.jsx(Ye,{type:"submit",variant:"filled",color:"primary",block:!0,children:"Create account"})]})})},Q={name:"Segmented: two-line labels",render:()=>{const[l,n]=i.useState("all"),s=(d,j,x)=>({value:d,label:e.jsxs("span",{style:{display:"flex",flexDirection:"column",alignItems:"center",lineHeight:1.25},children:[e.jsx("b",{children:j}),e.jsx("small",{style:{opacity:.7},children:x})]})});return e.jsxs(m,{style:{maxWidth:560},children:[e.jsx(ee,{"aria-label":"Vowel group",block:!0,value:l,onChange:n,options:[s("a","a o e","Simple"),s("i","i","Starts with i"),s("u","u","Starts with u"),s("all","All","Whole table")]}),e.jsxs(pe,{type:"secondary",style:{display:"block",marginTop:12},children:["Items grow to fit their label. Value: ",l]})]})}},X={name:"Select inside fullscreen",render:()=>{const l=i.useRef(null),[n,s]=i.useState("banana");return e.jsx("div",{ref:l,className:"lg-glass",style:{padding:20,borderRadius:16,maxWidth:560},children:e.jsxs(p,{vertical:!0,gap:"md",children:[e.jsxs(pe,{type:"secondary",children:["While an element is in fullscreen, popups mount inside it instead of ",e.jsx("code",{children:"document.body"}),", so the dropdown stays visible. Set ",e.jsx("code",{children:"getPopupContainer"})," on ",e.jsx("code",{children:"ConfigProvider"})," or on a single ",e.jsx("code",{children:"Select"})," to choose another container."]}),e.jsx(V,{options:le,value:n,onChange:s,placeholder:"Pick a fruit"}),e.jsx(Ye,{onClick:()=>{var d;return document.fullscreenElement?document.exitFullscreen():(d=l.current)==null?void 0:d.requestFullscreen()},children:"Toggle fullscreen"})]})})}};var je,ye,Ce;U.parameters={...U.parameters,docs:{...(je=U.parameters)==null?void 0:je.docs,source:{originalSource:`{
  render: () => <Card style={{
    maxWidth: 560
  }}>
      <Flex vertical gap="md">
        <Input placeholder="Basic input" />
        <Input prefix={<UserIcon />} placeholder="With prefix & clear" allowClear defaultValue="Liquid" />
        <Input addonBefore="https://" addonAfter=".com" placeholder="mysite" />
        <Input placeholder="Max length + count" maxLength={20} showCount />
        <Password placeholder="Password" />
        <SearchInput placeholder="Search…" onSearch={v => message.info(\`Search: \${v}\`)} />
        <Flex gap="sm">
          <Input size="sm" placeholder="Small" />
          <Input placeholder="Medium" />
          <Input size="lg" placeholder="Large" />
        </Flex>
        <Flex gap="sm">
          <Input variant="filled" placeholder="Filled" />
          <Input variant="outline" placeholder="Outline" />
        </Flex>
        <Input status="error" placeholder="Error status" />
        <Input status="warning" placeholder="Warning status" />
        <Input disabled placeholder="Disabled" />
        <TextArea placeholder="Auto-size textarea" autoSize={{
        minRows: 2,
        maxRows: 6
      }} showCount maxLength={200} />
        <Flex gap="sm" align="center">
          <InputNumber defaultValue={3} min={0} max={10} style={{
          width: 160
        }} />
          <InputNumber defaultValue={9.99} step={0.01} precision={2} prefix="$" style={{
          width: 180
        }} />
        </Flex>
      </Flex>
    </Card>
}`,...(Ce=(ye=U.parameters)==null?void 0:ye.docs)==null?void 0:Ce.source}}};var Se,we,Ie;$.parameters={...$.parameters,docs:{...(Se=$.parameters)==null?void 0:Se.docs,source:{originalSource:`{
  render: () => {
    const [v, setV] = React.useState<string | null>('banana');
    const [multi, setMulti] = React.useState<string[]>(['apple', 'mango']);
    return <Card style={{
      maxWidth: 560
    }}>
        <Flex vertical gap="md">
          <Select options={fruits} value={v} onChange={setV} allowClear placeholder="Pick a fruit" />
          <Select multiple options={fruits} value={multi} onChange={setMulti} showSearch placeholder="Multiple with search" />
          <Select showSearch prefix={<GlobeIcon />} placeholder="Grouped options" options={[{
          label: 'Asia',
          options: [{
            label: 'Vietnam',
            value: 'vn'
          }, {
            label: 'Japan',
            value: 'jp'
          }, {
            label: 'Korea',
            value: 'kr'
          }]
        }, {
          label: 'Europe',
          options: [{
            label: 'France',
            value: 'fr'
          }, {
            label: 'Germany',
            value: 'de',
            disabled: true
          }]
        }]} />
          <Select options={fruits} disabled placeholder="Disabled" />
          <Text type="secondary">Value: {v ?? '—'} · Multi: {multi.join(', ')}</Text>
        </Flex>
      </Card>;
  }
}`,...(Ie=(we=$.parameters)==null?void 0:we.docs)==null?void 0:Ie.source}}};var ke,Fe,De;H.parameters={...H.parameters,docs:{...(ke=H.parameters)==null?void 0:ke.docs,source:{originalSource:`{
  render: () => <div className="sb-grid">
      <Card title="Checkbox">
        <Flex vertical gap="md">
          <Checkbox defaultChecked>Remember me</Checkbox>
          <Checkbox indeterminate>Indeterminate</Checkbox>
          <Checkbox disabled>Disabled</Checkbox>
          <CheckboxGroup options={['React', 'Vue', 'Svelte']} defaultValue={['React']} />
        </Flex>
      </Card>
      <Card title="Radio">
        <Flex vertical gap="md">
          <RadioGroup options={['Daily', 'Weekly', 'Monthly']} defaultValue="Weekly" />
          <RadioGroup optionType="button" options={['Day', 'Week', 'Month']} defaultValue="Day" />
          <RadioGroup direction="vertical" defaultValue={1}>
            <Radio value={1}>Option A</Radio>
            <Radio value={2}>Option B</Radio>
            <Radio value={3} disabled>Option C (disabled)</Radio>
          </RadioGroup>
        </Flex>
      </Card>
      <Card title="Switch">
        <Space wrap size="md">
          <Switch defaultChecked />
          <Switch />
          <Switch size="sm" defaultChecked />
          <Switch checkedChildren="ON" unCheckedChildren="OFF" defaultChecked />
          <Switch loading defaultChecked />
          <Switch disabled />
        </Space>
      </Card>
      <Card title="Segmented">
        <Flex vertical gap="md">
          <Segmented options={['Daily', 'Weekly', 'Monthly', 'Yearly']} />
          <Segmented size="sm" options={[{
          label: 'List',
          value: 'list',
          icon: <ListIcon />
        }, {
          label: 'Grid',
          value: 'grid',
          icon: <GridIcon />
        }, {
          label: 'Board',
          value: 'board',
          icon: <DashboardIcon />
        }]} />
          <Segmented block options={['Map', 'Transit', 'Satellite']} />
        </Flex>
      </Card>
      <Card title="Slider">
        <Flex vertical gap="lg">
          <Slider defaultValue={40} />
          <Slider range defaultValue={[20, 70]} />
          <Slider defaultValue={30} step={10} marks={{
          0: '0°C',
          30: '30°C',
          60: '60°C',
          100: '100°C'
        }} tooltip={v => \`\${v}°C\`} />
        </Flex>
      </Card>
      <Card title="Rate">
        <Flex vertical gap="md">
          <Rate defaultValue={3} />
          <Rate allowHalf defaultValue={2.5} size="lg" />
          <Rate character={<HeartFilledIcon />} defaultValue={4} />
          <Rate disabled defaultValue={4} size="sm" />
        </Flex>
      </Card>
    </div>
}`,...(De=(Fe=H.parameters)==null?void 0:Fe.docs)==null?void 0:De.source}}};var Re,Ve,Ne;_.parameters={..._.parameters,docs:{...(Re=_.parameters)==null?void 0:Re.docs,source:{originalSource:`{
  render: () => {
    const [d, setD] = React.useState<Date | null>(new Date());
    return <Flex gap="lg" wrap align="flex-start">
        <Card title="DatePicker" style={{
        width: 320
      }}>
          <Flex vertical gap="md">
            <DatePicker value={d} onChange={setD} />
            <DatePicker placeholder="No weekends" disabledDate={x => x.getDay() === 0 || x.getDay() === 6} />
            <DatePicker format="DD/MM/YYYY" placeholder="DD/MM/YYYY" />
          </Flex>
        </Card>
        <Calendar bordered value={d} onChange={setD} />
      </Flex>;
  }
}`,...(Ne=(Ve=_.parameters)==null?void 0:Ve.docs)==null?void 0:Ne.source}}};var Pe,Me,Te;K.parameters={...K.parameters,docs:{...(Pe=K.parameters)==null?void 0:Pe.docs,source:{originalSource:`{
  name: 'Upload',
  render: () => <Card style={{
    maxWidth: 520
  }}>
      <Upload multiple hint="Supports images and PDF up to 10MB (demo simulates progress)" customRequest={(_file, onProgress) => new Promise(resolve => {
      let p = 0;
      const t = setInterval(() => {
        p += 20;
        onProgress(p);
        if (p >= 100) clearInterval(t), resolve();
      }, 250);
    })} />
    </Card>
}`,...(Te=(Me=K.parameters)==null?void 0:Me.docs)==null?void 0:Te.source}}};var We,ze,qe;J.parameters={...J.parameters,docs:{...(We=J.parameters)==null?void 0:We.docs,source:{originalSource:`{
  render: () => <Card title="Create account" style={{
    maxWidth: 520
  }}>
      <Form onSubmit={e => (e.preventDefault(), message.success('Submitted!'))}>
        <FormItem label="Full name" required>
          <Input placeholder="Jane Doe" prefix={<UserIcon />} />
        </FormItem>
        <FormItem label="Email" required status="error" help="Please enter a valid email">
          <Input placeholder="jane@example.com" prefix={<MailIcon />} defaultValue="jane@" />
        </FormItem>
        <FormItem label="Role" extra="You can change this later">
          <Select options={[{
          label: 'Designer',
          value: 'd'
        }, {
          label: 'Engineer',
          value: 'e'
        }]} placeholder="Choose a role" />
        </FormItem>
        <FormItem label="Birthday">
          <DatePicker />
        </FormItem>
        <FormItem>
          <Checkbox>I agree to the terms</Checkbox>
        </FormItem>
        <Button type="submit" variant="filled" color="primary" block>Create account</Button>
      </Form>
    </Card>
}`,...(qe=(ze=J.parameters)==null?void 0:ze.docs)==null?void 0:qe.source}}};var Be,Le,Ee;Q.parameters={...Q.parameters,docs:{...(Be=Q.parameters)==null?void 0:Be.docs,source:{originalSource:`{
  name: 'Segmented: two-line labels',
  render: () => {
    const [v, setV] = React.useState<string>('all');
    const opt = (value: string, title: string, sub: string) => ({
      value,
      label: <span style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        lineHeight: 1.25
      }}>
          <b>{title}</b>
          <small style={{
          opacity: 0.7
        }}>{sub}</small>
        </span>
    });
    return <Card style={{
      maxWidth: 560
    }}>
        <Segmented aria-label="Vowel group" block value={v} onChange={setV} options={[opt('a', 'a o e', 'Simple'), opt('i', 'i', 'Starts with i'), opt('u', 'u', 'Starts with u'), opt('all', 'All', 'Whole table')]} />
        <Text type="secondary" style={{
        display: 'block',
        marginTop: 12
      }}>Items grow to fit their label. Value: {v}</Text>
      </Card>;
  }
}`,...(Ee=(Le=Q.parameters)==null?void 0:Le.docs)==null?void 0:Ee.source}}};var Oe,Ae,Ge;X.parameters={...X.parameters,docs:{...(Oe=X.parameters)==null?void 0:Oe.docs,source:{originalSource:`{
  name: 'Select inside fullscreen',
  render: () => {
    const box = React.useRef<HTMLDivElement>(null);
    const [v, setV] = React.useState<string | null>('banana');
    return <div ref={box} className="lg-glass" style={{
      padding: 20,
      borderRadius: 16,
      maxWidth: 560
    }}>
        <Flex vertical gap="md">
          <Text type="secondary">
            While an element is in fullscreen, popups mount inside it instead of <code>document.body</code>, so the dropdown stays
            visible. Set <code>getPopupContainer</code> on <code>ConfigProvider</code> or on a single <code>Select</code> to choose
            another container.
          </Text>
          <Select options={fruits} value={v} onChange={setV} placeholder="Pick a fruit" />
          <Button onClick={() => document.fullscreenElement ? document.exitFullscreen() : box.current?.requestFullscreen()}>
            Toggle fullscreen
          </Button>
        </Flex>
      </div>;
  }
}`,...(Ge=(Ae=X.parameters)==null?void 0:Ae.docs)==null?void 0:Ge.source}}};const Oa=["Inputs","Selects","Choices","DatePickers","UploadStory","FormLayout","SegmentedMultiLine","SelectInFullscreen"];export{H as Choices,_ as DatePickers,J as FormLayout,U as Inputs,Q as SegmentedMultiLine,X as SelectInFullscreen,$ as Selects,K as UploadStory,Oa as __namedExportsOrder,Ea as default};
