/** 分享塔界面控制 */
import * as lib from '../lib/lib';
import proControl from './PropControl';
import GameManager from '../Manager/GameManager';
import TowerControl from './TowerControl';

const {ccclass, property} = cc._decorator;

@ccclass
export default class ShareTower extends cc.Component {

    //----- 编辑器属性 -----//
    //qian塔
    @property(TowerControl) BeforeTower: TowerControl = null;
    //hou塔
    @property(TowerControl) NowTower: TowerControl = null;
    //----- 属性声明 -----//
    private color:number = 0;
    private level:number = 0;
    private bannerAd;
    //----- 生命周期 -----//

    // onLoad () {}

    start () {

    }
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

    // update (dt) {}
    //----- 按钮回调 -----//
    clickClose(){
        let info:_kits.Item.BuildInfo ={
            Level : this.level,
            Color : this.color,
        }
        lib.msgEvent.getinstance().emit(lib.msgConfig.buildTower,info);
        this.node.active = false;
    }

    clickShare(){
        let temp = lib.RandomParameters.RandomParameters.getRandomInt(lib.userInfo.getinstance().getShareInfo().relation.Tomatowar04.length);
        let shareinfo = lib.userInfo.getinstance().getShareInfo().relation.Tomatowar04[temp].shareInfoId;
        let query = "uid=" + lib.userInfo.getinstance().getuid() + "&shareId=" + lib.userInfo.getinstance().getShareInfo().relation.Tomatowar04[temp].shareId;
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
                            let info:_kits.Item.BuildInfo ={
                                Level : this.level + 2,
                                Color : this.color,
                            }
                            lib.msgEvent.getinstance().emit(lib.msgConfig.buildTower,info);
                            this.node.active = false;
                            // this.ProControl.addDoubleMoneyTime(300);
                            // this.init(0);
                    },
                (res)=>{
                    lib.wxFun.showToast("请分享到微信群哦～");
                },
                (res)=>{
                    lib.wxFun.showToast("不要连续分享到同一个群哦~");
                });
    }
    //----- 事件回调 -----//
    //----- 公有方法 -----//
    init(Color:number,level:number){
        this.color = Color;
        this.level = level;
        this.BeforeTower.initShow(Color,level);
        this.NowTower.initShow(Color,level + 2);
    }
    //----- 私有方法 -----//
}
