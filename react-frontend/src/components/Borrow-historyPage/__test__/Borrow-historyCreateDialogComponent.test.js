import React from "react";
import { render, screen } from "@testing-library/react";

import Borrow-historyCreateDialogComponent from "../Borrow-historyCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders borrow-history create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <Borrow-historyCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("borrow-history-create-dialog-component")).toBeInTheDocument();
});
