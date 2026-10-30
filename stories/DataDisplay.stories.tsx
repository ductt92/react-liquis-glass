import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Avatar, AvatarGroup, Badge, Button, Card, Collapse, Descriptions, Empty, Flex, IconButton, List, ListItem, Progress, Skeleton, Space, Spin,
  Statistic, Switch, Table, Tag, Text, Timeline, Tooltip, type TableColumn,
} from 'liquidglass-ui';
import { BellIcon, CheckCircleIcon, ClockIcon, EditIcon, MailIcon, SettingsIcon, TrashIcon, WifiIcon, LockIcon, StarIcon } from 'liquidglass-ui/icons';

const meta: Meta = { title: 'Data Display' };
export default meta;

export const AvatarsBadgesTags: StoryObj = {
  render: () => (
    <div className="sb-grid">
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
          {['AN', 'BO', 'CY', 'DI', 'EL', 'FA'].map((n) => <Avatar key={n}>{n}</Avatar>)}
        </AvatarGroup>
      </Card>
      <Card title="Badge">
        <Space size="lg" wrap>
          <Badge count={5}><IconButton aria-label="bell" icon={<BellIcon />} /></Badge>
          <Badge count={120}><IconButton aria-label="mail" icon={<MailIcon />} /></Badge>
          <Badge dot><IconButton aria-label="settings" icon={<SettingsIcon />} /></Badge>
          <Badge count={8} color="primary" />
        </Space>
        <Flex vertical gap="xs" style={{ marginTop: 16 }}>
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
  ),
};

const CheckableTags = () => {
  const [sel, setSel] = React.useState(['Design']);
  return (
    <Space wrap>
      {['Design', 'Engineering', 'Marketing', 'Sales'].map((t) => (
        <Tag key={t} color="primary" checked={sel.includes(t)} onCheckedChange={(c) => setSel(c ? [...sel, t] : sel.filter((x) => x !== t))}>{t}</Tag>
      ))}
    </Space>
  );
};

export const ProgressAndStats: StoryObj = {
  render: () => (
    <div className="sb-grid">
      <Card title="Line progress">
        <Flex vertical gap="md">
          <Progress percent={30} />
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
          <Statistic title="Active users" value={112893} trend={{ value: '8.2%', direction: 'up' }} />
          <Statistic title="Churn" value={2.4} precision={1} suffix="%" trend={{ value: '0.3%', direction: 'down' }} />
        </Flex>
      </Card>
      <Card title="Spin & Skeleton">
        <Space size="lg">
          <Spin size="sm" />
          <Spin />
          <Spin size="lg" tip="Loading…" />
        </Space>
        <div style={{ marginTop: 16 }}>
          <Skeleton avatar paragraph={{ rows: 2 }} />
        </div>
      </Card>
      <Card title="Spin wrapping content">
        <Spin spinning>
          <Text type="secondary">This content is blurred while loading. Lorem ipsum dolor sit amet consectetur adipisicing elit.</Text>
        </Spin>
      </Card>
      <Card title="Empty"><Empty description="No messages yet"><Button variant="filled" color="primary" size="sm">Compose</Button></Empty></Card>
    </div>
  ),
};

interface User { key: number; name: string; email: string; role: string; status: 'active' | 'invited' | 'disabled'; age: number }
const roles = ['Admin', 'Editor', 'Viewer'];
const statuses: User['status'][] = ['active', 'invited', 'disabled'];
const names = ['Anna Nguyen', 'Bao Tran', 'Chris Le', 'Duy Pham', 'Emma Vo', 'Finn Hoang', 'Gia Do', 'Hana Bui', 'Ivy Dang', 'Jack Ngo', 'Khoa Ly', 'Linh Mai', 'Minh Ha', 'Nam Vu'];
const users: User[] = names.map((n, i) => ({ key: i, name: n, email: `${n.split(' ')[0].toLowerCase()}@glass.dev`, role: roles[i % 3], status: statuses[i % 3], age: 22 + ((i * 7) % 30) }));

