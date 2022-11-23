import { EventView } from "../Base/EventView"
import { Zoom } from "../Base/Point"

export  interface IViewEvent
{
    OnMouseDown(sender:any, e:MouseEvent, ve:EventView): boolean
    OnMouseUp(sender:any, e:MouseEvent, ve:EventView): boolean
    OnMouseMove(sender:any, e:MouseEvent, ve:EventView): boolean
    OnMouseDoubleClick(sender:any, e:MouseEvent, ve:EventView): boolean
    OnKeyPress(sender:any, e: KeyboardEvent, ve:EventView): boolean
    OnKeyDown(sender:any, e: KeyboardEvent, ve:EventView): boolean
    OnTouchStart(sender:any, e: TouchEvent, ve:EventView): boolean;
    OnTouchMove(sender:any, e: TouchEvent, ve:EventView): boolean;
    OnTouchEnd(sender:any, e: TouchEvent, ve:EventView): boolean;
}


export  interface IZoom
{
    SetZoom(zoom: Zoom): boolean;
    GetZoom(): Zoom;
}


export  interface IDataExcelCellEdit
{
    OnDraw(sender: any, g: any):any;

    InitEdit():any;
}

export  interface EventTag
{
    NeedRePaint: boolean;
    EventCtrol: any;
}

