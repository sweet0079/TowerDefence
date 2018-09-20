/** 加钱数字组件 */
import * as lib from '../lib/lib';
import nodePool from '../Manager/NodePoolInstance'

const {ccclass, property} = cc._decorator;

@ccclass
export default class AddMoneyCon extends cc.Component {

    //----- 编辑器属性 -----//
    //金币数Label节点
    @property(cc.Label) MoenyLabel: cc.Label = null;
    //----- 属性声明 -----//
    private _animation:cc.Animation = null;
    //----- 生命周期 -----//

    // onLoad () {}

    onLoad() {
        this._animation = this.node.getComponent(cc.Animation);
        this._animation.on('finished',this.putBack,this);
    }

    // update (dt) {}

    onDestroy(){
        this._animation.off('finished',this.putBack,this);
    }
    //----- 按钮回调 -----//
    //----- 事件回调 -----//
    //----- 公有方法 -----//
    init(pos:cc.Vec2,num:number){
        this.node.setPosition(pos);
        this.MoenyLabel.string = "/" + num;
        this._animation.play();
    }

    //回到缓存池中
    putBack(){
        nodePool.getinstance().dissAddMoney(this.node);
    }
    //----- 私有方法 -----//
}
