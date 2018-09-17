/** 伤害数字组件 */
import * as lib from '../lib/lib'
import nodePool from '../Manager/NodePoolInstance'

const {ccclass, property} = cc._decorator;

@ccclass
export default class DamageLabelCon extends cc.Component {

    //----- 编辑器属性 -----//
    //----- 属性声明 -----//
    private _label:cc.Label = null;
    private _animation:cc.Animation = null;
    //----- 生命周期 -----//
    onLoad () {
        this._label = this.node.getChildByName("label").getComponent(cc.Label);
        this._animation = this.node.getComponent(cc.Animation);
        this._animation.on('finished',this.putBack,this);
    }
    // start () {
    // }

    onDestroy(){
        this._animation.off('finished',this.putBack,this);
    }
    //----- 按钮回调 -----//
    //----- 事件回调 -----//
    //----- 公有方法 -----//
    init(pos:cc.Vec2,num:number,type:number){
        this.node.setPosition(pos);
        this._label.string = num.toString();
        if(type == lib.defConfig.TowerColorEnum.red)
        {
            this._label.node.color = cc.color(255,0,0);
        }
        else if(type == lib.defConfig.TowerColorEnum.green)
        {
            this._label.node.color = cc.color(0,255,0);
        }
        else if(type == lib.defConfig.TowerColorEnum.blue)
        {
            this._label.node.color = cc.color(0,255,255);
        }
        else if(type == lib.defConfig.TowerColorEnum.purple)
        {
            this._label.node.color = cc.color(255,0,255);
        }
        this._animation.play();
    }

    //回到缓存池中
    putBack(){
        nodePool.getinstance().dissDamageLabel(this.node);
    }
    //----- 私有方法 -----//
}
