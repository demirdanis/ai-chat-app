import type { Meta, StoryObj } from "@storybook/react";

import { CharacterPicker } from "./CharacterPicker";

const meta = {
  title: "Components/CharacterPicker",
  component: CharacterPicker,
  tags: ["autodocs"],
  args: {
    characters: [
      {
        id: "c-1",
        name: "Assistant",
        avatar_url: "/avatars/1.png",
        system_prompt: "Helpful AI assistant.",
      },
      {
        id: "c-2",
        name: "Teacher",
        avatar_url: "/avatars/2.png",
        system_prompt: "Explains concepts with examples.",
      },
    ],
  },
  render: (args) => (
    <div className="p-6 max-w-2xl pointer-events-none">
      <CharacterPicker {...args} />
    </div>
  ),
} satisfies Meta<typeof CharacterPicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
