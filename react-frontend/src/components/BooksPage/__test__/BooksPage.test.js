import React from "react";
import { render, screen } from "@testing-library/react";

import BooksPage from "../BooksPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders books page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <BooksPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("books-datatable")).toBeInTheDocument();
    expect(screen.getByRole("books-add-button")).toBeInTheDocument();
});
