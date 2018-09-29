/** 离线界面控制组件 */
import * as lib from '../lib/lib';
import GameManager from '../Manager/GameManager';

const {ccclass, property} = cc._decorator;

@ccclass
export default class offLineControl extends cc.Component {

    //----- 编辑器属性 -----//
    //金币label组件
    @property(cc.Label) MoneyLabel: cc.Label = null;
    //----- 属性声明 -----//
    private money: number = 0;
    //----- 生命周期 -----//

    // onLoad () {}

    // start () {

    // }

    onEnable(){
        this.init();
    }
    // update (dt) {}
    //----- 按钮回调 -----//
    Clickclose(){
        GameManager.getinstance().addMoney(this.money);
        this.close();
    }

    ClickShare(){
        if(lib.userInfo.getinstance().getisLegal())
        {
            lib.wxFun.showToast("功能暂未开放！");
        }
        else
        {
            let temp = lib.RandomParameters.RandomParameters.getRandomInt(lib.userInfo.getinstance().getShareInfo().relation.Tomatowar05.length);
            let shareinfo = lib.userInfo.getinstance().getShareInfo().relation.Tomatowar05[temp].shareInfoId;
            let query = "uid=" + lib.userInfo.getinstance().getuid() + "&shareId=" + lib.userInfo.getinstance().getShareInfo().relation.Tomatowar05[temp].shareId;
            lib.wxFun.shareAppMessage(lib.userInfo.getinstance().getShareInfo().shareInfo[shareinfo].content,
                                        lib.userInfo.getinstance().getShareInfo().shareInfo[shareinfo].img_url,query,
                (res)=>{
                    if (res.shareTickets != undefined)
                    { 
                        let url = "https://click.xyx.bkdau.cn/share/" + lib.userInfo.getinstance().getappID() + "/" + lib.userInfo.getinstance().getShareInfo().relation.Tomatowar05[temp].shareId;
                        lib.httpRequest.getinstance().send(url);
                        GameManager.getinstance().addMoney(this.money * 2);
                        this.close();
                    }
                    else
                    {
                        lib.wxFun.showToast("请分享到微信群哦～");
                    }
                });
        }
    }
    //----- 事件回调 -----//
    //----- 公有方法 -----//
    init(){
        this.money = (GameManager.getinstance().getLevel() + 1) * 40;
        this.MoneyLabel.string = "/" + this.money.toString();
    }
    //----- 私有方法 -----//
    private close(){
        lib.msgEvent.getinstance().emit(lib.msgConfig.gamestart);
        this.node.active = false;
    }   
}
