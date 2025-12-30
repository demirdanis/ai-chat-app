import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../ui/button";
import { DrawerProvider, useDrawer } from "./DrawerProvider";

const Demo = () => {
  const { open, setOpen } = useDrawer();
  return (
    <div className="p-6 space-y-3">
      <div className="text-sm">open: {String(open)}</div>
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={() => setOpen(false)}>
          Close
        </Button>
        <Button onClick={() => setOpen(true)}>Open</Button>
      </div>
    </div>
  );
};

const meta = {
  title: "Providers/DrawerProvider",
  component: DrawerProvider,
  tags: ["autodocs"],
  render: () => (
    <DrawerProvider>
      <Demo />
    </DrawerProvider>
  ),
} satisfies Meta<typeof DrawerProvider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
