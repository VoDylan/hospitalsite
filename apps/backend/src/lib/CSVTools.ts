import fs from "fs";

/**
 * Class containing a number of static tools used for parsing and reading CSV data
 */
class CSVTools {
  /**
   * Static method that parses CSV data from a file and returns a 2d array containing all information. The rows represent rows in the CSV file
   * and the columns represent the individual data elements
   * @param filePath - the path of the CSV file to parse
   */
  static parseCSVFromFile(filePath: string): string[][] {
    //Algorithm to separate the CSV data by line and then by column element, forming a 2d array
    return fs
      .readFileSync(filePath, {
        encoding: "utf-8",
        flag: "r",
      })
      .split("\n")
      .map((row: string): string[] => {
        return row.trim().split(",");
      });
  }
}

export default CSVTools;
