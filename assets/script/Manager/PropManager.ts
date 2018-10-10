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
        let tempinitalTowerlFragment:number = parseInt(cc.sys.localStorage.getItem('initalTowerlFragment'));
        if(!tempinitalTowerlFragment)
        {
            tempinitalTowerlFragment = 0;
        }
        this.initalTowerlFragment = tempinitalTowerlFragment;
        let tempExtralItemFragment:number = parseInt(cc.sys.localStorage.getItem('ExtralItemFragment'));
        if(!tempExtralItemFragment)
        {
            tempExtralItemFragment = 0;
        }
        this.ExtralItemFragment = tempExtralItemFragment;
        lib.msgEvent.getinstance().emit(lib.msgConfig.extralItemNumChange);
        lib.msgEvent.getinstance().emit(lib.msgConfig.initalTowerLevelChange);
    }

    private isExtraSlot:boolean = false;
    private isAutoCompose:boolean = false;
    private isDoubleSpeed:boolean = false;
    private isDoubleMoney:boolean = false;
    private initalTowerLevel: number;
    private ExtralItemNum: number;
    private initalTowerlFragment: number;
    private ExtralItemFragment: number;

    /** 额外攻击槽相关 */
    //设置额外攻击槽标识
    setIsExtraSlot(flag:boolean){
        this.isExtraSlot = flag;
    }

    //获取额外攻击槽标识
    getIsExtraSlot(){
        return this.isExtraSlot;
    }

    /** 双倍攻速相关 */
    //设置自动合成标识
    setIsDoubleSpeed(flag:boolean){
        this.isDoubleSpeed = flag;
    }

    //获取自动合成标识
    getIsDoubleSpeed(){
        return this.isDoubleSpeed;
    }

    /** 双倍金币相关 */
    //设置自动合成标识
    setIsDoubleMoney(flag:boolean){
        this.isDoubleMoney = flag;
    }

    //获取自动合成标识
    getIsDoubleMoney(){
        return this.isDoubleMoney;
    }

    /** 自动合成相关 */
    //设置自动合成标识
    setAutoCompose(flag:boolean){
        this.isAutoCompose = flag;
    }

    //获取自动合成标识
    getAutoCompose(){
        return this.isAutoCompose;
    }

    /** 初始塔等级碎片相关 */
    //设置初始塔碎片
    addInitalTowerlFragment(num:number){
        this.initalTowerlFragment += num;
        cc.sys.localStorage.setItem('initalTowerlFragment', this.initalTowerlFragment.toString());
        lib.msgEvent.getinstance().emit(lib.msgConfig.setamazeactive);
    }

    //获取初始塔碎片
    getInitalTowerlFragment(){
        return this.initalTowerlFragment;
    }
    
    /** 额外合成槽碎片相关 */
    //设置初始塔碎片
    addExtralItemFragment(num:number){
        this.ExtralItemFragment += num;
        cc.sys.localStorage.setItem('ExtralItemFragment', this.ExtralItemFragment.toString());
        lib.msgEvent.getinstance().emit(lib.msgConfig.setamazeactive);
    }

    //获取初始塔碎片
    getExtralItemFragment(){
        return this.ExtralItemFragment;
    }
    
    /** 初始塔等级相关 */
    //设置初始塔等级
    addInitalTowerLevel(num:number){
        this.initalTowerLevel += num;
        cc.sys.localStorage.setItem('initalTowerLevel', this.initalTowerLevel.toString());
        lib.msgEvent.getinstance().emit(lib.msgConfig.initalTowerLevelChange);
    }

    //获取初始塔等级
    getInitalTowerLevel(){
        return this.initalTowerLevel;
    }
    
    /** 额外合成槽位相关 */
    //设置额外合成槽位
    addExtralItemNum(num:number){
        this.ExtralItemNum += num;
        cc.sys.localStorage.setItem('ExtralItemNum', this.ExtralItemNum.toString());
        lib.msgEvent.getinstance().emit(lib.msgConfig.extralItemNumChange);
    }

    //获取额外合成槽位
    getExtralItemNum(){
        return this.ExtralItemNum;
    }
}