import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Alert, Button, Card, Drawer, Flex, Input, Modal, Popconfirm, Popover, Result, Space, Text, Tooltip, message, notification, FormItem, Form,
} from 'react-liquis-glass';
import { InfoIcon } from 'react-liquis-glass/icons';

const meta: Meta = { title: 'Feedback' };
export default meta;

export const Alerts: StoryObj = {
  render: () => (
    <Card style={{ maxWidth: 640 }}>
      <Flex vertical gap="md">
        <Alert type="info" title="A new software update is available." closable />
        <Alert type="success" title="Changes saved" />
        <Alert type="warning" title="Storage almost full" description="You've used 92% of your iCloud storage. Upgrade to keep backing up." action={<Button size="sm" variant="tinted" color="warning">Upgrade</Button>} />
        <Alert type="error" title="Payment failed" description="Your card was declined. Please update your payment method." closable />
      </Flex>
    </Card>
  ),
};

export const ModalStory: StoryObj = {
  name: 'Modal & Drawer',
  render: () => {
    const [modal, setModal] = React.useState(false);
    const [confirm, setConfirm] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [drawer, setDrawer] = React.useState<null | 'right' | 'left' | 'bottom' | 'top'>(null);
    return (
      <Card>
        <Space wrap>
          <Button variant="filled" color="primary" onClick={() => setModal(true)}>Open modal</Button>
          <Button variant="tinted" color="danger" onClick={() => setConfirm(true)}>Delete…</Button>
          {(['right', 'left', 'bottom', 'top'] as const).map((p) => (
            <Button key={p} onClick={() => setDrawer(p)}>Drawer {p}</Button>
          ))}
        </Space>
        <Modal open={modal} onClose={() => setModal(false)} title="Edit profile" onOk={() => (setModal(false), message.success('Profile saved'))} okText="Save">
          <Form>
            <FormItem label="Display name"><Input defaultValue="Liquid Glass" /></FormItem>
            <FormItem label="Bio"><Input placeholder="Say something…" /></FormItem>
          </Form>
        </Modal>
        <Modal
          open={confirm}
          onClose={() => setConfirm(false)}
          title="Delete this project?"
          okText="Delete"
          okDanger
          okLoading={loading}
          width={400}
          onOk={() => {
            setLoading(true);
            setTimeout(() => (setLoading(false), setConfirm(false), message.success('Deleted')), 1200);
          }}
        >
          This action cannot be undone. All files will be permanently removed.
        </Modal>
        <Drawer
          open={!!drawer}
          placement={drawer ?? 'right'}
          onClose={() => setDrawer(null)}
          title="Filters"
          footer={<><Button onClick={() => setDrawer(null)}>Cancel</Button><Button variant="filled" color="primary" onClick={() => setDrawer(null)}>Apply</Button></>}
        >
          <Text type="secondary">Drawer content on a liquid glass sheet.</Text>
        </Drawer>
      </Card>
    );
  },
};

export const Toasts: StoryObj = {
  name: 'Message & Notification',
  render: () => (
    <Card>
      <div className="sb-section-title">message</div>
      <Space wrap>
        <Button onClick={() => message.success('Saved successfully')}>Success</Button>
        <Button onClick={() => message.error('Something went wrong')}>Error</Button>
        <Button onClick={() => message.warning('Check your input')}>Warning</Button>
        <Button onClick={() => message.info('Heads up!')}>Info</Button>
        <Button
          onClick={() => {
            const close = message.loading('Uploading…');
            setTimeout(() => (close(), message.success('Uploaded')), 1500);
          }}
        >
          Loading
        </Button>
      </Space>
      <div className="sb-section-title">notification</div>
      <Space wrap>
        <Button onClick={() => notification.success({ title: 'Deployment complete', description: 'react-liquis-glass v0.1.1 is live.' })}>Success</Button>
        <Button onClick={() => notification.error({ title: 'Build failed', description: '3 tests failed in Table.test.tsx', btn: <Button size="sm" variant="tinted" color="danger">View logs</Button> })}>With action</Button>
        <Button onClick={() => notification.info({ title: 'New message', description: 'Anna: Love the new glass!', placement: 'bottomRight' })}>Bottom right</Button>
        <Button onClick={() => notification.warning({ title: 'Top left', placement: 'topLeft' })}>Top left</Button>
      </Space>
    </Card>
  ),
};

export const Overlays: StoryObj = {
  name: 'Tooltip, Popover, Popconfirm',
  render: () => (
    <Card>
      <Space wrap size="md">
        {(['top', 'bottom', 'left', 'right'] as const).map((p) => (
          <Tooltip key={p} title={`Tooltip on ${p}`} placement={p}><Button>{p}</Button></Tooltip>
        ))}
        <Popover title="Popover title" content="Rich content can live here, including any components.">
          <Button icon={<InfoIcon />} variant="tinted" color="primary">Popover</Button>
        </Popover>
        <Popover trigger="hover" content={<Text>Hover popover</Text>}><Button>Hover me</Button></Popover>
        <Popconfirm title="Delete the task?" description="This cannot be undone." okDanger okText="Delete" onConfirm={() => new Promise((r) => setTimeout(r, 800)).then(() => message.success('Deleted'))}>
          <Button variant="outline" color="danger">Popconfirm</Button>
        </Popconfirm>
      </Space>
    </Card>
  ),
};

export const Results: StoryObj = {
  render: () => (
    <div className="sb-grid">
      <Card><Result status="success" title="Payment successful" subTitle="Order #2026-1030 is on its way." extra={<><Button variant="filled" color="primary">View order</Button><Button>Buy again</Button></>} /></Card>
      <Card><Result status="error" title="Submission failed" subTitle="Please check the form and try again." /></Card>
      <Card><Result status="404" title="Page not found" subTitle="The page you visited does not exist." extra={<Button variant="filled" color="primary">Back home</Button>} /></Card>
    </div>
  ),
};
