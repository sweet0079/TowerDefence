/** 道具管理控制组件 */
import PropManager from '../Manager/PropManager';

const {ccclass, property} = cc._decorator;

@ccclass
export default class PropControl extends cc.Component {

    //----- 编辑器属性 -----//
    //----- 属性声明 -----//
    //----- 生命周期 -----//
    // onLoad () {}

    start () {
        PropManager.getinstance();
    }

    // update (dt) {}
    //----- 按钮回调 -----//
    //----- 事件回调 -----//
    //----- 公有方法 -----//
    //----- 私有方法 -----//
}
