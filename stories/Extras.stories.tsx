import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button, Card, Flex, Paragraph, Space, Text, message } from 'react-liquis-glass';
import { FloatButton, FloatButtonGroup, BackTop, Watermark, Kbd, Countdown, Anchor } from 'react-liquis-glass';
import { confirm } from 'react-liquis-glass';
import { MessageCircleIcon, QuestionCircleIcon, ShareIcon, EditIcon, BellIcon, SearchIcon } from 'react-liquis-glass/icons';

const meta: Meta = { title: 'Extras' };
export default meta;

export const FloatButtons: StoryObj = {
  render: () => (
    <Card title="FloatButton" subtitle="See the bottom-right corner — hover the speed dial, click the square group buttons" style={{ minHeight: 420 }}>
      <Text type="secondary">Float buttons are fixed to the viewport.</Text>
      <FloatButton icon={<QuestionCircleIcon />} tooltip="Help" right={100} />
      <FloatButton icon={<BellIcon />} badge={{ count: 5 }} right={170} type="primary" tooltip="Notifications" />
      <FloatButton icon={<MessageCircleIcon />} description="Chat" shape="square" right={240} />
      <FloatButtonGroup trigger="hover" right={24} bottom={24}>
        <FloatButton icon={<EditIcon />} tooltip="Edit" />
        <FloatButton icon={<ShareIcon />} tooltip="Share" />
        <FloatButton icon={<MessageCircleIcon />} tooltip="Comment" />
      </FloatButtonGroup>
      <FloatButtonGroup shape="square" right={310} bottom={24}>
        <FloatButton icon={<SearchIcon />} />
        <FloatButton icon={<QuestionCircleIcon />} />
      </FloatButtonGroup>
    </Card>
  ),
};

export const BackTopStory: StoryObj = {
  name: 'BackTop',
  render: () => (
    <Card title="BackTop" subtitle="Scroll down 200px">
      <div style={{ height: 1600 }}>
        <Text type="secondary">Keep scrolling… the button appears at the bottom-right.</Text>
      </div>
      <BackTop visibilityHeight={200} />
    </Card>
  ),
};

export const ConfirmStory: StoryObj = {
  name: 'confirm()',
  render: () => (
    <Card title="Imperative dialogs">
      <Space wrap>
        <Button
          variant="filled"
          color="danger"
          onClick={() =>
            confirm({
              title: 'Delete this file?',
              content: 'It will be moved to Trash and deleted after 30 days.',
              okText: 'Delete',
              okDanger: true,
              onOk: () => new Promise((r) => setTimeout(r, 1000)).then(() => message.success('Deleted')),
            })
          }
        >
          confirm (async)
        </Button>
        <Button onClick={() => confirm.info({ title: 'Heads up', content: 'This is an info dialog.' })}>info</Button>
        <Button onClick={() => confirm.success({ title: 'Payment received', content: 'Thanks for your order!' })}>success</Button>
        <Button onClick={() => confirm.warning({ title: 'Unsaved changes', content: 'Your draft is stored locally.' })}>warning</Button>
        <Button onClick={() => confirm.error({ title: 'Upload failed', content: 'The server returned 500.' })}>error</Button>
      </Space>
    </Card>
  ),
};

export const WatermarkStory: StoryObj = {
  name: 'Watermark',
  render: () => (
    <Watermark content={['Liquid Glass', 'Confidential']}>
      <Card title="Quarterly report" style={{ minHeight: 280 }}>
        <Paragraph type="secondary">This card is covered by a repeating, non-interactive watermark rendered from a canvas.</Paragraph>
        <Button variant="filled" color="primary">Still clickable</Button>
      </Card>
    </Watermark>
  ),
};

export const KbdCountdownCopy: StoryObj = {
  name: 'Kbd, Countdown, Copyable',
  render: () => {
    const [deadline] = React.useState(() => Date.now() + 1000 * 60 * 60 * 26 + 1000 * 42);
    const [soon, setSoon] = React.useState(() => Date.now() + 10_000);
    return (
      <div className="sb-grid">
        <Card title="Kbd">
          <Flex vertical gap="sm">
            <Text>Search <Kbd>⌘</Kbd><Kbd>K</Kbd></Text>
            <Text>Save <Kbd>Ctrl</Kbd>+<Kbd>S</Kbd></Text>
            <Text>Small <Kbd size="sm">Esc</Kbd></Text>
          </Flex>
        </Card>
        <Card title="Countdown">
          <Flex vertical gap="md">
            <Countdown title="Sale ends in" value={deadline} format="D [days] HH:mm:ss" />
            <Countdown title="Ten seconds" value={soon} format="mm:ss:SSS" onFinish={() => message.success('Finished!')} />
            <Button size="sm" onClick={() => setSoon(Date.now() + 10_000)}>Restart</Button>
          </Flex>
        </Card>
        <Card title="Copyable text">
          <Flex vertical gap="sm">
            <Text copyable>npm install react-liquis-glass</Text>
            <Text code copyable={{ text: 'import { Button } from "react-liquis-glass";' }}>import Button</Text>
            <Paragraph copyable={{ onCopy: () => message.success('Copied paragraph') }}>Copy this whole paragraph.</Paragraph>
          </Flex>
        </Card>
      </div>
    );
  },
};

export const AnchorStory: StoryObj = {
  name: 'Anchor',
  render: () => {
    const ref = React.useRef<HTMLDivElement>(null);
    const sections = ['intro', 'install', 'usage', 'theming', 'faq'];
    return (
      <Flex gap="lg" align="flex-start">
        <Card style={{ flex: 1 }} bodyStyle={{ padding: 0 }}>
          <div ref={ref} style={{ height: 420, overflowY: 'auto', padding: '8px 22px' }}>
            {sections.map((s) => (
              <section key={s} id={`anchor-${s}`} style={{ minHeight: 320, paddingTop: 12 }}>
                <Text strong style={{ fontSize: 18, textTransform: 'capitalize' }}>{s}</Text>
                <Paragraph type="secondary">Section content for {s}. Scroll this panel and watch the indicator follow.</Paragraph>
              </section>
            ))}
          </div>
        </Card>
        <Card style={{ width: 220 }} title="On this page">
          <Anchor
            getContainer={() => ref.current!}
            items={[
              { key: 'intro', href: '#anchor-intro', title: 'Introduction' },
              { key: 'install', href: '#anchor-install', title: 'Installation' },
              {
                key: 'usage', href: '#anchor-usage', title: 'Usage',
                children: [{ key: 'theming', href: '#anchor-theming', title: 'Theming' }],
              },
              { key: 'faq', href: '#anchor-faq', title: 'FAQ' },
            ]}
          />
        </Card>
      </Flex>
    );
  },
};
