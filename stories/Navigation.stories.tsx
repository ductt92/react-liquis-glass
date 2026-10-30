import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, Breadcrumb, Button, Card, Dropdown, Flex, IconButton, Menu, NavBar, Pagination, Steps, Switch, TabBar, Tabs, Text, message } from 'react-liquis-glass';
import {
  HomeIcon, FolderIcon, FileTextIcon, UserIcon, SettingsIcon, BarChartIcon, InboxIcon, MailIcon, StarIcon, TrashIcon,
  ChevronDownIcon, EditIcon, CopyIcon, ShareIcon, MoreVerticalIcon, SearchIcon, BellIcon, DropletIcon, MenuIcon, CameraIcon,
} from 'react-liquis-glass/icons';

const meta: Meta = { title: 'Navigation' };
export default meta;

export const TabsStory: StoryObj = {
  name: 'Tabs',
  render: () => {
    const items = [
      { key: 'overview', label: 'Overview', icon: <HomeIcon />, children: <Text type="secondary">Overview content</Text> },
      { key: 'analytics', label: 'Analytics', icon: <BarChartIcon />, children: <Text type="secondary">Analytics content</Text> },
      { key: 'settings', label: 'Settings', icon: <SettingsIcon />, children: <Text type="secondary">Settings content</Text> },
      { key: 'disabled', label: 'Disabled', disabled: true },
    ];
    return (
      <Flex vertical gap="lg">
        <Card title="Line"><Tabs items={items} /></Card>
        <Card title="Pill"><Tabs variant="pill" items={items} /></Card>
        <Card title="Card + extra"><Tabs variant="card" size="sm" items={items} tabBarExtra={<Button size="sm" variant="text">+ Add</Button>} /></Card>
      </Flex>
    );
  },
};

export const BreadcrumbPaginationSteps: StoryObj = {
  render: () => {
    const [step, setStep] = React.useState(1);
    return (
      <Flex vertical gap="lg">
        <Card title="Breadcrumb">
          <Breadcrumb items={[{ title: 'Home', href: '#', icon: <HomeIcon /> }, { title: 'Projects', href: '#', icon: <FolderIcon /> }, { title: 'Liquid Glass', icon: <FileTextIcon /> }]} />
        </Card>
        <Card title="Pagination">
          <Flex vertical gap="md">
            <Pagination total={500} defaultCurrent={6} showTotal={(t, [a, b]) => `${a}-${b} of ${t}`} />
            <Pagination total={50} size="sm" />
            <Pagination total={120} simple />
          </Flex>
        </Card>
        <Card title="Steps">
          <Steps
            current={step}
            onChange={setStep}
            items={[
              { title: 'Account', description: 'Create your account' },
              { title: 'Profile', description: 'Tell us about you' },
              { title: 'Verify', description: 'Confirm email' },
              { title: 'Done' },
            ]}
          />
          <Flex gap="sm" style={{ marginTop: 20 }}>
            <Button disabled={step === 0} onClick={() => setStep(step - 1)}>Back</Button>
            <Button variant="filled" color="primary" disabled={step === 3} onClick={() => setStep(step + 1)}>Next</Button>
          </Flex>
          <div className="sb-section-title">Vertical</div>
          <Steps direction="vertical" size="sm" current={1} items={[{ title: 'Ordered', description: '10:02' }, { title: 'Shipped', description: 'In transit' }, { title: 'Delivered', status: 'wait' }]} />
        </Card>
      </Flex>
    );
  },
};

const menuItems = [
  { key: 'g1', label: 'Mail', type: 'group' as const, children: [
    { key: 'inbox', label: 'Inbox', icon: <InboxIcon />, extra: '24' },
    { key: 'starred', label: 'Starred', icon: <StarIcon /> },
    { key: 'sent', label: 'Sent', icon: <MailIcon /> },
  ] },
  { key: 'd', label: '', type: 'divider' as const },
  { key: 'folders', label: 'Folders', icon: <FolderIcon />, children: [
    { key: 'work', label: 'Work' },
    { key: 'personal', label: 'Personal' },
  ] },
  { key: 'trash', label: 'Trash', icon: <TrashIcon />, danger: true },
];

export const MenuStory: StoryObj = {
  name: 'Menu & Dropdown',
  render: () => {
    const [collapsed, setCollapsed] = React.useState(false);
    return (
      <Flex gap="lg" align="flex-start" wrap>
        <Flex vertical gap="sm">
          <Flex align="center" gap="sm"><Switch size="sm" checked={collapsed} onChange={setCollapsed} /><Text type="secondary">Collapsed</Text></Flex>
          <Menu items={menuItems} defaultSelectedKey="inbox" defaultOpenKeys={['folders']} collapsed={collapsed} />
        </Flex>
        <Flex vertical gap="md">
          <Menu mode="horizontal" defaultSelectedKey="home" items={[{ key: 'home', label: 'Home', icon: <HomeIcon /> }, { key: 'docs', label: 'Docs' }, { key: 'blog', label: 'Blog' }]} />
          <Flex gap="sm">
            <Dropdown
              onSelect={(k) => message.info(`Selected ${k}`)}
              items={[
                { key: 'edit', label: 'Edit', icon: <EditIcon />, extra: '⌘E' },
                { key: 'copy', label: 'Duplicate', icon: <CopyIcon />, extra: '⌘D' },
                { key: 'share', label: 'Share', icon: <ShareIcon /> },
                { key: 'd', label: '', type: 'divider' },
                { key: 'delete', label: 'Delete', icon: <TrashIcon />, danger: true },
              ]}
            >
              <Button icon={<ChevronDownIcon />} iconPosition="end">Actions</Button>
            </Dropdown>
            <Dropdown placement="bottomRight" trigger="hover" items={[{ key: 'p', label: 'Profile', icon: <UserIcon /> }, { key: 's', label: 'Settings', icon: <SettingsIcon /> }]}>
              <IconButton aria-label="More" icon={<MoreVerticalIcon />} />
            </Dropdown>
          </Flex>
        </Flex>
      </Flex>
    );
  },
};

export const Bars: StoryObj = {
  render: () => (
    <Flex vertical gap="lg">
      <NavBar
        title="Classic NavBar"
        left={<IconButton variant="text" aria-label="Menu" icon={<MenuIcon />} />}
        right={<><IconButton variant="text" aria-label="Search" icon={<SearchIcon />} /><Avatar size="sm">TD</Avatar></>}
      />
      <NavBar
        floating
        logo={<DropletIcon size={22} color="var(--lg-accent)" />}
        title="Floating"
        right={<><IconButton aria-label="Notifications" icon={<BellIcon />} /><Button variant="filled" color="primary" size="sm">Sign up</Button></>}
      >
        <Menu mode="horizontal" glass={false} defaultSelectedKey="a" items={[{ key: 'a', label: 'Product' }, { key: 'b', label: 'Pricing' }, { key: 'c', label: 'About' }]} />
      </NavBar>
      <Flex justify="center">
        <TabBar
          items={[
            { key: 'home', label: 'Home', icon: <HomeIcon /> },
            { key: 'search', label: 'Search', icon: <SearchIcon /> },
            { key: 'camera', label: 'Camera', icon: <CameraIcon /> },
            { key: 'inbox', label: 'Inbox', icon: <InboxIcon />, badge: 5 },
            { key: 'me', label: 'Me', icon: <UserIcon /> },
          ]}
        />
      </Flex>
    </Flex>
  ),
};
