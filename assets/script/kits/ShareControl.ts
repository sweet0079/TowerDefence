/** 分享界面控制 */
import * as lib from '../lib/lib';
import proControl from './PropControl';
import GameManager from '../Manager/GameManager';

const {ccclass, property} = cc._decorator;

@ccclass
export default class ShareControl extends cc.Component {

    //----- 编辑器属性 -----//
    //标题精灵
    @property(cc.Sprite) TitleSpr: cc.Sprite = null;
    //进度条
    @property(cc.ProgressBar) progressBar: cc.ProgressBar = null;
    //道具控制组件
    @property(proControl) ProControl: proControl = null;
    //标题精灵图集
    @property([cc.SpriteFrame]) TitleSpfArr: Array<cc.SpriteFrame> = [];
    //时间
    @property(cc.Label) TimeLabel: cc.Label = null;
    //获得物品界面
    @property(cc.Node) ItemLayer: cc.Node = null;
    //物品精灵
    @property(cc.Sprite) ItemSprite: cc.Sprite = null;
    //物品精灵图集
    @property([cc.SpriteFrame]) ItemSpfArr: Array<cc.SpriteFrame> = [];
    //----- 属性声明 -----//
    private ShareType:number = 0;
    private itemType:number = 0;
    private bannerAd;
    //----- 生命周期 -----//

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    // start () {

    // }
    onEnable(){
        let temp = lib.userInfo.getinstance().getShareInfo().banner.finsh_bottom;
        this.bannerAd = wx.createBannerAd({
            adUnitId: temp,
            style: {
            left: 10,
            top: 76,
            width: 320
            }
        });
        this.bannerAd.show();
    }

    onDisable(){
        if(this.bannerAd)
        {
            this.bannerAd.hide();
        }
    }


    // update (dt) {}
    //----- 按钮回调 -----//
    closeShare(){
        this.node.active = false;
    }
    clickShare(){
        if(lib.userInfo.getinstance().getisLegal())
        {
            lib.wxFun.showToast("功能暂未开放！");
        }
        else
        {   let temp;
            let shareinfo;
            let query;
            switch(this.ShareType)
            {
                case 0:
                    temp = lib.RandomParameters.RandomParameters.getRandomInt(lib.userInfo.getinstance().getShareInfo().relation.Tomatowar02.length);
                    shareinfo = lib.userInfo.getinstance().getShareInfo().relation.Tomatowar02[temp].shareInfoId;
                    query = "uid=" + lib.userInfo.getinstance().getuid() + "&shareId=" + lib.userInfo.getinstance().getShareInfo().relation.Tomatowar02[temp].shareId;
                    lib.wxFun.shareAppMessage(lib.userInfo.getinstance().getShareInfo().shareInfo[shareinfo].content,
                                                lib.userInfo.getinstance().getShareInfo().shareInfo[shareinfo].img_url,query,
                            (res)=>{
                                if (res.shareTickets != undefined)
                                {
                                    let url = "https://click.xyx.bkdau.cn/share/" + lib.userInfo.getinstance().getappID() + "/" + lib.userInfo.getinstance().getShareInfo().relation.Tomatowar02[temp].shareId;
                                    lib.httpRequest.getinstance().send(url);
                                    this.ProControl.addDoubleMoneyTime(300);
                                    this.init(0);
                                }
                                else
                                {
                                    lib.wxFun.showToast("请分享到微信群哦～");
                                }
                            });
                    break;
                case 1:
                    temp = lib.RandomParameters.RandomParameters.getRandomInt(lib.userInfo.getinstance().getShareInfo().relation.Tomatowar01.length);
                    shareinfo = lib.userInfo.getinstance().getShareInfo().relation.Tomatowar01[temp].shareInfoId;
                    query = "uid=" + lib.userInfo.getinstance().getuid() + "&shareId=" + lib.userInfo.getinstance().getShareInfo().relation.Tomatowar01[temp].shareId;
                    lib.wxFun.shareAppMessage(lib.userInfo.getinstance().getShareInfo().shareInfo[shareinfo].content,
                                                lib.userInfo.getinstance().getShareInfo().shareInfo[shareinfo].img_url,query,
                        (res)=>{
                            if (res.shareTickets != undefined)
                            {
                                let url = "https://click.xyx.bkdau.cn/share/" + lib.userInfo.getinstance().getappID() + "/" + lib.userInfo.getinstance().getShareInfo().relation.Tomatowar01[temp].shareId;
                                lib.httpRequest.getinstance().send(url);
                                this.ProControl.addDoubleSpeedTime(300);
                                this.init(1);
                            }
                            else
                            {
                                lib.wxFun.showToast("请分享到微信群哦～");
                            }
                        });
                    break;
                case 2:
                    temp = lib.RandomParameters.RandomParameters.getRandomInt(lib.userInfo.getinstance().getShareInfo().relation.Tomatowar04.length);
                    shareinfo = lib.userInfo.getinstance().getShareInfo().relation.Tomatowar04[temp].shareInfoId;
                    query = "uid=" + lib.userInfo.getinstance().getuid() + "&shareId=" + lib.userInfo.getinstance().getShareInfo().relation.Tomatowar04[temp].shareId;
                    lib.wxFun.shareAppMessage(lib.userInfo.getinstance().getShareInfo().shareInfo[shareinfo].content,
                                                lib.userInfo.getinstance().getShareInfo().shareInfo[shareinfo].img_url,query,
                        (res)=>{
                            if (res.shareTickets != undefined)
                            {
                                let url = "https://click.xyx.bkdau.cn/share/" + lib.userInfo.getinstance().getappID() + "/" + lib.userInfo.getinstance().getShareInfo().relation.Tomatowar04[temp].shareId;
                                lib.httpRequest.getinstance().send(url);
                                GameManager.getinstance().addMoney(120);
                                switch(this.itemType)
                                {
                                    case 0:
                                        GameManager.getinstance().addMoney(120);
                                        break;
                                    case 1:
                                        this.ProControl.addDoubleSpeedTime(300);
                                        break;
                                    case 2:
                                        this.ProControl.addDoubleMoneyTime(300);
                                        break;
                                    case 3:
                                        this.ProControl.addExtraSlotTime(300);
                                        break;
                                    default:
                                        break;
                                }
                                this.closeShare();
                            }
                            else
                            {
                                lib.wxFun.showToast("请分享到微信群哦～");
                            }
                        });
                    // this.ProControl.addDoubleSpeedTime(300);
                    break;
                case 3:
                    temp = lib.RandomParameters.RandomParameters.getRandomInt(lib.userInfo.getinstance().getShareInfo().relation.Tomatowar06.length);
                    shareinfo = lib.userInfo.getinstance().getShareInfo().relation.Tomatowar06[temp].shareInfoId;
                    query = "uid=" + lib.userInfo.getinstance().getuid() + "&shareId=" + lib.userInfo.getinstance().getShareInfo().relation.Tomatowar06[temp].shareId;
                    lib.wxFun.shareAppMessage(lib.userInfo.getinstance().getShareInfo().shareInfo[shareinfo].content,
                                                lib.userInfo.getinstance().getShareInfo().shareInfo[shareinfo].img_url,query,
                        (res)=>{
                            if (res.shareTickets != undefined)
                            {
                                let url = "https://click.xyx.bkdau.cn/share/" + lib.userInfo.getinstance().getappID() + "/" + lib.userInfo.getinstance().getShareInfo().relation.Tomatowar06[temp].shareId;
                                lib.httpRequest.getinstance().send(url);
                                GameManager.getinstance().addMoney(120);
                                GameManager.getinstance().addMoney(120);
                                this.closeShare();
                            }
                            else
                            {
                                lib.wxFun.showToast("请分享到微信群哦～");
                            }
                        });
                    // this.ProControl.addDoubleSpeedTime(300);
                    break;
                default:
                    break;
            } 
        }
    }
    //----- 事件回调 -----//
    //----- 公有方法 -----//
    updateTime(){
        let time;
        let min;
        let sec;
        switch(this.ShareType)
        {
            case 0:
                time = this.ProControl.getDoubleMoneyTime();
                min = parseInt((time / 60).toString());
                sec = time % 60;
                this.progressBar.progress = this.ProControl.getDoubleMoneyTime() / 3600;
                if(sec < 10)
                {
                    this.TimeLabel.string = min + ":0" + sec;
                }
                else
                {
                    this.TimeLabel.string = min + ":" + sec;
                }
                break;
            case 1:
                time = this.ProControl.getDoubleSpeedTime();
                min = parseInt((time / 60).toString());
                sec = time % 60;
                this.progressBar.progress = this.ProControl.getDoubleSpeedTime() / 3600;
                if(sec < 10)
                {
                    this.TimeLabel.string = min + ":0" + sec;
                }
                else
                {
                    this.TimeLabel.string = min + ":" + sec;
                }
                break;
            default:
                break;
        }
    }

