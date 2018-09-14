/** 垃圾桶控制组件 */
import * as lib from '../lib/lib'

const {ccclass, property} = cc._decorator;

@ccclass
export default class RubbishControl extends cc.Component {

    //----- 编辑器属性 -----//
    //----- 属性声明 -----//
    //----- 生命周期 -----//

    // onLoad () {}

    start () {
        lib.msgEvent.getinstance().addEvent(lib.msgConfig.showrubbish,"ShowRubbish",this);
        lib.msgEvent.getinstance().addEvent(lib.msgConfig.hiderubbish,"hideRubbish",this);
    }

    onDestroy(){
        lib.msgEvent.getinstance().removeEvent(lib.msgConfig.showrubbish,"ShowRubbish",this);
        lib.msgEvent.getinstance().removeEvent(lib.msgConfig.hiderubbish,"hideRubbish",this);
    }
    // update (dt) {}
    //----- 公有方法 -----//
    ShowRubbish(){
        this.node.opacity = 255;
    }

    hideRubbish(){
        this.node.opacity = 120;
    }
    //----- 私有方法 -----//
}
