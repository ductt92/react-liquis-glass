import{j as e}from"./jsx-runtime-SKoiH9zj.js";import{r as a}from"./index-DJO9vBfz.js";import{B as t}from"./Button-CZxOoP0y.js";import{C as r,T as q,I as V}from"./Card-DqrLraUh.js";import{F as W,S as f}from"./Layout-CkPPsACS.js";import{I as y}from"./Input-FYYi5_Gr.js";import{F as Y,a as w}from"./Form-CslnVbkO.js";import{T as G,P as k,a as _}from"./Overlay-CdO35eOe.js";import{A as i,M as B,m as s,D as $,R as v,n as l}from"./Toast-C5OHXVlZ.js";import"./index-B8H_dQMV.js";import"./ConfigProvider-BC9dizFH.js";import"./index-BO0JoVgK.js";import"./Popup-BjQa9cNG.js";import"./client-CN2SRMON.js";const ce={title:"Feedback"},c={render:()=>e.jsx(r,{style:{maxWidth:640},children:e.jsxs(W,{vertical:!0,gap:"md",children:[e.jsx(i,{type:"info",title:"A new software update is available.",closable:!0}),e.jsx(i,{type:"success",title:"Changes saved"}),e.jsx(i,{type:"warning",title:"Storage almost full",description:"You've used 92% of your iCloud storage. Upgrade to keep backing up.",action:e.jsx(t,{size:"sm",variant:"tinted",color:"warning",children:"Upgrade"})}),e.jsx(i,{type:"error",title:"Payment failed",description:"Your card was declined. Please update your payment method.",closable:!0})]})})},d={name:"Modal & Drawer",render:()=>{const[o,g]=a.useState(!1),[z,h]=a.useState(!1),[H,j]=a.useState(!1),[C,n]=a.useState(null);return e.jsxs(r,{children:[e.jsxs(f,{wrap:!0,children:[e.jsx(t,{variant:"filled",color:"primary",onClick:()=>g(!0),children:"Open modal"}),e.jsx(t,{variant:"tinted",color:"danger",onClick:()=>h(!0),children:"Delete…"}),["right","left","bottom","top"].map(x=>e.jsxs(t,{onClick:()=>n(x),children:["Drawer ",x]},x))]}),e.jsx(B,{open:o,onClose:()=>g(!1),title:"Edit profile",onOk:()=>(g(!1),s.success("Profile saved")),okText:"Save",children:e.jsxs(Y,{children:[e.jsx(w,{label:"Display name",children:e.jsx(y,{defaultValue:"Liquid Glass"})}),e.jsx(w,{label:"Bio",children:e.jsx(y,{placeholder:"Say something…"})})]})}),e.jsx(B,{open:z,onClose:()=>h(!1),title:"Delete this project?",okText:"Delete",okDanger:!0,okLoading:H,width:400,onOk:()=>{j(!0),setTimeout(()=>(j(!1),h(!1),s.success("Deleted")),1200)},children:"This action cannot be undone. All files will be permanently removed."}),e.jsx($,{open:!!C,placement:C??"right",onClose:()=>n(null),title:"Filters",footer:e.jsxs(e.Fragment,{children:[e.jsx(t,{onClick:()=>n(null),children:"Cancel"}),e.jsx(t,{variant:"filled",color:"primary",onClick:()=>n(null),children:"Apply"})]}),children:e.jsx(q,{type:"secondary",children:"Drawer content on a liquid glass sheet."})})]})}},u={name:"Message & Notification",render:()=>e.jsxs(r,{children:[e.jsx("div",{className:"sb-section-title",children:"message"}),e.jsxs(f,{wrap:!0,children:[e.jsx(t,{onClick:()=>s.success("Saved successfully"),children:"Success"}),e.jsx(t,{onClick:()=>s.error("Something went wrong"),children:"Error"}),e.jsx(t,{onClick:()=>s.warning("Check your input"),children:"Warning"}),e.jsx(t,{onClick:()=>s.info("Heads up!"),children:"Info"}),e.jsx(t,{onClick:()=>{const o=s.loading("Uploading…");setTimeout(()=>(o(),s.success("Uploaded")),1500)},children:"Loading"})]}),e.jsx("div",{className:"sb-section-title",children:"notification"}),e.jsxs(f,{wrap:!0,children:[e.jsx(t,{onClick:()=>l.success({title:"Deployment complete",description:"react-liquis-glass v0.1.1 is live."}),children:"Success"}),e.jsx(t,{onClick:()=>l.error({title:"Build failed",description:"3 tests failed in Table.test.tsx",btn:e.jsx(t,{size:"sm",variant:"tinted",color:"danger",children:"View logs"})}),children:"With action"}),e.jsx(t,{onClick:()=>l.info({title:"New message",description:"Anna: Love the new glass!",placement:"bottomRight"}),children:"Bottom right"}),e.jsx(t,{onClick:()=>l.warning({title:"Top left",placement:"topLeft"}),children:"Top left"})]})]})},p={name:"Tooltip, Popover, Popconfirm",render:()=>e.jsx(r,{children:e.jsxs(f,{wrap:!0,size:"md",children:[["top","bottom","left","right"].map(o=>e.jsx(G,{title:`Tooltip on ${o}`,placement:o,children:e.jsx(t,{children:o})},o)),e.jsx(k,{title:"Popover title",content:"Rich content can live here, including any components.",children:e.jsx(t,{icon:e.jsx(V,{}),variant:"tinted",color:"primary",children:"Popover"})}),e.jsx(k,{trigger:"hover",content:e.jsx(q,{children:"Hover popover"}),children:e.jsx(t,{children:"Hover me"})}),e.jsx(_,{title:"Delete the task?",description:"This cannot be undone.",okDanger:!0,okText:"Delete",onConfirm:()=>new Promise(o=>setTimeout(o,800)).then(()=>s.success("Deleted")),children:e.jsx(t,{variant:"outline",color:"danger",children:"Popconfirm"})})]})})},m={render:()=>e.jsxs("div",{className:"sb-grid",children:[e.jsx(r,{children:e.jsx(v,{status:"success",title:"Payment successful",subTitle:"Order #2026-1030 is on its way.",extra:e.jsxs(e.Fragment,{children:[e.jsx(t,{variant:"filled",color:"primary",children:"View order"}),e.jsx(t,{children:"Buy again"})]})})}),e.jsx(r,{children:e.jsx(v,{status:"error",title:"Submission failed",subTitle:"Please check the form and try again."})}),e.jsx(r,{children:e.jsx(v,{status:"404",title:"Page not found",subTitle:"The page you visited does not exist.",extra:e.jsx(t,{variant:"filled",color:"primary",children:"Back home"})})})]})};var T,b,S;c.parameters={...c.parameters,docs:{...(T=c.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => <Card style={{
    maxWidth: 640
  }}>
      <Flex vertical gap="md">
        <Alert type="info" title="A new software update is available." closable />
        <Alert type="success" title="Changes saved" />
        <Alert type="warning" title="Storage almost full" description="You've used 92% of your iCloud storage. Upgrade to keep backing up." action={<Button size="sm" variant="tinted" color="warning">Upgrade</Button>} />
        <Alert type="error" title="Payment failed" description="Your card was declined. Please update your payment method." closable />
      </Flex>
    </Card>
}`,...(S=(b=c.parameters)==null?void 0:b.docs)==null?void 0:S.source}}};var D,P,F;d.parameters={...d.parameters,docs:{...(D=d.parameters)==null?void 0:D.docs,source:{originalSource:`{
  name: 'Modal & Drawer',
  render: () => {
    const [modal, setModal] = React.useState(false);
    const [confirm, setConfirm] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [drawer, setDrawer] = React.useState<null | 'right' | 'left' | 'bottom' | 'top'>(null);
    return <Card>
        <Space wrap>
          <Button variant="filled" color="primary" onClick={() => setModal(true)}>Open modal</Button>
          <Button variant="tinted" color="danger" onClick={() => setConfirm(true)}>Delete…</Button>
          {(['right', 'left', 'bottom', 'top'] as const).map(p => <Button key={p} onClick={() => setDrawer(p)}>Drawer {p}</Button>)}
        </Space>
        <Modal open={modal} onClose={() => setModal(false)} title="Edit profile" onOk={() => (setModal(false), message.success('Profile saved'))} okText="Save">
          <Form>
            <FormItem label="Display name"><Input defaultValue="Liquid Glass" /></FormItem>
            <FormItem label="Bio"><Input placeholder="Say something…" /></FormItem>
          </Form>
        </Modal>
        <Modal open={confirm} onClose={() => setConfirm(false)} title="Delete this project?" okText="Delete" okDanger okLoading={loading} width={400} onOk={() => {
        setLoading(true);
        setTimeout(() => (setLoading(false), setConfirm(false), message.success('Deleted')), 1200);
      }}>
          This action cannot be undone. All files will be permanently removed.
        </Modal>
        <Drawer open={!!drawer} placement={drawer ?? 'right'} onClose={() => setDrawer(null)} title="Filters" footer={<><Button onClick={() => setDrawer(null)}>Cancel</Button><Button variant="filled" color="primary" onClick={() => setDrawer(null)}>Apply</Button></>}>
          <Text type="secondary">Drawer content on a liquid glass sheet.</Text>
        </Drawer>
      </Card>;
  }
}`,...(F=(P=d.parameters)==null?void 0:P.docs)==null?void 0:F.source}}};var M,A,I;u.parameters={...u.parameters,docs:{...(M=u.parameters)==null?void 0:M.docs,source:{originalSource:`{
  name: 'Message & Notification',
  render: () => <Card>
      <div className="sb-section-title">message</div>
      <Space wrap>
        <Button onClick={() => message.success('Saved successfully')}>Success</Button>
        <Button onClick={() => message.error('Something went wrong')}>Error</Button>
        <Button onClick={() => message.warning('Check your input')}>Warning</Button>
        <Button onClick={() => message.info('Heads up!')}>Info</Button>
        <Button onClick={() => {
        const close = message.loading('Uploading…');
        setTimeout(() => (close(), message.success('Uploaded')), 1500);
      }}>
          Loading
        </Button>
      </Space>
      <div className="sb-section-title">notification</div>
      <Space wrap>
        <Button onClick={() => notification.success({
        title: 'Deployment complete',
        description: 'react-liquis-glass v0.1.1 is live.'
      })}>Success</Button>
        <Button onClick={() => notification.error({
        title: 'Build failed',
        description: '3 tests failed in Table.test.tsx',
        btn: <Button size="sm" variant="tinted" color="danger">View logs</Button>
      })}>With action</Button>
        <Button onClick={() => notification.info({
        title: 'New message',
        description: 'Anna: Love the new glass!',
        placement: 'bottomRight'
      })}>Bottom right</Button>
        <Button onClick={() => notification.warning({
        title: 'Top left',
        placement: 'topLeft'
      })}>Top left</Button>
      </Space>
    </Card>
}`,...(I=(A=u.parameters)==null?void 0:A.docs)==null?void 0:I.source}}};var R,L,O;p.parameters={...p.parameters,docs:{...(R=p.parameters)==null?void 0:R.docs,source:{originalSource:`{
  name: 'Tooltip, Popover, Popconfirm',
  render: () => <Card>
      <Space wrap size="md">
        {(['top', 'bottom', 'left', 'right'] as const).map(p => <Tooltip key={p} title={\`Tooltip on \${p}\`} placement={p}><Button>{p}</Button></Tooltip>)}
        <Popover title="Popover title" content="Rich content can live here, including any components.">
          <Button icon={<InfoIcon />} variant="tinted" color="primary">Popover</Button>
        </Popover>
        <Popover trigger="hover" content={<Text>Hover popover</Text>}><Button>Hover me</Button></Popover>
        <Popconfirm title="Delete the task?" description="This cannot be undone." okDanger okText="Delete" onConfirm={() => new Promise(r => setTimeout(r, 800)).then(() => message.success('Deleted'))}>
          <Button variant="outline" color="danger">Popconfirm</Button>
        </Popconfirm>
      </Space>
    </Card>
}`,...(O=(L=p.parameters)==null?void 0:L.docs)==null?void 0:O.source}}};var N,U,E;m.parameters={...m.parameters,docs:{...(N=m.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: () => <div className="sb-grid">
      <Card><Result status="success" title="Payment successful" subTitle="Order #2026-1030 is on its way." extra={<><Button variant="filled" color="primary">View order</Button><Button>Buy again</Button></>} /></Card>
      <Card><Result status="error" title="Submission failed" subTitle="Please check the form and try again." /></Card>
      <Card><Result status="404" title="Page not found" subTitle="The page you visited does not exist." extra={<Button variant="filled" color="primary">Back home</Button>} /></Card>
    </div>
}`,...(E=(U=m.parameters)==null?void 0:U.docs)==null?void 0:E.source}}};const de=["Alerts","ModalStory","Toasts","Overlays","Results"];export{c as Alerts,d as ModalStory,p as Overlays,m as Results,u as Toasts,de as __namedExportsOrder,ce as default};
