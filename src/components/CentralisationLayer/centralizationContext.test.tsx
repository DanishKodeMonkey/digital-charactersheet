// WIP BROKEN SO FAR Deno test dont work well with components

import { jsdom } from "npm:@jsdom";
globalThis.document = jsdom("<html><body></body></html>");
import { assertEquals, assertExists } from "jsr:@std/assert";
import { fireEvent, render, screen } from "npm:@testing-library/react";
import {
  CentralizationProvider,
  useCentralization,
} from "./CentralisationContext.tsx";

// test component

const TestComponent = () => {
  const { state, dispatch } = useCentralization();
  return (
    <div>
      <span>Strength: {state.stats.strength}</span>
      <button
        onClick={() =>
          dispatch({
            type: "UPDATE_STAT",
            payload: { stat: "strength", value: 15 },
          })}
      >
        Update Strength
      </button>
    </div>
  );
};

Deno.test("should provide state and dispatch through context", () => {
  // render test component inside provider
  render(
    <CentralizationProvider>
      <TestComponent />
    </CentralizationProvider>,
  );

  // Check if the initial state is rendered correctly
  const strengthElement = screen.getByText(/Strength: 10/);
  assertExists(strengthElement); // Ensure the element is found
  assertEquals(strengthElement.textContent, "Strength: 10"); // Assert the text content

  // Simulate button click
  fireEvent.click(screen.getByText("Update Strength"));

  // Check if the state has been updated after dispatching the action
  const updatedStrengthElement = screen.getByText(/Strength: 15/);
  assertExists(updatedStrengthElement); // Ensure the updated element is found
  assertEquals(updatedStrengthElement.textContent, "Strength: 15"); // Assert the updated text content
});

Deno.test("should throw error if useCentralization is used outside of provider", () => {
  // Test for the error when context is not available
  try {
    render(<TestComponent />); // this is outside the provider, should throw error
  } catch (error) {
    assertExists(error); // Error should exist
    assertEquals(
      error.message,
      "useCentralization must be used within a centralisationProvider",
    );
  }
});
