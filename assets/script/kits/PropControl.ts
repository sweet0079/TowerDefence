/** 道具管理控制组件 */
import * as lib from '../lib/lib';
import uiCon from './UIControl';
import PropManager from '../Manager/PropManager';
import ShareCon from "./ShareControl"

const {ccclass, property} = cc._decorator;

@ccclass
export default class PropControl extends cc.Component {

    //----- 编辑器属性 -----//
    //分享layer
    @property(cc.Node) shareLayer: cc.Node = null;
    //感叹号
    @property(cc.Node) amazing: cc.Node = null;
    //卡牌感叹号
    @property(cc.Node) Cardamazing: cc.Node = null;
    //UI控制节点
    @property(cc.Node) uiControl: cc.Node = null;
    //双倍金币事件
    @property(cc.Label) DoubleMoneyTimeLabel: cc.Label = null;
    //双倍攻速事件
    @property(cc.Label) DoubleSpeedTimeLabel: cc.Label = null;
    //宝箱剩余时间
    @property(cc.Label) TreasureTimeLabel: cc.Label = null;
    //自动合成剩余时间
    @property(cc.Label) composeTimeLabel: cc.Label = null;
    //进度条
    @property(cc.ProgressBar) DoubleMoneyBar: cc.ProgressBar = null;
    //进度条
    @property(cc.ProgressBar) DoubleSpeedBar: cc.ProgressBar = null;
    //进度条
    @property(cc.ProgressBar) composeBar: cc.ProgressBar = null;
    //----- 属性声明 -----//
    //自动合成剩余时间
    private composeTime: number = 0;
    //双倍攻速剩余时间
    private DoubleSpeedTime: number = 0;
    //双倍金币剩余时间
    private DoubleMoneyTime: number = 0;
    //额外攻击槽剩余时间
    private ExtraSlotTime: number = 0;
    //上次开宝箱的时间
    private LastTreasureTime: number = 0;
    private _PropManager:PropManager = null;
    //----- 生命周期 -----//
    // onLoad () {}

    start () {
        lib.msgEvent.getinstance().addEvent(lib.msgConfig.addComposeTime,"addComposeTime",this);
        this._PropManager = PropManager.getinstance();
        this.schedule(this.minTime,1);
        let temptime:number = parseInt(cc.sys.localStorage.getItem('OffLineTime'));
        let timestamp:number = new Date().getTime();
        let delt = timestamp - temptime;
        if(delt >= 1800000)
        {
            if(delt > 43200000)
            {
                delt = 43200000;
            }
            let tempmoney = delt / 60000 * 0.3;
            lib.msgEvent.getinstance().emit(lib.msgConfig.showOffLine,tempmoney);
        }
        else
        {
            lib.msgEvent.getinstance().emit(lib.msgConfig.gamestart);
        }

        let tempTreasureTime:number = parseInt(cc.sys.localStorage.getItem('LastTreasureTime'));
        if(tempTreasureTime)
        {
            this.LastTreasureTime = tempTreasureTime;
        }
        else
        {
            this.LastTreasureTime = null;
        }

        
        cc.sys.localStorage.setItem('OffLineTime', timestamp.toString());
        lib.msgEvent.getinstance().addEvent(lib.msgConfig.setamazeactive,"setCardamazingactive",this);
        this.setCardamazingactive();
    }

