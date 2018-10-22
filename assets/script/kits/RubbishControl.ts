/** 垃圾桶控制组件 */
import * as lib from '../lib/lib'

const {ccclass, property} = cc._decorator;

@ccclass
export default class RubbishControl extends cc.Component {

    //----- 编辑器属性 -----//
    //----- 属性声明 -----//
    //----- 生命周期 -----//

    onLoad () {
        lib.msgEvent.getinstance().addEvent(lib.msgConfig.stageChange,"stageChange",this);
    }

    start () {
        lib.msgEvent.getinstance().addEvent(lib.msgConfig.showrubbish,"ShowRubbish",this);
        lib.msgEvent.getinstance().addEvent(lib.msgConfig.hiderubbish,"hideRubbish",this);
    }

    onDestroy(){
        lib.msgEvent.getinstance().removeEvent(lib.msgConfig.showrubbish,"ShowRubbish",this);
        lib.msgEvent.getinstance().removeEvent(lib.msgConfig.hiderubbish,"hideRubbish",this);
        lib.msgEvent.getinstance().removeEvent(lib.msgConfig.stageChange,"stageChange",this);
    }
    // update (dt) {}
    //----- 公有方法 -----//
    ShowRubbish(){
        this.node.opacity = 255;
        this.node.scale = 1.3;
    }

    hideRubbish(){
        this.node.opacity = 120;
        this.node.scale = 1;
    }
    //----- 私有方法 -----//
    private stageChange(num){
        if(num == 0)
        {
            this.node.setPosition(-265,-430);
        }
        else
        {
            this.node.setPosition(-285,378);
        }
    }
}
