import React from "react";
import DBConnect from "./DBConnector";
import SlackConnector from "./SlackConnector";

// Sample components for demonstration
const GitHubComponent = (props: any) => (
  <div>GitHub Component: {JSON.stringify(props)}</div>
);
const URLComponent = (props: any) => (
  <div>URL Component: {JSON.stringify(props)}</div>
);
// Add more components as needed

// Mapping of type strings to components
const componentMapping: { [key: string]: React.ElementType } = {
  linkedIn: DBConnect,
  indeed: DBConnect,
  jobberman: DBConnect,
  email: SlackConnector,
  shopify: URLComponent,
  url: URLComponent,
  // Add other mappings as needed
};

interface DynamicComponentProps {
  type: string; // Adjusted to accept any string
  [key: string]: any; // Allow for any additional props
}

const DynamicComponent: React.FC<DynamicComponentProps> = ({
  type,
  ...props
}) => {
  const SelectedComponent = componentMapping[type.toLowerCase()]; // Ensure type matching is case-insensitive

  // Return an empty div if no matching component is found
  if (!SelectedComponent) {
    return <div />;
  }

  // Render the selected component with all passed props
  return <SelectedComponent {...props} />;
};

export default DynamicComponent;
