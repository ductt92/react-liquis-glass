import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Button, Calendar, Card, Checkbox, CheckboxGroup, DatePicker, Flex, Form, FormItem, Input, InputNumber, Password, Radio, RadioGroup,
  Rate, SearchInput, Segmented, Select, Slider, Space, Switch, Text, TextArea, Upload, message,
} from 'react-liquis-glass';
import { MailIcon, UserIcon, GlobeIcon, ListIcon, GridIcon, DashboardIcon, HeartFilledIcon } from 'react-liquis-glass/icons';

const meta: Meta = { title: 'Data Entry' };
export default meta;

export const Inputs: StoryObj = {
  render: () => (
    <Card style={{ maxWidth: 560 }}>
      <Flex vertical gap="md">
        <Input placeholder="Basic input" />
        <Input prefix={<UserIcon />} placeholder="With prefix & clear" allowClear defaultValue="Liquid" />
        <Input addonBefore="https://" addonAfter=".com" placeholder="mysite" />
        <Input placeholder="Max length + count" maxLength={20} showCount />
        <Password placeholder="Password" />
        <SearchInput placeholder="Search…" onSearch={(v) => message.info(`Search: ${v}`)} />
        <Flex gap="sm">
          <Input size="sm" placeholder="Small" />
          <Input placeholder="Medium" />
          <Input size="lg" placeholder="Large" />
        </Flex>
        <Flex gap="sm">
          <Input variant="filled" placeholder="Filled" />
          <Input variant="outline" placeholder="Outline" />
        </Flex>
        <Input status="error" placeholder="Error status" />
        <Input status="warning" placeholder="Warning status" />
        <Input disabled placeholder="Disabled" />
        <TextArea placeholder="Auto-size textarea" autoSize={{ minRows: 2, maxRows: 6 }} showCount maxLength={200} />
        <Flex gap="sm" align="center">
          <InputNumber defaultValue={3} min={0} max={10} style={{ width: 160 }} />
          <InputNumber defaultValue={9.99} step={0.01} precision={2} prefix="$" style={{ width: 180 }} />
        </Flex>
      </Flex>
    </Card>
  ),
};

const fruits = ['Apple', 'Banana', 'Cherry', 'Grape', 'Mango', 'Orange', 'Peach', 'Pear'].map((f) => ({ label: f, value: f.toLowerCase() }));

export const Selects: StoryObj = {
  render: () => {
    const [v, setV] = React.useState<string | null>('banana');
    const [multi, setMulti] = React.useState<string[]>(['apple', 'mango']);
    return (
      <Card style={{ maxWidth: 560 }}>
        <Flex vertical gap="md">
          <Select options={fruits} value={v} onChange={setV} allowClear placeholder="Pick a fruit" />
          <Select multiple options={fruits} value={multi} onChange={setMulti} showSearch placeholder="Multiple with search" />
          <Select
            showSearch
            prefix={<GlobeIcon />}
            placeholder="Grouped options"
            options={[
              { label: 'Asia', options: [{ label: 'Vietnam', value: 'vn' }, { label: 'Japan', value: 'jp' }, { label: 'Korea', value: 'kr' }] },
              { label: 'Europe', options: [{ label: 'France', value: 'fr' }, { label: 'Germany', value: 'de', disabled: true }] },
            ]}
          />
          <Select options={fruits} disabled placeholder="Disabled" />
          <Text type="secondary">Value: {v ?? '—'} · Multi: {multi.join(', ')}</Text>
        </Flex>
      </Card>
    );
  },
};

