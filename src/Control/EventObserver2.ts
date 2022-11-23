import { List } from "../Base/ArrayList";
import { Dictionary } from "../Base/Dictionary";

export class EventMap
{
    public Dics: Dictionary<string, List<any>>;
    constructor()
    { 
        this.Dics = new Dictionary<string, List<any>>();

    } 
}
export class Observer
{
    private eventMap: EventMap;
    constructor()
    {
        this.eventMap = new EventMap();
    }
 
    on(event: string, fn:any)
    { 
        let funs = this.eventMap.Dics.get(event) as List<any>;
        if (funs == null)
        {
            funs = new List<any>();
            this.eventMap.Dics.add(event, funs);
        }
        funs.Add(fn)
    }
 
    emit(event: string, ...args: any[])
    {
        let funs = this.eventMap.Dics.get(event) as List<any>; 
        if (funs == null)
            return;
        funs.forEach(fn =>
        {
            try
            {
                fn.apply(null, args)
            } catch (e)
            {

            }
        });
        
    }
 
    off(event: string, fn:any)
    {
        let funs = this.eventMap.Dics.get(event) as List<any>;
        if (funs == null)
            return;
        funs.Remove(fn);
    } 
}
