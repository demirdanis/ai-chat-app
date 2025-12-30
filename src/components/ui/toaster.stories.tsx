import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./button";
import { Toaster } from "./toaster";
import { toast } from "./use-toast";

const meta = {
  title: "Atoms/Toaster",
  component: Toaster,
  tags: ["autodocs"],
  render: () => (
    <div className="p-10">
      <div className="flex items-center gap-3">
        <Button
          onClick={() =>
            toast({
              title: "Hello",
              description: "This is a toast from the shared hook.",
            })
          }
        >
          Trigger toast
        </Button>
      </div>
      <Toaster />
    </div>
  ),
} satisfies Meta<typeof Toaster>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
