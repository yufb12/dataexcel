export class List<T> extends Array<T>
{ 
    constructor()
    {
        super(); 
    };

    size(): number
    {
        return this.length;
    }
    add(value:T)
    { 
        this.push(value); 
        return this;
    }
    get(index:any):T
    {
        return this[index];
    }
    removeIndex(index:any)
    {
        this.splice(index, 1);
    }
    remove(obj:any)
    {
        this.removeIndex(this.indexOf(obj));
    }
    indexOf(obj:any)
    {
        for (var i = 0; i < this.length; i++)
        {
            if (this[i] === obj)
            {
                return i;
            };
        }
        return -1;
    }
    isEmpty(): boolean
    {
        return this.length == 0;
    }
    clear()
    {
        this.length = 0;
    }
    contains(obj:any): boolean
    {
        return this.indexOf(obj) != -1;
    }
    Add(value: T)
    {
        this.push(value);
        return this;
    }
    Remove(obj:any)
    {
        this.removeIndex(this.indexOf(obj));
    }
    public get Count()
    {
        return this.length;
    }
    Clear()
    {
        this.clear();
    }

    Contains(obj:any): boolean
    {
        return this.indexOf(obj) != -1;
    }
}