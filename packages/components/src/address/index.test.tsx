import React from "react";

import { render, screen } from "@testing-library/react";

import { Address } from ".";

// Basic render test
it("renders an address with children", () => {
  render(
    <Address data-testid="address-element">
      123 Main Street
      <br />
      City, State 12345
    </Address>
  );
  const address = screen.getByTestId("address-element");
  expect(address.tagName).toBe("ADDRESS");
  expect(address).toHaveTextContent("123 Main Street");
});

// as prop test
it("renders as a custom element with 'as' prop", () => {
  render(
    <Address as="div" data-testid="custom-div">
      456 Oak Avenue
      <br />
      Town, Province 67890
    </Address>
  );
  const div = screen.getByTestId("custom-div");
  expect(div.tagName).toBe("DIV");
  expect(div).toHaveTextContent("456 Oak Avenue");
});

// isClient and isMemoized props (should use Suspense with lazy components)
it("renders Suspense with lazy client components when isClient is true", async () => {
  render(
    <Address isClient data-testid="address-element">
      789 Pine Road
      <br />
      Village, Country 11111
    </Address>
  );

  // Should render the fallback (the address) immediately
  const address = screen.getByTestId("address-element");
  expect(address.tagName).toBe("ADDRESS");
  expect(address).toHaveTextContent("789 Pine Road");

  // The lazy component should load and render the same content
  await screen.findByTestId("address-element");
});

it("renders Suspense with memoized lazy client components when isClient and isMemoized are true", async () => {
  render(
    <Address isClient isMemoized data-testid="address-element">
      321 Elm Street
      <br />
      Borough, District 22222
    </Address>
  );

  // Should render the fallback (the address) immediately
  const address = screen.getByTestId("address-element");
  expect(address.tagName).toBe("ADDRESS");
  expect(address).toHaveTextContent("321 Elm Street");

  // The lazy component should load and render the same content
  await screen.findByTestId("address-element");
});

// ref forwarding test
it("forwards ref correctly", () => {
  const ref = React.createRef<HTMLElement>();
  render(
    <Address ref={ref}>
      654 Maple Drive
      <br />
      County, Region 33333
    </Address>
  );
  expect(ref.current).toBeInstanceOf(HTMLElement);
  expect(ref.current?.tagName).toBe("ADDRESS");
});

// Multiple lines test (common for addresses)
it("renders multi-line address content correctly", () => {
  render(
    <Address>
      <div>John Doe</div>
      <div>123 Business Ave</div>
      <div>Suite 100</div>
      <div>New York, NY 10001</div>
    </Address>
  );

  expect(screen.getByText("John Doe")).toBeInTheDocument();
  expect(screen.getByText("123 Business Ave")).toBeInTheDocument();
  expect(screen.getByText("Suite 100")).toBeInTheDocument();
  expect(screen.getByText("New York, NY 10001")).toBeInTheDocument();
});
