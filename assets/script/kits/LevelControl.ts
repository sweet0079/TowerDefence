/** 关卡相关控制组件 */
import itemsCon from './itemsCon'
import slotsCon from './slotsCon'
import enemysCon from './enemysCon'
import uiCon from './UIControl'
import JsonManager from '../Manager/JsonReaderManager'

const {ccclass, property} = cc._decorator;

@ccclass
export default class LevelControl extends cc.Component {

    //----- 编辑器属性 -----//
    //合成槽控制组件
    @property(itemsCon) itemsControl: itemsCon = null;
    //攻击槽控制组件
    @property(slotsCon) slotsControl: slotsCon = null;
    //敌人控制组件
    @property(enemysCon) enemysControl: enemysCon = null;
    //UI控制组件
    @property(uiCon) uiControl: uiCon = null;
    //----- 属性声明 -----//
    //----- 生命周期 -----//
    onLoad () {
        //读取相关json
        JsonManager.getinstance();
    }
    start () {
        this.setlevel();
    }
    //----- 按钮回调 -----//
    //----- 事件回调 -----//
    //----- 公有方法 -----//
    //----- 私有方法 -----//
    private setlevel(){
        this.itemsControl.setAct(parseInt(JsonManager.getinstance().getLevelobj()[0].Upgrade));
        this.itemsControl.setprice(parseInt(JsonManager.getinstance().getLevelobj()[0].TowerGold));
        this.itemsControl.setinital(parseInt(JsonManager.getinstance().getLevelobj()[0].initial));
        this.slotsControl.setAct(parseInt(JsonManager.getinstance().getLevelobj()[0].TowerQuantity));
        this.enemysControl.startCreate(parseInt(JsonManager.getinstance().getLevelobj()[0].Quantity),
                                        parseInt(JsonManager.getinstance().getLevelobj()[0].GetGold),
                                        parseInt(JsonManager.getinstance().getLevelobj()[0].HP)
                                        ,parseInt(JsonManager.getinstance().getLevelobj()[0].monsterID));
        this.uiControl.showLevel(parseInt(JsonManager.getinstance().getLevelobj()[0].stage1),3);
    }
}
