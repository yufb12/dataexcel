import { DataExcelConsole } from './DataExcelConsole';
export class DataExcelRow {
    width: number;
    height: number;
    constructor() {
        this.width = 0;
        this.height = 0;
        DataExcelConsole.log('DataExcelRow', 'constructor');
    }
}
