import{j as t}from"./jsx-runtime-SKoiH9zj.js";import{r as u}from"./index-DJO9vBfz.js";import{g as r,C as x,T as g,h as y}from"./Card-DqrLraUh.js";import{I as f}from"./Input-FYYi5_Gr.js";import{m as I}from"./Toast-C5OHXVlZ.js";import"./index-B8H_dQMV.js";import"./ConfigProvider-BC9dizFH.js";import"./index-BO0JoVgK.js";import"./client-CN2SRMON.js";import"./Button-CZxOoP0y.js";const $={title:"Icons",args:{size:26,strokeWidth:1.8,color:"currentColor"},argTypes:{size:{control:{type:"range",min:12,max:64}},strokeWidth:{control:{type:"range",min:.5,max:3,step:.1}},color:{control:"color"}}},o={render:i=>{const[s,p]=u.useState(""),m=Object.keys(r).filter(e=>e.toLowerCase().includes(s.toLowerCase()));return t.jsx(x,{title:`${Object.keys(r).length} icons`,subtitle:"import { HomeIcon } from 'react-liquis-glass/icons' — click to copy",extra:t.jsx(f,{prefix:t.jsx(y,{}),placeholder:"Search icons",value:s,onValueChange:p,allowClear:!0,style:{width:220}}),children:t.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(110px, 1fr))",gap:8},children:m.map(e=>{const d=r[e];return t.jsxs("button",{type:"button",className:"lg-glass",style:{display:"flex",flexDirection:"column",alignItems:"center",gap:8,padding:"16px 6px",borderRadius:16,cursor:"pointer",color:"var(--lg-text)",font:"inherit"},onClick:()=>{var a;(a=navigator.clipboard)==null||a.writeText(`<${e}Icon />`),I.success(`Copied <${e}Icon />`)},children:[t.jsx(d,{...i}),t.jsx(g,{type:"secondary",style:{fontSize:11},children:e})]},e)})})})}};var n,l,c;o.parameters={...o.parameters,docs:{...(n=o.parameters)==null?void 0:n.docs,source:{originalSource:`{
  render: args => {
    const [q, setQ] = React.useState('');
    const names = Object.keys(allIcons).filter(n => n.toLowerCase().includes(q.toLowerCase()));
    return <Card title={\`\${Object.keys(allIcons).length} icons\`} subtitle="import { HomeIcon } from 'react-liquis-glass/icons' — click to copy" extra={<Input prefix={<SearchIcon />} placeholder="Search icons" value={q} onValueChange={setQ} allowClear style={{
      width: 220
    }} />}>
        <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
        gap: 8
      }}>
          {names.map(n => {
          const Icon = allIcons[n as keyof typeof allIcons];
          return <button key={n} type="button" className="lg-glass" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            padding: '16px 6px',
            borderRadius: 16,
            cursor: 'pointer',
            color: 'var(--lg-text)',
            font: 'inherit'
          }} onClick={() => {
            navigator.clipboard?.writeText(\`<\${n}Icon />\`);
            message.success(\`Copied <\${n}Icon />\`);
          }}>
                <Icon {...args} />
                <Text type="secondary" style={{
              fontSize: 11
            }}>{n}</Text>
              </button>;
        })}
        </div>
      </Card>;
  }
}`,...(c=(l=o.parameters)==null?void 0:l.docs)==null?void 0:c.source}}};const O=["Gallery"];export{o as Gallery,O as __namedExportsOrder,$ as default};
