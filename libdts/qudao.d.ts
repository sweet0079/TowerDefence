declare namespace _qudao {
    interface LoginCB {
        fromUid: number,
        /** 等级 */
        session_key: string,
        /** 节点 */
        result: string,
        user: user,
        curTime: number,
    }
    interface user {
        id: string,
        isBlackIp: number,
        isLegal: number,
        limit_time: string,
        task: Array<string>,
    }
    interface shareConfig {
        "appId": string,
        "shareInfo": any,
        "relation": any,
    }
}

