import { TextAlgin } from "../Base/ConstantValue";
import { ImageLayout } from "../Base/ImageLayout";
import { Rect } from "../Base/Point";

declare var zrender: any;
export class Graphics {
    public drawTimes: number = 0;
    private zr: any;
    public get ZR() {
        return this.zr;
    }


    constructor(zren: any) {
        this.zr = zren;
    };
    AddDrawTimes() {
        this.drawTimes = this.drawTimes + 1;
        if (this.drawTimes > 65526) {
            this.drawTimes = 1;
        }
    }
    DrawLineStyle(style1: any, x1: any, y1: any, x2: any, y2: any) {
        var shape = new zrender.Line({
            //position: [0, 0],
            scale: [1, 1],
            shape: {
                x1: x1,
                y1: y1,
                x2: x2,
                y2: y2
            },
            style: style1
        });
        shape.cursor = null;
        this.zr.add(shape);
    }
    DrawLine(color: any, x1: any, y1: any, x2: any, y2: any) {
        //this.Ctx.strokeStyle = color;
        //this.Ctx.beginPath();
        //this.Ctx.moveTo(x1, y1);
        //this.Ctx.lineTo(x2, y2);
        //this.Ctx.stroke();
        var curve = new zrender.Line({
            //position: [0, 0],
            scale: [1, 1],
            shape: {
                x1: x1,
                y1: y1,
                cpx1: 0,
                cpy1: 0,
                cpx2: 0,
                cpy2: 0,
                x2: x2,
                y2: y2
            },
            style: {
                stroke: color
            }
        });
        curve.cursor = null;
        this.zr.add(curve);
    }


    DrawTextColor(font: any, color: any, text: any, x1: any, y1: any) {
        var curve = new zrender.Text({
            //position: [0, 0],
            scale: [1, 1],
            draggable: true,
            style:
            {
                x: x1,
                y: y1,
                text: text,
                font: font,
                textAlign: "left",
                fill: color,
            }

        });
        this.zr.add(curve);
    }
    DrawText(font: any, color: any, text: any, x1: any, y1: any, width1: any, height1: any, align: CanvasTextAlign, opacity1?: any) {
        //if (align == null)
        //{

        //}
        //this.Ctx.font = font;
        //this.Ctx.textAlign = align;
        //this.Ctx.fillStyle = color;
        //this.Ctx.fillText(text, x, y);
        var curve = new zrender.Text({
            //position: [0, 0],
            scale: [1, 1],
            draggable: true,
            style:
            {
                x: x1,
                y: y1,
                text: text,
                font: font,
                textAlign: align,
                fill: color,
            },
            opacity: opacity1,

        });
        var clip = new zrender.Rect({
            scale: [1, 1],
            shape: {
                x: x1,
                y: y1,
                width: width1,
                height: height1
            }
        });
        //this.zr.add(curve);
        var g1 = new zrender.Group();
        g1.add(curve);
        g1.setClipPath(clip);
        this.zr.add(g1);
    }
    DrawTextRect(font: any, color: any, text: any, x1: any, y1: any, width1: any, height1: any, textPos: any) {
        //if (align == null)
        //{

        //}
        //this.Ctx.font = font;
        //this.Ctx.textAlign = align;
        //this.Ctx.fillStyle = color;
        //this.Ctx.fillText(text, x, y, width);

        var shape = new zrender.Rect({
            scale: [1, 1],
            style: {
                fill: null,
            },
            textContent: new zrender.Text({
                scale: [1, 1],
                style: {
                    text: text,
                    fill: color,
                    font: font
                }
            }),
            textConfig: {
                position: textPos
            },
            shape: {
                x: x1,
                y: y1,
                width: width1,
                height: height1
            }
        });
        var g1 = new zrender.Group();
        g1.add(shape);
        g1.setClipPath(shape);
        this.zr.add(g1);
    }
    DrawTextRectStyle(text: any, x1: any, y1: any, width1: any, height1: any, style: any) {
        var enText = new zrender.Text(
            {
                scale: [1, 1],
                position: [x1, y1],
                draggable: true,
            }
        );
        enText.style = style;
        enText.style.overflow = 'break';
        var shape = new zrender.Rect({
            scale: [1, 1],
            style: {
                fill: null,
            },
            shape: {
                x: x1,
                y: y1,
                width: width1,
                height: height1
            },
            textConfig: {
                position: TextAlgin.bottomleft
            },
        });
        var g1 = new zrender.Group();
        g1.add(enText);
        g1.setClipPath(shape);
        this.zr.add(g1);
    }
    DrawTextRectStyle2(text: any, x1: any, y1: any, width1: any, height1: any, style: any) {
        var g = new zrender.Group();
        //let s = {
        //    text: 'position[100, 200],rotation: -1scarotation: -1scale: 0.5align: middleverticalAlign: bottomorle: 0.5align: middleverticalAlign: bottomorigin:[0, 50]',
        //    width: width,
        //    height: height,
        //    fill: '#c0f',
        //    font: '18px Microsoft Yahei',
        //    align: 'right',
        //    verticalAlign: 'bottom',
        //    overflow: 'break'

        //}
        let width = 0;
        let height = 0;
        style.width = width1;
        style.height = height1;
        style.text = text;
        let align = style.align;
        if (align == 'right') {
            width = width1;
        }
        if (align == 'center') {
            width = width1 / 2;
        }
        let verticalAlign = style.verticalAlign;
        if (verticalAlign == 'bottom') {
            height = height1;
        }
        if (verticalAlign == 'middle') {
            height = height1 / 2;
        }
        g.add(new zrender.Text({
            scale: [1, 1],
            position: [x1 + width, y1 + height],
            style: style,
            draggable: true
        }));
        let clip = new zrender.Rect({
            shape:
            {
                x: x1,
                y: y1,
                width: width1,
                height: height1
            },
            draggable: true
        })
        g.setClipPath(clip);
        this.zr.add(g);
    }

