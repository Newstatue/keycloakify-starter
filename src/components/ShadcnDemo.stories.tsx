import type { Meta, StoryObj } from "@storybook/react";
import ShadcnDemo from "./ShadcnDemo";

const meta = {
  title: "UI/ShadcnDemo",
  component: ShadcnDemo,
} satisfies Meta<typeof ShadcnDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <ShadcnDemo />,
};