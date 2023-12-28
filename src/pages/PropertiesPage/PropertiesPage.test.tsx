import { beforeEach, describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import PropertiesPage from "./PropertiesPage";
import { mockProperties } from "../../utils/mocks";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Properties Page", () => {
  beforeEach(() => {
    // Reset the mockNavigate function before each test
    mockNavigate.mockReset();

    // Render the component before each test
    render(
      <BrowserRouter>
        <PropertiesPage />
      </BrowserRouter>
    );
  });

  test("should display the page title", () => {
    expect(screen.getByText("Properties")).toBeInTheDocument();
  });

  test("should render the correct number of properties", () => {
    // each PropertyCard has a role of 'article'
    const propertyCards = screen.getAllByRole("article");
    expect(propertyCards.length).toBe(mockProperties.length);
  });

  test("should display property details correctly", () => {
    const firstProperty = mockProperties[0];
    const maxGuestElements = screen.getAllByText(
      `Max Guests: ${firstProperty.maxGuests}`
    );
    expect(screen.getByText(firstProperty.name)).toBeInTheDocument();
    expect(screen.getByText(firstProperty.description)).toBeInTheDocument();
    expect(maxGuestElements.length).toBeGreaterThan(0);
  });

  test("should navigate to property details page on click", async () => {
    // Click the first property card
    const firstPropertyCard = screen.getAllByRole("article")[0];
    await userEvent.click(firstPropertyCard);

    // Check if it's called with the correct path
    expect(mockNavigate).toHaveBeenCalledWith(
      `/properties/${mockProperties[0].id.toString()}`
    );
  });
});
