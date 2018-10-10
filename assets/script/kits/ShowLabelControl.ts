/** 过关时的动画的控制组件 */
import * as lib from '../lib/lib';
import CardControl from './CardControl';
import PropManager from '../Manager/PropManager';
import GameManager from '../Manager/GameManager';

const {ccclass, property} = cc._decorator;

@ccclass
export default class ShowLabelControl extends cc.Component {

    //----- 编辑器属性 -----//
    //Group数字Animation组件
    @property(cc.Animation) GroupLabel: cc.Animation = null;
    //Group数字Sprite组件
    @property(cc.Sprite) GroupNum: cc.Sprite = null;
    //Group数字图集
    @property([cc.SpriteFrame]) GroupNumSpfArr: Array<cc.SpriteFrame> = [];
    //Round数字Node组件
    @property(cc.Node) RoundNode: cc.Node = null;
    //Round数字Sprite组件
    @property(cc.Sprite) RoundLabel: cc.Sprite = null;
    //Round数字Animation组件
    @property(cc.Animation) RoundAnimation: cc.Animation = null;
    //Round数字图集
    @property([cc.SpriteFrame]) RoundNumSpfArr: Array<cc.SpriteFrame> = [];
    //失败Animation组件
    @property(cc.Animation) FailAnimation: cc.Animation = null;
    //宝箱组件
    @property(cc.Animation) Treasure: cc.Animation = null;
    //卡牌动画组件
    @property(cc.Animation) CardAni: cc.Animation = null;
    //宝箱按钮组件
    @property(cc.Button) CardBtn: cc.Button = null;
    //stageAni
    @property(cc.Animation) stageAni: cc.Animation = null;
    //doubleMoney
    @property(cc.Animation) doubleMoneyAni: cc.Animation = null;
    //----- 属性声明 -----//
    
    //----- 生命周期 -----//
    // onLoad () {}

    start () {
        lib.msgEvent.getinstance().addEvent(lib.msgConfig.showStageAni,"showStageAni",this);
        lib.msgEvent.getinstance().addEvent(lib.msgConfig.showDoubleMoeny,"showDoubleMoeny",this);
        lib.msgEvent.getinstance().addEvent(lib.msgConfig.hideDoubleMoeny,"hideDoubleMoeny",this);
        this.RoundAnimation.on('finished',this.hideRoundNode,this);
        this.FailAnimation.on('finished',this.hideFailNode,this);
        this.stageAni.on('finished',this.hidestageAni,this);
    }

    // update (dt) {}

    onDestroy(){
        this.RoundAnimation.off('finished',this.hideRoundNode,this);
        this.FailAnimation.off('finished',this.hideFailNode,this);
        this.stageAni.off('finished',this.hidestageAni,this);
        lib.msgEvent.getinstance().removeEvent(lib.msgConfig.showStageAni,"showStageAni",this);
        lib.msgEvent.getinstance().removeEvent(lib.msgConfig.showDoubleMoeny,"showDoubleMoeny",this);
        lib.msgEvent.getinstance().removeEvent(lib.msgConfig.hideDoubleMoeny,"hideDoubleMoeny",this);
    }
    //----- 按钮回调 -----//
    clickShare(){
        if(lib.userInfo.getinstance().getisLegal())
        {
            lib.wxFun.showToast("功能暂未开放！");
        }
        else
        {
            let temp = lib.RandomParameters.RandomParameters.getRandomInt(lib.userInfo.getinstance().getShareInfo().relation.Tomatowar03.length);
            let shareinfo = lib.userInfo.getinstance().getShareInfo().relation.Tomatowar03[temp].shareInfoId;
            let query = "uid=" + lib.userInfo.getinstance().getuid() + "&shareId=" + lib.userInfo.getinstance().getShareInfo().relation.Tomatowar03[temp].shareId;
            // lib.wxFun.shareAppMessage(lib.userInfo.getinstance().getShareInfo().shareInfo[shareinfo].content,
            //                             lib.userInfo.getinstance().getShareInfo().shareInfo[shareinfo].img_url,query,
            //     (res)=>{
            //         if (res.shareTickets != undefined)
            //         {
            //             let url = "https://click.xyx.bkdau.cn/share/" + lib.userInfo.getinstance().getappID() + "/" + lib.userInfo.getinstance().getShareInfo().relation.Tomatowar03[temp].shareId;
            //             lib.httpRequest.getinstance().send(url);
            //             this.playTreausre();
            //         }
            //         else
            //         {
            //             lib.wxFun.showToast("请分享到微信群哦～");
            //         }
            //     });
            lib.wxFun.shareApp({title:lib.userInfo.getinstance().getShareInfo().shareInfo[shareinfo].content,
                imageUrl:lib.userInfo.getinstance().getShareInfo().shareInfo[shareinfo].img_url,query: query},
                        (res)=>{
                            let url = "https://click.xyx.bkdau.cn/share/" + lib.userInfo.getinstance().getappID() + "/" + lib.userInfo.getinstance().getShareInfo().relation.Tomatowar03[temp].shareId;
                            lib.httpRequest.getinstance().send(url);
                            this.playTreausre();
                        },
                    (res)=>{
                        lib.wxFun.showToast("请分享到微信群哦～");
                    },
                    (res)=>{
                        lib.wxFun.showToast("不要连续分享到同一个群哦~");
                    });
        }
    }

