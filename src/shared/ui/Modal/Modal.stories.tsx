import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Modal } from "./Modal";

const meta = {
  title: "UI/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    children: "Modal Content",
  },
};

export const WithTitle: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    title: "Modal Title",
    children: "Modal Content with Title",
  },
};

export const WithComplexContent: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    title: "Complex Modal",
    children: (
      <div style={{ padding: "20px" }}>
        <h3>Modal Header</h3>
        <p>This is a paragraph of text in the modal.</p>
        <button onClick={() => alert("Button clicked!")}>Click me</button>
      </div>
    ),
  },
};

export const LongContent: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    title: "Scrollable Content",
    children: (
      <div>
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i}>
            Paragraph {i + 1} with some long content that will make the modal
            scrollable.
          </p>
        ))}
      </div>
    ),
  },
};
