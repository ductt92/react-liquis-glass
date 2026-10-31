import{j as e}from"./jsx-runtime-SKoiH9zj.js";import{B as n}from"./Button-CZxOoP0y.js";import{C as t,T as a,H as w,p as N,b as D,q as A}from"./Card-DqrLraUh.js";import{F as S,R as F,C as r,S as p,D as i}from"./Layout-CkPPsACS.js";import{A as R}from"./Display-BLNY7I4x.js";import"./index-DJO9vBfz.js";import"./index-B8H_dQMV.js";import"./ConfigProvider-BC9dizFH.js";import"./index-BO0JoVgK.js";const E={title:"Layout"},s=({children:x})=>e.jsx("div",{className:"lg-glass",style:{padding:14,borderRadius:12,textAlign:"center"},children:x}),o={render:()=>e.jsx(t,{title:"Row / Col — 24 columns",children:e.jsxs(F,{gutter:[12,12],children:[e.jsx(r,{span:24,children:e.jsx(s,{children:"24"})}),e.jsx(r,{span:12,children:e.jsx(s,{children:"12"})}),e.jsx(r,{span:12,children:e.jsx(s,{children:"12"})}),e.jsx(r,{span:8,children:e.jsx(s,{children:"8"})}),e.jsx(r,{span:8,children:e.jsx(s,{children:"8"})}),e.jsx(r,{span:8,children:e.jsx(s,{children:"8"})}),e.jsx(r,{span:6,children:e.jsx(s,{children:"6"})}),e.jsx(r,{span:6,offset:12,children:e.jsx(s,{children:"6 offset 12"})}),e.jsx(r,{xs:24,md:12,lg:6,children:e.jsx(s,{children:"xs24 md12 lg6"})}),e.jsx(r,{xs:24,md:12,lg:6,children:e.jsx(s,{children:"xs24 md12 lg6"})}),e.jsx(r,{xs:24,md:12,lg:6,children:e.jsx(s,{children:"xs24 md12 lg6"})}),e.jsx(r,{xs:24,md:12,lg:6,children:e.jsx(s,{children:"xs24 md12 lg6"})})]})})},l={render:()=>e.jsxs(t,{children:[e.jsx("div",{className:"sb-section-title",children:"Space"}),e.jsxs(p,{size:"md",children:[e.jsx(n,{children:"One"}),e.jsx(n,{children:"Two"}),e.jsx(n,{children:"Three"})]}),e.jsx("div",{className:"sb-section-title",children:"Space with split"}),e.jsxs(p,{split:e.jsx(i,{vertical:!0}),children:[e.jsx(a,{children:"Docs"}),e.jsx(a,{children:"Blog"}),e.jsx(a,{children:"GitHub"})]}),e.jsx("div",{className:"sb-section-title",children:"Flex"}),e.jsxs(S,{justify:"space-between",align:"center",gap:"md",children:[e.jsx(s,{children:"Left"}),e.jsx(s,{children:"Center"}),e.jsx(s,{children:"Right"})]}),e.jsx(i,{children:"Text"}),e.jsx(i,{orientation:"left",children:"Left text"}),e.jsx(i,{dashed:!0})]})},d={render:()=>e.jsxs("div",{className:"sb-grid",children:[e.jsx(t,{title:"Basic card",extra:e.jsx(n,{variant:"link",color:"primary",children:"More"}),children:e.jsx(a,{type:"secondary",children:"Card content sits on a liquid glass surface."})}),e.jsx(t,{hoverable:!0,cover:e.jsx("img",{alt:"",height:160,src:"https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&q=60"}),title:"Hoverable with cover",subtitle:"Yosemite National Park",actions:[e.jsx(w,{},"1"),e.jsx(N,{},"2"),e.jsx(D,{},"3"),e.jsx(A,{},"4")],children:e.jsxs(S,{align:"center",gap:"sm",children:[e.jsx(R,{size:"sm",children:"AN"}),e.jsx(a,{type:"secondary",children:"by Anna"})]})}),e.jsx(t,{title:"Strong variant",variant:"strong",children:e.jsx(a,{type:"secondary",children:"More opaque glass for dense content."})}),e.jsx(t,{title:"Loading",loading:!0}),e.jsx(t,{title:"Plain",variant:"plain",size:"sm",children:e.jsx(a,{type:"secondary",children:"No glass, small padding."})})]})},c={name:"Card: bare and as",render:()=>e.jsxs("div",{className:"sb-grid",children:[e.jsxs(t,{as:"section",bare:!0,"aria-label":"Stats",style:{display:"flex",flexDirection:"column",gap:6,padding:20},children:[e.jsxs(a,{type:"secondary",children:[e.jsx("code",{children:"bare"})," drops the body wrapper and its padding, so the card's own flex layout and gap apply to its children.",e.jsx("code",{children:' as="section"'})," sets the root element."]}),e.jsx(a,{strong:!0,children:"1,284 visitors"}),e.jsx(a,{type:"secondary",children:"+12% this week"})]}),e.jsxs(t,{as:"form",bare:!0,style:{display:"grid",gap:10,padding:20},onSubmit:x=>x.preventDefault(),children:[e.jsx(a,{strong:!0,children:"A form that is a card"}),e.jsx(n,{type:"submit",variant:"filled",color:"primary",children:"Save"})]})]})};var h,m,g;o.parameters={...o.parameters,docs:{...(h=o.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => <Card title="Row / Col — 24 columns">
      <Row gutter={[12, 12]}>
        <Col span={24}><Box>24</Box></Col>
        <Col span={12}><Box>12</Box></Col>
        <Col span={12}><Box>12</Box></Col>
        <Col span={8}><Box>8</Box></Col>
        <Col span={8}><Box>8</Box></Col>
        <Col span={8}><Box>8</Box></Col>
        <Col span={6}><Box>6</Box></Col>
        <Col span={6} offset={12}><Box>6 offset 12</Box></Col>
        <Col xs={24} md={12} lg={6}><Box>xs24 md12 lg6</Box></Col>
        <Col xs={24} md={12} lg={6}><Box>xs24 md12 lg6</Box></Col>
        <Col xs={24} md={12} lg={6}><Box>xs24 md12 lg6</Box></Col>
        <Col xs={24} md={12} lg={6}><Box>xs24 md12 lg6</Box></Col>
      </Row>
    </Card>
}`,...(g=(m=o.parameters)==null?void 0:m.docs)==null?void 0:g.source}}};var j,u,C;l.parameters={...l.parameters,docs:{...(j=l.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => <Card>
      <div className="sb-section-title">Space</div>
      <Space size="md"><Button>One</Button><Button>Two</Button><Button>Three</Button></Space>
      <div className="sb-section-title">Space with split</div>
      <Space split={<Divider vertical />}><Text>Docs</Text><Text>Blog</Text><Text>GitHub</Text></Space>
      <div className="sb-section-title">Flex</div>
      <Flex justify="space-between" align="center" gap="md">
        <Box>Left</Box><Box>Center</Box><Box>Right</Box>
      </Flex>
      <Divider>Text</Divider>
      <Divider orientation="left">Left text</Divider>
      <Divider dashed />
    </Card>
}`,...(C=(u=l.parameters)==null?void 0:u.docs)==null?void 0:C.source}}};var v,y,B;d.parameters={...d.parameters,docs:{...(v=d.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => <div className="sb-grid">
      <Card title="Basic card" extra={<Button variant="link" color="primary">More</Button>}>
        <Text type="secondary">Card content sits on a liquid glass surface.</Text>
      </Card>
      <Card hoverable cover={<img alt="" height={160} src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&q=60" />} title="Hoverable with cover" subtitle="Yosemite National Park" actions={[<HeartIcon key="1" />, <MessageCircleIcon key="2" />, <ShareIcon key="3" />, <MoreHorizontalIcon key="4" />]}>
        <Flex align="center" gap="sm"><Avatar size="sm">AN</Avatar><Text type="secondary">by Anna</Text></Flex>
      </Card>
      <Card title="Strong variant" variant="strong"><Text type="secondary">More opaque glass for dense content.</Text></Card>
      <Card title="Loading" loading />
      <Card title="Plain" variant="plain" size="sm"><Text type="secondary">No glass, small padding.</Text></Card>
    </div>
}`,...(B=(y=d.parameters)==null?void 0:y.docs)==null?void 0:B.source}}};var b,f,T;c.parameters={...c.parameters,docs:{...(b=c.parameters)==null?void 0:b.docs,source:{originalSource:`{
  name: 'Card: bare and as',
  render: () => <div className="sb-grid">
      <Card as="section" bare aria-label="Stats" style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      padding: 20
    }}>
        <Text type="secondary">
          <code>bare</code> drops the body wrapper and its padding, so the card's own flex layout and gap apply to its children.
          <code> as="section"</code> sets the root element.
        </Text>
        <Text strong>1,284 visitors</Text>
        <Text type="secondary">+12% this week</Text>
      </Card>
      <Card as="form" bare style={{
      display: 'grid',
      gap: 10,
      padding: 20
    }} onSubmit={(e: React.FormEvent) => e.preventDefault()}>
        <Text strong>A form that is a card</Text>
        <Button type="submit" variant="filled" color="primary">Save</Button>
      </Card>
    </div>
}`,...(T=(f=c.parameters)==null?void 0:f.docs)==null?void 0:T.source}}};const O=["Grid","SpaceFlexDivider","Cards","CardBareAndAs"];export{c as CardBareAndAs,d as Cards,o as Grid,l as SpaceFlexDivider,O as __namedExportsOrder,E as default};
