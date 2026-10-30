import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card, Flex, Switch, Text } from 'react-liquis-glass';
import { FileIcon, FileTextIcon, FolderIcon, ImageIcon } from 'react-liquis-glass/icons';
import { Cascader, Transfer, Tree, TreeSelect, type CascaderOption, type TreeNode } from 'react-liquis-glass';

const meta: Meta = { title: 'Tree & Cascader' };
export default meta;

const files: TreeNode[] = [
  {
    key: 'src',
    title: 'src',
    icon: <FolderIcon />,
    children: [
      {
        key: 'components',
        title: 'components',
        icon: <FolderIcon />,
        children: [
          { key: 'button', title: 'Button.tsx', icon: <FileTextIcon /> },
          { key: 'card', title: 'Card.tsx', icon: <FileTextIcon /> },
          { key: 'tree', title: 'TreeData.tsx', icon: <FileTextIcon /> },
        ],
      },
      { key: 'styles', title: 'styles', icon: <FolderIcon />, children: [{ key: 'tokens', title: 'tokens.css', icon: <FileIcon /> }] },
      { key: 'index', title: 'index.ts', icon: <FileTextIcon /> },
    ],
  },
  {
    key: 'assets',
    title: 'assets',
    icon: <FolderIcon />,
    children: [
      { key: 'logo', title: 'logo.png', icon: <ImageIcon /> },
      { key: 'hero', title: 'hero.jpg', icon: <ImageIcon />, disabled: true },
    ],
  },
  { key: 'readme', title: 'README.md', icon: <FileIcon /> },
];

export const TreeStory: StoryObj = {
  name: 'Tree',
  render: () => {
    const [checkable, setCheckable] = React.useState(true);
    const [showLine, setShowLine] = React.useState(true);
    const [checked, setChecked] = React.useState<string[]>(['button']);
    return (
      <Flex gap="lg" wrap align="flex-start">
        <Card title="File tree" style={{ width: 340 }} extra={<Text type="secondary">{checked.length} checked</Text>}>
          <Flex gap="md" style={{ marginBottom: 12 }}>
            <Flex align="center" gap="xs"><Switch size="sm" checked={checkable} onChange={setCheckable} /><Text type="secondary">Checkable</Text></Flex>
            <Flex align="center" gap="xs"><Switch size="sm" checked={showLine} onChange={setShowLine} /><Text type="secondary">Lines</Text></Flex>
          </Flex>
          <Tree treeData={files} defaultExpandAll checkable={checkable} showLine={showLine} checkedKeys={checked} onCheck={setChecked} />
        </Card>
        <Tree glass treeData={files} defaultExpandedKeys={['src']} defaultSelectedKeys={['index']} style={{ width: 280 }} />
      </Flex>
    );
  },
};

export const TreeSelectStory: StoryObj = {
  name: 'TreeSelect',
  render: () => {
    const [single, setSingle] = React.useState<string | null>('card');
    const [multi, setMulti] = React.useState<string[]>([]);
    return (
      <Card style={{ maxWidth: 480 }}>
        <Flex vertical gap="md">
          <TreeSelect treeData={files} value={single} onChange={setSingle} allowClear showSearch treeDefaultExpandAll placeholder="Pick a file" />
          <TreeSelect treeData={files} value={multi} onChange={setMulti} treeCheckable showSearch placeholder="Check files (cascades)" />
          <TreeSelect treeData={files} multiple showLine placeholder="Multiple (click to toggle)" />
          <Text type="secondary">Single: {single ?? '—'} · Checked: {multi.join(', ') || '—'}</Text>
        </Flex>
      </Card>
    );
  },
};

const places: CascaderOption[] = [
  {
    value: 'vn',
    label: 'Vietnam',
    children: [
      { value: 'hcm', label: 'Ho Chi Minh City', children: [{ value: 'd1', label: 'District 1' }, { value: 'd3', label: 'District 3' }, { value: 'td', label: 'Thu Duc' }] },
      { value: 'hn', label: 'Hanoi', children: [{ value: 'hk', label: 'Hoan Kiem' }, { value: 'bd', label: 'Ba Dinh' }] },
      { value: 'dn', label: 'Da Nang' },
    ],
  },
  {
    value: 'jp',
    label: 'Japan',
    children: [
      { value: 'tokyo', label: 'Tokyo', children: [{ value: 'shibuya', label: 'Shibuya' }, { value: 'shinjuku', label: 'Shinjuku' }] },
      { value: 'osaka', label: 'Osaka' },
    ],
  },
  { value: 'kr', label: 'Korea', disabled: true },
];

export const CascaderStory: StoryObj = {
  name: 'Cascader',
  render: () => {
    const [v, setV] = React.useState<(string | number)[]>(['vn', 'hcm', 'd1']);
    return (
      <Card style={{ maxWidth: 480 }}>
        <Flex vertical gap="md">
          <Cascader options={places} value={v} onChange={setV} placeholder="Select location" />
          <Cascader options={places} expandTrigger="hover" showSearch placeholder="Hover to expand, with search" />
          <Cascader options={places} changeOnSelect placeholder="Change on select (pick any level)" />
          <Text type="secondary">Value: {v.join(' → ') || '—'}</Text>
        </Flex>
      </Card>
    );
  },
};

const people = Array.from({ length: 14 }, (_, i) => ({
  key: String(i),
  title: ['Anna', 'Bao', 'Chris', 'Duy', 'Emma', 'Finn', 'Gia', 'Hana', 'Ivy', 'Jack', 'Khoa', 'Linh', 'Minh', 'Nam'][i],
  description: ['Design', 'Engineering', 'Marketing'][i % 3],
  disabled: i === 4,
}));

export const TransferStory: StoryObj = {
  name: 'Transfer',
  render: () => {
    const [target, setTarget] = React.useState<string[]>(['1', '6']);
    return (
      <Card title="Assign team members" style={{ maxWidth: 680 }}>
        <Transfer dataSource={people} targetKeys={target} onChange={setTarget} titles={['Available', 'Assigned']} showSearch />
      </Card>
    );
  },
};
