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
    @property(sp.Skeleton) Treasure: sp.Skeleton = null;
    //卡牌动画组件
    @property(cc.Animation) CardAni: cc.Animation = null;
    //宝箱按钮组件
    @property(cc.Button) CardBtn: cc.Button = null;
    //----- 属性声明 -----//
    
    //----- 生命周期 -----//
    // onLoad () {}

    start () {
        this.RoundAnimation.on('finished',this.hideRoundNode,this);
        this.FailAnimation.on('finished',this.hideFailNode,this);
    }

    // update (dt) {}

    onDestroy(){
        this.RoundAnimation.off('finished',this.hideRoundNode,this);
        this.FailAnimation.off('finished',this.hideFailNode,this);
    }
    //----- 按钮回调 -----//
    ClickCardBtn(){
        this.Treasure.node.parent.active = false;
    }
    //----- 公有方法 -----//
    playTreausre(){
        let percent = lib.RandomParameters.RandomParameters.getRandomInt(100);
        let temp = 0;
        if(percent < 19)
        {
            temp = lib.defConfig.CardTypeEnum.money;
        }
        else if(percent < 32)
        {
            temp = lib.defConfig.CardTypeEnum.autoCompose;
        }
        else if(percent < 66)
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
        this.Treasure.setAnimation(0,"animation",false);
        this.scheduleOnce(this.TreasureEnd,3);
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
}
