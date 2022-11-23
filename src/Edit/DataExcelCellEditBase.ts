import { EventView } from "../Base/EventView";
import { IViewEvent } from "../Control/IViewEvent";
import { Graphics } from "../Drawing/Graphics";
import { DataExcelCell } from "../main/DataExcelCell";

 
export class DataExcelCellEditBase implements IViewEvent
{
    public Cell: DataExcelCell;
    private _Name: string;
    public get Name(): string {
        return this._Name;
    }
    public set Name(value: string) {
        this._Name = value;
    }
    constructor()
    {
 
    }
    OnDraw(sender:any, g:Graphics): boolean
    {
        return false;
    }
    OnDrawBack(sender:any, g: Graphics): boolean
    {
        return false;
    }
    InitEdit()
    {
 
    }
    EndEdit()
    {
 
    }

    OnMouseDown(sender:any, e:MouseEvent, ve:EventView): boolean
    {
        return false;
    }
    OnMouseUp(sender:any, e:MouseEvent, ve:EventView): boolean
    {
        return false;
    }
    OnMouseMove(sender:any, e:MouseEvent, ve:EventView): boolean
    {
        return false;
    }
    OnMouseDoubleClick(sender:any, e:MouseEvent, ve:EventView): boolean
    {
        return false;
    }
    OnKeyPress(sender:any, e:KeyboardEvent, ve:EventView): boolean
    {
        return false;
    }
    OnKeyDown(sender:any, e:KeyboardEvent, ve:EventView): boolean
    {
        return false;
    }

    OnTouchStart(sender:any, e: TouchEvent, ve:EventView): boolean
    {
        return false;
    }
    OnTouchMove(sender:any, e: TouchEvent, ve:EventView): boolean
    {
        return false;
    }
    OnTouchEnd(sender:any, e: TouchEvent, ve:EventView): boolean
    {
        return false;
    }

    Clone()
    {

    }
}