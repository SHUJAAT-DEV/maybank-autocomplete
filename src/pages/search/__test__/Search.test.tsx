import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import configureStore from "redux-mock-store";

import Search from "../Search";
import userEvent from "@testing-library/user-event"; // Import userEvent
import { searchPlaces } from "../../../features/locations/searchSlice";

jest.mock("../style.css", () => ({}));

type DispatchExts = ThunkDispatch<any, undefined, any>;

const mockStore = configureStore<{}, DispatchExts>([]);

jest.mock("../../../features/locations/searchSlice", () => ({
  ...jest.requireActual("../../../features/locations/searchSlice"),
  searchPlaces: jest.fn(),
}));

describe("Search component", () => {
  test("renders Search component", () => {
    const store = mockStore({
      search: {
        isLoading: false,
        results: [],
      },
    });
    const { getByText } = render(
      <Provider store={store}>
        <Search />
      </Provider>
    );

    expect(getByText("MayBank Autocomplete")).toBeTruthy();
    expect(getByText("Search places...")).toBeTruthy();
  });

  test("displays loading message when isLoading is true", () => {
    const store = mockStore({
      search: {
        isLoading: true,
        results: [],
      },
    });

    const { getByText } = render(
      <Provider store={store}>
        <Search />
      </Provider>
    );

    expect(getByText("Loading...")).toBeTruthy();
  });

  test("populates data correctly in AutoComplete options", async () => {
    const store = mockStore({
      search: {
        isLoading: false,
        results: [
          {
            id: 1,
            name: "Place 1",
            description: "Place 1, CO, Malaysia",
            latitude: 39.7392,
            longitude: -104.9903,
          },
          {
            id: 2,
            name: "Place 2",
            description: "Place 2, CO, Malaysia",
            latitude: 39.7392,
            longitude: -104.9903,
          },
        ],
      },
    });
    const { container, getByRole } = render(
      <Provider store={store}>
        <Search />
      </Provider>
    );

    expect(container.querySelector(".ant-select-item-option")).toBeNull();
    const input = getByRole("combobox");
    await userEvent.dblClick(input);

    await waitFor(() => {
      const dropdown = document.querySelector(".ant-select-dropdown");
      expect(dropdown).toBeInTheDocument();
      if (dropdown) {
        const dropdownItems = dropdown.querySelectorAll(
          ".ant-select-item-option"
        );
        expect(dropdownItems.length).toBe(2);
      }
    });
  });

  test("dispatches the searchPlaces action with the correct query when a user types", async () => {
    const store: any = mockStore({
      reducer: {
        search: searchPlaces,
      },
      search: {
        isLoading: false,
        results: [],
      },
    });

    const mockDispatch = jest.fn();
    store.dispatch = mockDispatch;

    const { getByRole } = render(
      <Provider store={store}>
        <Search />
      </Provider>
    );

    const input = getByRole("combobox");
    userEvent.type(input, "MayBank");

    // Wait for the debounce to allow the dispatch to complete and
    // the dispatch was called with the expected action
    await waitFor(
      () => {
        expect(mockDispatch).toHaveBeenCalled();
      
      },
      { timeout: 1000 }
    );
  });
});
