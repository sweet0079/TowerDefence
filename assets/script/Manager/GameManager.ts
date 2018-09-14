/** 游戏管理器脚本 */
import * as lib from '../lib/lib'

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
        this.money = 4;
        this.level = 0;
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;
        this.monsterVector = [];
        GameManager.instance = this;
    }

    private monsterVector:Array<cc.Node>;
    private money: number;
    private level: number;
    private createComplete:boolean = false;

    getLevel(){
        return this.level;
    }

    addLevel(){
        this.level++;
        return this.level;
    }

    addMoney(num:number){
        this.money += num;
        lib.msgEvent.getinstance().emit(lib.msgConfig.addmoney,this.money);
    }

    getMoney(){
        return this.money;
    }

    getMonsterVector(){
        return this.monsterVector;
    }

    pushMonsterVector(node:cc.Node)
    {
        this.monsterVector.push(node);
    }

    delMonsterVector(node:cc.Node)
    {
        let index = this.monsterVector.indexOf(node);
        if (index > -1) {
            this.monsterVector.splice(index, 1);
        }
    }

    isEnd(){
        return this.createComplete;
    }

    initEnd(){
        console.log("initEnd");
        this.createComplete = false;
    }

    createEnd(){
        console.log("createEnd");
        this.createComplete = true;
    }
}