import { List } from "../Base/ArrayList";
import { Point, Rect } from "../Base/Point";
import { DataExcel } from "./DataExcel";
import { DataExcelCell } from "./DataExcelCell";

export class SelectCellCollection {
    public _begincell: DataExcelCell | null;
    public _endcell: DataExcelCell | null;

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
    public get Right() {
        return this.Left + this.Width;
    }
    public get Bottom() {
        return this.Top + this.Height;
    }
    constructor() {
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
    get EndCell(): DataExcelCell|null {
        if (this._endcell == null) {
            return this._begincell;
        }
        return this._endcell;
    }
    set EndCell(value: DataExcelCell | null) {
        this._endcell = value;
        /*        this.Refresh();  */
    }

    AddRectContains(pt: Point): boolean {
        let rect = new Rect(0, 0, 0, 0);
        rect.Width = 6;
        rect.Height = 6;
        rect.X = this.Right - 3;
        rect.Y = this.Bottom - 3;
        return rect.Contains(pt);
    }

    Refresh() {
        let begincell = this._begincell;
        let endcell = this._endcell;
        if (begincell != null && endcell != null) {
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

    MaxRow(): number {
        var begincell = this.BeginCell;
        var endcell = this.EndCell;
        if (begincell == null) {
            return 0;
        }
        if (endcell == null) {
            return 0;
        }
        var rmax = begincell.Row.Index;
        var rmin = begincell.Row.Index;
        var rmax1 = endcell.Row.Index;
        var rmin1 = endcell.Row.Index;

        //if (begincell.IsMergeCell)
        //{
        //        IMergeCell cell = this.BeginCell as IMergeCell;
        //    if (cell != null)
        //    {
        //        rmax = cell.EndCell.Row.Index;
        //        rmin = cell.BeginCell.Row.Index;
        //    }
        //}
        //if (endcell.IsMergeCell)
        //{
        //        IMergeCell cell2 = this.EndCell as IMergeCell;
        //    if (cell2 != null)
        //    {
        //        rmax1 = cell2.EndCell.Row.Index;
        //        rmin1 = cell2.BeginCell.Row.Index;
        //    }
        //}
        rmax = Math.max(rmax1, rmax);
        rmin = Math.min(rmin1, rmin);
        return rmax;
    }

    MaxColumn(): number {
        var begincell = this.BeginCell;
        var endcell = this.EndCell;
        if (begincell == null) {
            return 0;
        }
        if (endcell == null) {
            return 0;
        }

        var cmax = begincell.Column.Index;
        var cmin = begincell.Column.Index;
        var cmax1 = endcell.Column.Index;
        var cmin1 = endcell.Column.Index;

        cmax = Math.max(cmax1, cmax);
        cmin = Math.min(cmin1, cmin);
        return cmax;
    }

    MinRow(): number {
        var begincell = this.BeginCell;
        var endcell = this.EndCell;
        if (begincell == null) {
            return 0;
        }
        if (endcell == null) {
            return 0;
        }
        var rmax = begincell.Row.Index;
        var rmin = begincell.Row.Index;
        var rmax1 = endcell.Row.Index;
        var rmin1 = endcell.Row.Index;

        //if (begincell.IsMergeCell)
        //{
        //        IMergeCell cell = begincell as IMergeCell;
        //    if (cell != null)
        //    {
        //        rmax = cell.EndCell.Row.Index;
        //        rmin = cell.BeginCell.Row.Index;
        //    }
        //}
        //if (endcell.IsMergeCell)
        //{
        //        IMergeCell cell2 = this.EndCell as IMergeCell;
        //    if (cell2 != null)
        //    {
        //        rmax1 = cell2.EndCell.Row.Index;
        //        rmin1 = cell2.BeginCell.Row.Index;
        //    }
        //}
        rmax = Math.max(rmax1, rmax);
        rmin = Math.min(rmin1, rmin);
        return rmin;
    }

    MinColumn(): number {
        var begincell = this.BeginCell;
        var endcell = this.EndCell;
        if (begincell == null) {
            return 0;
        }
        if (endcell == null) {
            return 0;
        }
        var cmax = begincell.Column.Index;
        var cmin = begincell.Column.Index;
        var cmax1 = endcell.Column.Index;
        var cmin1 = endcell.Column.Index;

        cmax = Math.max(cmax1, cmax);
        cmin = Math.min(cmin1, cmin);
        return cmin;
    }

}
