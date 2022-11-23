import { List } from "../../Base/ArrayList";
import { Displayable } from "./Displayable";

 
 export class DisplayableList extends List<Displayable>
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
 
    Get(index:any): Displayable
    {
        return this.get(index);
    }

}
