import type { Meta, StoryObj } from "@storybook/react";

import { MarkdownMessage } from "./MarkdownMessage";

const meta = {
  title: "Components/MarkdownMessage",
  component: MarkdownMessage,
  tags: ["autodocs"],
  args: {
    content:
      "# Title\n\nThis supports **bold**, _italic_, lists, and code:\n\n- Item 1\n- Item 2\n\n```ts\nconst x: number = 123;\n```\n\n> Blockquote\n\n[A link](https://example.com)",
  },
  render: (args) => (
    <div className="p-6">
      <div className="prose prose-sm dark:prose-invert max-w-none">
        <MarkdownMessage {...args} />
      </div>
    </div>
  ),
} satisfies Meta<typeof MarkdownMessage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
