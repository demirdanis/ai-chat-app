import type { Meta, StoryObj } from "@storybook/react";

import { TypingDots } from "./typing-dots";

const meta = {
  title: "Atoms/TypingDots",
  component: TypingDots,
  tags: ["autodocs"],
  render: () => (
    <div className="p-6">
      <div className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm">
        Assistant is typing <TypingDots />
      </div>
    </div>
  ),
} satisfies Meta<typeof TypingDots>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
