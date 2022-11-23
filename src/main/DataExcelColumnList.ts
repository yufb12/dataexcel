import { List } from "../Base/ArrayList";
import { DataExcelColumn } from "./DataExcelColumn";

 
export class DataExcelColumnList extends List<DataExcelColumn>
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
 
    Get(index:any)
    {
        return this.get(index);
    }
}
