import { List } from "../Base/ArrayList";
import { DataExcelMergeCell } from "./DataExcelMergeCell";

 
export class DataExcelMergeCellList extends List<DataExcelMergeCell>
{ 
    constructor()
    {
        super();
    }
 
    Clear()
    {
        this.clear();
    }
    Remove(column:any)
    {
        this.remove(column);
    }
 
    Get(index:any): DataExcelMergeCell
    {
        return this.get(index);
    }
    GetByColumnIndex(index:any): DataExcelMergeCell|null
    {
        var count = this.Count;
        for (var i = 0; i < count; i++)
        {
            var cell = this.Get(i);
            if (cell.Column.Index == index)
            {
                return cell;
            }
        }
        return null;
    }

    Refresh()
    {
        for (var i in this)
        {
            let cell = this[i] as DataExcelMergeCell;
            cell.Refresh();
        }
    }
}
