import { Dictionary } from "../Base/Dictionary";
import { DataExcelCell } from "./DataExcelCell";
import { DataExcelColumn } from "./DataExcelColumn";


export class DataExcelCellCollection extends Dictionary<DataExcelColumn, DataExcelCell>
{ 
    constructor()
    {
        super();
    }
    Add(cell: DataExcelCell)
    {
        this.set(cell.Column, cell);
    }
    Clear()
    {
        this.clear();
    }
    Remove(column: DataExcelColumn)
    {
        this.delete(column);
    }
    Count(): number
    {
        return this.size;
    }
    Get(column: DataExcelColumn): DataExcelCell|undefined
    {
        return this.get(column);
    }

}
