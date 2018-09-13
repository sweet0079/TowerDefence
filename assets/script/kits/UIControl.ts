/** UI控制组件 */
import * as lib from '../lib/lib'
import GameManager from '../Manager/GameManager';

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIControl extends cc.Component {

    //----- 编辑器属性 -----//
    //金币label组件
    @property(cc.Label) Money: cc.Label = null;
    //价格label组件
    @property(cc.Label) Price: cc.Label = null;
    //关卡数label节点
    @property(cc.Label) levelLabel: cc.Label = null;
    //levelBackNode节点
    @property(cc.Node) levelBackNode: cc.Node = null;
    //关卡点组件
    @property([cc.Node]) levelnodeArr: Array<cc.Node> = [];
    //关卡点未完成图片
    @property(cc.SpriteFrame) levelUnfinishedSpf: cc.SpriteFrame = null;
    //关卡点完成图片
    @property(cc.SpriteFrame) levelFinishedSpf: cc.SpriteFrame = null;
    //关卡点进行中图片
    @property(cc.SpriteFrame) levelDoingSpf: cc.SpriteFrame = null;
    //----- 属性声明 -----//
    private activeLevelNodeArr:Array<cc.Node> = [];
    //----- 生命周期 -----//
    start () {
        lib.msgEvent.getinstance().addEvent(lib.msgConfig.addmoney,"showMoney",this);
        this.showMoney(GameManager.getinstance().getMoney());
    }
    //----- 按钮回调 -----//
    //----- 事件回调 -----//
    //----- 公有方法 -----//
    showMoney(Num:number){
        this.Money.string = Num.toString();
    }

    showprice(Num:number){
        this.Price.string = "创建塔:$" + Num.toString();
    }

    showLevel(Num:number,totalRound:number){
        let level:number = parseInt((Num / 10000).toString());
        let round:number = parseInt((Num % 10000).toString());
        this.setact(totalRound);
        let act;
        this.levelBackNode
        for(let i = 0 ; i < this.activeLevelNodeArr.length; i++)
        {
            if(i < round - 1)
            {
                this.activeLevelNodeArr[i].getComponent(cc.Sprite).spriteFrame = this.levelFinishedSpf;
            }
            else if(i == round - 1)
            {
                act = cc.moveTo(0.5,this.activeLevelNodeArr[i].getPosition().x,1);
                this.activeLevelNodeArr[i].getComponent(cc.Sprite).spriteFrame = this.levelDoingSpf;
            }
            else
            {
                this.activeLevelNodeArr[i].getComponent(cc.Sprite).spriteFrame = this.levelUnfinishedSpf;
            }
        }
        if(act)
        {
            this.levelBackNode.runAction(act);
        }
        this.levelLabel.string = "ROUND" + round + "/8";
    }
    //----- 私有方法 -----//
    private setact(num:number){
        this.activeLevelNodeArr = [];
        for(let i = this.levelnodeArr.length - 1; i >= 0; i--)
        {
            if(i < this.levelnodeArr.length - num)
            {
                this.levelnodeArr[i].active = false;
            }
            else
            {
                this.levelnodeArr[i].active = true;
            }
        }
        for(let i = 0 ; i < this.levelnodeArr.length; i++)
        {
            if(this.levelnodeArr[i].active)
            {
                this.activeLevelNodeArr.push(this.levelnodeArr[i]);
            }
        }
    }
}
