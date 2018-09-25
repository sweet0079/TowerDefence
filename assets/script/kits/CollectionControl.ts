/** 过关时的动画的控制组件 */
import * as lib from '../lib/lib';
import CardControl from './CardControl';
import GameManager from '../Manager/GameManager';
import detailControl from './DetailControl';

const {ccclass, property} = cc._decorator;

@ccclass
export default class CollectionControl extends cc.Component {

    //----- 编辑器属性 -----//
    //卡牌动画组件
    @property([CardControl]) CardArr: Array<CardControl> = [];
    //金钱数字
    @property(cc.Label) MoneyLabel: cc.Label = null;
    //细节界面
    @property(detailControl) detailLayer: detailControl = null;
    //全面界面
    @property(cc.Node) AllCardLayer: cc.Node = null;
    //----- 属性声明 -----//
    
    //----- 生命周期 -----//
    // onLoad () {}

    // start () {  }

    onEnable(){
        this.CardArr[0].init(lib.defConfig.CardTypeEnum.initTower);
        this.CardArr[1].init(lib.defConfig.CardTypeEnum.extralItem);
        this.MoneyLabel.string = GameManager.getinstance().getMoney().toString();
        this.detailLayer.node.active = false;
        this.AllCardLayer.active = true;
    }

    // update (dt) {}

    // onDestroy(){ }
    //----- 按钮回调 -----//
    private clickCard(event, customEventData){
        let temp = parseInt(customEventData);
        this.detailLayer.node.active = true;
        this.AllCardLayer.active = false;
        this.detailLayer.init(temp);
    }

    private clickDetailClose(event, customEventData){
        this.CardArr[0].init(lib.defConfig.CardTypeEnum.initTower);
        this.CardArr[1].init(lib.defConfig.CardTypeEnum.extralItem);
        this.MoneyLabel.string = GameManager.getinstance().getMoney().toString();
        this.detailLayer.node.active = false;
        this.AllCardLayer.active = true;
    }
    //----- 公有方法 -----//
    //----- 私有方法 -----//
}
