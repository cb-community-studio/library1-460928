import React from "react";
import { render, screen } from "@testing-library/react";

import Borrow-historyPage from "../Borrow-historyPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders borrow-history page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <Borrow-historyPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("borrow-history-datatable")).toBeInTheDocument();
    expect(screen.getByRole("borrow-history-add-button")).toBeInTheDocument();
});