    // update (dt) {}
    onDestroy(){
        lib.msgEvent.getinstance().removeEvent(lib.msgConfig.addComposeTime,"addComposeTime",this);
        lib.msgEvent.getinstance().removeEvent(lib.msgConfig.setamazeactive,"setCardamazingactive",this);
    }
    //----- 按钮回调 -----//
    clickTreausre(){
        let timestamp:number = new Date().getTime();
        if(this.LastTreasureTime)
        {
            if(timestamp - this.LastTreasureTime > 14400000)
            {
                this.uiControl.getComponent(uiCon).clickTreausre(1);
                cc.sys.localStorage.setItem('LastTreasureTime', timestamp.toString());
                this.LastTreasureTime = timestamp;
            }
            else
            {
                lib.wxFun.showToast("每4小时只能开一次哦~");
            }
        }
        else
        {
            this.uiControl.getComponent(uiCon).clickTreausre(1);
            cc.sys.localStorage.setItem('LastTreasureTime', timestamp.toString());
            this.LastTreasureTime = timestamp;
        }
    }
    //----- 事件回调 -----//
    private setCardamazingactive(){
        if(this._PropManager.getExtralItemFragment() >= (PropManager.getinstance().getExtralItemNum() + 3)
            || this._PropManager.getInitalTowerlFragment() >= (PropManager.getinstance().getInitalTowerLevel() + 2))
        {
            this.Cardamazing.active = true;
        }
        else
        {
            this.Cardamazing.active = false;
        }
    }
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
    private setTime(){
        if(this.DoubleMoneyTime > 0)
        {
            this.DoubleMoneyTimeLabel.node.parent.active = true;
            let min;
            let sec;
            min = parseInt((this.DoubleMoneyTime / 60).toString());
            sec = this.DoubleMoneyTime % 60;
            if(sec < 10)
            {
                this.DoubleMoneyTimeLabel.string = min + ":0" + sec;
            }
            else
            {
                this.DoubleMoneyTimeLabel.string = min + ":" + sec;
            }
            this.DoubleMoneyBar.progress = this.DoubleMoneyTime / 3600;
        }
        else
        {
            this.DoubleMoneyTimeLabel.node.parent.active = false;
        }


        if(this.DoubleSpeedTime > 0)
        {
            this.DoubleSpeedTimeLabel.node.parent.active = true;
            let min;
            let sec;
            min = parseInt((this.DoubleSpeedTime / 60).toString());
            sec = this.DoubleSpeedTime % 60;
            if(sec < 10)
            {
                this.DoubleSpeedTimeLabel.string = min + ":0" + sec;
            }
            else
            {
                this.DoubleSpeedTimeLabel.string = min + ":" + sec;
            }
            this.DoubleSpeedBar.progress = this.DoubleSpeedTime / 3600;
        }
        else
        {
            this.DoubleSpeedTimeLabel.node.parent.active = false;
        }

        
        if(this.composeTime > 0)
        {
            this.composeTimeLabel.node.parent.active = true;
            let min;
            let sec;
            min = parseInt((this.composeTime / 60).toString());
            sec = this.composeTime % 60;
            if(sec < 10)
            {
                this.composeTimeLabel.string = min + ":0" + sec;
            }
            else
            {
                this.composeTimeLabel.string = min + ":" + sec;
            }
            this.composeBar.progress = this.composeTime / 3600;
        }
        else
        {
            this.DoubleSpeedTimeLabel.node.parent.active = false;
        }


        let timestamp:number = new Date().getTime();
        if(this.LastTreasureTime)
        {
            let deltTime = timestamp - this.LastTreasureTime;
            if(deltTime > 14400000)
            {
                this.TreasureTimeLabel.node.parent.active = false;
            }
            else
            {
                this.TreasureTimeLabel.node.parent.active = true;
                let time = parseInt(((14400000 - deltTime) / 1000).toString());
                let hour;
                let min;
                let sec;
                hour = parseInt((time / 3600).toString());
                min = parseInt(((time - hour * 3600) / 60).toString());
                sec = time % 60;
                if(min < 10)
                {
                    this.TreasureTimeLabel.string = hour + ":0" + min;
                }
                else
                {
                    this.TreasureTimeLabel.string = hour + ":" + min;
                }
                if(sec < 10)
                {
                    this.TreasureTimeLabel.string += ":0" + sec;
                }
                else
                {
                    this.TreasureTimeLabel.string += ":" + sec;
                }
            }
        }
    }

    private checkAmazing(){
        let timestamp:number = new Date().getTime();
        if(this.LastTreasureTime)
        {
            if(timestamp - this.LastTreasureTime > 14400000)
            {
                this.amazing.active = true;
            }
            else
            {
                this.amazing.active = false;
            }
        }
    }

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
        this.checkAmazing();
        this.setTime();

        let timestamp:number = new Date().getTime();
        cc.sys.localStorage.setItem('OffLineTime', timestamp.toString());
    }
}
