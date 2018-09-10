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