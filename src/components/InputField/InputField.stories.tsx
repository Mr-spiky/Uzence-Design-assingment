import type { Meta, StoryObj } from '@storybook/react';
import InputField from './InputField';

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['filled', 'outlined', 'ghost'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'password'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof InputField>;

// Default Story
export const Default: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'you@example.com',
  },
};

// Story for Error State
export const Error: Story = {
  args: {
    ...Default.args,
    invalid: true,
    errorMessage: 'Please enter a valid email address.',
  },
};

// Story for Disabled State
export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

// Story for Password Type
export const Password: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
  },
};