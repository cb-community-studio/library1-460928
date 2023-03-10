
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

const BooksCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

    const onSave = async () => {
        let _data = {
            id: _entity.id,
            title: _entity.title,
            author: _entity.author,
            publisher: _entity.publisher,
            publication_date: _entity.publication_date,
            description: _entity.description,
            isbn: _entity.isbn,
            image_url: _entity.image_url,
            copies_available: _entity.copies_available,
            total_copies: _entity.total_copies

        };

        setLoading(true);
        try {
            const result = await client.service("books").patch(_entity._id, _data);
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
            <div role="books-edit-dialog-component">
                <div>
                    <p className="m-0" >Id:</p>
                    <InputText type="number" className="w-full mb-3" value={_entity?.id} onChange={(e) => setValByKey("id", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >Title:</p>
                    <InputText className="w-full mb-3" value={_entity?.title} onChange={(e) => setValByKey("title", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >Author:</p>
                    <InputText className="w-full mb-3" value={_entity?.author} onChange={(e) => setValByKey("author", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >Publisher:</p>
                    <InputText className="w-full mb-3" value={_entity?.publisher} onChange={(e) => setValByKey("publisher", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >Publication Date:</p>
                    <Calendar dateFormat="dd/mm/yy hh:mm" placeholder={"dd/mm/yy hh:mm"} value={_entity?.publication_date} onChange={ (e) => setValByKey("publication_date", e.target.value)} showTime ></Calendar>
                </div>
                <div>
                    <p className="m-0" >Description:</p>
                    <InputText className="w-full mb-3" value={_entity?.description} onChange={(e) => setValByKey("description", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >Isbn:</p>
                    <InputText className="w-full mb-3" value={_entity?.isbn} onChange={(e) => setValByKey("isbn", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >Image Url:</p>
                    <InputText className="w-full mb-3" value={_entity?.image_url} onChange={(e) => setValByKey("image_url", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >Copies Available:</p>
                    <InputText type="number" className="w-full mb-3" value={_entity?.copies_available} onChange={(e) => setValByKey("copies_available", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >Total Copies:</p>
                    <InputText type="number" className="w-full mb-3" value={_entity?.total_copies} onChange={(e) => setValByKey("total_copies", e.target.value)}  />
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

export default connect(null, mapDispatch)(BooksCreateDialogComponent);
// createDialog_code.template
