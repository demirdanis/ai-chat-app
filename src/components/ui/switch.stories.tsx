import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Switch } from "./switch";

const meta = {
  title: "Atoms/Switch",
  component: Switch,
  tags: ["autodocs"],
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <div className="p-6">
        <div className="flex items-center gap-3">
          <Switch checked={checked} onCheckedChange={setChecked} />
          <div className="text-sm">{checked ? "On" : "Off"}</div>
        </div>
      </div>
    );
  },
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
