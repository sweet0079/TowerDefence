declare namespace _kits.Item {
    interface TowerInfo {
        /** 颜色 */
        Color: number,
        /** 等级 */
        Level: number,
        /** 节点 */
        node: cc.Node,
    }
    interface BuildInfo {
        /** 颜色 */
        Color: number,
        /** 等级 */
        Level: number,
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
        color: string,
        /** 攻击范围 */
        range: string,
        /** 攻速 */
        speed: string,
        /** 减速率 */
        splashRadius: string,
        /** 毒时间 */
        poisonTime: string,
        /** AOE */
        aoeLenght: string
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