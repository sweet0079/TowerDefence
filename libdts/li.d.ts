/** li的接口库 */
declare namespace _li {}

declare namespace _li.cb {
    /** 普通无参回调格式 */
    interface norCallBack {
        (): void
    }
    /** 带错误信息的回调格式 */
    interface errCallBack {
        (err): void
    }
    /** 带字符串的回调格式 */
    interface strCallBack {
        (str: string): void
    }
}
declare namespace _li.msgEvent {
    //----- msgEvent -----//
    interface Transit {
        [propname: string]: Array<listener>;
    }

    interface TransitOnce {
        [propname: string]: Array<listenerfun>;
    }

    interface listenerfun {
        (msg?: any, opt?: any): void;
    }

    interface listener {
        fnname: string
        obj: any
        listenerfun: _li.mod.msgEvent.listenerfun
    }
}