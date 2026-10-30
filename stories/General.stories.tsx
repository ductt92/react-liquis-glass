import type { Meta, StoryObj } from '@storybook/react';
import { Button, ButtonGroup, Card, Divider, IconButton, Paragraph, Space, Text, Title } from 'liquidglass-ui';
import { DownloadIcon, PlusIcon, HeartIcon, TrashIcon, ShareIcon, ChevronLeftIcon, ChevronRightIcon, SettingsIcon } from 'liquidglass-ui/icons';

const meta: Meta<typeof Button> = {
  title: 'General/Button',
  component: Button,
  args: { children: 'Button', variant: 'glass', color: 'default', size: 'md', shape: 'default', loading: false, disabled: false, block: false },
  argTypes: {
    variant: { control: 'inline-radio', options: ['glass', 'filled', 'tinted', 'outline', 'text', 'link'] },
    color: { control: 'inline-radio', options: ['default', 'primary', 'success', 'warning', 'danger', 'info'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    shape: { control: 'inline-radio', options: ['default', 'round', 'circle'] },
  },
};
export default meta;
type S = StoryObj<typeof Button>;

export const Playground: S = { render: (a) => <Button {...a} /> };

export const Variants: S = {
  render: () => (
    <Card>
      {(['glass', 'filled', 'tinted', 'outline', 'text', 'link'] as const).map((v) => (
        <div key={v}>
          <div className="sb-section-title">{v}</div>
          <Space wrap>
            {(['default', 'primary', 'success', 'warning', 'danger', 'info'] as const).map((c) => (
              <Button key={c} variant={v} color={c}>{c}</Button>
            ))}
          </Space>
        </div>
      ))}
    </Card>
  ),
};

export const SizesIconsStates: S = {
  render: () => (
    <Card>
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
      <div style={{ marginTop: 12 }}><Button block variant="filled" color="primary">Block button</Button></div>
    </Card>
  ),
};

export const Typography: StoryObj = {
  render: () => (
    <Card style={{ maxWidth: 720 }}>
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
      <Paragraph ellipsis={2} style={{ maxWidth: 360 }}>
        This is a very long paragraph that will be clamped to two lines. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </Paragraph>
    </Card>
  ),
};
