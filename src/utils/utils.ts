import * as fs from "fs";

/**
 * Read JSON file and parse content
 *
 * @param filePath  Path to the JSON file
 * @returns Promise with JSON content
 * @throws File read error or JSON parse error
 */
export function readJsonFile(filePath: string): Promise<any> {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      try {
        const jsonData = JSON.parse(data);
        resolve(jsonData);
      } catch (jsonError) {
        reject(jsonError);
      }
    });
  });
}

/**
 * Write JSON object to file
 *
 * @param filePath Path to the JSON file
 * @param jsonObject JSON object to write
 * @returns Promise
 * @throws File write error
 */
export function writeJsonFile(
  filePath: string,
  jsonObject: any,
): Promise<void> {
  const jsonString = JSON.stringify(jsonObject, null, 2);
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, jsonString, "utf-8", (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}
