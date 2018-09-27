/** http请求类型 */
const GET = "GET";
const POST = "POST";
const PUT = "PUT";
const DELETE = "DELETE";
const UNKNOWN = "UNKNOWN";



/** Http请求方法集 */
// import shinfo from './shinfo'

export default class httprequest {
    static instance: httprequest
    static getinstance() {
        if (httprequest.instance) return httprequest.instance;
        else return new httprequest();
    }

    private constructor() {
        httprequest.instance = this;
    }

    public type:string = "POST";
    public xhr:XMLHttpRequest;
    public responseType:String;
    protected _data:any;
    protected _url:string;
    
    /**
     * 发送请求。
     * @param	url 请求的地址。
     * @param	args 发送的数据，可选,可以是string或者是json。
     * @param	method 发送数据方式，值为“Get”或“Post”，默认为 “Post”方式。
     * @param	 返回消息类型，详见FileType,可设置为"text"，"json"，"xml","arraybuffer"。
     * @param	headers 头信息，key value数组，比如["Content-Type", "application/json"]。
     */
    send(url:string, args:any = undefined, response_Type:string = "text", headers:string[] = null):void 
    {
        let _thisObj = this;
        this._url = url;
        this.responseType = response_Type;
        this._data = null;
        this.xhr = new XMLHttpRequest();
        this.xhr.open(this.type, url, true);
        if (headers) {
            for (let i:number = 0; i < headers.length; i++) {
                this.xhr.setRequestHeader(headers[i++], headers[i]);
            }
        } else {
            if (!args || typeof args === "string") 
            {// args 为空，或者是string
                this.xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            }
            else
            {
                this.xhr.setRequestHeader("Content-Type", "application/json");
            } 
        }
        this.xhr.onerror = function(e):void {
            _thisObj.onError(e);
        }
        this.xhr.onabort = function(e):void {
            _thisObj.onAbort(e);
        }
        this.xhr.onprogress = function(e):void {
            _thisObj.onProgress(e);
        }
        this.xhr.onload = function(e):void {
            console.log("onload");
            _thisObj.onLoad(e);
        }
        if(this.type == POST)
        {
            this.xhr.send(args);    
            return;
        }
         if(this.type == GET)
        {//GET 
            this.xhr.send(null);
            return;
        }
        console.warn("HttpRequest error type!",this.type)
    }
    
    /**
     * 请求进度的侦听处理函数。
     * @param	e 事件对象。
     */
    protected onProgress(e):void {
        if (e && e.lengthComputable) 
        {
            // event(Event.PROGRESS, e.loaded / e.total);
            // NetDispatcher.ins.dispatchEvent();
            // this.dispatchEvent(new NetEvent(NetEventType.PROGRESS,e));
        };
    }
    
    /**
     * 请求中断的侦听处理函数。
     * @param	e 事件对象。
     */
    protected onAbort(e):void 
    {
        console.error("Request was aborted by user");
        // this.dispatchEvent(new NetEvent(NetEventType.ERROR,e));
    }
    
    /**
     * 请求出错侦的听处理函数。
     * @param	e 事件对象。
     */
    protected onError(e):void 
    {
        console.error("Request failed Status:" + this.xhr.status + " text:" + this.xhr.statusText);
        // this.dispatchEvent(new NetEvent(NetEventType.ERROR,e));
    }
    
    /**
     * 请求消息返回的侦听处理函数。
     * @param	e 事件对象。
     */
    protected onLoad(e):void {
        console.log("onLoad" + e);
        let status:Number = this.xhr.status !== undefined ? this.xhr.status : 200;
        if (status === 200 || status === 204 || status === 0) {
            this.complete();
        } else {
            console.error("[" + this.xhr.status + "]" + this.xhr.statusText + ":" + this._url);
            // this.dispatchEvent(new NetEvent(NetEventType.ERROR,e));
        }
    }
    
    /**
     * 请求错误的处理函数。
     * @param	message 错误信息。
     */
    protected error(message:String):void {
        this.clear();
        // , message
        // this.dispatchEvent(new NetEvent(NetEventType.ERROR));
    }
    
    /**
     * 请求成功完成的处理函数。
     */
    protected complete():void {
        console.log("complete");
        this.clear();
        if (this.responseType === "json") {
            this._data = JSON.parse(this.xhr.responseText);
            console.log(this._data);
        } 
        // else if (this.responseType === "xml") {
        //     this._data =  	egret.XML.parse(this.xhr.responseText);
        // }
        else {
            this._data = this.xhr.response || this.xhr.responseText;
        }
        // event(Event.COMPLETE, this._data is Array ? [this._data] : this._data);
        // this.dispatchEvent(new NetEvent(NetEventType.COMPLETE,this.data))
    }
    
    /**
     * 清除当前请求。
     */
    protected clear():void {
        this.xhr.onerror = this.xhr.onabort = this.xhr.onprogress = this.xhr.onload = null;
    }
    
    /** 请求的地址。*/
    public get url():String {
        return this._url;
    }
    
    /** 返回的数据。*/
    public get data():any {
        return this._data;
    }
}