/** 单个防御塔控制组件 */
import * as lib from '../lib/lib'
import Towerattack from './TowerAttack'
import TowerCollider from './TowerCollider'
import nodePool from '../Manager/NodePoolInstance'

const {ccclass, property} = cc._decorator;

@ccclass
export default class TowerControl extends cc.Component {

    //----- 编辑器属性 -----//
    /** 显示等级的label组件 */
    @property({tooltip:"显示等级的label组件", type: cc.Label }) LevelLabel:cc.Label = null;
    /** 塔形态的图片素材 */
    @property({tooltip:"塔的图片素材", type: [cc.SpriteFrame] }) TowerSpfArr: Array<cc.SpriteFrame> = [];
    /** 单元形态的图片素材 */
    @property({tooltip:"单元形态的图片素材", type: [cc.SpriteFrame] }) ItemSpfArr: Array<cc.SpriteFrame> = [];
    //----- 属性声明 -----//
    //颜色
    private Color: number = lib.defConfig.TowerColorEnum.red;
    //等级
    private level: number = 1;
    //防御塔攻击组件
    private towerattack: Towerattack = null;
    //防御塔碰撞组件
    private towerCollider: TowerCollider = null;
    //----- 生命周期 -----//
    onLoad () {
        this.towerattack = this.node.getComponent(Towerattack);
        this.towerCollider = this.LevelLabel.getComponent(TowerCollider);
        // this.LevelLabel.getComponent(cc.BoxCollider).size = cc.size(this.node.width,this.node.width);
    }
    //----- 公有方法 -----//
    //删除这个防御塔
    desTower(){
        this.towerCollider.cleanPlaceNode();
        nodePool.getinstance().dissTower(this.node);
    }

    //初始化
    init(Color:number,level:number,node:cc.Node){
        this.Color = Color;
        this.level = level;
        this.showLevel();
        this.node.setPosition(node.getPosition());
        this.node.rotation = 0;
        if(this.towerattack)
        {
            this.towerattack.init(this.Color);
        }
        if(this.towerCollider)
        {
            this.towerCollider.init();
            this.towerCollider.setplaceNode(node);
        }
    }
    //变成鲲
    turnItem(){
        this.towerattack.turnItem(this.ItemSpfArr[this.Color]);
    }

    //变成炮塔
    turnTower(){
        this.towerattack.turnTower(this.TowerSpfArr[this.Color]);
    }

    getTowerInfo(){
        let TowerInfo: _kits.Item.TowerInfo = {
            /** 颜色 */
            Color: this.Color,
            /** 等级 */
            Level: this.level,
            /** 节点 */
            node: this.node,
        }
        return TowerInfo;
    }

    levelUP(){
        this.level++;
        this.showLevel();
    }

    getPlaceNode(){
        return this.towerCollider.getplaceNode();
    }

    setPlaceNode(node){
        this.towerCollider.setplaceNode(node);
    }
    //----- 私有方法 -----//
    //更新显示等级
    private showLevel(){
        this.LevelLabel.string = this.level.toString();
    }
}
