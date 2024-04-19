import DBManager from "../DBManager.ts";

export const importEmployeeData = async () => {
  await DBManager.getInstance().importEmployeesFromPath("./data/employees.csv");
};
