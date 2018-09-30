/** 道具管理控制组件 */
import * as lib from '../lib/lib';
import PropManager from '../Manager/PropManager';
import ShareCon from "./ShareControl"

const {ccclass, property} = cc._decorator;

@ccclass
export default class PropControl extends cc.Component {

    //----- 编辑器属性 -----//
    //分享layer
    @property(cc.Node) shareLayer: cc.Node = null;
    //----- 属性声明 -----//
    //自动合成剩余时间
    private composeTime: number = 0;
    //双倍攻速剩余时间
    private DoubleSpeedTime: number = 0;
    //双倍金币剩余时间
    private DoubleMoneyTime: number = 0;
    //额外攻击槽剩余时间
    private ExtraSlotTime: number = 0;
    private _PropManager:PropManager = null;
    //----- 生命周期 -----//
    // onLoad () {}

    start () {
        lib.msgEvent.getinstance().addEvent(lib.msgConfig.addComposeTime,"addComposeTime",this);
        this._PropManager = PropManager.getinstance();
        this.schedule(this.minTime,1);
        let temptime:number = parseInt(cc.sys.localStorage.getItem('OffLineTime'));
        if(temptime)
        {
            lib.msgEvent.getinstance().emit(lib.msgConfig.showOffLine);
        }
        else
        {
            lib.msgEvent.getinstance().emit(lib.msgConfig.gamestart);
        }
        
        let timestamp:number = new Date().getTime();
        cc.sys.localStorage.setItem('OffLineTime', timestamp.toString());
    }

    // update (dt) {}
    onDestroy(){
        lib.msgEvent.getinstance().removeEvent(lib.msgConfig.addComposeTime,"addComposeTime",this);
    }
    //----- 按钮回调 -----//
    //----- 事件回调 -----//
    //----- 公有方法 -----//
    //增加自动合成时间
    addComposeTime(num: number)
    {
        this.composeTime += num;
        if(this.composeTime > 3600)
        {
            this.composeTime = 3600;
        }
    }

    //增加双倍攻速时间
    addDoubleSpeedTime(num: number)
    {
        this.DoubleSpeedTime += num;
        if(this.DoubleSpeedTime > 3600)
        {
            this.DoubleSpeedTime = 3600;
        }
    }

    //增加双倍金币时间
    addDoubleMoneyTime(num: number)
    {
        this.DoubleMoneyTime += num;
        if(this.DoubleMoneyTime > 3600)
        {
            this.DoubleMoneyTime = 3600;
        }
    }

    //增加额外攻击槽时间
    addExtraSlotTime(num: number)
    {
        this.ExtraSlotTime += num;
        if(this.ExtraSlotTime > 3600)
        {
            this.ExtraSlotTime = 3600;
        }
    }

    //获取双倍攻速时间
    getDoubleSpeedTime(){
        return this.DoubleSpeedTime;
    }

    //获取双倍金币时间
    getDoubleMoneyTime(){
        return this.DoubleMoneyTime;
    }
    //----- 私有方法 -----//
    private minTime(){
        //自动合成
        if(this.composeTime > 0)
        {
            this.composeTime--;
            if(!this._PropManager.getAutoCompose())
            {
                this._PropManager.setAutoCompose(true);
                lib.msgEvent.getinstance().emit(lib.msgConfig.autoCompose);
                lib.msgEvent.getinstance().emit(lib.msgConfig.showChilun);
            }
        }
        if(this.composeTime <= 0 && this._PropManager.getAutoCompose())
        {
            this._PropManager.setAutoCompose(false);
            this.composeTime = 0;
            lib.msgEvent.getinstance().emit(lib.msgConfig.hideChilun);
        }

        //双倍攻速
        if(this.DoubleSpeedTime > 0)
        {
            this.DoubleSpeedTime--;
            if(!this._PropManager.getIsDoubleSpeed())
            {
                this._PropManager.setIsDoubleSpeed(true);
                lib.msgEvent.getinstance().emit(lib.msgConfig.showDoubleSpeed);
            }
        }
        if(this.DoubleSpeedTime <= 0 && this._PropManager.getIsDoubleSpeed())
        {
            this._PropManager.setIsDoubleSpeed(false);
            lib.msgEvent.getinstance().emit(lib.msgConfig.hideDoubleSpeed);
            this.DoubleSpeedTime = 0;
        }

        //双倍金币
        if(this.DoubleMoneyTime > 0)
        {
            this.DoubleMoneyTime--;
            if(!this._PropManager.getIsDoubleMoney())
            {
                this._PropManager.setIsDoubleMoney(true);
                lib.msgEvent.getinstance().emit(lib.msgConfig.showDoubleMoeny);
            }
        }
        if(this.DoubleMoneyTime <= 0 && this._PropManager.getIsDoubleMoney())
        {
            this._PropManager.setIsDoubleMoney(false);
            lib.msgEvent.getinstance().emit(lib.msgConfig.hideDoubleMoeny);
            this.DoubleMoneyTime = 0;
        }

        //额外攻击槽
        if(this.ExtraSlotTime > 0)
        {
            this.ExtraSlotTime--;
            if(!this._PropManager.getIsExtraSlot())
            {
                this._PropManager.setIsExtraSlot(true);
                lib.msgEvent.getinstance().emit(lib.msgConfig.showExtraSlot);
            }
        }
        if(this.ExtraSlotTime <= 0 && this._PropManager.getIsExtraSlot())
        {
            this._PropManager.setIsExtraSlot(false);
            this.ExtraSlotTime = 0;
            lib.msgEvent.getinstance().emit(lib.msgConfig.hideExtraSlot);
        }

        this.shareLayer.getComponent(ShareCon).updateTime();
    }
}
