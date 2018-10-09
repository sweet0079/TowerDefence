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
    //物品名字
    @property(cc.Label) ItemLabel: cc.Label = null;
    //物品精灵图集
    @property([cc.SpriteFrame]) ItemSpfArr: Array<cc.SpriteFrame> = [];
    //是否分享按钮
    @property(cc.Toggle) fenxiangToggle: cc.Toggle = null;
    //----- 属性声明 -----//
    private ShareType:number = 0;
    private itemType:number = 0;
    private randomMoney:number = 0;
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
        {   
            if(this.fenxiangToggle.isChecked)
            {
                let temp;
                let shareinfo;
                let query;
                switch(this.ShareType)
                {
                    case 0:
                        temp = lib.RandomParameters.RandomParameters.getRandomInt(lib.userInfo.getinstance().getShareInfo().relation.Tomatowar02.length);
                        shareinfo = lib.userInfo.getinstance().getShareInfo().relation.Tomatowar02[temp].shareInfoId;
                        query = "uid=" + lib.userInfo.getinstance().getuid() + "&shareId=" + lib.userInfo.getinstance().getShareInfo().relation.Tomatowar02[temp].shareId;
                        // lib.wxFun.shareAppMessage(lib.userInfo.getinstance().getShareInfo().shareInfo[shareinfo].content,
                        //                             lib.userInfo.getinstance().getShareInfo().shareInfo[shareinfo].img_url,query,
                        //         (res)=>{
                        //             if (res.shareTickets != undefined)
                        //             {
                        //                 let url = "https://click.xyx.bkdau.cn/share/" + lib.userInfo.getinstance().getappID() + "/" + lib.userInfo.getinstance().getShareInfo().relation.Tomatowar02[temp].shareId;
                        //                 lib.httpRequest.getinstance().send(url);
                        //                 this.ProControl.addDoubleMoneyTime(300);
                        //                 this.init(0);
                        //             }
                        //             else
                        //             {
                        //                 lib.wxFun.showToast("请分享到微信群哦～");
                        //             }
                        //         });
                        lib.wxFun.shareApp({title:lib.userInfo.getinstance().getShareInfo().shareInfo[shareinfo].content,
                            imageUrl:lib.userInfo.getinstance().getShareInfo().shareInfo[shareinfo].img_url,query: query},
                                    (res)=>{
                                            let url = "https://click.xyx.bkdau.cn/share/" + lib.userInfo.getinstance().getappID() + "/" + lib.userInfo.getinstance().getShareInfo().relation.Tomatowar02[temp].shareId;
                                            lib.httpRequest.getinstance().send(url);
                                            this.ProControl.addDoubleMoneyTime(300);
                                            this.init(0);
                                    },
                                (res)=>{
                                    lib.wxFun.showToast("请分享到微信群哦～");
                                },
                                (res)=>{
                                    lib.wxFun.showToast("不要连续分享到同一个群哦~");
                                });
                        break;
                    case 1:
                        temp = lib.RandomParameters.RandomParameters.getRandomInt(lib.userInfo.getinstance().getShareInfo().relation.Tomatowar01.length);
                        shareinfo = lib.userInfo.getinstance().getShareInfo().relation.Tomatowar01[temp].shareInfoId;
                        query = "uid=" + lib.userInfo.getinstance().getuid() + "&shareId=" + lib.userInfo.getinstance().getShareInfo().relation.Tomatowar01[temp].shareId;
                        // lib.wxFun.shareAppMessage(lib.userInfo.getinstance().getShareInfo().shareInfo[shareinfo].content,
                        //                             lib.userInfo.getinstance().getShareInfo().shareInfo[shareinfo].img_url,query,
                        //     (res)=>{
                        //         if (res.shareTickets != undefined)
                        //         {
                        //             let url = "https://click.xyx.bkdau.cn/share/" + lib.userInfo.getinstance().getappID() + "/" + lib.userInfo.getinstance().getShareInfo().relation.Tomatowar01[temp].shareId;
                        //             lib.httpRequest.getinstance().send(url);
                        //             this.ProControl.addDoubleSpeedTime(300);
                        //             this.init(1);
                        //         }
                        //         else
                        //         {
                        //             lib.wxFun.showToast("请分享到微信群哦～");
                        //         }
                        //     });
                        lib.wxFun.shareApp({title:lib.userInfo.getinstance().getShareInfo().shareInfo[shareinfo].content,
                            imageUrl:lib.userInfo.getinstance().getShareInfo().shareInfo[shareinfo].img_url,query: query},
                                    (res)=>{
                                            let url = "https://click.xyx.bkdau.cn/share/" + lib.userInfo.getinstance().getappID() + "/" + lib.userInfo.getinstance().getShareInfo().relation.Tomatowar01[temp].shareId;
                                            lib.httpRequest.getinstance().send(url);
                                            this.ProControl.addDoubleSpeedTime(300);
                                            this.init(1);
                                    },
                                (res)=>{
                                    lib.wxFun.showToast("请分享到微信群哦～");
                                },
                                (res)=>{
                                    lib.wxFun.showToast("不要连续分享到同一个群哦~");
                                });
                        break;
                    case 2:
                        temp = lib.RandomParameters.RandomParameters.getRandomInt(lib.userInfo.getinstance().getShareInfo().relation.Tomatowar04.length);
                        shareinfo = lib.userInfo.getinstance().getShareInfo().relation.Tomatowar04[temp].shareInfoId;
                        query = "uid=" + lib.userInfo.getinstance().getuid() + "&shareId=" + lib.userInfo.getinstance().getShareInfo().relation.Tomatowar04[temp].shareId;
                        // lib.wxFun.shareAppMessage(lib.userInfo.getinstance().getShareInfo().shareInfo[shareinfo].content,
                        //                             lib.userInfo.getinstance().getShareInfo().shareInfo[shareinfo].img_url,query,
                        //     (res)=>{
                        //         if (res.shareTickets != undefined)
                        //         {
                        //             let url = "https://click.xyx.bkdau.cn/share/" + lib.userInfo.getinstance().getappID() + "/" + lib.userInfo.getinstance().getShareInfo().relation.Tomatowar04[temp].shareId;
                        //             lib.httpRequest.getinstance().send(url);
                        //             GameManager.getinstance().addMoney(120);
                        //             switch(this.itemType)
                        //             {
                        //                 case 0:
                        //                     GameManager.getinstance().addMoney(120);
                        //                     break;
                        //                 case 1:
                        //                     this.ProControl.addDoubleSpeedTime(300);
                        //                     break;
                        //                 case 2:
                        //                     this.ProControl.addDoubleMoneyTime(300);
                        //                     break;
                        //                 case 3:
                        //                     this.ProControl.addExtraSlotTime(300);
                        //                     break;
                        //                 default:
                        //                     break;
                        //             }
                        //             this.closeShare();
                        //         }
                        //         else
                        //         {
                        //             lib.wxFun.showToast("请分享到微信群哦～");
                        //         }
                        //     });
                        lib.wxFun.shareApp({title:lib.userInfo.getinstance().getShareInfo().shareInfo[shareinfo].content,
                            imageUrl:lib.userInfo.getinstance().getShareInfo().shareInfo[shareinfo].img_url,query: query},
                                    (res)=>{
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
                                    },
                                (res)=>{
                                    lib.wxFun.showToast("请分享到微信群哦～");
                                },
                                (res)=>{
                                    lib.wxFun.showToast("不要连续分享到同一个群哦~");
                                });
                        // this.ProControl.addDoubleSpeedTime(300);
                        break;
                    case 3:
                        temp = lib.RandomParameters.RandomParameters.getRandomInt(lib.userInfo.getinstance().getShareInfo().relation.Tomatowar06.length);
                        shareinfo = lib.userInfo.getinstance().getShareInfo().relation.Tomatowar06[temp].shareInfoId;
                        query = "uid=" + lib.userInfo.getinstance().getuid() + "&shareId=" + lib.userInfo.getinstance().getShareInfo().relation.Tomatowar06[temp].shareId;
                        // lib.wxFun.shareAppMessage(lib.userInfo.getinstance().getShareInfo().shareInfo[shareinfo].content,
                        //                             lib.userInfo.getinstance().getShareInfo().shareInfo[shareinfo].img_url,query,
                        //     (res)=>{
                        //         if (res.shareTickets != undefined)
                        //         {
                        //             let url = "https://click.xyx.bkdau.cn/share/" + lib.userInfo.getinstance().getappID() + "/" + lib.userInfo.getinstance().getShareInfo().relation.Tomatowar06[temp].shareId;
                        //             lib.httpRequest.getinstance().send(url);
                        //             GameManager.getinstance().addMoney(120);
                        //             GameManager.getinstance().addMoney(120);
                        //             this.closeShare();
                        //         }
                        //         else
                        //         {
                        //             lib.wxFun.showToast("请分享到微信群哦～");
                        //         }
                        //     });
                        // this.ProControl.addDoubleSpeedTime(300);
                        lib.wxFun.shareApp({title:lib.userInfo.getinstance().getShareInfo().shareInfo[shareinfo].content,
                            imageUrl:lib.userInfo.getinstance().getShareInfo().shareInfo[shareinfo].img_url,query: query},
                                    (res)=>{
                                        let url = "https://click.xyx.bkdau.cn/share/" + lib.userInfo.getinstance().getappID() + "/" + lib.userInfo.getinstance().getShareInfo().relation.Tomatowar06[temp].shareId;
                                        lib.httpRequest.getinstance().send(url);
                                        GameManager.getinstance().addMoney(120);
                                        GameManager.getinstance().addMoney(120);
                                        this.closeShare();
                                    },
                                (res)=>{
                                    lib.wxFun.showToast("请分享到微信群哦～");
                                },
                                (res)=>{
                                    lib.wxFun.showToast("不要连续分享到同一个群哦~");
                                });
                        break;
                    default:
                        break;
                }
            }
            else
            {
                lib.wxFun.showRewardedVideoAd(lib.userInfo.getinstance().getShareInfo().video.youxinei).then((res)=>{
                    if(res.isEnded)
                    {
                        switch(this.ShareType)
                        {
                            case 0:
                                this.ProControl.addDoubleMoneyTime(300);
                                this.init(0);
                                break;
                            case 1:
                                this.ProControl.addDoubleSpeedTime(300);
                                this.init(1);
                                break;
                            case 2:
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
                                break;
                            case 3:
                                GameManager.getinstance().addMoney(120);
                                GameManager.getinstance().addMoney(this.randomMoney);
                                this.closeShare();
                                break;
                            default:
                                break;
                        }
                    }
                    else
                    {
                        lib.wxFun.showToast("看完广告才有奖励哦~");
                    }
                })
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
        if(lib.userInfo.getinstance().getisLegal())
        {
            this.fenxiangToggle.node.active = false;
        }
        else
        {
            this.fenxiangToggle.node.active = true;
        }
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
                if(num == 0)
                {
                    this.ItemLabel.string = "$120";
                }
                else if(num == 1)
                {
                    this.ItemLabel.string = "双倍攻速";
                }
                else if(num == 2)
                {
                    this.ItemLabel.string = "双倍金钱";
                }
                break;
            case 3:
                this.TitleSpr.spriteFrame = this.TitleSpfArr[2];
                this.progressBar.node.active = false;
                this.ItemLayer.active = true;
                this.itemType = 0;
                this.ItemSprite.spriteFrame = this.ItemSpfArr[0];
                this.randomMoney = lib.RandomParameters.RandomParameters.getRandomInt(60,1);
                this.ItemLabel.string = "$" + this.randomMoney;
                break;
            default:
                break;
        } 
    }
    //----- 私有方法 -----//
}
