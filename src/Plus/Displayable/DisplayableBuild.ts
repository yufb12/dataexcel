import { Displayable } from "./Displayable";
import { DisplayableCircle } from "./DisplayableCircle";
import { DisplayableImage } from "./DisplayableImage";
import { DisplayableLine } from "./DisplayableLine";
import { DisplayablePolygon } from "./DisplayablePolygon";
import { DisplayableRect } from "./DisplayableRect";
import { DisplayableSector } from "./DisplayableSector";
import { DisplayableText } from "./DisplayableText";

var DisplayableBuild =
{
    line: "line",
    rect: "rect",
    text: "text",
    circ: "circ",
    imag: "imag",
    sect: "sect",
    poly: "poly",
    build: function (typename: string): Displayable {
        let model: Displayable;
        switch (typename) {
            case DisplayableBuild.line:
                model = new DisplayableLine();
                break;
            case DisplayableBuild.rect:
                model = new DisplayableRect();
                break;
            case DisplayableBuild.text:
                model = new DisplayableText();
                break;
            case DisplayableBuild.circ:
                model = new DisplayableCircle();
                break;
            case DisplayableBuild.imag:
                model = new DisplayableImage();
                break;
            case DisplayableBuild.imag:
                model = new DisplayableSector();
                break;
            case DisplayableBuild.poly:
                model = new DisplayablePolygon();
                break;
            default:
                model = new DisplayableRect();
                break;
        }
        return model;
    }

}
export { DisplayableBuild }