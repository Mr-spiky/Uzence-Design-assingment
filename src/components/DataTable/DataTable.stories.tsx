import type { Meta, StoryObj } from '@storybook/react';
import DataTable from './DataTable';
import type { Column } from './DataTable';

// Define a type for our sample data
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

// Sample Data
const sampleData: User[] = [
  { id: '1', name: 'Jane Cooper', email: 'jane@example.com', role: 'Admin' },
  { id: '2', name: 'John Doe', email: 'john@example.com', role: 'Developer' },
  { id: '3', name: 'Alice Smith', email: 'alice@example.com', role: 'Designer' },
];

// Define Columns
const columns: Column<User>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
  { key: 'role', title: 'Role', dataIndex: 'role', sortable: true },
];

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable',
  component: DataTable,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DataTable<User>>;

export const Default: Story = {
  args: {
    data: sampleData,
    columns: columns,
  },
};

export const Loading: Story = {
  args: {
    data: [],
    columns: columns,
    loading: true,
  },
};

export const Selectable: Story = {
  args: {
    data: sampleData,
    columns: columns,
    selectable: 'multiple',
    onRowSelect: (selectedRows) => console.log('Selected Rows:', selectedRows),
  },
};