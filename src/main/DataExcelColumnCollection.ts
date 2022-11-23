import { Dictionary } from "../Base/Dictionary";

export class DataExcelColumnCollection<_number, DataExcelColumn> extends Dictionary<number, DataExcelColumn>
{ 
    public MaxHasValueIndex: number;
    private _Max: number;
    public get Max(): number
    {
        return this._Max;
    }
    public set Max(value: number)
    {
        this._Max = value;
    }
    constructor()
    {
        super();
    }

    Add(index:any, row:any)
    {
        this.set(index, row);
        if (index > this.Max)
        {
            this.Max = index;
        }
    }
    Get(index:any)
    {
        if (this.has(index))
        {
            return this.get(index);
        }

        return null;
    }
    Clear()
    {
        this.Max = 1;
        this.clear();
    }
    Delete(index:any)
    {
        if (this.has(index))
        {
            this.Max = this.Max - 1;
            return this.delete(index);
        }
        return false;
    }

}

