import { List } from "../Base/ArrayList";
import { DataExcelRow } from "./DataExcelRow";

 
export class DataExcelRowList extends List<DataExcelRow>
{ 
    constructor()
    {
        super();
    }
 
    Clear()
    {
        this.clear();
    }
    Remove(row:any)
    {
        this.remove(row);
    }
 
    Get(index:any): DataExcelRow
    {
        return this.get(index);
    }

}