export const Choices: StoryObj = {
  render: () => (
    <div className="sb-grid">
      <Card title="Checkbox">
        <Flex vertical gap="md">
          <Checkbox defaultChecked>Remember me</Checkbox>
          <Checkbox indeterminate>Indeterminate</Checkbox>
          <Checkbox disabled>Disabled</Checkbox>
          <CheckboxGroup options={['React', 'Vue', 'Svelte']} defaultValue={['React']} />
        </Flex>
      </Card>
      <Card title="Radio">
        <Flex vertical gap="md">
          <RadioGroup options={['Daily', 'Weekly', 'Monthly']} defaultValue="Weekly" />
          <RadioGroup optionType="button" options={['Day', 'Week', 'Month']} defaultValue="Day" />
          <RadioGroup direction="vertical" defaultValue={1}>
            <Radio value={1}>Option A</Radio>
            <Radio value={2}>Option B</Radio>
            <Radio value={3} disabled>Option C (disabled)</Radio>
          </RadioGroup>
        </Flex>
      </Card>
      <Card title="Switch">
        <Space wrap size="md">
          <Switch defaultChecked />
          <Switch />
          <Switch size="sm" defaultChecked />
          <Switch checkedChildren="ON" unCheckedChildren="OFF" defaultChecked />
          <Switch loading defaultChecked />
          <Switch disabled />
        </Space>
      </Card>
      <Card title="Segmented">
        <Flex vertical gap="md">
          <Segmented options={['Daily', 'Weekly', 'Monthly', 'Yearly']} />
          <Segmented
            size="sm"
            options={[
              { label: 'List', value: 'list', icon: <ListIcon /> },
              { label: 'Grid', value: 'grid', icon: <GridIcon /> },
              { label: 'Board', value: 'board', icon: <DashboardIcon /> },
            ]}
          />
          <Segmented block options={['Map', 'Transit', 'Satellite']} />
        </Flex>
      </Card>
      <Card title="Slider">
        <Flex vertical gap="lg">
          <Slider defaultValue={40} />
          <Slider range defaultValue={[20, 70]} />
          <Slider defaultValue={30} step={10} marks={{ 0: '0°C', 30: '30°C', 60: '60°C', 100: '100°C' }} tooltip={(v) => `${v}°C`} />
        </Flex>
      </Card>
      <Card title="Rate">
        <Flex vertical gap="md">
          <Rate defaultValue={3} />
          <Rate allowHalf defaultValue={2.5} size="lg" />
          <Rate character={<HeartFilledIcon />} defaultValue={4} />
          <Rate disabled defaultValue={4} size="sm" />
        </Flex>
      </Card>
    </div>
  ),
};

export const DatePickers: StoryObj = {
  render: () => {
    const [d, setD] = React.useState<Date | null>(new Date());
    return (
      <Flex gap="lg" wrap align="flex-start">
        <Card title="DatePicker" style={{ width: 320 }}>
          <Flex vertical gap="md">
            <DatePicker value={d} onChange={setD} />
            <DatePicker placeholder="No weekends" disabledDate={(x) => x.getDay() === 0 || x.getDay() === 6} />
            <DatePicker format="DD/MM/YYYY" placeholder="DD/MM/YYYY" />
          </Flex>
        </Card>
        <Calendar bordered value={d} onChange={setD} />
      </Flex>
    );
  },
};

export const UploadStory: StoryObj = {
  name: 'Upload',
  render: () => (
    <Card style={{ maxWidth: 520 }}>
      <Upload
        multiple
        hint="Supports images and PDF up to 10MB (demo simulates progress)"
        customRequest={(_file, onProgress) =>
          new Promise((resolve) => {
            let p = 0;
            const t = setInterval(() => {
              p += 20;
              onProgress(p);
              if (p >= 100) (clearInterval(t), resolve());
            }, 250);
          })
        }
      />
    </Card>
  ),
};

export const FormLayout: StoryObj = {
  render: () => (
    <Card title="Create account" style={{ maxWidth: 520 }}>
      <Form onSubmit={(e) => (e.preventDefault(), message.success('Submitted!'))}>
        <FormItem label="Full name" required>
          <Input placeholder="Jane Doe" prefix={<UserIcon />} />
        </FormItem>
        <FormItem label="Email" required status="error" help="Please enter a valid email">
          <Input placeholder="jane@example.com" prefix={<MailIcon />} defaultValue="jane@" />
        </FormItem>
        <FormItem label="Role" extra="You can change this later">
          <Select options={[{ label: 'Designer', value: 'd' }, { label: 'Engineer', value: 'e' }]} placeholder="Choose a role" />
        </FormItem>
        <FormItem label="Birthday">
          <DatePicker />
        </FormItem>
        <FormItem>
          <Checkbox>I agree to the terms</Checkbox>
        </FormItem>
        <Button type="submit" variant="filled" color="primary" block>Create account</Button>
      </Form>
    </Card>
  ),
};
