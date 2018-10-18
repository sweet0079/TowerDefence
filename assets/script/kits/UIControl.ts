/** UI控制组件 */
import * as lib from '../lib/lib';
import RoundLabelCon from './RoundLabelControl';
import GameManager from '../Manager/GameManager';
import ShowLabelCon from './ShowLabelControl';
import ShareControl from './ShareControl';
import offLineControl from './offLineControl';
import ShareTower from './ShareTower';
import getBoxLayer from './getBoxLayer';
import CollectionControl from './CollectionControl';

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
    //offLine
    @property(ShareTower) ShareTowerLayer: ShareTower = null;
    //获得宝箱层
    @property(cc.Node) GetBoxLayerParent: cc.Node = null;
    //获得宝箱预制体
    @property(cc.Prefab) GetBoxLayerPfb: cc.Prefab = null;
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
        lib.msgEvent.getinstance().addEvent(lib.msgConfig.playTreausre,"playTreausre",this);
        lib.msgEvent.getinstance().addEvent(lib.msgConfig.getBossTreasure,"getBossTreasure",this);
        lib.msgEvent.getinstance().addEvent(lib.msgConfig.showDetailCard,"showDetailCardLayer",this);
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
        lib.msgEvent.getinstance().removeEvent(lib.msgConfig.playTreausre,"playTreausre",this);
        lib.msgEvent.getinstance().removeEvent(lib.msgConfig.getBossTreasure,"getBossTreasure",this);
        lib.msgEvent.getinstance().removeEvent(lib.msgConfig.showDetailCard,"showDetailCardLayer",this);
    }
    //----- 按钮回调 -----//
    clickCollection(){
        lib.msgEvent.getinstance().emit(lib.msgConfig.micUIClick);
        this.Collection.active = true;
    }

    closeCollection(){
        this.Collection.active = false;
    }

    clickShare(event, customEventData){
        lib.msgEvent.getinstance().emit(lib.msgConfig.micUIClick);
        let temp = parseInt(customEventData);
        this.Share.node.active = true;
        this.Share.init(temp);
    }

    clickTreausre(type:number){
        lib.msgEvent.getinstance().emit(lib.msgConfig.micUIClick);
        let box = cc.instantiate(this.GetBoxLayerPfb);
        box.getComponent(getBoxLayer).init(type);
        this.GetBoxLayerParent.addChild(box);
        // this.ShowLabelCon.playTreausre();
    }
    //----- 事件回调 -----//
    showDetailCardLayer(type){
        this.Collection.active = true;
        this.Collection.getComponent(CollectionControl).showDetailCardLayer(type);
    }

    getBossTreasure(){
        let box = cc.instantiate(this.GetBoxLayerPfb);
        box.getComponent(getBoxLayer).init(2);
        this.GetBoxLayerParent.addChild(box);
    }

    playTreausre(){
        this.ShowLabelCon.playTreausre();
    }

    showShareTowerLayer(level:number,color:number){
        this.ShareTowerLayer.init(color,level);
        this.ShareTowerLayer.node.active = true;
    }

    showOffLine(num:number){
        this.offLine.node.active = true;
        this.offLine.init(num);
    }

    moneyNotEnough(){
        this.ShowLabelCon.PlaymoneyNotEnough(()=>{
            this.Share.node.active = true;
            this.Share.init(3);
        });
    }

    GameOverShowShare(){
        this.scheduleOnce(()=>{
            this.Share.node.active = true;
            this.Share.init(2);
        },1.7);
    }

    showChilun(){
        this.Chilun.active = true;
    }

    hideChilun(){
        this.Chilun.active = false;
    }

    ShowlevelUp(){
        let box = cc.instantiate(this.GetBoxLayerPfb);
        box.getComponent(getBoxLayer).init(0);
        this.GetBoxLayerParent.addChild(box);
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
            this.Price.node.parent.setPosition(0,-210);
            this.Money.node.setPosition(0,-285);
        }
        else
        {
            this.Price.node.parent.setPosition(160,-215);
            this.Money.node.setPosition(160,-140);
        }
    }
}
