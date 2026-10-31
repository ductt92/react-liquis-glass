import{j as e}from"./jsx-runtime-SKoiH9zj.js";import{I as A}from"./Button-CZxOoP0y.js";import{O as D,N as z,B as V,e as E,C as d,T as p,i as F,X as U,w as M,Y as $,L as G,F as O,S as P}from"./Card-DqrLraUh.js";import{F as W}from"./Layout-CkPPsACS.js";import{S as K}from"./Input-FYYi5_Gr.js";import{B as X,A as Y,S as b}from"./Display-BLNY7I4x.js";import{B as J,M as Q}from"./Navigation-B3phbEwk.js";import{r as m}from"./index-DJO9vBfz.js";import{c as o,a as Z}from"./index-B8H_dQMV.js";import"./ConfigProvider-BC9dizFH.js";import"./index-BO0JoVgK.js";const a=({hasSider:s,className:t,children:l,...g})=>{const j=s??m.Children.toArray(l).some(n=>m.isValidElement(n)&&n.type===y);return e.jsx("section",{className:o("lg-layout",j&&"lg-layout-has-sider",t),...g,children:l})},h=({sticky:s=!0,className:t,...l})=>e.jsx("header",{className:o("lg-layout-header lg-glass",s&&"lg-layout-header-sticky",t),...l}),H=m.createContext({collapsed:!1}),ee=()=>m.useContext(H),y=({width:s=248,collapsedWidth:t=76,collapsible:l,collapsed:g,defaultCollapsed:j=!1,onCollapse:n,trigger:v,sticky:w=!0,className:B,style:R,children:L,..._})=>{const[r,q]=Z(g,j,n),i=r?t:s;return e.jsx(H.Provider,{value:{collapsed:r},children:e.jsxs("aside",{className:o("lg-layout-sider lg-glass",r&&"lg-layout-sider-collapsed",w&&"lg-layout-sider-sticky",B),style:{width:i,flex:`0 0 ${typeof i=="number"?`${i}px`:i}`,...R},..._,children:[e.jsx("div",{className:"lg-layout-sider-children",children:L}),l&&v!==null&&e.jsx("button",{type:"button",className:"lg-layout-sider-trigger","aria-label":r?"Expand sidebar":"Collapse sidebar",onClick:()=>q(!r),children:v??(r?e.jsx(D,{}):e.jsx(z,{}))})]})})},x=({className:s,...t})=>e.jsx("main",{className:o("lg-layout-content",s),...t}),f=({className:s,...t})=>e.jsx("footer",{className:o("lg-layout-footer",s),...t});a.Header=h;a.Sider=y;a.Content=x;a.Footer=f;a.__docgenInfo={description:"Flex app shell: compose `Header`, `Sider`, `Content` and `Footer`.",methods:[{name:"Header",docblock:null,modifiers:["static"],params:[{name:"{ sticky = true, className, ...rest }",optional:!1,type:null}],returns:null},{name:"Sider",docblock:null,modifiers:["static"],params:[{name:`{
  width = 248,
  collapsedWidth = 76,
  collapsible,
  collapsed: collapsedProp,
  defaultCollapsed = false,
  onCollapse,
  trigger,
  sticky = true,
  className,
  style,
  children,
  ...rest
}`,optional:!1,type:null}],returns:null},{name:"Content",docblock:null,modifiers:["static"],params:[{name:"{ className, ...rest }",optional:!1,type:null}],returns:null},{name:"Footer",docblock:null,modifiers:["static"],params:[{name:"{ className, ...rest }",optional:!1,type:null}],returns:null}],displayName:"Layout"};h.__docgenInfo={description:"",methods:[],displayName:"Header",props:{sticky:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}}}};y.__docgenInfo={description:"",methods:[],displayName:"Sider",props:{width:{required:!1,tsType:{name:"union",raw:"number | string",elements:[{name:"number"},{name:"string"}]},description:"",defaultValue:{value:"248",computed:!1}},collapsedWidth:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"76",computed:!1}},collapsible:{required:!1,tsType:{name:"boolean"},description:""},collapsed:{required:!1,tsType:{name:"boolean"},description:""},defaultCollapsed:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},onCollapse:{required:!1,tsType:{name:"signature",type:"function",raw:"(collapsed: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"collapsed"}],return:{name:"void"}}},description:""},trigger:{required:!1,tsType:{name:"union",raw:"React.ReactNode | null",elements:[{name:"ReactReactNode",raw:"React.ReactNode"},{name:"null"}]},description:"Custom trigger. `null` hides the built-in trigger."},sticky:{required:!1,tsType:{name:"boolean"},description:"Stick to the viewport while the page scrolls.",defaultValue:{value:"true",computed:!1}}}};x.__docgenInfo={description:"",methods:[],displayName:"Content"};f.__docgenInfo={description:"",methods:[],displayName:"Footer"};const me={title:"App Shell",parameters:{layout:"fullscreen"}},se=()=>{const{collapsed:s}=ee();return e.jsxs(e.Fragment,{children:[e.jsxs(W,{align:"center",gap:"sm",style:{padding:"6px 10px 16px",justifyContent:s?"center":void 0},children:[e.jsx(F,{size:24,color:"var(--lg-accent)"}),!s&&e.jsx(p,{strong:!0,style:{fontSize:16},children:"Glass Admin"})]}),e.jsx(Q,{collapsed:s,glass:!1,defaultSelectedKey:"dash",items:[{key:"dash",label:"Dashboard",icon:e.jsx(U,{})},{key:"inbox",label:"Inbox",icon:e.jsx(M,{}),extra:"12"},{key:"team",label:"Team",icon:e.jsx($,{})},{key:"reports",label:"Reports",icon:e.jsx(G,{})},{key:"files",label:"Files",icon:e.jsx(O,{})},{key:"settings",label:"Settings",icon:e.jsx(P,{})}]})]})},c={render:()=>e.jsxs(a,{style:{minHeight:"100vh",margin:-32},children:[e.jsx(y,{collapsible:!0,children:e.jsx(se,{})}),e.jsxs(a,{children:[e.jsxs(h,{children:[e.jsx(J,{items:[{title:"Home",href:"#"},{title:"Dashboard"}]}),e.jsx("div",{style:{flex:1}}),e.jsx(K,{placeholder:"Search…",style:{width:220}}),e.jsx(X,{dot:!0,children:e.jsx(A,{"aria-label":"Notifications",icon:e.jsx(V,{})})}),e.jsx(Y,{size:"sm",status:"online",children:"TD"})]}),e.jsxs(x,{children:[e.jsx(E,{level:3,children:"Dashboard"}),e.jsxs("div",{className:"sb-grid",children:[e.jsx(d,{children:e.jsx(b,{title:"Revenue",value:48392,prefix:"$",trend:{value:"12%",direction:"up"}})}),e.jsx(d,{children:e.jsx(b,{title:"Users",value:1893,trend:{value:"4%",direction:"up"}})}),e.jsx(d,{children:e.jsx(b,{title:"Churn",value:2.1,precision:1,suffix:"%",trend:{value:"0.4%",direction:"down"}})})]}),e.jsx(d,{title:"Activity",style:{marginTop:16,minHeight:600},children:e.jsx(p,{type:"secondary",children:"Scroll to see the sticky glass header and sidebar."})})]}),e.jsx(f,{children:"Liquid Glass UI ©2026"})]})]})},u={render:()=>e.jsxs(a,{style:{minHeight:420,borderRadius:22,overflow:"hidden"},className:"lg-glass",children:[e.jsxs(h,{sticky:!1,children:[e.jsx(F,{size:22,color:"var(--lg-accent)"}),e.jsx(p,{strong:!0,children:"Top navigation layout"})]}),e.jsx(x,{children:e.jsx(p,{type:"secondary",children:"Content area"})}),e.jsx(f,{children:"Footer"})]})};var C,S,T;c.parameters={...c.parameters,docs:{...(C=c.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => <Layout style={{
    minHeight: '100vh',
    margin: -32
  }}>
      <Sider collapsible>
        <SideMenu />
      </Sider>
      <Layout>
        <Header>
          <Breadcrumb items={[{
          title: 'Home',
          href: '#'
        }, {
          title: 'Dashboard'
        }]} />
          <div style={{
          flex: 1
        }} />
          <SearchInput placeholder="Search…" style={{
          width: 220
        }} />
          <Badge dot>
            <IconButton aria-label="Notifications" icon={<BellIcon />} />
          </Badge>
          <Avatar size="sm" status="online">TD</Avatar>
        </Header>
        <Content>
          <Title level={3}>Dashboard</Title>
          <div className="sb-grid">
            <Card><Statistic title="Revenue" value={48392} prefix="$" trend={{
              value: '12%',
              direction: 'up'
            }} /></Card>
            <Card><Statistic title="Users" value={1893} trend={{
              value: '4%',
              direction: 'up'
            }} /></Card>
            <Card><Statistic title="Churn" value={2.1} precision={1} suffix="%" trend={{
              value: '0.4%',
              direction: 'down'
            }} /></Card>
          </div>
          <Card title="Activity" style={{
          marginTop: 16,
          minHeight: 600
        }}>
            <Text type="secondary">Scroll to see the sticky glass header and sidebar.</Text>
          </Card>
        </Content>
        <Footer>Liquid Glass UI ©2026</Footer>
      </Layout>
    </Layout>
}`,...(T=(S=c.parameters)==null?void 0:S.docs)==null?void 0:T.source}}};var I,N,k;u.parameters={...u.parameters,docs:{...(I=u.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => <Layout style={{
    minHeight: 420,
    borderRadius: 22,
    overflow: 'hidden'
  }} className="lg-glass">
      <Header sticky={false}>
        <DropletIcon size={22} color="var(--lg-accent)" />
        <Text strong>Top navigation layout</Text>
      </Header>
      <Content><Text type="secondary">Content area</Text></Content>
      <Footer>Footer</Footer>
    </Layout>
}`,...(k=(N=u.parameters)==null?void 0:N.docs)==null?void 0:k.source}}};const he=["AdminShell","HeaderContentFooter"];export{c as AdminShell,u as HeaderContentFooter,he as __namedExportsOrder,me as default};
