export class Dictionary<K, V> extends Map<K, V>
{ 
    constructor()
    {
        super();
    }
    add(k:K,v:V)
    {
        this.set(k,v);
    }
    Remove(k: K)
    {
        this.delete(k);
    }
    Clear()
    {
        this.clear();
    }
    Sort()
    {

    }
}