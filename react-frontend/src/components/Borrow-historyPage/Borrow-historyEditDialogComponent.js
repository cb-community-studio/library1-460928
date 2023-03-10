
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import client from "../../services/restClient";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';


 
const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = [];
    for (const key in errorObj.errors) {
        if (Object.hasOwnProperty.call(errorObj.errors, key)) {
            const element = errorObj.errors[key];
            if (element?.message) {
                errMsg.push(element.message);
            }
        }
    }
    return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const Borrow-historyCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

    const onSave = async () => {
        let _data = {
            user_id: _entity.user_id,
            book_id: _entity.book_id,
            borrow_date: _entity.borrow_date,
            due_date: _entity.due_date,
            returned_date: _entity.returned_date,
            fine: _entity.fine

        };

        setLoading(true);
        try {
            const result = await client.service("borrow-history").patch(_entity._id, _data);
            props.onHide();
            props.alert({ type: "success", title: "Edit info", message: "Info updated successfully" });
            props.onEditResult(result);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to update info");
            props.alert({ type: "error", title: "Edit info", message: "Failed to update info" });
        }
        setLoading(false);
    };

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError("");
    };

    return (
        <Dialog header="Edit Info" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div role="borrow-history-edit-dialog-component">
                <div>
                    <p className="m-0" >User Id:</p>
                    <InputText type="number" className="w-full mb-3" value={_entity?.user_id} onChange={(e) => setValByKey("user_id", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >Book Id:</p>
                    <InputText type="number" className="w-full mb-3" value={_entity?.book_id} onChange={(e) => setValByKey("book_id", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >Borrow Date:</p>
                    <Calendar dateFormat="dd/mm/yy hh:mm" placeholder={"dd/mm/yy hh:mm"} value={_entity?.borrow_date} onChange={ (e) => setValByKey("borrow_date", e.target.value)} showTime ></Calendar>
                </div>
                <div>
                    <p className="m-0" >Due Date:</p>
                    <Calendar dateFormat="dd/mm/yy hh:mm" placeholder={"dd/mm/yy hh:mm"} value={_entity?.due_date} onChange={ (e) => setValByKey("due_date", e.target.value)} showTime ></Calendar>
                </div>
                <div>
                    <p className="m-0" >Returned Date:</p>
                    <Calendar dateFormat="dd/mm/yy hh:mm" placeholder={"dd/mm/yy hh:mm"} value={_entity?.returned_date} onChange={ (e) => setValByKey("returned_date", e.target.value)} showTime ></Calendar>
                </div>
                <div>
                    <p className="m-0" >Fine:</p>
                    <InputText className="w-full mb-3" value={_entity?.fine} onChange={(e) => setValByKey("fine", e.target.value)}  />
                </div>


                <small className="p-error">
                    {Array.isArray(error)
                        ? error.map((e, i) => (
                              <p className="m-0" key={i}>
                                  {e}
                              </p>
                          ))
                        : error}
                </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    //
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(null, mapDispatch)(Borrow-historyCreateDialogComponent);
// createDialog_code.template