    init(type){
        this.ShareType = type;
        this.TitleSpr.spriteFrame = this.TitleSpfArr[type];
        let time;
        let min;
        let sec;
        switch(type)
        {
            case 0:
                this.progressBar.node.active = true;
                this.ItemLayer.active = false;
                time = this.ProControl.getDoubleMoneyTime();
                min = parseInt((time / 60).toString());
                sec = time % 60;
                this.progressBar.progress = this.ProControl.getDoubleMoneyTime() / 3600;
                if(sec < 10)
                {
                    this.TimeLabel.string = min + ":0" + sec;
                }
                else
                {
                    this.TimeLabel.string = min + ":" + sec;
                }
                break;
            case 1:
                this.progressBar.node.active = true;
                this.ItemLayer.active = false;
                time = this.ProControl.getDoubleSpeedTime();
                min = parseInt((time / 60).toString());
                sec = time % 60;
                this.progressBar.progress = this.ProControl.getDoubleSpeedTime() / 3600;
                if(sec < 10)
                {
                    this.TimeLabel.string = min + ":0" + sec;
                }
                else
                {
                    this.TimeLabel.string = min + ":" + sec;
                }
                break;
            case 2:
                this.progressBar.node.active = false;
                this.ItemLayer.active = true;
                let num = lib.RandomParameters.RandomParameters.getRandomInt(this.ItemSpfArr.length);
                this.itemType = num;
                this.ItemSprite.spriteFrame = this.ItemSpfArr[num];
                break;
            case 3:
                this.progressBar.node.active = false;
                this.ItemLayer.active = true;
                this.itemType = num;
                this.ItemSprite.spriteFrame = this.ItemSpfArr[0];
                break;
            default:
                break;
        } 
    }
    //----- 私有方法 -----//
}
