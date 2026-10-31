import{j as e}from"./jsx-runtime-SKoiH9zj.js";import{r as M}from"./index-DJO9vBfz.js";import{I as d,B as s}from"./Button-CZxOoP0y.js";import{h as g,u as V,B as L,i as R,m as x,v as U,w as A,U as N,C as r,F as E,x as G,T as m,y as q,z as _,A as J,b as W,c as H,G as Q,S as K,J as X,K as Y,L as Z}from"./Card-DqrLraUh.js";import{F as a}from"./Layout-CkPPsACS.js";import{b as ee}from"./Selection-CqGRrs-k.js";import{A as te}from"./Display-BLNY7I4x.js";import{N as h,M as y,T as ae,B as re,P as b,S as j,a as u}from"./Navigation-B3phbEwk.js";import{D as k}from"./Overlay-CdO35eOe.js";import{m as ie}from"./Toast-C5OHXVlZ.js";import"./index-B8H_dQMV.js";import"./ConfigProvider-BC9dizFH.js";import"./index-BO0JoVgK.js";import"./Popup-BjQa9cNG.js";import"./client-CN2SRMON.js";const ve={title:"Navigation"},l={name:"Tabs",render:()=>{const t=[{key:"overview",label:"Overview",icon:e.jsx(x,{}),children:e.jsx(m,{type:"secondary",children:"Overview content"})},{key:"analytics",label:"Analytics",icon:e.jsx(Z,{}),children:e.jsx(m,{type:"secondary",children:"Analytics content"})},{key:"settings",label:"Settings",icon:e.jsx(K,{}),children:e.jsx(m,{type:"secondary",children:"Settings content"})},{key:"disabled",label:"Disabled",disabled:!0}];return e.jsxs(a,{vertical:!0,gap:"lg",children:[e.jsx(r,{title:"Line",children:e.jsx(u,{"aria-label":"Dashboard sections",items:t})}),e.jsx(r,{title:"Pill",children:e.jsx(u,{variant:"pill",items:t})}),e.jsx(r,{title:"Card + extra",children:e.jsx(u,{variant:"card",size:"sm",items:t,tabBarExtra:e.jsx(s,{size:"sm",variant:"text",children:"+ Add"})})})]})}},o={render:()=>{const[t,i]=M.useState(1);return e.jsxs(a,{vertical:!0,gap:"lg",children:[e.jsx(r,{title:"Breadcrumb",children:e.jsx(re,{items:[{title:"Home",href:"#",icon:e.jsx(x,{})},{title:"Projects",href:"#",icon:e.jsx(E,{})},{title:"Liquid Glass",icon:e.jsx(G,{})}]})}),e.jsx(r,{title:"Pagination",children:e.jsxs(a,{vertical:!0,gap:"md",children:[e.jsx(b,{total:500,defaultCurrent:6,showTotal:(p,[O,$])=>`${O}-${$} of ${p}`}),e.jsx(b,{total:50,size:"sm"}),e.jsx(b,{total:120,simple:!0})]})}),e.jsxs(r,{title:"Steps",children:[e.jsx(j,{current:t,onChange:i,items:[{title:"Account",description:"Create your account"},{title:"Profile",description:"Tell us about you"},{title:"Verify",description:"Confirm email"},{title:"Done"}]}),e.jsxs(a,{gap:"sm",style:{marginTop:20},children:[e.jsx(s,{disabled:t===0,onClick:()=>i(t-1),children:"Back"}),e.jsx(s,{variant:"filled",color:"primary",disabled:t===3,onClick:()=>i(t+1),children:"Next"})]}),e.jsx("div",{className:"sb-section-title",children:"Vertical"}),e.jsx(j,{direction:"vertical",size:"sm",current:1,items:[{title:"Ordered",description:"10:02"},{title:"Shipped",description:"In transit"},{title:"Delivered",status:"wait"}]})]})]})}},se=[{key:"g1",label:"Mail",type:"group",children:[{key:"inbox",label:"Inbox",icon:e.jsx(A,{}),extra:"24"},{key:"starred",label:"Starred",icon:e.jsx(X,{})},{key:"sent",label:"Sent",icon:e.jsx(Y,{})}]},{key:"d",label:"",type:"divider"},{key:"folders",label:"Folders",icon:e.jsx(E,{}),children:[{key:"work",label:"Work"},{key:"personal",label:"Personal"}]},{key:"trash",label:"Trash",icon:e.jsx(H,{}),danger:!0}],n={name:"Menu & Dropdown",render:()=>{const[t,i]=M.useState(!1);return e.jsxs(a,{gap:"lg",align:"flex-start",wrap:!0,children:[e.jsxs(a,{vertical:!0,gap:"sm",children:[e.jsxs(a,{align:"center",gap:"sm",children:[e.jsx(ee,{size:"sm",checked:t,onChange:i}),e.jsx(m,{type:"secondary",children:"Collapsed"})]}),e.jsx(y,{items:se,defaultSelectedKey:"inbox",defaultOpenKeys:["folders"],collapsed:t})]}),e.jsxs(a,{vertical:!0,gap:"md",children:[e.jsx(y,{mode:"horizontal",defaultSelectedKey:"home",items:[{key:"home",label:"Home",icon:e.jsx(x,{})},{key:"docs",label:"Docs"},{key:"blog",label:"Blog"}]}),e.jsxs(a,{gap:"sm",children:[e.jsx(k,{onSelect:p=>ie.info(`Selected ${p}`),items:[{key:"edit",label:"Edit",icon:e.jsx(_,{}),extra:"⌘E"},{key:"copy",label:"Duplicate",icon:e.jsx(J,{}),extra:"⌘D"},{key:"share",label:"Share",icon:e.jsx(W,{})},{key:"d",label:"",type:"divider"},{key:"delete",label:"Delete",icon:e.jsx(H,{}),danger:!0}],children:e.jsx(s,{icon:e.jsx(q,{}),iconPosition:"end",children:"Actions"})}),e.jsx(k,{placement:"bottomRight",trigger:"hover",items:[{key:"p",label:"Profile",icon:e.jsx(N,{})},{key:"s",label:"Settings",icon:e.jsx(K,{})}],children:e.jsx(d,{"aria-label":"More",icon:e.jsx(Q,{})})})]})]})]})}},c={render:()=>e.jsxs(a,{vertical:!0,gap:"lg",children:[e.jsx(h,{title:"Classic NavBar",left:e.jsx(d,{variant:"text","aria-label":"Menu",icon:e.jsx(V,{})}),right:e.jsxs(e.Fragment,{children:[e.jsx(d,{variant:"text","aria-label":"Search",icon:e.jsx(g,{})}),e.jsx(te,{size:"sm",children:"TD"})]})}),e.jsx(h,{floating:!0,logo:e.jsx(R,{size:22,color:"var(--lg-accent)"}),title:"Floating",right:e.jsxs(e.Fragment,{children:[e.jsx(d,{"aria-label":"Notifications",icon:e.jsx(L,{})}),e.jsx(s,{variant:"filled",color:"primary",size:"sm",children:"Sign up"})]}),children:e.jsx(y,{mode:"horizontal",glass:!1,defaultSelectedKey:"a",items:[{key:"a",label:"Product"},{key:"b",label:"Pricing"},{key:"c",label:"About"}]})}),e.jsx(a,{justify:"center",children:e.jsx(ae,{items:[{key:"home",label:"Home",icon:e.jsx(x,{})},{key:"search",label:"Search",icon:e.jsx(g,{})},{key:"camera",label:"Camera",icon:e.jsx(U,{})},{key:"inbox",label:"Inbox",icon:e.jsx(A,{}),badge:5},{key:"me",label:"Me",icon:e.jsx(N,{})}]})})]})};var v,S,I;l.parameters={...l.parameters,docs:{...(v=l.parameters)==null?void 0:v.docs,source:{originalSource:`{
  name: 'Tabs',
  render: () => {
    const items = [{
      key: 'overview',
      label: 'Overview',
      icon: <HomeIcon />,
      children: <Text type="secondary">Overview content</Text>
    }, {
      key: 'analytics',
      label: 'Analytics',
      icon: <BarChartIcon />,
      children: <Text type="secondary">Analytics content</Text>
    }, {
      key: 'settings',
      label: 'Settings',
      icon: <SettingsIcon />,
      children: <Text type="secondary">Settings content</Text>
    }, {
      key: 'disabled',
      label: 'Disabled',
      disabled: true
    }];
    return <Flex vertical gap="lg">
        <Card title="Line"><Tabs aria-label="Dashboard sections" items={items} /></Card>
        <Card title="Pill"><Tabs variant="pill" items={items} /></Card>
        <Card title="Card + extra"><Tabs variant="card" size="sm" items={items} tabBarExtra={<Button size="sm" variant="text">+ Add</Button>} /></Card>
      </Flex>;
  }
}`,...(I=(S=l.parameters)==null?void 0:S.docs)==null?void 0:I.source}}};var f,C,B;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => {
    const [step, setStep] = React.useState(1);
    return <Flex vertical gap="lg">
        <Card title="Breadcrumb">
          <Breadcrumb items={[{
          title: 'Home',
          href: '#',
          icon: <HomeIcon />
        }, {
          title: 'Projects',
          href: '#',
          icon: <FolderIcon />
        }, {
          title: 'Liquid Glass',
          icon: <FileTextIcon />
        }]} />
        </Card>
        <Card title="Pagination">
          <Flex vertical gap="md">
            <Pagination total={500} defaultCurrent={6} showTotal={(t, [a, b]) => \`\${a}-\${b} of \${t}\`} />
            <Pagination total={50} size="sm" />
            <Pagination total={120} simple />
          </Flex>
        </Card>
        <Card title="Steps">
          <Steps current={step} onChange={setStep} items={[{
          title: 'Account',
          description: 'Create your account'
        }, {
          title: 'Profile',
          description: 'Tell us about you'
        }, {
          title: 'Verify',
          description: 'Confirm email'
        }, {
          title: 'Done'
        }]} />
          <Flex gap="sm" style={{
          marginTop: 20
        }}>
            <Button disabled={step === 0} onClick={() => setStep(step - 1)}>Back</Button>
            <Button variant="filled" color="primary" disabled={step === 3} onClick={() => setStep(step + 1)}>Next</Button>
          </Flex>
          <div className="sb-section-title">Vertical</div>
          <Steps direction="vertical" size="sm" current={1} items={[{
          title: 'Ordered',
          description: '10:02'
        }, {
          title: 'Shipped',
          description: 'In transit'
        }, {
          title: 'Delivered',
          status: 'wait'
        }]} />
        </Card>
      </Flex>;
  }
}`,...(B=(C=o.parameters)==null?void 0:C.docs)==null?void 0:B.source}}};var F,T,D;n.parameters={...n.parameters,docs:{...(F=n.parameters)==null?void 0:F.docs,source:{originalSource:`{
  name: 'Menu & Dropdown',
  render: () => {
    const [collapsed, setCollapsed] = React.useState(false);
    return <Flex gap="lg" align="flex-start" wrap>
        <Flex vertical gap="sm">
          <Flex align="center" gap="sm"><Switch size="sm" checked={collapsed} onChange={setCollapsed} /><Text type="secondary">Collapsed</Text></Flex>
          <Menu items={menuItems} defaultSelectedKey="inbox" defaultOpenKeys={['folders']} collapsed={collapsed} />
        </Flex>
        <Flex vertical gap="md">
          <Menu mode="horizontal" defaultSelectedKey="home" items={[{
          key: 'home',
          label: 'Home',
          icon: <HomeIcon />
        }, {
          key: 'docs',
          label: 'Docs'
        }, {
          key: 'blog',
          label: 'Blog'
        }]} />
          <Flex gap="sm">
            <Dropdown onSelect={k => message.info(\`Selected \${k}\`)} items={[{
            key: 'edit',
            label: 'Edit',
            icon: <EditIcon />,
            extra: '⌘E'
          }, {
            key: 'copy',
            label: 'Duplicate',
            icon: <CopyIcon />,
            extra: '⌘D'
          }, {
            key: 'share',
            label: 'Share',
            icon: <ShareIcon />
          }, {
            key: 'd',
            label: '',
            type: 'divider'
          }, {
            key: 'delete',
            label: 'Delete',
            icon: <TrashIcon />,
            danger: true
          }]}>
              <Button icon={<ChevronDownIcon />} iconPosition="end">Actions</Button>
            </Dropdown>
            <Dropdown placement="bottomRight" trigger="hover" items={[{
            key: 'p',
            label: 'Profile',
            icon: <UserIcon />
          }, {
            key: 's',
            label: 'Settings',
            icon: <SettingsIcon />
          }]}>
              <IconButton aria-label="More" icon={<MoreVerticalIcon />} />
            </Dropdown>
          </Flex>
        </Flex>
      </Flex>;
  }
}`,...(D=(T=n.parameters)==null?void 0:T.docs)==null?void 0:D.source}}};var w,P,z;c.parameters={...c.parameters,docs:{...(w=c.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => <Flex vertical gap="lg">
      <NavBar title="Classic NavBar" left={<IconButton variant="text" aria-label="Menu" icon={<MenuIcon />} />} right={<><IconButton variant="text" aria-label="Search" icon={<SearchIcon />} /><Avatar size="sm">TD</Avatar></>} />
      <NavBar floating logo={<DropletIcon size={22} color="var(--lg-accent)" />} title="Floating" right={<><IconButton aria-label="Notifications" icon={<BellIcon />} /><Button variant="filled" color="primary" size="sm">Sign up</Button></>}>
        <Menu mode="horizontal" glass={false} defaultSelectedKey="a" items={[{
        key: 'a',
        label: 'Product'
      }, {
        key: 'b',
        label: 'Pricing'
      }, {
        key: 'c',
        label: 'About'
      }]} />
      </NavBar>
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
        key: 'camera',
        label: 'Camera',
        icon: <CameraIcon />
      }, {
        key: 'inbox',
        label: 'Inbox',
        icon: <InboxIcon />,
        badge: 5
      }, {
        key: 'me',
        label: 'Me',
        icon: <UserIcon />
      }]} />
      </Flex>
    </Flex>
}`,...(z=(P=c.parameters)==null?void 0:P.docs)==null?void 0:z.source}}};const Se=["TabsStory","BreadcrumbPaginationSteps","MenuStory","Bars"];export{c as Bars,o as BreadcrumbPaginationSteps,n as MenuStory,l as TabsStory,Se as __namedExportsOrder,ve as default};
