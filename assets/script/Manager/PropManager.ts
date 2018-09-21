/** 游戏管理器脚本 */
import * as lib from '../lib/lib'

export default class PropManager {
    static instance: PropManager
    /** 获取单例 */
    static getinstance() {
        if (PropManager.instance) return PropManager.instance;
        else return new PropManager();
    }
    /** 返回一个新的单例 */
    static newinstance() {
        return new PropManager();
    }

    private constructor() {
        PropManager.instance = this;
        let tempinitalTowerLevel:number = parseInt(cc.sys.localStorage.getItem('initalTowerLevel'));
        if(!tempinitalTowerLevel)
        {
            tempinitalTowerLevel = 1;
        }
        this.initalTowerLevel = tempinitalTowerLevel;
        let tempExtralItemNum:number = parseInt(cc.sys.localStorage.getItem('ExtralItemNum'));
        if(!tempExtralItemNum)
        {
            tempExtralItemNum = 0;
        }
        this.ExtralItemNum = tempExtralItemNum;
        lib.msgEvent.getinstance().emit(lib.msgConfig.extralItemNumChange);
        lib.msgEvent.getinstance().emit(lib.msgConfig.initalTowerLevelChange);
    }

    private isAutoCompose:boolean = false;
    private initalTowerLevel: number;
    private ExtralItemNum: number;

    /** 自动合成相关 */
    //设置自动合成标识
    setAutoCompose(flag:boolean){
        this.isAutoCompose = flag;
    }

    //获取自动合成标识
    getAutoCompose(){
        return this.isAutoCompose;
    }

    /** 初始塔等级相关 */
    //设置初始塔等级
    setInitalTowerLevel(num:number){
        this.initalTowerLevel = num;
        cc.sys.localStorage.setItem('initalTowerLevel', this.initalTowerLevel.toString());
        lib.msgEvent.getinstance().emit(lib.msgConfig.initalTowerLevelChange);
    }

    //获取初始塔等级
    getInitalTowerLevel(){
        return this.initalTowerLevel;
    }
    
    /** 额外合成槽位相关 */
    //设置额外合成槽位
    setExtralItemNum(num:number){
        this.ExtralItemNum = num;
        cc.sys.localStorage.setItem('ExtralItemNum', this.ExtralItemNum.toString());
        lib.msgEvent.getinstance().emit(lib.msgConfig.extralItemNumChange);
    }

    //获取额外合成槽位
    getExtralItemNum(){
        return this.ExtralItemNum;
    }
}