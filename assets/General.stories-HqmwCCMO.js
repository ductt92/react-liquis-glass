import{j as e}from"./jsx-runtime-SKoiH9zj.js";import{r as A}from"./index-DJO9vBfz.js";import{B as n,I as o,a as G}from"./Button-CZxOoP0y.js";import{C as h,T as t,S as z,D as H,P as R,a as m,H as E,b as q,c as U,d as M,e as s,f as g}from"./Card-DqrLraUh.js";import{S as r,D as j}from"./Layout-CkPPsACS.js";import"./index-B8H_dQMV.js";const K={title:"General",component:n,args:{children:"Button",variant:"glass",color:"default",size:"md",shape:"default",loading:!1,disabled:!1,block:!1},argTypes:{variant:{control:"inline-radio",options:["glass","filled","tinted","outline","text","link"]},color:{control:"inline-radio",options:["default","primary","success","warning","danger","info"]},size:{control:"inline-radio",options:["sm","md","lg"]},shape:{control:"inline-radio",options:["default","round","circle"]}}},l={render:i=>e.jsx(n,{...i})},c={render:()=>e.jsx(h,{children:["glass","filled","tinted","outline","text","link"].map(i=>e.jsxs("div",{children:[e.jsx("div",{className:"sb-section-title",children:i}),e.jsx(r,{wrap:!0,children:["default","primary","success","warning","danger","info"].map(a=>e.jsx(n,{variant:i,color:a,children:a},a))})]},i))})},d={render:()=>e.jsxs(h,{children:[e.jsx("div",{className:"sb-section-title",children:"Sizes"}),e.jsxs(r,{children:[e.jsx(n,{size:"sm",variant:"filled",color:"primary",children:"Small"}),e.jsx(n,{variant:"filled",color:"primary",children:"Medium"}),e.jsx(n,{size:"lg",variant:"filled",color:"primary",children:"Large"})]}),e.jsx("div",{className:"sb-section-title",children:"With icons"}),e.jsxs(r,{wrap:!0,children:[e.jsx(n,{icon:e.jsx(R,{}),variant:"filled",color:"primary",children:"New"}),e.jsx(n,{icon:e.jsx(H,{}),children:"Download"}),e.jsx(n,{icon:e.jsx(m,{}),iconPosition:"end",variant:"tinted",color:"primary",children:"Next"}),e.jsx(o,{"aria-label":"Like",icon:e.jsx(E,{}),color:"danger"}),e.jsx(o,{"aria-label":"Share",icon:e.jsx(q,{}),variant:"filled",color:"primary"}),e.jsx(o,{"aria-label":"Delete",icon:e.jsx(U,{}),variant:"tinted",color:"danger",size:"lg"}),e.jsx(o,{"aria-label":"Settings",icon:e.jsx(z,{}),size:"sm"})]}),e.jsx("div",{className:"sb-section-title",children:"States"}),e.jsxs(r,{children:[e.jsx(n,{loading:!0,variant:"filled",color:"primary",children:"Saving"}),e.jsx(n,{loading:!0}),e.jsx(n,{disabled:!0,children:"Disabled"})]}),e.jsx("div",{className:"sb-section-title",children:"Group & block"}),e.jsxs(G,{children:[e.jsx(n,{icon:e.jsx(M,{}),children:"Prev"}),e.jsx(n,{children:"Today"}),e.jsx(n,{icon:e.jsx(m,{}),iconPosition:"end",children:"Next"})]}),e.jsx("div",{style:{marginTop:12},children:e.jsx(n,{block:!0,variant:"filled",color:"primary",children:"Block button"})})]})},u={render:()=>e.jsxs(h,{style:{maxWidth:720},children:[e.jsx(s,{level:1,children:"Heading 1"}),e.jsx(s,{level:2,children:"Heading 2"}),e.jsx(s,{level:3,children:"Heading 3"}),e.jsx(s,{level:4,children:"Heading 4"}),e.jsx(s,{level:5,children:"Heading 5"}),e.jsxs(g,{children:["Liquid glass is a translucent material that reflects and refracts its surroundings. Use ",e.jsx(t,{code:!0,children:"backdrop-filter"})," for depth,",e.jsx(t,{mark:!0,children:" highlight "})," important bits, and keep text ",e.jsx(t,{strong:!0,children:"legible"}),"."]}),e.jsxs(r,{wrap:!0,split:e.jsx(j,{vertical:!0}),children:[e.jsx(t,{children:"Default"}),e.jsx(t,{type:"secondary",children:"Secondary"}),e.jsx(t,{type:"tertiary",children:"Tertiary"}),e.jsx(t,{type:"accent",children:"Accent"}),e.jsx(t,{type:"success",children:"Success"}),e.jsx(t,{type:"warning",children:"Warning"}),e.jsx(t,{type:"danger",children:"Danger"}),e.jsx(t,{delete:!0,children:"Deleted"}),e.jsx(t,{underline:!0,children:"Underline"}),e.jsx(t,{italic:!0,children:"Italic"})]}),e.jsx(j,{children:"Ellipsis"}),e.jsx(g,{ellipsis:2,style:{maxWidth:360},children:"This is a very long paragraph that will be clamped to two lines. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."})]})},p=A.forwardRef(({to:i,...a},W)=>e.jsx("a",{ref:W,href:`#${i}`,...a})),x={name:"As a router link",render:()=>e.jsxs(h,{children:[e.jsxs(t,{type:"secondary",children:[e.jsx("code",{children:"as"})," renders the button as another component, so it can be a router link: ",e.jsx("code",{children:'<Button as={Link} to="/settings">'}),". Disabled links can't be clicked or reached with Tab."]}),e.jsxs(r,{wrap:!0,style:{marginTop:12},children:[e.jsx(n,{as:p,to:"/settings",variant:"filled",color:"primary",icon:e.jsx(z,{}),children:"Settings"}),e.jsx(n,{as:p,to:"/downloads",icon:e.jsx(H,{}),children:"Downloads"}),e.jsx(o,{as:p,to:"/new","aria-label":"New item",icon:e.jsx(R,{})}),e.jsx(n,{as:p,to:"/nowhere",disabled:!0,children:"Disabled link"})]})]})};var v,y,T;l.parameters={...l.parameters,docs:{...(v=l.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: a => <Button {...a} />
}`,...(T=(y=l.parameters)==null?void 0:y.docs)==null?void 0:T.source}}};var b,f,B;c.parameters={...c.parameters,docs:{...(b=c.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => <Card>
      {(['glass', 'filled', 'tinted', 'outline', 'text', 'link'] as const).map(v => <div key={v}>
          <div className="sb-section-title">{v}</div>
          <Space wrap>
            {(['default', 'primary', 'success', 'warning', 'danger', 'info'] as const).map(c => <Button key={c} variant={v} color={c}>{c}</Button>)}
          </Space>
        </div>)}
    </Card>
}`,...(B=(f=c.parameters)==null?void 0:f.docs)==null?void 0:B.source}}};var S,k,w;d.parameters={...d.parameters,docs:{...(S=d.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => <Card>
      <div className="sb-section-title">Sizes</div>
      <Space>
        <Button size="sm" variant="filled" color="primary">Small</Button>
        <Button variant="filled" color="primary">Medium</Button>
        <Button size="lg" variant="filled" color="primary">Large</Button>
      </Space>
      <div className="sb-section-title">With icons</div>
      <Space wrap>
        <Button icon={<PlusIcon />} variant="filled" color="primary">New</Button>
        <Button icon={<DownloadIcon />}>Download</Button>
        <Button icon={<ChevronRightIcon />} iconPosition="end" variant="tinted" color="primary">Next</Button>
        <IconButton aria-label="Like" icon={<HeartIcon />} color="danger" />
        <IconButton aria-label="Share" icon={<ShareIcon />} variant="filled" color="primary" />
        <IconButton aria-label="Delete" icon={<TrashIcon />} variant="tinted" color="danger" size="lg" />
        <IconButton aria-label="Settings" icon={<SettingsIcon />} size="sm" />
      </Space>
      <div className="sb-section-title">States</div>
      <Space>
        <Button loading variant="filled" color="primary">Saving</Button>
        <Button loading />
        <Button disabled>Disabled</Button>
      </Space>
      <div className="sb-section-title">Group & block</div>
      <ButtonGroup>
        <Button icon={<ChevronLeftIcon />}>Prev</Button>
        <Button>Today</Button>
        <Button icon={<ChevronRightIcon />} iconPosition="end">Next</Button>
      </ButtonGroup>
      <div style={{
      marginTop: 12
    }}><Button block variant="filled" color="primary">Block button</Button></div>
    </Card>
}`,...(w=(k=d.parameters)==null?void 0:k.docs)==null?void 0:w.source}}};var I,D,L;u.parameters={...u.parameters,docs:{...(I=u.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => <Card style={{
    maxWidth: 720
  }}>
      <Title level={1}>Heading 1</Title>
      <Title level={2}>Heading 2</Title>
      <Title level={3}>Heading 3</Title>
      <Title level={4}>Heading 4</Title>
      <Title level={5}>Heading 5</Title>
      <Paragraph>
        Liquid glass is a translucent material that reflects and refracts its surroundings. Use <Text code>backdrop-filter</Text> for depth,
        <Text mark> highlight </Text> important bits, and keep text <Text strong>legible</Text>.
      </Paragraph>
      <Space wrap split={<Divider vertical />}>
        <Text>Default</Text>
        <Text type="secondary">Secondary</Text>
        <Text type="tertiary">Tertiary</Text>
        <Text type="accent">Accent</Text>
        <Text type="success">Success</Text>
        <Text type="warning">Warning</Text>
        <Text type="danger">Danger</Text>
        <Text delete>Deleted</Text>
        <Text underline>Underline</Text>
        <Text italic>Italic</Text>
      </Space>
      <Divider>Ellipsis</Divider>
      <Paragraph ellipsis={2} style={{
      maxWidth: 360
    }}>
        This is a very long paragraph that will be clamped to two lines. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </Paragraph>
    </Card>
}`,...(L=(D=u.parameters)==null?void 0:D.docs)==null?void 0:L.source}}};var N,P,C;x.parameters={...x.parameters,docs:{...(N=x.parameters)==null?void 0:N.docs,source:{originalSource:`{
  name: 'As a router link',
  render: () => <Card>
      <Text type="secondary">
        <code>as</code> renders the button as another component, so it can be a router link: <code>{'<Button as={Link} to="/settings">'}</code>.
        Disabled links can't be clicked or reached with Tab.
      </Text>
      <Space wrap style={{
      marginTop: 12
    }}>
        <Button as={RouterLink} to="/settings" variant="filled" color="primary" icon={<SettingsIcon />}>Settings</Button>
        <Button as={RouterLink} to="/downloads" icon={<DownloadIcon />}>Downloads</Button>
        <IconButton as={RouterLink} to="/new" aria-label="New item" icon={<PlusIcon />} />
        <Button as={RouterLink} to="/nowhere" disabled>Disabled link</Button>
      </Space>
    </Card>
}`,...(C=(P=x.parameters)==null?void 0:P.docs)==null?void 0:C.source}}};const Q=["Playground","Variants","SizesIconsStates","Typography","AsRouterLink"];export{x as AsRouterLink,l as Playground,d as SizesIconsStates,u as Typography,c as Variants,Q as __namedExportsOrder,K as default};
