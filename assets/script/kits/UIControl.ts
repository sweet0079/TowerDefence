/** UI控制组件 */
import * as lib from '../lib/lib'
import RoundLabelCon from './RoundLabelControl'
import GameManager from '../Manager/GameManager';

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
    //----- 属性声明 -----//
    // private activeLevelNodeArr:Array<cc.Node> = [];
    //----- 生命周期 -----//
    start () {
        lib.msgEvent.getinstance().addEvent(lib.msgConfig.addmoney,"showMoney",this);
        this.showMoney(GameManager.getinstance().getMoney());
    }

    onDestroy(){
        lib.msgEvent.getinstance().removeEvent(lib.msgConfig.addmoney,"showMoney",this);
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
        let level = this.RoundLabel.showLevel(Num,totalRound);
        return level;
    }
    //----- 私有方法 -----//
}
