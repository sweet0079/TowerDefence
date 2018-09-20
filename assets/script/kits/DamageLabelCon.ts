/** 伤害数字组件 */
import * as lib from '../lib/lib'
import nodePool from '../Manager/NodePoolInstance'

const {ccclass, property} = cc._decorator;

@ccclass
export default class DamageLabelCon extends cc.Component {

    //----- 编辑器属性 -----//
    //防御塔预制体
    @property([cc.Font]) FntArr: Array<cc.Font> = [];
    //盾Node节点
    @property(cc.Node) DunNode: cc.Node = null;
    //----- 属性声明 -----//
    private _label:cc.Label = null;
    private _animation:cc.Animation = null;
    //----- 生命周期 -----//
    onLoad () {
        this._label = this.node.getChildByName("LabelLayer").getChildByName("label").getComponent(cc.Label);
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
    init(pos:cc.Vec2,num:number,type:number,isBlock:boolean){
        this.node.setPosition(pos);
        this._label.string = parseInt(num.toString()).toString();
        if(isBlock)
        {
            this._label.node.scale = 0.45;
            this.DunNode.active = true;
        }
        else
        {
            this._label.node.scale = 1;
            this.DunNode.active = false;
        }
        if(type == lib.defConfig.TowerColorEnum.red)
        {
            this._label.font = this.FntArr[0];
        }
        else if(type == lib.defConfig.TowerColorEnum.green)
        {
            this._label.font = this.FntArr[1];
        }
        else if(type == lib.defConfig.TowerColorEnum.blue)
        {
            this._label.font = this.FntArr[2];
        }
        else if(type == lib.defConfig.TowerColorEnum.purple)
        {
            this._label.font = this.FntArr[3];
        }
        this._animation.play();
    }

    //回到缓存池中
    putBack(){
        nodePool.getinstance().dissDamageLabel(this.node);
    }
    //----- 私有方法 -----//
}
