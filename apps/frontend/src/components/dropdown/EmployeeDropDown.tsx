import {DropDown} from "./DropDown.tsx";
import React from "react";
import {SelectChangeEvent} from "@mui/material";
import axios from "axios";
import {LabelValuePair} from "../../common/LabelValuePair.ts";

interface EmployeeDropDownProps {
  returnedEmployeeID: number;
  handleChange: (event: SelectChangeEvent) => string;
}

interface EmployeeData {
  employeeID: number;
  firstName: string;
  lastName: string;
}

let EmployeesFromDB: EmployeeData[];

async function fetchEmployeeData(): Promise<EmployeeData[]> {
  axios
    .get<EmployeeData[]>("/api/database/employees")
    .then((response) => {
      const employeeIDs = response.data.map((employee) => employee.employeeID);
      const firstNames = response.data.map((employee) => employee.firstName);
      const lastNames = response.data.map((employee) => employee.lastName);


      const updatedEmployees: EmployeeData[] = [];

      for (let i = 0; i < employeeIDs.length; i++) {
        updatedEmployees.push({
          employeeID: employeeIDs[i],
          firstName: firstNames[i],
          lastName: lastNames[i],
        });
      }

      return updatedEmployees;
    })
    .catch((error) => console.error(error));
    return [];
}

async function getEmployeeData() {
    EmployeesFromDB = await fetchEmployeeData();
}

getEmployeeData();

//@ts-expect-error Mapping the EmployeeDropDownData array to be an array of LabelValuePair
const EmployeeDropDownData: LabelValuePair[] = EmployeesFromDB.map((employee: EmployeeData) => ({
    value: employee.employeeID,
    label: `${employee.employeeID}: ${employee.firstName} ${employee.lastName}`
}));

function EmployeeDropDown(props: EmployeeDropDownProps): React.JSX.Element {
  return(
    <DropDown items={EmployeeDropDownData} returnData={props.returnedEmployeeID} label={"Employee"} handleChange={props.handleChange} />
  );
}

export default EmployeeDropDown;
