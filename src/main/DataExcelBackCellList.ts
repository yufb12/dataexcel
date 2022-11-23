import { List } from '../Base/ArrayList';
import {DataExcelBackCell} from './DataExcelBackCell'
export class DataExcelBackCellList extends List<DataExcelBackCell>
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
 
    Get(index:any): DataExcelBackCell
    {
        return this.get(index);
    }
    GetByColumnIndex(index:any): any
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
            let cell = this[i] as DataExcelBackCell;
            cell.Refresh();
        }
    }
}
