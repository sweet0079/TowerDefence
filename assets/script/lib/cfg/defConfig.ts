/** 塔颜色枚举 */
export const TowerColorEnum = cc.Enum({
    // 红
    red: -1,
    // 绿
    green: -1,
    // 蓝
    blue: -1,
    // 紫
    purple: -1,
    // 长度
    length: -1,
});

/** 小球颜色枚举 */
export const EnemyColorEnum = cc.Enum({
    // 黄
    yellow: -1,
    // 红
    red: -1,
    // 绿
    green: -1,
    // 蓝
    blue: -1,
    // 紫
    purple: -1,
    // boss
    boss: -1,
    // 长度
    length: -1,
});

/** 卡牌类型枚举 */
export const CardTypeEnum = cc.Enum({
    // 塔初始等级
    initTower: -1,
    // 额外合成槽
    extralItem: -1,
    // 自动合成
    autoCompose: -1,
    // 钱
    money: -1,
    // 长度
    length: -1,
});

//塔在合成槽内上移的距离
export const TowerInItemY = 20;
//初始合成槽位
export const OriginalItemNum = 9;
//拖动炮塔时放大倍数
export const TouchTowerScale = 1.75;

