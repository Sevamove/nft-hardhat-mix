import * as XLSX from "xlsx";

type SpreadsheetData = {
    ID: string;
    Name: string;
    Description: string;
    Propname?: any;
};

export async function getNftSpreadsheetData(_filePath: string, _tokenId: number) {
    const { readFile, utils } = XLSX;

    const workbook = readFile(_filePath);
    const sheets = workbook.SheetNames;

    let data: SpreadsheetData[] = [];

    for (let i = 0; i < sheets.length; i++) {
        const temp: SpreadsheetData[] = utils.sheet_to_json(
            workbook.Sheets[workbook.SheetNames[i]]
        );
        temp.forEach((res) => {
            data.push(res);
        });
    }

    return data[Number(_tokenId) - 1];
}
