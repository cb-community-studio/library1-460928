import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import client from "../../services/restClient";
import _ from "lodash";
import { Button } from "primereact/button";
import { SplitButton } from "primereact/splitbutton";
import AreYouSureDialog from "../common/AreYouSureDialog";
import Borrow-historyDatatable from "./Borrow-historyDataTable";
import Borrow-historyEditDialogComponent from "./Borrow-historyEditDialogComponent";
import Borrow-historyCreateDialogComponent from "./Borrow-historyCreateDialogComponent";
import Borrow-historyFakerDialogComponent from "./Borrow-historyFakerDialogComponent";
import Borrow-historySeederDialogComponent from "./Borrow-historySeederDialogComponent";

const Borrow-historyPage = (props) => {
    const history = useHistory();
    const [data, setData] = useState([]);
    const [showAreYouSureDialog, setShowAreYouSureDialog] = useState(false);
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [showCreateDialog, setShowCreateDialog] = useState(false);
    const [showFakerDialog, setShowFakerDialog] = useState(false);
    const [showSeederDialog, setShowSeederDialog] = useState(false);
    const [selectedEntityIndex, setSelectedEntityIndex] = useState();
    useEffect(() => {
        //on mount
        client
            .service("borrow-history")
            .find({ query: { $limit: 100 } })
            .then((res) => {
                setData(res.data);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "Borrow-history", type: "error", message: error.message || "Failed get borrow-history" });
            });
    }, []);

    const onEditRow = (rowData, rowIndex) => {
        setSelectedEntityIndex(rowIndex);
        setShowEditDialog(true);
    };

    const onCreateResult = (newEntity) => {
        setData([...data, newEntity]);
    };
    const onFakerCreateResults = (newEntities) => {
        setData([...data, ...newEntities]);
    };
    const onSeederResults = (newEntities) => {
        setData([...data, ...newEntities]);
    };

    const onEditResult = (newEntity) => {
        let _newData = _.cloneDeep(data);
        _newData[selectedEntityIndex] = newEntity;
        setData(_newData);
    };

    const deleteRow = async () => {
        try {
            await client.service("borrow-history").remove(data[selectedEntityIndex]?._id);
            let _newData = data.filter((_, i) => i !== selectedEntityIndex);
            setData(_newData);
            setSelectedEntityIndex(null);
            setShowAreYouSureDialog(false)
        } catch (error) {
            console.log({ error });
            props.alert({ title: "Borrow-history", type: "error", message: error.message || "Failed delete record" });
        }
    };
    const onRowDelete = (index) => {
        setSelectedEntityIndex(index);
        setShowAreYouSureDialog(true);
    };

    const onRowClick = (e) => {};

    const menuItems = [
        {
            label: "Faker",
            icon: "pi pi-sliders-h",
            command: (e) => {
                setShowFakerDialog(true);
            },
        },
        {
            label: "Seeder",
            icon: "pi pi-forward",
            command: (e) => {
                setShowSeederDialog(true);
            },
        },
    ];

    return (
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <h3 className="mb-0 ml-2">Borrow-history</h3>
                <div className="col flex justify-content-end">
                    <Button label="add" icon="pi pi-plus" onClick={() => setShowCreateDialog(true)} role="borrow-history-add-button"/>
                    <SplitButton model={menuItems} dropdownIcon="pi pi-ellipsis-v" buttonClassName="hidden" menuButtonClassName="ml-1 p-button-text"></SplitButton>
                </div>
            </div>
            <div className="grid col-10">
                <div className="col-12" role="borrow-history-datatable">
                    <Borrow-historyDatatable items={data} onRowDelete={onRowDelete} onEditRow={onEditRow} onRowClick={onRowClick} />
                </div>
            </div>
            <AreYouSureDialog header="Delete" body="Are you sure you want to delete this record?" show={showAreYouSureDialog} onHide={() => setShowAreYouSureDialog(false)} onYes={() => deleteRow()} />
            <Borrow-historyEditDialogComponent entity={data[selectedEntityIndex]} show={showEditDialog} onHide={() => setShowEditDialog(false)} onEditResult={onEditResult} />
            <Borrow-historyCreateDialogComponent show={showCreateDialog} onHide={() => setShowCreateDialog(false)} onCreateResult={onCreateResult} />
            <Borrow-historyFakerDialogComponent show={showFakerDialog} onHide={() => setShowFakerDialog(false)} onFakerCreateResults={onFakerCreateResults} />
            <Borrow-historySeederDialogComponent show={showSeederDialog} onHide={() => setShowSeederDialog(false)} onSeederResults={onSeederResults} />
        </div>
    );
};
const mapState = (state) => ({
    //
});
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
    //
});

export default connect(mapState, mapDispatch)(Borrow-historyPage);