    DrawTextClipRectStyle2(text: any, x1: any, y1: any, width1: any, height1: any, clipx1: any, clipy1: any, clipwidth1: any, clipheight1: any, style: any) {
        var g = new zrender.Group();
        //let s = {
        //    text: 'position[100, 200],rotation: -1scarotation: -1scale: 0.5align: middleverticalAlign: bottomorle: 0.5align: middleverticalAlign: bottomorigin:[0, 50]',
        //    width: width,
        //    height: height,
        //    fill: '#c0f',
        //    font: '18px Microsoft Yahei',
        //    align: 'right',
        //    verticalAlign: 'bottom',
        //    overflow: 'break'

        //}
        let width = 0;
        let height = 0;
        style.width = width1;
        style.height = height1;
        style.text = text;
        let align = style.align;
        if (align == 'right') {
            width = width1;
        }
        if (align == 'center') {
            width = width1 / 2;
        }
        let verticalAlign = style.verticalAlign;
        if (verticalAlign == 'bottom') {
            height = height1;
        }
        if (verticalAlign == 'middle') {
            height = height1 / 2;
        }
        g.add(new zrender.Text({
            scale: [1, 1],
            position: [x1 + width, y1 + height],
            style: style,
            draggable: true
        }));
        let clip = new zrender.Rect({
            shape:
            {
                x: clipx1,
                y: clipy1,
                width: clipwidth1,
                height: clipheight1
            },
            draggable: true
        })
        g.setClipPath(clip);
        this.zr.add(g);
    }
    DrawTextClipRect(font: any, color: any, text: any, x1: any, y1: any, clipx1: any, clipy1: any, clipwidth1: any, clipheight1: any, align: any) {
        var curve = new zrender.Text({
            //position: [0, 0],
            scale: [1, 1],
            draggable: true,
            style:
            {
                x: x1,
                y: y1,
                text: text,
                font: font,
                textAlign: align,
                textFill: color,
            }

        });
        var clip = new zrender.Rect({
            scale: [1, 1],
            shape: {
                x: clipx1,
                y: clipy1,
                width: clipwidth1,
                height: clipheight1
            }
        });
        //this.zr.add(curve);
        var g1 = new zrender.Group();
        g1.add(curve);
        g1.setClipPath(clip);
        this.zr.add(g1);
    }
    DrawRectangle(color: any, x1: any, y1: any, width1: any, height1: any) {
        //this.Ctx.strokeStyle = color;
        //this.Ctx.strokeRect(x, y, width, height);
        var curve = new zrender.Rect({
            scale: [1, 1],
            style:
            {
                stroke: color,
                fill: null
            },
            shape:
            {
                x: x1,
                y: y1,
                width: width1,
                height: height1
            }
        });

        curve.cursor = null;
        this.zr.add(curve);
    }
    DrawRect(color: any, rect: Rect) {
        //this.Ctx.strokeStyle = color;
        //this.Ctx.strokeRect(x, y, width, height);
        var curve = new zrender.Rect({
            scale: [1, 1],
            shape: {
                x: rect.X,
                y: rect.Y,
                width: rect.Width,
                height: rect.Height
            },
            style:
            {
                stroke: color
            }
        });

        this.zr.add(curve);
    }
    FillRectangleLinearGradient(color: any, x1: any, y1: any, width1: any, height1: any, forwarddiagonal: any) {
        var curve = new zrender.Rect({
            draggable: true,
            style:
            {
                x: x1,
                y: y1,
                width: width1,
                height: height1
            }
        });

        this.zr.add(curve);
    }
    FillRectangle(color: any, x1: any, y1: any, width1: any, height1: any) {
        var shape = new zrender.Rect({
            scale: [1, 1],
            style: {
                fill: color,
            },
            shape: {
                x: x1,
                y: y1,
                width: width1,
                height: height1
            },
            cursor: ""
        });
        this.zr.add(shape);
    }
    FillRect(fillcolor: any, x1: any, y1: any, width1: any, height1: any, opacity1?: any, stroke1?: any, lineWidth1?: any) {
        //this.Ctx.fillStyle = color;
        //this.Ctx.fillRect(x, y, width, height);
        //if (align == null)
        //{

        //}
        //this.Ctx.font = font;
        //this.Ctx.textAlign = align;
        //this.Ctx.fillStyle = color;
        //this.Ctx.fillText(text, x, y, width);

        var shape = new zrender.Rect({
            scale: [1, 1],
            style: {
                lineWidth: lineWidth1,
                opacity: opacity1,
                stroke: stroke1,
                fill: fillcolor,
            },
            shape: {
                x: x1,
                y: y1,
                width: width1,
                height: height1
            }
        });
        this.zr.add(shape);
    }
    FillRectStyle(style1: any, x1: any, y1: any, width1: any, height1: any, cursor1?: any, zlevel1?: any) {
        var shape = new zrender.Rect({
            position: [x1, y1],
            scale: [1, 1],
            shape: {
                x: 0,
                y: 0,
                width: width1,
                height: height1
            },
            zlevel: zlevel1
        });
        //if (cursor1 != null)
        //{
        shape.cursor = cursor1;
        //}
        shape.style = style1;
        this.zr.add(shape);
    }
    FillRectangleStyle(style1: any, rect: Rect) {
        var shape = new zrender.Rect({
            scale: [1, 1],
            shape: {
                x: rect.X,
                y: rect.Y,
                width: rect.Width,
                height: rect.Height
            }
        });
        shape.style = style1;
        shape.cursor = null;
        this.zr.add(shape);
    }
    FillRectangleColor(color: any, rect: Rect, cursor?: any, opacity1?: any) {
        var shape = new zrender.Rect({
            scale: [1, 1],
            style: {
                fill: color,
            },
            shape: {
                x: rect.X,
                y: rect.Y,
                width: rect.Width,
                height: rect.Height
            },
            opacity: opacity1,
            cursor: cursor

        });

        this.zr.add(shape);
    }
    FillRectangleImage(image1: any, rect: Rect, imagelayout: any, cursor1?: any, opacity1?: any) {
        var image = new zrender.Image({
            position: [rect.X, rect.Y],
            scale: [1, 1],
            style: {
                //x: 0,
                //y: 0,
                //width: rect.Width,
                //height: rect.Height,
                image: image1,
                opacity: opacity1,
                cursor: cursor1
            },
        });
        if (imagelayout == ImageLayout.Clip) {
            let clip = new zrender.Rect({
                shape:
                {
                    x: rect.X,
                    y: rect.Y,
                    width: rect.Width,
                    height: rect.Height
                },
            })
            var g = new zrender.Group();
            g.add(image);
            g.setClipPath(clip);
            this.zr.add(g);
        }
        else if (imagelayout == ImageLayout.ZoomClip) {
            let clip = new zrender.Rect({
                shape:
                {
                    x: rect.X,
                    y: rect.Y,
                    width: rect.Width,
                    height: rect.Height
                },
            })

            image.style.width = rect.Width;
            var g = new zrender.Group();
            g.add(image);
            g.setClipPath(clip);
            this.zr.add(g);
        }
        else if (imagelayout == ImageLayout.Zoom) {
            image.style.width = rect.Width;
            this.zr.add(image);
        }
        else if (imagelayout == ImageLayout.Stretch) {
            image.style.width = rect.Width;
            image.style.height = rect.Height;
            this.zr.add(image);
        }
        else {
            this.zr.add(image);
        }

    }

