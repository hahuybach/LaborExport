import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { useState, useEffect } from "react";
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
//core
import "primereact/resources/primereact.min.css";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

function Workers() {
  const [workers, setWorkers] = useState([]);
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
  const getSeverity = (status) => {
    switch (status) {
      case "HIGH_SCHOOL":
        return "danger";

      case "BACHELOR_DEGREE":
        return "success";

      case "new":
        return "info";

      case "negotiation":
        return "warning";

      case "renewal":
        return null;
    }
  };
  return (
    <div>
      <h1>List of Workers</h1>
      <NavLink to="/workers/add">
        &nbsp; <Button>AddWorker</Button>{" "}
      </NavLink>
      <div className="card">
        <DataTable
          value={workers}
          paginator
          rows={5}
          tableStyle={{ minWidth: "50rem" }}
          editMode="row"
          onRowEditComplete={onRowEditComplete}
        >
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
            editor={(options) => textEditor(options)}
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
            editor={(options) => textEditor(options)}
            style={{ width: "10%" }}
          ></Column>
          <Column
            rowEditor
            headerStyle={{ width: "10%", minWidth: "8rem" }}
            bodyStyle={{ textAlign: "center" }}
          ></Column>
        </DataTable>
      </div>
    </div>
  );
}
export default Workers;
