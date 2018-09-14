/** 关卡相关控制组件 */
import * as lib from '../lib/lib'
import itemsCon from './itemsCon'
import slotsCon from './slotsCon'
import enemysCon from './enemysCon'
import uiCon from './UIControl'
import JsonManager from '../Manager/JsonReaderManager'
import GameManager from '../Manager/GameManager';

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
        lib.msgEvent.getinstance().addEvent(lib.msgConfig.nextlevel,"nextlevel",this);
    }
    start () {
        this.setlevel(0);
    }

    onDestroy(){
        lib.msgEvent.getinstance().removeEvent(lib.msgConfig.nextlevel,"nextlevel",this);
    }
    //----- 按钮回调 -----//
    //----- 事件回调 -----//
    private nextlevel(num){
        console.log("nextlevel");
        this.setlevel(num);
    }
    //----- 公有方法 -----//
    //----- 私有方法 -----//
    private setlevel(num){
        console.log("setlevel");
        if(num >= JsonManager.getinstance().getLevelobj().length - 1)
        {
            num = JsonManager.getinstance().getLevelobj().length - 1;
        }
        this.itemsControl.setAct(parseInt(JsonManager.getinstance().getLevelobj()[num].Upgrade));
        this.itemsControl.setprice(parseInt(JsonManager.getinstance().getLevelobj()[num].TowerGold));
        this.itemsControl.setinital(parseInt(JsonManager.getinstance().getLevelobj()[num].initial));
        this.slotsControl.setAct(parseInt(JsonManager.getinstance().getLevelobj()[num].TowerQuantity));
        this.enemysControl.startCreate(parseInt(JsonManager.getinstance().getLevelobj()[num].Quantity),
                                        parseInt(JsonManager.getinstance().getLevelobj()[num].GetGold),
                                        parseInt(JsonManager.getinstance().getLevelobj()[num].HP)
                                        ,parseInt(JsonManager.getinstance().getLevelobj()[num].monsterID));
        this.uiControl.showLevel(parseInt(JsonManager.getinstance().getLevelobj()[num].stage1),3);
    }
}
