import { List } from "../Base/ArrayList";
import { Primitive } from "./Primitive";

 
export class PrimitiveList extends List<Primitive>
{ 
    constructor()
    {
        super();
    }
 
    Clear()
    {
        this.clear();
    }
    Remove(row:any)
    {
        this.remove(row);
    }
 
    Get(index:any): Primitive
    {
        return this.get(index);
    }

}
