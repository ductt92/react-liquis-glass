import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card, Input, Text, message } from 'react-liquis-glass';
import { allIcons, SearchIcon, type IconProps } from 'react-liquis-glass/icons';

const meta: Meta<IconProps> = {
  title: 'Icons',
  args: { size: 26, strokeWidth: 1.8, color: 'currentColor' },
  argTypes: { size: { control: { type: 'range', min: 12, max: 64 } }, strokeWidth: { control: { type: 'range', min: 0.5, max: 3, step: 0.1 } }, color: { control: 'color' } },
};
export default meta;

export const Gallery: StoryObj<IconProps> = {
  render: (args) => {
    const [q, setQ] = React.useState('');
    const names = Object.keys(allIcons).filter((n) => n.toLowerCase().includes(q.toLowerCase()));
    return (
      <Card title={`${Object.keys(allIcons).length} icons`} subtitle="import { HomeIcon } from 'react-liquis-glass/icons' — click to copy" extra={<Input prefix={<SearchIcon />} placeholder="Search icons" value={q} onValueChange={setQ} allowClear style={{ width: 220 }} />}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: 8 }}>
          {names.map((n) => {
            const Icon = allIcons[n as keyof typeof allIcons];
            return (
              <button
                key={n}
                type="button"
                className="lg-glass"
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '16px 6px', borderRadius: 16, cursor: 'pointer', color: 'var(--lg-text)', font: 'inherit' }}
                onClick={() => {
                  navigator.clipboard?.writeText(`<${n}Icon />`);
                  message.success(`Copied <${n}Icon />`);
                }}
              >
                <Icon {...args} />
                <Text type="secondary" style={{ fontSize: 11 }}>{n}</Text>
              </button>
            );
          })}
        </div>
      </Card>
    );
  },
};