    ClickCardBtn(){
        this.Treasure.node.parent.active = false;
    }
    //----- 公有方法 -----//
    hideDoubleMoeny(){
        this.doubleMoneyAni.node.active = false;
    }

    showDoubleMoeny(){
        this.doubleMoneyAni.node.active = true;
        this.doubleMoneyAni.play();
    }

    showStageAni(){
        this.stageAni.node.active = true;
        this.stageAni.play();
    }

    playTreausre(){
        let percent = lib.RandomParameters.RandomParameters.getRandomInt(100);
        let temp = 0;
        if(percent < 0)
        {
            temp = lib.defConfig.CardTypeEnum.money;
        }
        else if(percent < 10)
        {
            temp = lib.defConfig.CardTypeEnum.autoCompose;
        }
        else if(percent < 60)
        {
            temp = lib.defConfig.CardTypeEnum.initTower;
        }
        else
        {
            temp = lib.defConfig.CardTypeEnum.extralItem;
        }
        this.getTreasure(temp);
        this.CardAni.node.getComponent(CardControl).init(temp);
        this.CardAni.node.scale = 0;
        this.CardBtn.node.active = false;
        // this.Treasure.setToSetupPose();
        // this.Treasure.setAnimation(0,"animation",false);
        this.Treasure.play();
        this.scheduleOnce(this.TreasureEnd,0.8);
        this.Treasure.node.parent.active = true;
    }

    playGroupNum(num)
    {
        this.GroupNum.spriteFrame = this.GroupNumSpfArr[num];
        this.GroupLabel.play();
    }

    playRoundNum(num)
    {
        this.RoundLabel.spriteFrame = this.RoundNumSpfArr[num];
        this.RoundAnimation.play();
        this.RoundNode.active = true;
    }

    Fail(){
        this.FailAnimation.node.active = true;
        this.FailAnimation.play();
        lib.wxFun.vibrateShort();
    }
    //----- 私有方法 -----//
    private getTreasure(type:number){
        switch(type)
        {
            case lib.defConfig.CardTypeEnum.initTower:
                PropManager.getinstance().addInitalTowerlFragment(1);
                break;
            case lib.defConfig.CardTypeEnum.extralItem:
                PropManager.getinstance().addExtralItemFragment(1);
                break;
            case lib.defConfig.CardTypeEnum.autoCompose:
                lib.msgEvent.getinstance().emit(lib.msgConfig.addComposeTime,300);
                break;
            case lib.defConfig.CardTypeEnum.money:
                GameManager.getinstance().addMoney(120);
                break;
            default:
                break;
        }
    }

    private TreasureEnd(){
        this.CardAni.play();
        this.CardBtn.node.active = true;
    }

    private hideRoundNode(){
        this.RoundNode.active = false;
    }
    private hideFailNode(){
        this.FailAnimation.node.active = false;
    }
    private hidestageAni(){
        this.stageAni.node.active = false;
    }
}
