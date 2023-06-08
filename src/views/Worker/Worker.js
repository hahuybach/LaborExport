import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import React, { useState, useEffect, useRef } from "react";
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
//core
import "primereact/resources/primereact.min.css";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";

function Worker() {
  let emptyWorker = {
    user_id: null,
    name: "",
  };
  const [workers, setWorkers] = useState([]);
  const [worker, setWorker] = useState(emptyWorker);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [selectedWorkers, setSelectedWorkers] = useState(null);
  const [deleteWorkerDialog, setDeleteWorkerDialog] = useState(false);
  const [deleteWorkersDialog, setDeleteWorkersDialog] = useState(false);
  const toast = useRef(null);
  const [statuses] = useState([
    "PRIMARY_SCHOOL",
    "SECONDARY_SCHOOL",
    "HIGH_SCHOOL",
    "BACHELOR_DEGREE",
    "MASTER_DEGREE",
  ]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/worker/all")
      .then((response) => {
        console.log(response.data);
        setWorkers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching workers:", error);
      });
  }, []);

  // delete
  // const confirmDeleteWorker = (worker) => {
  //   setWorkers(worker);
  //   setDeleteWorkersDialog(true);
  // };
  const confirmDeleteSelected = () => {
    setDeleteWorkersDialog(true);
  };
  const hideDeleteWorkerDialog = () => {
    setDeleteWorkerDialog(false);
  };

  const hideDeleteWorkersDialog = () => {
    setDeleteWorkersDialog(false);
  };
  const deleteWorker = () => {
    let _workers = workers.filter((val) => val.user_id !== worker.id);

    setWorkers(_workers);
    setDeleteWorkerDialog(false);
    setWorker(emptyWorker);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Worker Deleted",
      life: 3000,
    });
  };
  const deleteSelectedWorkers = () => {
    let _workers = workers.filter((val) => !selectedWorkers.includes(val));

    setWorkers(_workers);
    setDeleteWorkersDialog(false);
    setSelectedWorkers(null);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Workers Deleted",
      life: 3000,
    });
  };
  const educationBodyTemplate = (rowData) => {
    return (
      <Tag
        value={rowData.education}
        severity={getSeverity(rowData.education)}
      />
    );
  };
  const onRowEditComplete = (e) => {
    let _workers = [...workers];
    let { newData, index } = e;

    _workers[index] = newData;

    setWorkers(_workers);
  };
  const textEditor = (options) => {
    return (
      <InputText
        type="text"
        value={options.value}
        onChange={(e) => options.editorCallback(e.target.value)}
      />
    );
  };
  const statusEditor = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={statuses}
        onChange={(e) => options.editorCallback(e.value)}
        placeholder="Select a Status"
        itemTemplate={(option) => {
          return <Tag value={option} severity={getSeverity(option)}></Tag>;
        }}
      />
    );
  };
  const getSeverity = (status) => {
    switch (status) {
      case "PRIMARY_SCHOOL":
        return "info";
      case "SECONDARY_SCHOOL":
        return "warning";
      case "HIGH_SCHOOL":
        return "danger";
      case "BACHELOR_DEGREE":
        return "success";
      case "MASTER_DEGREE":
        return "success";
    }
  };
  const header = (
    <div className="d-flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">Manage worker</h4>
      <span>
        <Button
          severity="danger"
          onClick={confirmDeleteSelected}
          disabled={!selectedWorkers || !selectedWorkers.length}
        >
          Delete
        </Button>
      </span>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
      </span>
    </div>
  );
  const deleteWorkerDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteWorkerDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteWorker}
      />
    </React.Fragment>
  );
  const deleteWorkersDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteWorkersDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteSelectedWorkers}
      />
    </React.Fragment>
  );
  return (
    <div>
      <h1>List of Workers</h1>
      <NavLink to="/worker/add">
        &nbsp; <Button>AddWorker</Button>
      </NavLink>
      <br />
      <Toast ref={toast} />
      <div className="card">
        <DataTable
          value={workers}
          paginator
          rows={5}
          tableStyle={{ minWidth: "50rem" }}
          editMode="row"
          onRowEditComplete={onRowEditComplete}
          globalFilter={globalFilter}
          header={header}
          selection={selectedWorkers}
          onSelectionChange={(e) => setSelectedWorkers(e.value)}
        >
          <Column selectionMode="multiple" exportable={false}></Column>
          <Column
            field="userId"
            sortable
            header="Worker Id"
            style={{ width: "10%" }}
          ></Column>
          <Column
            field="username"
            sortable
            header="Username"
            editor={(options) => textEditor(options)}
            style={{ width: "10%" }}
          ></Column>
          <Column
            field="dob"
            sortable
            header="DOB"
            style={{ width: "10%" }}
          ></Column>
          <Column
            field="name"
            sortable
            header="Name"
            editor={(options) => textEditor(options)}
            style={{ width: "10%" }}
          ></Column>
          <Column
            field="education"
            body={educationBodyTemplate}
            sortable
            header="Education"
            editor={(options) => statusEditor(options)}
            style={{ width: "10%" }}
          ></Column>
          <Column
            rowEditor
            headerStyle={{
              width: "10%",
              minWidth: "8rem",
            }}
            bodyStyle={{ textAlign: "center" }}
          ></Column>
        </DataTable>
      </div>
      <Dialog
        visible={deleteWorkerDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        modal
        footer={deleteWorkerDialogFooter}
        onHide={hideDeleteWorkerDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {worker && (
            <span>
              Are you sure you want to delete <b>{worker.name}</b>?
            </span>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={deleteWorkersDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        modal
        footer={deleteWorkersDialogFooter}
        onHide={hideDeleteWorkersDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {worker && (
            <span>Are you sure you want to delete the selected products?</span>
          )}
        </div>
      </Dialog>
    </div>
  );
}
export default Worker;
