/** 单个防御塔与Item相关碰撞控制组件 */
import * as lib from '../lib/lib'
import TowerControl from './TowerControl'
import itemBase from './itemBase'

const {ccclass, property} = cc._decorator;

@ccclass
export default class TowerCollider extends cc.Component {

    //----- 编辑器属性 -----//
    //----- 属性声明 -----//
    //防御塔存放在的节点
    private PlaceNode: cc.Node = null;
    //发生碰撞的对方节点
    private OtherNode: cc.Node = null;
    //原位置
    private BFPos: cc.Vec2 = null;
    //是否卖出
    private isSell: boolean = false;
    //防御塔控制组件
    private towerControl: TowerControl = null;
    //----- 生命周期 -----//
    // onLoad () {}

    start () {
        this.towerControl = this.node.parent.getComponent(TowerControl);

        this.node.parent.on(cc.Node.EventType.TOUCH_START,(event:cc.Event.EventTouch)=>{
            this._clickStart(event);
        },this);
        this.node.parent.on(cc.Node.EventType.TOUCH_MOVE,(event:cc.Event.EventTouch)=>{
            this._clickMove(event);
        },this);
        this.node.parent.on(cc.Node.EventType.TOUCH_END,(event:cc.Event.EventTouch)=>{
            this._clickEnd(event);
        },this);
        this.node.parent.on(cc.Node.EventType.TOUCH_CANCEL,(event:cc.Event.EventTouch)=>{
            this._clickEnd(event);
        },this);
    }

    // update (dt) {}

    onDestroy(){
        this.node.parent.off(cc.Node.EventType.TOUCH_START,(event:cc.Event.EventTouch)=>{
            this._clickStart(event);
        },this);
        this.node.parent.off(cc.Node.EventType.TOUCH_MOVE,(event:cc.Event.EventTouch)=>{
            this._clickMove(event);
        },this);
        this.node.parent.off(cc.Node.EventType.TOUCH_END,(event:cc.Event.EventTouch)=>{
            this._clickEnd(event);
        },this);
        this.node.parent.off(cc.Node.EventType.TOUCH_CANCEL,(event:cc.Event.EventTouch)=>{
            this._clickEnd(event);
        },this);
    }
    //----- 公有方法 -----//
    updatePlaceNodeInfo(){
        this.PlaceNode.getComponent(itemBase).setNowTowerInfo(this.towerControl.getTowerInfo());
    }

    setplaceNode(node:cc.Node)
    {
        this.PlaceNode = node;
    }

    getplaceNode(){
        return this.PlaceNode;
    }

    //初始化
    init(){
        this.PlaceNode = null;
        this.BFPos = null;
        this.OtherNode = null;
    }

    onCollisionEnter(other:cc.Collider, self:cc.Collider){
        if(other.node.group == "item")
        {
            if(other.node != this.OtherNode)
            {
                console.log("onCollisionEnter" + other.node.name);
                this.OtherNode = other.node;
            }
        }
        else if(other.node.group == "ItemLayer")
        {
            if(!this.towerControl)
            {
                this.towerControl = this.node.parent.getComponent(TowerControl);
            }
            this.towerControl.turnItem();
        }
        else if(other.node.group == "rubbish")
        {
            this.isSell = true;
        }
    }

    onCollisionExit(other:cc.Collider, self:cc.Collider) {
        if(other.node.group == "item")
        {
            if(other.node == this.OtherNode)
            {
                console.log("onCollisionExit" + other.node.name);
                this.OtherNode = null;
            }
        }
        else if(other.node.group == "ItemLayer")
        {
            this.towerControl.turnTower();
        }
        else if(other.node.group == "rubbish")
        {
            this.isSell = false;
        }
    }

    cleanPlaceNode(){
        if(this.PlaceNode)
        {
            this.PlaceNode.getComponent(itemBase).delTower();
            this.PlaceNode.getComponent(itemBase).show();
        }
    }
    //----- 私有方法 -----//

    private _clickStart(event:cc.Event.EventTouch){
        this.node.parent.zIndex += 1000;
        this.towerControl.setTowerBig();
        this.BFPos = this.node.parent.position;
        lib.msgEvent.getinstance().emit(lib.msgConfig.showrubbish);
    }


    private _clickMove(event:cc.Event.EventTouch){
        this.node.parent.x += event.getDeltaX();
        this.node.parent.y += event.getDeltaY();
    }

    private _clickEnd(event:cc.Event.EventTouch){
        this.node.parent.zIndex -= 1000;
        this.towerControl.setTowerSmall();
        if(this.isSell)
        {
            this.towerControl.sell();
        }
        else if(this.OtherNode)
        {
            if(this.OtherNode == this.PlaceNode)
            {
                this.takeBack();
                lib.msgEvent.getinstance().emit(lib.msgConfig.hiderubbish);
                return;
            }
            if(this.OtherNode.getComponent(itemBase).putTower(this.node.parent))
            {
                this.cleanPlaceNode();
                this.PlaceNode = this.OtherNode;
                this.node.parent.position = this.OtherNode.position;
                this.node.parent.y += lib.defConfig.TowerInItemY;
            }
            else
            {
                this.PlaceNode = this.OtherNode;
                this.node.parent.position = this.OtherNode.position;
                this.node.parent.y += lib.defConfig.TowerInItemY;
            }
            this.OtherNode.getComponent(itemBase).show();
        }
        else
        {
            this.takeBack();
        }
        lib.msgEvent.getinstance().emit(lib.msgConfig.hiderubbish);
    }

    private takeBack(){
        this.node.parent.position = this.BFPos;
    }
}