    FillRectangleImageClip(image1: any, x1: any, y1: any, width1: any, height1: any, clipx1: any, clipy1: any, clipwidth1: any, clipheight1: any, cursor1?: any, opacity1?: any) {
        var g = new zrender.Group();

        var image = new zrender.Image({
            position: [x1, y1],
            scale: [1, 1],
            style: {
                image: image1,
                //x: 0,
                //y: 0,
                width: width1,
                height: height1,
                opacity: opacity1,
                cursor: cursor1
            },
        });
        g.add(image);
        let clip = new zrender.Rect({
            shape:
            {
                x: clipx1,
                y: clipy1,
                width: clipwidth1,
                height: clipheight1
            },
        })
        g.setClipPath(clip);
        this.zr.add(g);
    }

    DrawGroup(group: any) {
        this.zr.add(group);
    }
    DrawPolyPolygon(style: any) {
        let display = new zrender.Polygon({
            style: style.option.style,
            shape: style.option.shape,
        });

        if (style.animate != null) {
            this.AppendAnimate(display, style.animate);
        }

        this.zr.add(display);
    }
    DrawPolyline(style: any) {
        let display = new zrender.Polyline({
            style: style.option.style,
            shape: style.option.shape,
        });

        if (style.animate != null) {
            this.AppendAnimate(display, style.animate);
        }

        this.zr.add(display);
    }
    DrawPrimitiveRect(style: any) {
        let display = new zrender.Rect({
            style: style.option.style,
            shape: style.option.shape,
        });
        if (style.animate != null) {
            this.AppendAnimate(display, style.animate);
        }

        this.zr.add(display);
    }
    DrawPrimitiveImage(style: any) {
        let display = new zrender.Image({
            style: style.option.style
        });
        if (style.animate != null) {
            this.AppendAnimate(display, style.animate);
        }

        this.zr.add(display);
    }
    DrawPrimitiveCircle(style: any) {
        let display = new zrender.Circle({
            style: style.option.style,
            shape: style.option.shape
        });
        if (style.animate != null) {
            this.AppendAnimate(display, style.animate);
        }

        this.zr.add(display);
    }
    DrawPrimitiveSector(style: any) {
        let display = new zrender.Sector({
            style: style.option.style,
            shape: style.option.shape
        });
        if (style.animate != null) {
            this.AppendAnimate(display, style.animate);
        }

        this.zr.add(display);
    }
    DrawPrimitiveText(style: any) {
        let display = new zrender.Text({
            style: style.option.style,
            rotation: style.option.rotation,
            position: style.option.position
        });
        if (style.animate != null) {
            this.AppendAnimate(display, style.animate);
        }

        this.zr.add(display);
    }

    AppendAnimate(display: any, animatees: any) {
        if (animatees != null) {
            for (var i = 0; i < animatees.length; i++) {
                let animate = animatees[i];
                if (!animate.hide) {
                    let ani = display.animate(animate.type, true);
                    let wh = ani.when(animate.interval, animate.value);
                    wh = this.AppendWhen(wh, animate.animate);
                    wh.start();
                }
            }

        }
    }
    AppendWhen(wh: any, animate: any) {
        wh = wh.when(animate.interval, animate.value);
        if (animate.animate != null) {
            wh = this.AppendWhen(wh, animate.animate);
        }
        return wh;
    }
    GetPolyline(opt: any):any {
        let polyline = new zrender.Polyline();
        return polyline;
    }
    Clip(x: any, y: any, width: any, height: any) {
        //this.Ctx.rect(x, y, width, height);
        //this.Ctx.clip();
    }
    MeasureText(text: any, font: any): any {
        //this.Ctx.font = font;
        //return this.Ctx.measureText(text);
    }
    Translate(x: any, y: any) {
        //this.Ctx.translate(x, y);
    }

    Save() {

    }
    Restore() {

    }
    Clear() {
        this.zr.clear();
    }
}
