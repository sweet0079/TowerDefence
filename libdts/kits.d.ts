declare namespace _kits.Item {
    interface TowerInfo {
        /** 颜色 */
        Color: number,
        /** 等级 */
        Level: number,
        /** 节点 */
        node: cc.Node,
    }
}

declare namespace _kits.Enemy {
    interface Point {
        /** 目标点位置 */
        Pos: cc.Vec2,
        /** 圆心坐标，如果走直线写null */
        roundPos: cc.Vec2,
    }
}

declare namespace _kits.JSON {
    interface Tower {
        /** 颜色 */
        color: number,
        /** 攻击范围 */
        range: number,
        /** 攻速 */
        speed: number,
        /** 减速率 */
        splashRadius: number,
        /** 毒伤 */
        poison: number,
        /** 毒时间 */
        poisonTime: number,
        /** AOE */
        aoeLenght: number
    }
    interface Level {
        /** 关卡 */
        stage1: string,
        /** 炮塔价格 */
        TowerGold: string,
        /** 小球金币 */
        GetGold: string,
        /** 对应什么类型的怪 */
        monsterID: string,
        /** 生成数量 */
        Quantity: string,
        /** 小球血量 */
        HP: string,
        /** 炮塔槽数量 */
        TowerQuantity: string,
        /** 升级槽数量 */
        Upgrade: string,
        /** 塔初始等级 */
        initial: string,
    }
    interface Enemy {
        /** 移动速度 */
        speed: string,
        /** 格挡率 */
        block: string,
        /** 格挡哪种颜色的塔 */
        Corresponding: string
    }
}