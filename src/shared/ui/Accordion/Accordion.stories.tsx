import type { Meta, StoryObj } from "@storybook/react";
import { Accordion } from "./Accordion";

const meta = {
  title: "UI/Accordion",
  component: Accordion,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Accordion Title",
    children:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
};

export const OpenByDefault: Story = {
  args: {
    title: "Open Accordion",
    children: "This accordion is open by default.",
    defaultOpen: true,
  },
};

export const WithComplexContent: Story = {
  args: {
    title: "Complex Content",
    children: (
      <div>
        <h3>Section Title</h3>
        <p>Paragraph of text</p>
        <ul>
          <li>List item 1</li>
          <li>List item 2</li>
          <li>List item 3</li>
        </ul>
      </div>
    ),
  },
};

export const MultipleAccordions: Story = {
  render: () => (
    <div style={{ width: "100%", maxWidth: "500px" }}>
      <Accordion title="First Accordion">Content of first accordion</Accordion>
      <Accordion title="Second Accordion">
        Content of second accordion
      </Accordion>
      <Accordion title="Third Accordion">Content of third accordion</Accordion>
    </div>
  ),
};
