/** 关卡相关控制组件 */
import itemsCon from './itemsCon'
import JsonManager from '../Manager/JsonReaderManager'

const {ccclass, property} = cc._decorator;

@ccclass
export default class LevelControl extends cc.Component {

    //----- 编辑器属性 -----//
    //防御塔预制体
    @property(itemsCon) itemsControl: itemsCon = null;
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
    }
}
