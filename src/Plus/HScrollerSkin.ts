import { Rect } from "../Base/Point";
import { Graphics } from "../Drawing/Graphics";

var HScrollerSkin =
{
    DrawArea(g: Graphics, rect:any)
    {
        g.FillRectangleColor("GhostWhite", rect);
    },

    DrawThumdBack(g:Graphics, rect:any, MoveSelected:any)
    {
        g.FillRectangleColor("white", rect);
    },

    DrawThumd(g:Graphics, rect: Rect, Thickness:any)
    {
        g.FillRectangleColor("Silver", rect);
 
    },

    DrawUpArrow(g: Graphics, rect: Rect)
    { 
        g.FillRectangleColor("Gainsboro", rect);
        let x1 = rect.X;
        let y1 = rect.Y;
        
        let shape = g.GetPolyline({
            scale: [1, 1],
            style: {
                opacity: 1, 
                fill:"gray",
                stroke: "gray",
            },
            shape: {
                //points: [[x1 + 4, y1 + 22], [x1 + 8, y1 + 18], [x1 + 12, y1 + 22], [x1 + 4, y1 + 22]]
                points: [[x1 + 22, y1 + 4], [x1 + 18, y1 + 8], [x1 + 22, y1 + 12], [x1 + 22, y1 + 4]]
            },
        });
        g.ZR.add(shape); 
    },

    DrawDownArrow(g:Graphics, rect: Rect)
    {  
        g.FillRectangleColor("Gainsboro", rect);
        let x1 = rect.X;
        let y1 = rect.Y;

        let shape =  g.GetPolyline({
            scale: [1, 1],
            style: {
                opacity: 1,
                fill: "gray",
                stroke: "gray",
            },
            shape: {
                //points: [[x1 + 4, y1 + 8], [x1 + 8, y1 + 12], [x1 + 12, y1 + 8], [x1 + 4, y1 + 8]]
                points: [[x1 + 8, y1 + 4], [x1 + 12, y1 + 8], [x1 + 8, y1 + 12], [x1 + 8, y1 + 4]]
            },
        });
        g.ZR.add(shape); 
    }
}
export {HScrollerSkin}