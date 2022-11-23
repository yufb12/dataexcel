import { List } from "../Base/ArrayList";
import { Rect } from "../Base/Point";
import { DataExcel } from "./DataExcel";
import { DataExcelCell } from "./DataExcelCell";
import { SelectCellCollection } from "./SelectCellCollection";

export class SelectAddRectCollection {
    public _begincell: DataExcelCell | null;
    public _endcell: DataExcelCell | null;
    private _SelectCellCollection: SelectCellCollection | null = null;
    public get SelectCellCollection(): SelectCellCollection | null {
        return this._SelectCellCollection;
    }
    public set SelectCellCollection(value: SelectCellCollection | null) {
        this._SelectCellCollection = value;
        this._endcell = null;
        if (this._SelectCellCollection != null) {
            this.Left = this._SelectCellCollection.Left;
            this.Top = this._SelectCellCollection.Top;
            this.Width = this._SelectCellCollection.Width;
            this.Height = this._SelectCellCollection.Height;
        }
    }

    public Grid: DataExcel;
    private _left: number = 0;
    private _top: number = 0;
    private _width: number = 0;
    private _height: number = 0;
    public get Left() {
        return this._left;
    }
    public get Top() {
        return this._top;
    }
    public get Width() {
        return this._width;
    }
    public get Height() {
        return this._height;
    }
    public set Left(value: number) {
        this._left = value;
    }
    public set Top(value: number) {
        this._top = value;
    }
    public set Width(value: number) {
        this._width = value;
    }
    public set Height(value: number) {
        this._height = value;
    }
    constructor(grid: DataExcel) {
        this.Grid = grid;
    }
    GetAllCells(): List<DataExcelCell> {
        return this.GetCellList();
    }
    public GetCellList(): List<DataExcelCell> {
        let list = new List<DataExcelCell>();
        let begincell = this._begincell;
        let endcell = this._endcell;
        if (begincell != null && endcell != null) {
            let rmin = Math.min(begincell.Row.Index, endcell.Row.Index);
            let cmin = Math.min(begincell.Column.Index, endcell.Column.Index);
            let rmax = Math.max(begincell.Row.Index, endcell.Row.Index);
            let cmax = Math.max(begincell.Column.Index, endcell.Column.Index);
            for (var i = rmin; i <= rmax; i++) {
                for (var j = cmin; j <= cmax; j++) {
                    let cell = this.Grid.GetCellByIndex(i, j);
                    list.add(cell);
                }
            }
        }
        return list;

    }

    get BeginCell(): DataExcelCell|null {
        return this._begincell;
    }
    set BeginCell(value: DataExcelCell|null) {
        this._begincell = value;
    }
    get EndCell(): DataExcelCell | null {
        if (this._endcell == null) {
            return this._begincell;
        }
        return this._endcell;
    }
    set EndCell(value: DataExcelCell | null) {
        this._endcell = value;
        this.SetEndCell(value);
    }

