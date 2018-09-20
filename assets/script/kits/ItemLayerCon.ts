/** ItemLyaer控制组件 */
import * as lib from '../lib/lib';

const {ccclass, property} = cc._decorator;

@ccclass
export default class ItemLayerCon extends cc.Component {
    //----- 编辑器属性 -----//
    //单元数组
    @property([cc.Node]) itemLayers: Array<cc.Node> = [];

    //----- 属性声明 -----//
    //----- 生命周期 -----//
    onLoad () {
        lib.msgEvent.getinstance().addEvent(lib.msgConfig.stageChange,"stageChange",this);
    }

    start () {
        lib.msgEvent.getinstance().addEvent(lib.msgConfig.itemLayervibrate,"itemLayervibrate",this);
    }

    // update (dt) {}
    onDestroy(){
        lib.msgEvent.getinstance().removeEvent(lib.msgConfig.stageChange,"stageChange",this);
        lib.msgEvent.getinstance().removeEvent(lib.msgConfig.itemLayervibrate,"itemLayervibrate",this);
    }
    //----- 按钮回调 -----//
    //----- 事件回调 -----//
    //----- 公有方法 -----//
    //----- 私有方法 -----//
    private itemLayervibrate(){
        for(let i = 0; i < this.itemLayers.length ; i++)
        {
            if(this.itemLayers[i].active){
                this.itemLayers[i].getComponent(cc.Animation).play();
            }
        }
    }

    private stageChange(num){
        if(num == 0)
        {
            this.itemLayers[0].active = true;
            this.itemLayers[1].active = false;
            this.itemLayers[2].active = false;
        }
        else
        {
            this.itemLayers[0].active = false;
            this.itemLayers[1].active = true;
            this.itemLayers[2].active = true;
        }
    }
}
