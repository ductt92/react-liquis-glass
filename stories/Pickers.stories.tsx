import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card, Flex, Text } from 'liquidglass-ui';
import { AutoComplete, ColorPicker, RangePicker, TimePicker, type DateRange } from 'liquidglass-ui';
import { SearchIcon } from 'liquidglass-ui/icons';

const meta: Meta = { title: 'Pickers' };
export default meta;

const cities = ['Hà Nội', 'Hồ Chí Minh', 'Đà Nẵng', 'Hải Phòng', 'Cần Thơ', 'Huế', 'Nha Trang', 'Đà Lạt', 'Tokyo', 'Seoul', 'Singapore', 'Bangkok', 'Paris', 'London', 'New York'];
const domains = ['gmail.com', 'outlook.com', 'icloud.com', 'yahoo.com'];

export const AutoCompleteStory: StoryObj = {
  name: 'AutoComplete',
  render: () => {
    const [email, setEmail] = React.useState('');
    const emailOptions = email && !email.includes('@') ? domains.map((d) => `${email}@${d}`) : [];
    const [picked, setPicked] = React.useState('');
    return (
      <Card style={{ maxWidth: 480 }}>
        <Flex vertical gap="md">
          <AutoComplete options={cities} placeholder="Search a city" prefix={<SearchIcon />} allowClear onSelect={setPicked} notFoundContent="No city found" />
          <AutoComplete value={email} onChange={setEmail} options={emailOptions} filterOption={false} placeholder="Email — suggestions from onSearch-style options" />
          <AutoComplete options={cities} size="sm" placeholder="Small" />
          <AutoComplete options={cities} status="error" placeholder="Error status" />
          <Text type="secondary">Picked city: {picked || '—'}</Text>
        </Flex>
      </Card>
    );
  },
};

export const TimePickerStory: StoryObj = {
  name: 'TimePicker',
  render: () => {
    const [t, setT] = React.useState<string | null>('09:30');
    return (
      <Card style={{ maxWidth: 360 }}>
        <Flex vertical gap="md">
          <TimePicker value={t} onChange={setT} />
          <TimePicker format="HH:mm:ss" placeholder="With seconds" />
          <TimePicker minuteStep={15} placeholder="15-minute steps" />
          <TimePicker disabled defaultValue="18:00" />
          <Text type="secondary">Value: {t ?? '—'}</Text>
        </Flex>
      </Card>
    );
  },
};

const addDays = (n: number) => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + n);
  return d;
};

export const RangePickerStory: StoryObj = {
  name: 'RangePicker',
  render: () => {
    const [range, setRange] = React.useState<DateRange>([addDays(-3), addDays(4)]);
    const [text, setText] = React.useState<[string, string]>(['', '']);
    return (
      <Card style={{ maxWidth: 420 }}>
        <Flex vertical gap="md">
          <RangePicker
            value={range}
            onChange={(r, f) => {
              setRange(r);
              setText(f);
            }}
            presets={[
              { label: 'Today', value: [addDays(0), addDays(0)] },
              { label: 'Last 7 days', value: [addDays(-6), addDays(0)] },
              { label: 'Last 30 days', value: [addDays(-29), addDays(0)] },
              { label: 'Next week', value: [addDays(1), addDays(7)] },
            ]}
          />
          <RangePicker placeholder={['Check-in', 'Check-out']} disabledDate={(d) => d < addDays(0)} format="DD/MM/YYYY" />
          <Text type="secondary">Formatted: {text[0] || '—'} → {text[1] || '—'}</Text>
        </Flex>
      </Card>
    );
  },
};

export const ColorPickerStory: StoryObj = {
  name: 'ColorPicker',
  render: () => {
    const [c, setC] = React.useState('#bf5af2');
    return (
      <Card style={{ maxWidth: 420 }}>
        <Flex vertical gap="md">
          <Flex gap="md" align="center" wrap>
            <ColorPicker value={c} onChange={setC} />
            <ColorPicker value={c} onChange={setC} showText />
            <ColorPicker defaultValue="#30d15880" showAlpha showText />
            <ColorPicker size="sm" defaultValue="#ff9f0a" />
            <ColorPicker size="lg" defaultValue="#64d2ff" />
            <ColorPicker disabled defaultValue="#8e8e93" />
          </Flex>
          <div style={{ height: 56, borderRadius: 16, background: c, boxShadow: 'inset 0 1px 1px rgba(255,255,255,.5)' }} />
          <Text type="secondary">Value: {c}</Text>
        </Flex>
      </Card>
    );
  },
};
