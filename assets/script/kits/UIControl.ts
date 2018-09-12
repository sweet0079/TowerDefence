/** UI控制组件 */
import * as lib from '../lib/lib'
import GameManager from '../Manager/GameManager';

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIControl extends cc.Component {

    //----- 编辑器属性 -----//
    //金币label组件
    @property(cc.Label) Money: cc.Label = null;
    //----- 属性声明 -----//
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
    //----- 私有方法 -----//
}
