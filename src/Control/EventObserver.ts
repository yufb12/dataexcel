////class EventMap2
////{
////    constructor()
////    { 
////    }
////    input: string[];
////    change: [][];
////}
////class Observer2
////{
////    private eventMap: EventMap2;
////    constructor()
////    {
////        this.eventMap = new EventMap2();
////    }
////    /**
////     * 注册事件
////     * @param {String} event 事件名称 
////     * @param {Function}  fn 回调函数 
////     */
////    on(event: string, fn)
////    {
////        const map = this.eventMap
////        if (!map[event])
////        {
////            map[event] = []
////        }
////        map[event].push(fn)
////    }
////    /**
////     * 触发事件
////     */
////    emit(event: string, ...args)
////    {
////        const map = this.eventMap
////        let arr = map[event];
////        if (arr == null)
////            return;
////        if (arr.length)
////        {
////            map[event].forEach(fn =>
////            {
////                try
////                {
////                    fn.apply(null, args)
////                } catch (e)
////                {

////                }
////            });
////        } else
////        {
////            console.error('无待执行函数')
////        }
////    }
////    /**
////     * 移除事件
////     */
////    off(event: string, fn)
////    {
////        const map = this.eventMap
////        const index = map[event]?.indexOf(fn)
////        if (index > -1)
////        {
////            map[event].splice(index, 1)
////        } else
////        {
////            console.error('目标函数不存在')
////        }
////    }
 
////    onOnce(event: string, fn)
////    {
////        const self = this
////        function on()
////        {
////            fn.apply(null, arguments) 
////            self.off(event, on) 
////        }
////        this.on(event, on) 
////    }
////}
