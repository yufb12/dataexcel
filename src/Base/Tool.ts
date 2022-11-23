import { DataExcelCellColumnHeader } from "../Edit/DataExcelCellEditColumnHeader";
import { DataExcelCellRowHeader } from "../Edit/DataExcelCellEditRowHeader";
import { DataExcelCell } from "../main/DataExcelCell";
import { DataExcelConsole } from "./DataExcelConsole";

var Tool =
{
    GetColumnHeaderByColumnIndex: (index: number) =>
    {
        let columnheader = "";
        while (index > 0)
        {
            let m = index % 26;
            if (m == 0)
            {
                m = 26;
            }
            columnheader = String.fromCharCode(m + 64) + columnheader;
            index = (index - m) / 26;
        }
        return columnheader;
    }
}
 
var DefaultEdit = {
    GetDefauleEdit: function (cell: DataExcelCell) 
    {
        if (cell.Column == null)
        {
            DataExcelConsole.log("GetDefauleEdit", "column is null");
            return null;
        }
        if (cell.Row.Index == 0 && cell.Column.Index > 0)
        {
            let edit = new DataExcelCellColumnHeader();
            edit.Cell = cell;
            return edit;
        }
        if (cell.Column.Index == 0 && cell.Row.Index > 0)
        {
            let edit = new DataExcelCellRowHeader();
            edit.Cell = cell;
            return edit;
        }
        if (cell.Row.Index == 0 && cell.Column.Index == 0)
        {
            let edit = new DataExcelCellColumnHeader();
            edit.Cell = cell;
            return edit;
        }
        return null;
    }
}
var HeaderSplit = { ColumnHeaderSplit: 5, RowHeaderSplit: 5 }
export {Tool,DefaultEdit,HeaderSplit}