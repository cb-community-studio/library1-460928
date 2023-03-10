
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState } from 'react';
import _ from 'lodash';
import { Button } from 'primereact/button';


const Borrow-historyDataTable = ({ items, onEditRow, onRowDelete, onRowClick }) => {
    
    const pTemplate0 = (rowData, { rowIndex }) => <p >{rowData.user_id}</p>
    const pTemplate1 = (rowData, { rowIndex }) => <p >{rowData.book_id}</p>
    const pTemplate2 = (rowData, { rowIndex }) => <p >{rowData.borrow_date}</p>
    const pTemplate3 = (rowData, { rowIndex }) => <p >{rowData.due_date}</p>
    const pTemplate4 = (rowData, { rowIndex }) => <p >{rowData.returned_date}</p>
    const pTemplate5 = (rowData, { rowIndex }) => <p >{rowData.fine}</p>

    const editTemplate = (rowData, { rowIndex }) => <Button onClick={() => onEditRow(rowData, rowIndex)} icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`} className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`} />;
    const deleteTemplate = (rowData, { rowIndex }) => <Button onClick={() => onRowDelete(rowIndex)} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" />;
    
    return (
        <DataTable value={items} onRowClick={onRowClick} scrollable rowHover paginator rows={10}>
            <Column field="user_id" header="User Id" body={pTemplate0} sortable style={{ minWidth: "8rem" }} />
            <Column field="book_id" header="Book Id" body={pTemplate1} sortable style={{ minWidth: "8rem" }} />
            <Column field="borrow_date" header="Borrow Date" body={pTemplate2} sortable style={{ minWidth: "8rem" }} />
            <Column field="due_date" header="Due Date" body={pTemplate3} sortable style={{ minWidth: "8rem" }} />
            <Column field="returned_date" header="Returned Date" body={pTemplate4} sortable style={{ minWidth: "8rem" }} />
            <Column field="fine" header="Fine" body={pTemplate5} sortable style={{ minWidth: "8rem" }} />

            <Column header="Edit" body={editTemplate} />
            <Column header="Delete" body={deleteTemplate} />
        </DataTable>
    );
};

export default Borrow-historyDataTable;