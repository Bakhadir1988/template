import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Textarea } from "./Textarea";

const meta = {
  title: "UI/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Enter your message...",
  },
};

export const WithLabel: Story = {
  args: {
    label: "Message",
    placeholder: "Type your message here...",
  },
};

export const WithError: Story = {
  args: {
    label: "Description",
    placeholder: "Enter description...",
    error: "Description is required",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Textarea",
    placeholder: "This textarea is disabled",
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    label: "Full Width Textarea",
    placeholder: "This textarea takes full width",
    fullWidth: true,
  },
};

export const WithValue: Story = {
  args: {
    label: "Filled Textarea",
    value:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
};
