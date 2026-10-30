import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, Badge, Breadcrumb, Card, Flex, IconButton, Menu, SearchInput, Statistic, Text, Title } from 'react-liquis-glass';
import { Layout, Header, Sider, Content, Footer, useSider } from 'react-liquis-glass';
import { BellIcon, DashboardIcon, DropletIcon, FolderIcon, InboxIcon, SettingsIcon, UsersIcon, BarChartIcon } from 'react-liquis-glass/icons';

const meta: Meta = { title: 'App Shell', parameters: { layout: 'fullscreen' } };
export default meta;

const SideMenu = () => {
  const { collapsed } = useSider();
  return (
    <>
      <Flex align="center" gap="sm" style={{ padding: '6px 10px 16px', justifyContent: collapsed ? 'center' : undefined }}>
        <DropletIcon size={24} color="var(--lg-accent)" />
        {!collapsed && <Text strong style={{ fontSize: 16 }}>Glass Admin</Text>}
      </Flex>
      <Menu
        collapsed={collapsed}
        glass={false}
        defaultSelectedKey="dash"
        items={[
          { key: 'dash', label: 'Dashboard', icon: <DashboardIcon /> },
          { key: 'inbox', label: 'Inbox', icon: <InboxIcon />, extra: '12' },
          { key: 'team', label: 'Team', icon: <UsersIcon /> },
          { key: 'reports', label: 'Reports', icon: <BarChartIcon /> },
          { key: 'files', label: 'Files', icon: <FolderIcon /> },
          { key: 'settings', label: 'Settings', icon: <SettingsIcon /> },
        ]}
      />
    </>
  );
};

export const AdminShell: StoryObj = {
  render: () => (
    <Layout style={{ minHeight: '100vh', margin: -32 }}>
      <Sider collapsible>
        <SideMenu />
      </Sider>
      <Layout>
        <Header>
          <Breadcrumb items={[{ title: 'Home', href: '#' }, { title: 'Dashboard' }]} />
          <div style={{ flex: 1 }} />
          <SearchInput placeholder="Search…" style={{ width: 220 }} />
          <Badge dot>
            <IconButton aria-label="Notifications" icon={<BellIcon />} />
          </Badge>
          <Avatar size="sm" status="online">TD</Avatar>
        </Header>
        <Content>
          <Title level={3}>Dashboard</Title>
          <div className="sb-grid">
            <Card><Statistic title="Revenue" value={48392} prefix="$" trend={{ value: '12%', direction: 'up' }} /></Card>
            <Card><Statistic title="Users" value={1893} trend={{ value: '4%', direction: 'up' }} /></Card>
            <Card><Statistic title="Churn" value={2.1} precision={1} suffix="%" trend={{ value: '0.4%', direction: 'down' }} /></Card>
          </div>
          <Card title="Activity" style={{ marginTop: 16, minHeight: 600 }}>
            <Text type="secondary">Scroll to see the sticky glass header and sidebar.</Text>
          </Card>
        </Content>
        <Footer>Liquid Glass UI ©2026</Footer>
      </Layout>
    </Layout>
  ),
};

export const HeaderContentFooter: StoryObj = {
  render: () => (
    <Layout style={{ minHeight: 420, borderRadius: 22, overflow: 'hidden' }} className="lg-glass">
      <Header sticky={false}>
        <DropletIcon size={22} color="var(--lg-accent)" />
        <Text strong>Top navigation layout</Text>
      </Header>
      <Content><Text type="secondary">Content area</Text></Content>
      <Footer>Footer</Footer>
    </Layout>
  ),
};
