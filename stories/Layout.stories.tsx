import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, Button, Card, Col, Divider, Flex, Row, Space, Text } from 'react-liquis-glass';
import { HeartIcon, MessageCircleIcon, ShareIcon, MoreHorizontalIcon } from 'react-liquis-glass/icons';

const meta: Meta = { title: 'Layout' };
export default meta;

const Box = ({ children }: { children: React.ReactNode }) => (
  <div className="lg-glass" style={{ padding: 14, borderRadius: 12, textAlign: 'center' }}>{children}</div>
);

export const Grid: StoryObj = {
  render: () => (
    <Card title="Row / Col — 24 columns">
      <Row gutter={[12, 12]}>
        <Col span={24}><Box>24</Box></Col>
        <Col span={12}><Box>12</Box></Col>
        <Col span={12}><Box>12</Box></Col>
        <Col span={8}><Box>8</Box></Col>
        <Col span={8}><Box>8</Box></Col>
        <Col span={8}><Box>8</Box></Col>
        <Col span={6}><Box>6</Box></Col>
        <Col span={6} offset={12}><Box>6 offset 12</Box></Col>
        <Col xs={24} md={12} lg={6}><Box>xs24 md12 lg6</Box></Col>
        <Col xs={24} md={12} lg={6}><Box>xs24 md12 lg6</Box></Col>
        <Col xs={24} md={12} lg={6}><Box>xs24 md12 lg6</Box></Col>
        <Col xs={24} md={12} lg={6}><Box>xs24 md12 lg6</Box></Col>
      </Row>
    </Card>
  ),
};

export const SpaceFlexDivider: StoryObj = {
  render: () => (
    <Card>
      <div className="sb-section-title">Space</div>
      <Space size="md"><Button>One</Button><Button>Two</Button><Button>Three</Button></Space>
      <div className="sb-section-title">Space with split</div>
      <Space split={<Divider vertical />}><Text>Docs</Text><Text>Blog</Text><Text>GitHub</Text></Space>
      <div className="sb-section-title">Flex</div>
      <Flex justify="space-between" align="center" gap="md">
        <Box>Left</Box><Box>Center</Box><Box>Right</Box>
      </Flex>
      <Divider>Text</Divider>
      <Divider orientation="left">Left text</Divider>
      <Divider dashed />
    </Card>
  ),
};

export const Cards: StoryObj = {
  render: () => (
    <div className="sb-grid">
      <Card title="Basic card" extra={<Button variant="link" color="primary">More</Button>}>
        <Text type="secondary">Card content sits on a liquid glass surface.</Text>
      </Card>
      <Card
        hoverable
        cover={<img alt="" height={160} src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&q=60" />}
        title="Hoverable with cover"
        subtitle="Yosemite National Park"
        actions={[<HeartIcon key="1" />, <MessageCircleIcon key="2" />, <ShareIcon key="3" />, <MoreHorizontalIcon key="4" />]}
      >
        <Flex align="center" gap="sm"><Avatar size="sm">AN</Avatar><Text type="secondary">by Anna</Text></Flex>
      </Card>
      <Card title="Strong variant" variant="strong"><Text type="secondary">More opaque glass for dense content.</Text></Card>
      <Card title="Loading" loading />
      <Card title="Plain" variant="plain" size="sm"><Text type="secondary">No glass, small padding.</Text></Card>
    </div>
  ),
};

export const CardBareAndAs: StoryObj = {
  name: 'Card: bare and as',
  render: () => (
    <div className="sb-grid">
      <Card as="section" bare aria-label="Stats" style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: 20 }}>
        <Text type="secondary">
          <code>bare</code> drops the body wrapper and its padding, so the card's own flex layout and gap apply to its children.
          <code> as="section"</code> sets the root element.
        </Text>
        <Text strong>1,284 visitors</Text>
        <Text type="secondary">+12% this week</Text>
      </Card>
      <Card as="form" bare style={{ display: 'grid', gap: 10, padding: 20 }} onSubmit={(e: React.FormEvent) => e.preventDefault()}>
        <Text strong>A form that is a card</Text>
        <Button type="submit" variant="filled" color="primary">Save</Button>
      </Card>
    </div>
  ),
};
