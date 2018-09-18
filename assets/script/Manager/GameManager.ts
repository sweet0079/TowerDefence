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
        this.level = 0;
        cc.director.getCollisionManager().enabled = true;
        // cc.director.getCollisionManager().enabledDebugDraw = true;
        this.monsterVector = [];
        GameManager.instance = this;
    }

    private isAutoCompose:boolean = false;
    private monsterVector:Array<cc.Node>;
    private money: number;
    private level: number;
    private createComplete:boolean = false;
    private isGameOver:boolean = false;

    setAutoCompose(flag:boolean){
        this.isAutoCompose = flag;
    }

    getAutoCompose(){
        return this.isAutoCompose;
    }

    getLevel(){
        return this.level;
    }

    setLevel(num:number){
        this.level = num;
    }

    addLevel(){
        this.level++;
        return this.level;
    }

    addMoney(num:number){
        this.money += num;
        cc.sys.localStorage.setItem('money', this.money.toString());
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

    GameOver(){
        if(!this.isGameOver)
        {
            this.isGameOver = true;
            lib.msgEvent.getinstance().emit(lib.msgConfig.gameover);
        }
    }

    //返回是否生成结束
    isEnd(){
        return this.createComplete;
    }

    initEnd(){
        this.isGameOver = false;
        this.createComplete = false;
    }

    createEnd(){
        this.createComplete = true;
    }
}