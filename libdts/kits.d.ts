
declare namespace _kits.Enemy {
    interface Point {
        /** 目标点位置 */
        Pos: cc.Vec2,
        /** 圆心坐标，如果走直线写null */
        roundPos: cc.Vec2,
    }
}