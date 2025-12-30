import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";

const meta = {
  title: "Atoms/Sheet",
  component: Sheet,
  tags: ["autodocs"],
  render: () => (
    <div className="p-10">
      <Sheet>
        <SheetTrigger asChild>
          <Button>Open sheet</Button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Sheet title</SheetTitle>
            <SheetDescription>Minimal content example.</SheetDescription>
          </SheetHeader>
          <div className="px-4 pb-4 text-sm text-muted-foreground">
            Put any content here.
          </div>
        </SheetContent>
      </Sheet>
    </div>
  ),
} satisfies Meta<typeof Sheet>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
