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
        let tempmoney:number = parseInt(cc.sys.localStorage.getItem('money'));
        if(!tempmoney)
        {
            tempmoney = 4;
        }
        this.money = tempmoney;
        // this.money = 4;
        let templevel:number = parseInt(cc.sys.localStorage.getItem('level'));
        if(!templevel)
        {
            templevel = 0;
        }
        this.level = templevel;
        cc.director.getCollisionManager().enabled = true;
        // cc.director.getCollisionManager().enabledDebugDraw = true;
        this.monsterVector = [];
        GameManager.instance = this;
    }
    
    private monsterVector:Array<cc.Node>;
    private money: number;
    private level: number;
    private createComplete:boolean = false;
    private isGameOver:boolean = false;

    pause(){
        cc.director.getActionManager().pauseTargets(this.monsterVector);
    }

    /** 过关相关 */
    //获取关卡
    getLevel(){
        return this.level;
    }

    //获取关卡
    setLevel(num:number){
        this.level = num;
        cc.sys.localStorage.setItem('level', this.level.toString());
    }

    addLevel(){
        this.level++;
        cc.sys.localStorage.setItem('level', this.level.toString());
        return this.level;
    }

    /** 金钱相关 */
    //增加金钱，可写负数
    addMoney(num:number){
        this.money += num;
        cc.sys.localStorage.setItem('money', this.money.toString());
        lib.msgEvent.getinstance().emit(lib.msgConfig.addmoney,this.money);
    }

    //获取金钱数
    getMoney(){
        return this.money;
    }

    /** 怪物数组 */
    //获取怪物数组
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

    /** 游戏结束 */
    //游戏结束主方法
    GameOver(){
        if(!this.isGameOver)
        {
            this.isGameOver = true;
            lib.msgEvent.getinstance().emit(lib.msgConfig.gameover);
        }
    }

    /** 生成结束相关 */
    //返回是否生成结束
    isEnd(){
        return this.createComplete;
    }

    //初始化是否生成结束标识
    initEnd(){
        this.isGameOver = false;
        this.createComplete = false;
    }

    //生成结束回调
    createEnd(){
        this.createComplete = true;
    }
}