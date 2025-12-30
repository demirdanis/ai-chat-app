import type { Meta, StoryObj } from "@storybook/react";

import { CharacterPicker } from "@/components/character-picker/CharacterPicker";

const MockChatHomePage = () => {
  return (
    <div className="h-full min-h-0 overflow-hidden space-y-6 p-6">
      <div>
        <h1 className="text-xl font-semibold">Start a conversation</h1>
        <p className="text-sm text-muted-foreground">
          Choose a character to begin a new chat.
        </p>
      </div>

      <div className="pointer-events-none">
        <CharacterPicker
          characters={[
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
          ]}
        />
      </div>
    </div>
  );
};

const meta = {
  title: "Pages/ChatHomePage",
  component: MockChatHomePage,
  tags: ["autodocs"],
} satisfies Meta<typeof MockChatHomePage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Mocked: Story = {};