export const TableStory: StoryObj = {
  name: 'Table',
  render: () => {
    const [sel, setSel] = React.useState<React.Key[]>([]);
    const columns: TableColumn<User>[] = [
      { key: 'name', title: 'Name', sorter: true, render: (v: string) => <Flex align="center" gap="sm"><Avatar size="sm">{v.split(' ').map((p) => p[0]).join('')}</Avatar>{v}</Flex> },
      { key: 'email', title: 'Email', render: (v: string) => <Text type="secondary">{v}</Text> },
      { key: 'age', title: 'Age', sorter: true, align: 'right', width: 80 },
      { key: 'role', title: 'Role', render: (v: string) => <Tag color={v === 'Admin' ? 'primary' : 'default'}>{v}</Tag> },
      { key: 'status', title: 'Status', render: (v: User['status']) => <Badge status={v === 'active' ? 'success' : v === 'invited' ? 'processing' : 'default'} text={v} /> },
      {
        key: 'actions', title: '', align: 'right', render: () => (
          <Space size="xs">
            <Tooltip title="Edit"><IconButton size="sm" variant="text" aria-label="Edit" icon={<EditIcon />} /></Tooltip>
            <Tooltip title="Delete"><IconButton size="sm" variant="text" color="danger" aria-label="Delete" icon={<TrashIcon />} /></Tooltip>
          </Space>
        ),
      },
    ];
    return (
      <Flex vertical gap="sm">
        <Text type="secondary">{sel.length} selected</Text>
        <Table columns={columns} dataSource={users} pagination={{ pageSize: 6 }} rowSelection={{ selectedRowKeys: sel, onChange: setSel }} />
      </Flex>
    );
  },
};

export const ListsAndCollapse: StoryObj = {
  render: () => (
    <div className="sb-grid">
      <List header="Settings">
        <ListItem prefix={<Avatar size={30} shape="square" color="#0a84ff" icon={<WifiIcon />} />} title="Wi-Fi" extra="Home" clickable />
        <ListItem prefix={<Avatar size={30} shape="square" color="#ff375f" icon={<BellIcon />} />} title="Notifications" clickable />
        <ListItem prefix={<Avatar size={30} shape="square" color="#30d158" icon={<LockIcon />} />} title="Privacy" extra={<Switch size="sm" defaultChecked />} />
      </List>
      <List
        dataSource={users.slice(0, 4)}
        renderItem={(u) => <ListItem prefix={<Avatar size="sm">{u.name[0]}</Avatar>} title={u.name} description={u.email} actions={[<IconButton key="s" variant="text" size="sm" aria-label="Star" icon={<StarIcon />} />]} />}
      />
      <Collapse
        accordion
        defaultActiveKey={['1']}
        items={[
          { key: '1', label: 'What is liquid glass?', children: 'A translucent material that blurs, tints and refracts what is behind it.' },
          { key: '2', label: 'Does it support dark mode?', children: 'Yes — wrap your app in <ConfigProvider theme="dark">.' },
          { key: '3', label: 'Disabled panel', children: '…', disabled: true },
        ]}
      />
      <Collapse separated items={[{ key: 'a', label: 'Separated A', children: 'Content A' }, { key: 'b', label: 'Separated B', children: 'Content B' }]} />
    </div>
  ),
};

export const TimelineDescriptions: StoryObj = {
  render: () => (
    <div className="sb-grid">
      <Card title="Timeline">
        <Timeline
          items={[
            { label: '09:00', children: 'Project created' },
            { label: '10:30', children: 'Design review passed', color: 'success' },
            { label: '13:15', children: 'Build failed', color: 'danger' },
            { label: '14:00', children: 'Hotfix deployed', dot: <ClockIcon />, color: 'warning' },
          ]}
          pending="Waiting for QA…"
        />
      </Card>
      <Card title="Descriptions" style={{ gridColumn: 'span 2' }}>
        <Descriptions
          column={3}
          items={[
            { label: 'Customer', children: 'Anna Nguyen' },
            { label: 'Plan', children: <Tag color="primary">Pro</Tag> },
            { label: 'Status', children: <Badge status="success" text="Active" /> },
            { label: 'Address', children: '12 Glass Street, District 1, HCMC', span: 2 },
            { label: 'Renewal', children: '2026-12-01' },
          ]}
        />
      </Card>
    </div>
  ),
};
