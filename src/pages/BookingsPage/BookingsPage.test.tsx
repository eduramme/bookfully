import { beforeEach, describe, expect, test } from "vitest";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { renderWithProviders } from "../../utils/test-utils";
import BookingsPage from "./BookingsPage";
import { BrowserRouter } from "react-router-dom";
import { mockBookings } from "../../utils/mocks";
import { formatDisplayDate } from "../../utils/utils";

describe("Bookings Page without bookings", () => {
  beforeEach(() => {
    renderWithProviders(
      <BrowserRouter>
        <BookingsPage />
      </BrowserRouter>
    );
  });

  test("should show title all the time", () => {
    const element = screen.getByText("Bookings");

    expect(element.tagName).toBe("H1");
    expect(element).toHaveTextContent("Bookings");
  });

  test("show no bookings message", async () => {
    expect(
      screen.getByText(
        /Looks like you haven't made any bookings. Start exploring properties and plan your next stay!/i
      )
    ).toBeInTheDocument();
  });
});

describe("Bookings Page with bookings", () => {
  beforeEach(() => {
    renderWithProviders(
      <BrowserRouter>
        <BookingsPage />
      </BrowserRouter>,
      {
        preloadedState: {
          bookings: { bookings: mockBookings },
        },
      }
    );
  });

  test("should show title all the time", () => {
    const element = screen.getByText("Bookings");

    expect(element.tagName).toBe("H1");
    expect(element).toHaveTextContent("Bookings");
  });

  test("When ther are bookings, display bookings", async () => {
    const startDate = formatDisplayDate(mockBookings[0].startDate);
    const endDate = formatDisplayDate(mockBookings[0].endDate);

    expect(screen.getByText(startDate)).toBeInTheDocument();
    expect(screen.getByText(endDate)).toBeInTheDocument();
  });
});