    SetEndCell(value: any) {
        try {
            this.SetEndCell2(value);
            let cell = value;
            this._endcell = cell;
            this.SetSize();
        }
        catch (ex) {
        }
    }
    Orientation = true;
    SetEndCell2(cell: any) {

        this._endcell = cell;
        let pt = cell.Rect.Location;
        if (this.SelectCellCollection == null)
            return;
        if (this.SelectCellCollection.Left < pt.X && this.SelectCellCollection.Right > pt.X) {
            this.Orientation = true;
        }
        else if (this.SelectCellCollection.Top < pt.Y && this.SelectCellCollection.Bottom > pt.Y) {
            this.Orientation = false;
        }
        else {
            if ((Math.abs(this.SelectCellCollection.Right - pt.X) >
                Math.abs(this.SelectCellCollection.Bottom - pt.Y))) {
                this.Orientation = false;
            }
            else {
                this.Orientation = true;
            }
        }
    }
    SetSize() {
        let bounds = new Rect(0, 0, 0, 0);
        let maxrowindex = 0;
        //Math.Max(this.SelectCellCollection.MaxCell.Row.Index, this.EndCell.Row.Index);
        let maxcolumnindex = 0;
        //Math.Max(this.SelectCellCollection.MaxCell.Column.Index, this.EndCell.Column.Index);

        let minrowindex = 0;
        //Math.Min(this.SelectCellCollection.MinCell.Row.Index,            this.EndCell.Row.Index);
        let mincolumnindex = 0;
        //Math.Min(this.SelectCellCollection.MinCell.Column.Index,            this.EndCell.Column.Index);
        if (this.EndCell == null || this.SelectCellCollection == null) {
            return;
        }

        if (this.Orientation) {
            //if (this.EndCell.Row.Index > this.SelectCellCollection.MaxCell.Row.Index)
            if (this.EndCell.Row.Index > this.SelectCellCollection.MaxRow()) {
                mincolumnindex = this.SelectCellCollection.MinColumn();
                maxcolumnindex = this.SelectCellCollection.MaxColumn();
                minrowindex = this.SelectCellCollection.MinRow();
                maxrowindex = this.EndCell.Row.Index;
            }
            else if (this.EndCell.Row.Index < this.SelectCellCollection.MinRow()) {
                mincolumnindex = this.SelectCellCollection.MinColumn();
                maxcolumnindex = this.SelectCellCollection.MaxColumn();
                minrowindex = this.SelectCellCollection.MaxRow();
                maxrowindex = this.EndCell.Row.Index;
            }
        }
        else {
            if (this.EndCell.Column.Index > this.SelectCellCollection.MaxColumn()) {
                minrowindex = this.SelectCellCollection.MinRow();
                maxrowindex = this.SelectCellCollection.MaxRow();
                mincolumnindex = this.SelectCellCollection.MinColumn();
                maxcolumnindex = this.EndCell.Column.Index;
            }
            else if (this.EndCell.Column.Index < this.SelectCellCollection.MinColumn()) {
                minrowindex = this.SelectCellCollection.MinRow();
                maxrowindex = this.SelectCellCollection.MaxRow();
                mincolumnindex = this.SelectCellCollection.MaxColumn();
                maxcolumnindex = this.EndCell.Column.Index;
            }
        }
        let endcell = this.Grid.GetCellByIndex(maxrowindex, maxcolumnindex);
        let begincell = this.Grid.GetCellByIndex(minrowindex, mincolumnindex);


        let rmin = Math.min(begincell.Row.Index, endcell.Row.Index);
        let cmin = Math.min(begincell.Column.Index, endcell.Column.Index);
        let rmax = Math.max(begincell.Row.Index, endcell.Row.Index);
        let cmax = Math.max(begincell.Column.Index, endcell.Column.Index);

        rmin = Math.max(rmin, this.Grid.FirstDisplayedRowIndex);
        cmin = Math.max(cmin, this.Grid.FirstDisplayedColumnIndex);
        rmax = Math.min(rmax, this.Grid.EndDisplayedRowIndex);
        cmax = Math.min(cmax, this.Grid.EndDisplayedColumnIndex);

        begincell = this.Grid.GetCellByIndex(rmin, cmin);
        endcell = this.Grid.GetCellByIndex(rmax, cmax);

        this.Top = begincell.Top;
        this.Left = begincell.Left;
        let width = 0;
        for (let i = begincell.Column.Index; i <= endcell.Column.Index; i++) {

            let column = this.Grid.Columns.Get(i);
            if (column == null) {
                continue;
            }
            if (!column.Visible) {
                continue;
            }
            if (column.Index < this.Grid.FirstDisplayedColumnIndex) {
                continue;
            }

            if (column.Index > this.Grid.EndDisplayedColumnIndex) {
                continue;
            }
            width = column.Width + width;

        }
        this.Width = width;
        let heigth = 0;
        for (let i = begincell.Row.Index; i <= endcell.Row.Index; i++) {
            let row = this.Grid.Rows.Get(i);
            if (row == null) {
                continue;
            }
            if (!row.Visible) {
                continue;
            }
            if (row.Index < this.Grid.FirstDisplayedRowIndex) {
                continue;
            }
            if (row.Index > this.Grid.EndDisplayedRowIndex) {
                continue;
            }
            heigth = row.Height + heigth;
        }
        this.Height = heigth;


    }
}
