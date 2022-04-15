import * as fs from "fs";

/* Dump data to *.json file. */
export const dumpToJSON = async (_data: object, _filePath: string) => {
    fs.writeFileSync(_filePath, JSON.stringify(_data));
};

/* Return loaded data from *.json file. */
export const loadFromJSON = async (_filePath: string) => {
    if (!fs.existsSync(_filePath)) {
        dumpToJSON({}, _filePath);
    }

    const data = JSON.parse(fs.readFileSync(_filePath, "utf8"));

    return data;
};
