/** 获得宝箱界面 */
import * as lib from '../lib/lib';

const {ccclass, property} = cc._decorator;

@ccclass
export default class getBoxLayer extends cc.Component {

    //----- 编辑器属性 -----//
    //标题
    @property(cc.Label) title: cc.Label = null;
    //----- 属性声明 -----//
    //----- 生命周期 -----//

    // onLoad () {}

    // start () {

    // }

    // update (dt) {}
    //----- 按钮回调 -----//
    cilckOk(){
        lib.msgEvent.getinstance().emit(lib.msgConfig.playTreausre);
        this.node.destroy();
    }
    //----- 事件回调 -----//
    init(type:number){
        switch(type)
        {
            case 0:
                this.title.string = "升级!";
                break;
            case 1:
                this.title.string = "免费!";
                break;
            case 2:
                this.title.string = "打败BOSS!";
                break;
            default:
                break;
        }
    }
    //----- 公有方法 -----//
    //----- 私有方法 -----//
}
