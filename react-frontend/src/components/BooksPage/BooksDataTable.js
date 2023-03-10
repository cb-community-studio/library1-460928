
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState } from 'react';
import _ from 'lodash';
import { Button } from 'primereact/button';


const BooksDataTable = ({ items, onEditRow, onRowDelete, onRowClick }) => {
    
    const pTemplate0 = (rowData, { rowIndex }) => <p >{rowData.id}</p>
    const pTemplate1 = (rowData, { rowIndex }) => <p >{rowData.title}</p>
    const pTemplate2 = (rowData, { rowIndex }) => <p >{rowData.author}</p>
    const pTemplate3 = (rowData, { rowIndex }) => <p >{rowData.publisher}</p>
    const pTemplate4 = (rowData, { rowIndex }) => <p >{rowData.publication_date}</p>
    const pTemplate5 = (rowData, { rowIndex }) => <p >{rowData.description}</p>
    const pTemplate6 = (rowData, { rowIndex }) => <p >{rowData.isbn}</p>
    const pTemplate7 = (rowData, { rowIndex }) => <p >{rowData.image_url}</p>
    const pTemplate8 = (rowData, { rowIndex }) => <p >{rowData.copies_available}</p>
    const pTemplate9 = (rowData, { rowIndex }) => <p >{rowData.total_copies}</p>

    const editTemplate = (rowData, { rowIndex }) => <Button onClick={() => onEditRow(rowData, rowIndex)} icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`} className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`} />;
    const deleteTemplate = (rowData, { rowIndex }) => <Button onClick={() => onRowDelete(rowIndex)} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" />;
    
    return (
        <DataTable value={items} onRowClick={onRowClick} scrollable rowHover paginator rows={10}>
            <Column field="id" header="Id" body={pTemplate0} sortable style={{ minWidth: "8rem" }} />
            <Column field="title" header="Title" body={pTemplate1} sortable style={{ minWidth: "8rem" }} />
            <Column field="author" header="Author" body={pTemplate2} sortable style={{ minWidth: "8rem" }} />
            <Column field="publisher" header="Publisher" body={pTemplate3} sortable style={{ minWidth: "8rem" }} />
            <Column field="publication_date" header="Publication Date" body={pTemplate4} sortable style={{ minWidth: "8rem" }} />
            <Column field="description" header="Description" body={pTemplate5} sortable style={{ minWidth: "8rem" }} />
            <Column field="isbn" header="Isbn" body={pTemplate6} sortable style={{ minWidth: "8rem" }} />
            <Column field="image_url" header="Image Url" body={pTemplate7} sortable style={{ minWidth: "8rem" }} />
            <Column field="copies_available" header="Copies Available" body={pTemplate8} sortable style={{ minWidth: "8rem" }} />
            <Column field="total_copies" header="Total Copies" body={pTemplate9} sortable style={{ minWidth: "8rem" }} />

            <Column header="Edit" body={editTemplate} />
            <Column header="Delete" body={deleteTemplate} />
        </DataTable>
    );
};

export default BooksDataTable;