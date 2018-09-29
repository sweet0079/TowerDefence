/** UI控制组件 */
import * as lib from '../lib/lib';
import RoundLabelCon from './RoundLabelControl';
import GameManager from '../Manager/GameManager';
import ShowLabelCon from './ShowLabelControl';
import ShareControl from './ShareControl';
import offLineControl from './offLineControl';

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIControl extends cc.Component {

    //----- 编辑器属性 -----//
    //金币label组件
    @property(cc.Label) Money: cc.Label = null;
    //价格label组件
    @property(cc.Label) Price: cc.Label = null;
    //舞台数Label组件
    @property(cc.Label) StageNum: cc.Label = null;
    //初始等级label组件
    @property(cc.Label) InitLevel: cc.Label = null;
    //Roundlabel组件
    @property(RoundLabelCon) RoundLabel: RoundLabelCon = null;
    //ShowLabelCon组件
    @property(ShowLabelCon) ShowLabelCon: ShowLabelCon = null;
    //Collection组件
    @property(cc.Node) Collection: cc.Node = null;
    //齿轮
    @property(cc.Node) Chilun: cc.Node = null;
    //Share
    @property(ShareControl) Share: ShareControl = null;
    //offLine
    @property(offLineControl) offLine: offLineControl = null;
    //----- 属性声明 -----//
    // private activeLevelNodeArr:Array<cc.Node> = [];
    //----- 生命周期 -----//
    onLoad () {
        lib.msgEvent.getinstance().addEvent(lib.msgConfig.stageChange,"stageChange",this);
        lib.msgEvent.getinstance().addEvent(lib.msgConfig.showOffLine,"showOffLine",this);
    }

    start () {
        lib.msgEvent.getinstance().addEvent(lib.msgConfig.addmoney,"showMoney",this);
        lib.msgEvent.getinstance().addEvent(lib.msgConfig.showGroupLabel,"showGroupNum",this);
        lib.msgEvent.getinstance().addEvent(lib.msgConfig.showRoundLabel,"showRoundLabel",this);
        lib.msgEvent.getinstance().addEvent(lib.msgConfig.showFailLabel,"showFailLabel",this);
        lib.msgEvent.getinstance().addEvent(lib.msgConfig.levelUp,"ShowlevelUp",this);
        lib.msgEvent.getinstance().addEvent(lib.msgConfig.showChilun,"showChilun",this);
        lib.msgEvent.getinstance().addEvent(lib.msgConfig.hideChilun,"hideChilun",this);
        lib.msgEvent.getinstance().addEvent(lib.msgConfig.gameover,"GameOverShowShare",this);
        this.showMoney(GameManager.getinstance().getMoney());
    }

    onDestroy(){
        lib.msgEvent.getinstance().removeEvent(lib.msgConfig.addmoney,"showMoney",this);
        lib.msgEvent.getinstance().removeEvent(lib.msgConfig.showGroupLabel,"showGroupNum",this);
        lib.msgEvent.getinstance().removeEvent(lib.msgConfig.showRoundLabel,"showRoundLabel",this);
        lib.msgEvent.getinstance().removeEvent(lib.msgConfig.showFailLabel,"showFailLabel",this);
        lib.msgEvent.getinstance().removeEvent(lib.msgConfig.stageChange,"stageChange",this);
        lib.msgEvent.getinstance().removeEvent(lib.msgConfig.levelUp,"ShowlevelUp",this);
        lib.msgEvent.getinstance().removeEvent(lib.msgConfig.showChilun,"showChilun",this);
        lib.msgEvent.getinstance().removeEvent(lib.msgConfig.hideChilun,"hideChilun",this);
        lib.msgEvent.getinstance().removeEvent(lib.msgConfig.gameover,"GameOverShowShare",this);
        lib.msgEvent.getinstance().removeEvent(lib.msgConfig.showOffLine,"showOffLine",this);
    }
    //----- 按钮回调 -----//
    clickCollection(){
        this.Collection.active = true;
    }

    closeCollection(){
        this.Collection.active = false;
    }

    clickShare(event, customEventData){
        let temp = parseInt(customEventData);
        this.Share.node.active = true;
        this.Share.init(temp);
    }

    clickTreausre(){
        this.ShowLabelCon.playTreausre();
    }
    //----- 事件回调 -----//
    showOffLine(){
        this.offLine.node.active = true;
    }

    GameOverShowShare(){
        this.Share.node.active = true;
        this.Share.init(2);
    }

    showChilun(){
        this.Chilun.active = true;
    }

    hideChilun(){
        this.Chilun.active = false;
    }

    ShowlevelUp(){
        this.ShowLabelCon.playTreausre();
    }

    showFailLabel(){
        this.ShowLabelCon.Fail();
    }

    showRoundLabel(num:number){
        this.ShowLabelCon.playRoundNum(num);
        this.RoundLabel.showBossExpAni();
    }

    showGroupNum(num:number){
        this.ShowLabelCon.playGroupNum(num);
    }
    //----- 公有方法 -----//
    showMoney(Num:number){
        this.Money.string = "/" + Num.toString();
        this.Money.getComponent(cc.Animation).play();
    }

    showprice(Num:number){
        this.Price.string = "/" + Num.toString();
    }

    showInitLevel(Num:number){
        this.InitLevel.string = Num.toString();
    }

    showLevel(Num:number,totalRound:number,isShowAni:boolean = true){
        let level = this.RoundLabel.showLevel(Num,totalRound,isShowAni);
        return level;
    }
    //----- 私有方法 -----//
    private stageChange(num:number){
        this.StageNum.string = (num + 1).toString();
        if(num == 0)
        {
            this.Price.node.parent.setPosition(0,-177);
            this.Money.node.setPosition(0,-252);
        }
        else
        {
            this.Price.node.parent.setPosition(160,-263);
            this.Money.node.setPosition(160,-180);
        }
    }
}
