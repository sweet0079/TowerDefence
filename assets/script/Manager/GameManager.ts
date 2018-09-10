/** 游戏管理器脚本 */
export default class GameManager {
    static instance: GameManager
    /** 获取单例 */
    static getinstance() {
        if (GameManager.instance) return GameManager.instance;
        else return new GameManager();
    }
    /** 返回一个新的单例 */
    static newinstance() {
        return new GameManager();
    }

    private constructor() {
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;
        this.monsterVector = [];
        GameManager.instance = this;
    }

    private monsterVector:Array<cc.Node>;

    getMonsterVector(){
        return this.monsterVector;
    }

    pushMonsterVector(node:cc.Node)
    {
        this.monsterVector.push(node);
    }
}