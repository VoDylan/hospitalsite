import { DropDown } from "./DropDown.tsx";
import React, { useEffect, useState } from "react";
import { SelectChangeEvent } from "@mui/material";
import axios from "axios";
import { LabelValuePair } from "../../common/LabelValuePair.ts";

interface EmployeeDropDownProps {
    returnedEmployeeID: number | string;
    handleChange: (event: SelectChangeEvent) => string;
}

interface EmployeeData {
    employeeID: number;
    firstName: string;
    lastName: string;
}

const EmployeeDropDown: React.FC<EmployeeDropDownProps> = (props) => {
    const [employeesFromDB, setEmployeesFromDB] = useState<EmployeeData[]>([]);

    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                const response = await axios.get<EmployeeData[]>("/api/database/employees");

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

                setEmployeesFromDB(updatedEmployees);
            } catch (error) {
                console.error(error);
            }
        };

        fetchEmployeeData();
    }, []);

    const EmployeeDropDownData: LabelValuePair[] = employeesFromDB.map((employee: EmployeeData) => ({
        value: employee.employeeID,
        label: `${employee.employeeID}: ${employee.firstName} ${employee.lastName}`
    }));

    return (
        <DropDown
            items={EmployeeDropDownData}
            returnData={props.returnedEmployeeID}
            label={"Employee"}
            handleChange={props.handleChange}
        />
    );
};

export default EmployeeDropDown;
