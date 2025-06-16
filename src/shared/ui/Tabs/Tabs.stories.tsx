import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Tabs } from "./Tabs";

const meta = {
  title: "UI/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultTabs = [
  {
    id: "tab1",
    label: "Tab 1",
    content: "Content of Tab 1",
  },
  {
    id: "tab2",
    label: "Tab 2",
    content: "Content of Tab 2",
  },
  {
    id: "tab3",
    label: "Tab 3",
    content: "Content of Tab 3",
  },
];

export const Default: Story = {
  args: {
    tabs: defaultTabs,
  },
};

export const WithDefaultActiveTab: Story = {
  args: {
    tabs: defaultTabs,
    defaultActiveTab: "tab2",
  },
};

export const WithComplexContent: Story = {
  args: {
    tabs: [
      {
        id: "profile",
        label: "Profile",
        content: (
          <div style={{ padding: "20px" }}>
            <h3>User Profile</h3>
            <p>Name: John Doe</p>
            <p>Email: john@example.com</p>
          </div>
        ),
      },
      {
        id: "settings",
        label: "Settings",
        content: (
          <div style={{ padding: "20px" }}>
            <h3>Settings</h3>
            <ul>
              <li>Notification preferences</li>
              <li>Privacy settings</li>
              <li>Account settings</li>
            </ul>
          </div>
        ),
      },
      {
        id: "history",
        label: "History",
        content: (
          <div style={{ padding: "20px" }}>
            <h3>Activity History</h3>
            <p>Recent activities will be shown here</p>
          </div>
        ),
      },
    ],
  },
};

export const ManyTabs: Story = {
  args: {
    tabs: [
      { id: "tab1", label: "Home", content: "Home content" },
      { id: "tab2", label: "Profile", content: "Profile content" },
      { id: "tab3", label: "Messages", content: "Messages content" },
      { id: "tab4", label: "Settings", content: "Settings content" },
      { id: "tab5", label: "Help", content: "Help content" },
      { id: "tab6", label: "About", content: "About content" },
    ],
  },
};
