/** UI控制组件 */
import * as lib from '../lib/lib';
import RoundLabelCon from './RoundLabelControl';
import GameManager from '../Manager/GameManager';
import ShowLabelCon from './ShowLabelControl';

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIControl extends cc.Component {

    //----- 编辑器属性 -----//
    //金币label组件
    @property(cc.Label) Money: cc.Label = null;
    //价格label组件
    @property(cc.Label) Price: cc.Label = null;
    //Roundlabel组件
    @property(RoundLabelCon) RoundLabel: RoundLabelCon = null;
    //ShowLabelCon组件
    @property(ShowLabelCon) ShowLabelCon: ShowLabelCon = null;
    //----- 属性声明 -----//
    // private activeLevelNodeArr:Array<cc.Node> = [];
    //----- 生命周期 -----//
    onLoad () {
        lib.msgEvent.getinstance().addEvent(lib.msgConfig.stageChange,"stageChange",this);
    }

    start () {
        lib.msgEvent.getinstance().addEvent(lib.msgConfig.addmoney,"showMoney",this);
        lib.msgEvent.getinstance().addEvent(lib.msgConfig.showGroupLabel,"showGroupNum",this);
        lib.msgEvent.getinstance().addEvent(lib.msgConfig.showRoundLabel,"showRoundLabel",this);
        lib.msgEvent.getinstance().addEvent(lib.msgConfig.showFailLabel,"showFailLabel",this);
        this.showMoney(GameManager.getinstance().getMoney());
    }

    onDestroy(){
        lib.msgEvent.getinstance().removeEvent(lib.msgConfig.addmoney,"showMoney",this);
        lib.msgEvent.getinstance().removeEvent(lib.msgConfig.showGroupLabel,"showGroupNum",this);
        lib.msgEvent.getinstance().removeEvent(lib.msgConfig.showRoundLabel,"showRoundLabel",this);
        lib.msgEvent.getinstance().removeEvent(lib.msgConfig.showFailLabel,"showFailLabel",this);
        lib.msgEvent.getinstance().removeEvent(lib.msgConfig.stageChange,"stageChange",this);
    }
    //----- 按钮回调 -----//
    //----- 事件回调 -----//
    showFailLabel(){
        this.ShowLabelCon.Fail();
    }

    showRoundLabel(num:number){
        this.ShowLabelCon.playRoundNum(num);
    }

    showGroupNum(num:number){
        this.ShowLabelCon.playGroupNum(num);
    }
    //----- 公有方法 -----//
    showMoney(Num:number){
        this.Money.string = Num.toString();
    }

    showprice(Num:number){
        this.Price.string = "创建塔:$" + Num.toString();
    }

    showLevel(Num:number,totalRound:number,isShowAni:boolean = true){
        let level = this.RoundLabel.showLevel(Num,totalRound,isShowAni);
        return level;
    }
    //----- 私有方法 -----//
    private stageChange(num){
        if(num == 0)
        {
            this.Price.node.parent.setPosition(0,-177);
        }
        else
        {
            this.Price.node.parent.setPosition(0,-177);
        }
    }
}
