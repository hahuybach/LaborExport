import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { useState, useEffect } from "react";
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
//core
import "primereact/resources/primereact.min.css";
import axios from "axios";
import { NavLink, Route, Routes } from "react-router-dom";
import AddWorkerPage from "./AddWorker";
import { Button } from "primereact/button";

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
        >
          <Column field="userId" sortable header="Worker Id"></Column>
          <Column field="username" sortable header="Username"></Column>
          <Column field="dob" sortable header="DOB"></Column>
          <Column field="name" sortable header="Name"></Column>
          <Column
            field="education"
            body={educationBodyTemplate}
            sortable
            header="Education"
          ></Column>
        </DataTable>
      </div>
    </div>
  );
}
export default Workers;
