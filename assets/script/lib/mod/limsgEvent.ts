/** 一个简单的事件管理器 */
/** 使用匿名函数来注册一次性事件,用对象加方法名来注册多次事件 */
export default class msgEvent {
    static instance: msgEvent
    /** 获取单例 */
    static getinstance() {
        if (msgEvent.instance) return msgEvent.instance;
        else return new msgEvent();
    }
    /** 返回一个新的单例 */
    static newinstance() {
        return new msgEvent();
    }

    private constructor() {
        this._listeners = {};
        this._oncelisteners = {};
        msgEvent.instance = this;
    }

    private _listeners: _li.msgEvent.Transit

    private _oncelisteners: _li.msgEvent.TransitOnce

    /**
     * 添加一个事件
     * @method
     * @param {String} type 事件名
     * @param {String} fnname 回调函数名
     * @param {Object} obj 函数执行对象
     * @public
     */
    addEvent(type: string, fnname: string, obj: any) {
        if (typeof this._listeners[type] === "undefined") {
            this._listeners[type] = [];
        }
        if (typeof fnname === "string" && typeof obj === 'object' && obj[fnname]) {
            this._listeners[type].push(new listener(fnname, obj));
        } else {
            lierr(type);
            throw 'addEvent wrong'
        }
        return this;
    }

    /**
     * 添加一个一次性事件
     * @method
     * @param {String} type 事件名
     * @param {listenerfun} fn 回调函数
     * @public
     */
    addEventOnce(type: string, fn: _li.msgEvent.listenerfun) {
        if (typeof this._oncelisteners[type] === "undefined") {
            this._oncelisteners[type] = [];
        }
        if (typeof fn === 'function') {
            this._oncelisteners[type].push(fn);
        } else {
            throw 'addEventOnce wrong'
        }
        return this;
    }

    /**
     * 发射事件
     * @method
     * @param {String} type 事件名
     * @param {Object} msg 消息
     * @param {Object} opt 选项(可选)
     * @public
     */
    emit(type: string, msg?, opt?) {
        //-- 先发送多次监听
        let arrayEvent = this._listeners[type];
        if (typeof arrayEvent !== "undefined") {
            for (let i = 0, length = arrayEvent.length; i < length; i += 1) {
                let listener = arrayEvent[i];
                listener.obj[listener.fnname](msg, opt);
            }
        }

        //-- 后单次监听
        let arrayEventOnce = this._oncelisteners[type];
        if (typeof arrayEventOnce !== "undefined") {
            for (let i = 0, length = arrayEventOnce.length; i < length; i += 1) {
                let listener = arrayEventOnce[i];
                listener(msg, opt);
            }
            delete this._oncelisteners[type];
        }

        return this;
    }

    /**
     * 移出事件监听
     * @method
     * @param {String} type 事件名
     * @param {String} fnname 回调函数名
     * @param {Object} obj 函数执行对象
     * @public
     */
    removeEvent(type: string, fnname?: string, obj?) {
        let arrayEvent = this._listeners[type];
        if (!arrayEvent) return;
        if (typeof fnname === "string" && typeof obj === "object") {
            for (let i = 0, length = arrayEvent.length; i < length; i += 1) {
                if (arrayEvent[i].obj == obj && arrayEvent[i].fnname == fnname) {
                    this._listeners[type].splice(i, 1);
                    break;
                }
            }
        } else if (!fnname && !obj) {
            delete this._listeners[type];
        } else {
            throw 'removeEvent wrong'
        }
    }

    /**
     * 清空所有监听
     * @public
     */
    cleanAll() {
        this._listeners = {};
        this._oncelisteners = {};
    }

    cleanObj(obj) {
        for (let type in this._listeners) {
            let arrayEvent = this._listeners[type];
            if (!arrayEvent) return;
            for (let i = 0, length = arrayEvent.length; i < length; i += 1) {
                if (arrayEvent[i].obj == obj) {
                    this._listeners[type].splice(i, 1);
                    break;
                }
            }
        }
    }
}

class listener {
        constructor(fnname: string, obj) {
            this.fnname = fnname;
            this.obj = obj;
            this.listenerfun = obj[fnname];
        }
        fnname: string
        obj: any
        listenerfun: _li.msgEvent.listenerfun
    }
//-- 用于联合类型判断具体类型的类型断言
//$$ 笔记:类型保护与类型断言
// function islistener(listener: listener | listenerfun): listener is listener {
//     return (<listener>listener).fnname !== undefined && (<listener>listener).obj !== undefined
// }

// function islistenerfun(listener: listener | listenerfun): listener is listenerfun {
//     return typeof listener === 'function'
// }