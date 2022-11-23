export class Point {
    X: number = 0;
    Y: number = 0;
    constructor(x?: number, y?: number) {
        if (x != null) {
            this.X = x;
        }
        if (y != null) {
            this.Y = y;
        }
    }
}
export class Size {
    Width: number = 0;
    Height: number = 0;
    constructor(width?: number, height?: number) {
        if (width != null) {
            this.Width = width;
        }
        if (height != null) {
            this.Height = height;
        }
    }
}
export class Rect {
    get Location() {
        let pt = new Point();
        pt.X = this.X;
        pt.Y = this.Y;
        return pt;
    }
    X: number = 0;
    Y: number = 0;
    Width: number = 0;
    Height: number = 0;
    constructor(x: number, y: number, w: number, h: number) {
        this.X = x;
        this.Y = y;
        this.Width = w;
        this.Height = h;
    }
    Init(x: number, y: number, w: number, h: number) {
        this.X = x;
        this.Y = y;
        this.Width = w;
        this.Height = h;
    }
    Contains(point: Point): boolean {
        if (point == null) {
            return false;
        }
        if (point.X >= this.X && point.X <= (this.X + this.Width)) {
            if (point.Y >= this.Y && point.Y <= (this.Y + this.Height)) {
                return true;
            }
        }
        return false;
    }
    get Bottom() {
        return this.Y + this.Height;
    }

    get Right() {
        return this.X + this.Width;
    }
    get Left() {
        return this.X;
    }

    get Top() {
        return this.Y;
    }
}


export class Zoom {
    Type: string = "";
    Width: number = 0;
    Height: number = 0;
    constructor(width?: number, height?: number) {
        if (width != null) {
            this.Width = width;
        }
        if (height != null) {
            this.Height = height;
        }
        this.Type = "";
    }
}

