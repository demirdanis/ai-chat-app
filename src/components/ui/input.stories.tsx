import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "./input";

const meta = {
  title: "Atoms/Input",
  component: Input,
  tags: ["autodocs"],
  args: {
    placeholder: "Type here…",
    defaultValue: "",
    disabled: false,
  },
  render: (args) => (
    <div className="p-6 max-w-sm">
      <Input {...args} />
    </div>
  ),
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValue: Story = {
  args: {
    defaultValue: "Hello from Storybook",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: "Disabled",
  },
};
