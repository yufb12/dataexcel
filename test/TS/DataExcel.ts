import { DataExcelRow } from './DataExcelRow';
export function init() {
    let grid = new DataExcel();
    return grid;
}
export class DataExcel {
    width: number;
    height: number;
    constructor() {
        this.width = 0;
        this.height = 0;
        this.row = new DataExcelRow();
    }
    row: DataExcelRow;
}
 




