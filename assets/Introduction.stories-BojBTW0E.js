import{j as e}from"./jsx-runtime-SKoiH9zj.js";import{r as j}from"./index-DJO9vBfz.js";import{I as l,B as t}from"./Button-CZxOoP0y.js";import{h as c,B as d,i as f,C as s,M as y,j as b,k as v,T as i,e as S,l as I,H as T,m as B,U as w,S as k}from"./Card-DqrLraUh.js";import{F as a,S as x}from"./Layout-CkPPsACS.js";import{S as F,a as C,b as n}from"./Selection-CqGRrs-k.js";import{B as P,A as u,S as G,T as N}from"./Display-BLNY7I4x.js";import{P as A}from"./Progress-BklSA23B.js";import{N as q,T as z}from"./Navigation-B3phbEwk.js";import"./index-B8H_dQMV.js";import"./ConfigProvider-BC9dizFH.js";import"./index-BO0JoVgK.js";const J={title:"Introduction"},r={render:()=>{const[o,h]=j.useState(!0);return e.jsxs(a,{vertical:!0,gap:"lg",style:{maxWidth:1080,margin:"0 auto"},children:[e.jsx(q,{floating:!0,logo:e.jsx(f,{size:22,color:"var(--lg-accent)"}),title:"Liquid Glass UI",right:e.jsxs(x,{children:[e.jsx(l,{"aria-label":"Search",icon:e.jsx(c,{})}),e.jsx(P,{count:3,children:e.jsx(l,{"aria-label":"Notifications",icon:e.jsx(d,{})})}),e.jsx(u,{status:"online",children:"TD"})]}),children:e.jsx(F,{options:["Overview","Library","Settings"],size:"sm"})}),e.jsxs("div",{className:"sb-grid",children:[e.jsxs(s,{title:"Revenue",extra:e.jsx(N,{color:"success",children:"+12%"}),children:[e.jsx(G,{value:48392.5,precision:2,prefix:"$",trend:{value:"12.4% vs last week",direction:"up"}}),e.jsx(A,{percent:72,strokeColor:["#0a84ff","#bf5af2"]})]}),e.jsx(s,{title:"Now Playing",subtitle:"Liquid Dreams — Glass Echo",children:e.jsxs(a,{align:"center",gap:"md",children:[e.jsx(u,{shape:"square",size:"lg",color:"#ff375f",icon:e.jsx(y,{})}),e.jsx(a,{vertical:!0,flex:1,gap:4,children:e.jsx(C,{defaultValue:38,tooltip:!1})}),e.jsx(l,{variant:"filled",color:"primary","aria-label":"Play",icon:o?e.jsx(b,{}):e.jsx(v,{}),onClick:()=>h(!o)})]})}),e.jsx(s,{title:"Controls",children:e.jsxs(a,{vertical:!0,gap:"md",children:[e.jsxs(a,{justify:"space-between",align:"center",children:[e.jsx(i,{children:"Wi-Fi"}),e.jsx(n,{defaultChecked:!0})]}),e.jsxs(a,{justify:"space-between",align:"center",children:[e.jsx(i,{children:"Focus mode"}),e.jsx(n,{})]}),e.jsxs(a,{justify:"space-between",align:"center",children:[e.jsx(i,{children:"Reduce motion"}),e.jsx(n,{size:"sm"})]})]})})]}),e.jsxs(s,{children:[e.jsx(S,{level:2,children:"Glass, refracted."}),e.jsx(i,{type:"secondary",children:"Material & Ant Design–style components with an Apple-like liquid glass finish. Toggle theme & wallpaper from the toolbar."}),e.jsxs(x,{style:{marginTop:20},wrap:!0,children:[e.jsx(t,{variant:"filled",color:"primary",icon:e.jsx(I,{}),children:"Get started"}),e.jsx(t,{children:"Glass"}),e.jsx(t,{variant:"tinted",color:"success",children:"Tinted"}),e.jsx(t,{variant:"outline",color:"danger",icon:e.jsx(T,{}),children:"Outline"})]})]}),e.jsx(a,{justify:"center",children:e.jsx(z,{items:[{key:"home",label:"Home",icon:e.jsx(B,{})},{key:"search",label:"Search",icon:e.jsx(c,{})},{key:"inbox",label:"Inbox",icon:e.jsx(d,{}),badge:2},{key:"me",label:"Profile",icon:e.jsx(w,{})},{key:"settings",label:"Settings",icon:e.jsx(k,{})}]})})]})}};var p,g,m;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => {
    const [playing, setPlaying] = React.useState(true);
    return <Flex vertical gap="lg" style={{
      maxWidth: 1080,
      margin: '0 auto'
    }}>
        <NavBar floating logo={<DropletIcon size={22} color="var(--lg-accent)" />} title="Liquid Glass UI" right={<Space>
              <IconButton aria-label="Search" icon={<SearchIcon />} />
              <Badge count={3}>
                <IconButton aria-label="Notifications" icon={<BellIcon />} />
              </Badge>
              <Avatar status="online">TD</Avatar>
            </Space>}>
          <Segmented options={['Overview', 'Library', 'Settings']} size="sm" />
        </NavBar>
        <div className="sb-grid">
          <Card title="Revenue" extra={<Tag color="success">+12%</Tag>}>
            <Statistic value={48392.5} precision={2} prefix="$" trend={{
            value: '12.4% vs last week',
            direction: 'up'
          }} />
            <Progress percent={72} strokeColor={['#0a84ff', '#bf5af2']} />
          </Card>
          <Card title="Now Playing" subtitle="Liquid Dreams — Glass Echo">
            <Flex align="center" gap="md">
              <Avatar shape="square" size="lg" color="#ff375f" icon={<MusicIcon />} />
              <Flex vertical flex={1} gap={4}>
                <Slider defaultValue={38} tooltip={false} />
              </Flex>
              <IconButton variant="filled" color="primary" aria-label="Play" icon={playing ? <PauseIcon /> : <PlayIcon />} onClick={() => setPlaying(!playing)} />
            </Flex>
          </Card>
          <Card title="Controls">
            <Flex vertical gap="md">
              <Flex justify="space-between" align="center"><Text>Wi-Fi</Text><Switch defaultChecked /></Flex>
              <Flex justify="space-between" align="center"><Text>Focus mode</Text><Switch /></Flex>
              <Flex justify="space-between" align="center"><Text>Reduce motion</Text><Switch size="sm" /></Flex>
            </Flex>
          </Card>
        </div>
        <Card>
          <Title level={2}>Glass, refracted.</Title>
          <Text type="secondary">Material & Ant Design–style components with an Apple-like liquid glass finish. Toggle theme & wallpaper from the toolbar.</Text>
          <Space style={{
          marginTop: 20
        }} wrap>
            <Button variant="filled" color="primary" icon={<SparklesIcon />}>Get started</Button>
            <Button>Glass</Button>
            <Button variant="tinted" color="success">Tinted</Button>
            <Button variant="outline" color="danger" icon={<HeartIcon />}>Outline</Button>
          </Space>
        </Card>
        <Flex justify="center">
          <TabBar items={[{
          key: 'home',
          label: 'Home',
          icon: <HomeIcon />
        }, {
          key: 'search',
          label: 'Search',
          icon: <SearchIcon />
        }, {
          key: 'inbox',
          label: 'Inbox',
          icon: <BellIcon />,
          badge: 2
        }, {
          key: 'me',
          label: 'Profile',
          icon: <UserIcon />
        }, {
          key: 'settings',
          label: 'Settings',
          icon: <SettingsIcon />
        }]} />
        </Flex>
      </Flex>;
  }
}`,...(m=(g=r.parameters)==null?void 0:g.docs)==null?void 0:m.source}}};const K=["Showcase"];export{r as Showcase,K as __namedExportsOrder,J as default};
