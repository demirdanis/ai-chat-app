import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Button } from "./button";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "./toast";

const meta = {
  title: "Atoms/Toast",
  component: Toast,
  tags: ["autodocs"],
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <ToastProvider>
        <div className="p-10">
          <Button onClick={() => setOpen(true)}>Show toast</Button>
        </div>

        <Toast open={open} onOpenChange={setOpen}>
          <div className="grid gap-1">
            <ToastTitle>Saved</ToastTitle>
            <ToastDescription>Your changes were saved.</ToastDescription>
          </div>
          <ToastClose />
        </Toast>
        <ToastViewport />
      </ToastProvider>
    );
  },
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
