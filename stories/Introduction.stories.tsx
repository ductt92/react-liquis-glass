import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, Badge, Button, Card, Flex, IconButton, NavBar, Progress, Segmented, Slider, Space, Statistic, Switch, TabBar, Tag, Text, Title } from 'react-liquis-glass';
import { BellIcon, DropletIcon, HeartIcon, HomeIcon, SearchIcon, SettingsIcon, SparklesIcon, UserIcon, MusicIcon, PlayIcon, PauseIcon } from 'react-liquis-glass/icons';

const meta: Meta = { title: 'Introduction' };
export default meta;

export const Showcase: StoryObj = {
  render: () => {
    const [playing, setPlaying] = React.useState(true);
    return (
      <Flex vertical gap="lg" style={{ maxWidth: 1080, margin: '0 auto' }}>
        <NavBar
          floating
          logo={<DropletIcon size={22} color="var(--lg-accent)" />}
          title="Liquid Glass UI"
          right={
            <Space>
              <IconButton aria-label="Search" icon={<SearchIcon />} />
              <Badge count={3}>
                <IconButton aria-label="Notifications" icon={<BellIcon />} />
              </Badge>
              <Avatar status="online">TD</Avatar>
            </Space>
          }
        >
          <Segmented options={['Overview', 'Library', 'Settings']} size="sm" />
        </NavBar>
        <div className="sb-grid">
          <Card title="Revenue" extra={<Tag color="success">+12%</Tag>}>
            <Statistic value={48392.5} precision={2} prefix="$" trend={{ value: '12.4% vs last week', direction: 'up' }} />
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
          <Space style={{ marginTop: 20 }} wrap>
            <Button variant="filled" color="primary" icon={<SparklesIcon />}>Get started</Button>
            <Button>Glass</Button>
            <Button variant="tinted" color="success">Tinted</Button>
            <Button variant="outline" color="danger" icon={<HeartIcon />}>Outline</Button>
          </Space>
        </Card>
        <Flex justify="center">
          <TabBar
            items={[
              { key: 'home', label: 'Home', icon: <HomeIcon /> },
              { key: 'search', label: 'Search', icon: <SearchIcon /> },
              { key: 'inbox', label: 'Inbox', icon: <BellIcon />, badge: 2 },
              { key: 'me', label: 'Profile', icon: <UserIcon /> },
              { key: 'settings', label: 'Settings', icon: <SettingsIcon /> },
            ]}
          />
        </Flex>
      </Flex>
    );
  },
};
