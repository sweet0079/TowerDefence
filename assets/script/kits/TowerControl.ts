/** 单个防御塔控制组件 */
import * as lib from '../lib/lib'
import Towerattack from './TowerAttack'
import TowerCollider from './TowerCollider'
import nodePool from '../Manager/NodePoolInstance'
import GameManager from '../Manager/GameManager';
import PropManager from '../Manager/PropManager';

const {ccclass, property} = cc._decorator;

@ccclass
export default class TowerControl extends cc.Component {

    //----- 编辑器属性 -----//
    /** 显示tower的node组件 */
    @property({tooltip:"显示tower的node组件", type: cc.Node }) TowerNode: cc.Node = null;
    /** 显示等级的label组件 */
    @property({tooltip:"显示等级的label组件", type: cc.Label }) LevelLabel: cc.Label = null;
    /** 合成动画显示的组件数组 */
    @property({tooltip:"显示等级的label组件", type: [cc.Node] }) ComposeArr: Array<cc.Node> = [];
    /** 红色塔形态的图片素材 */
    @property({tooltip:"塔的图片素材", type: [cc.SpriteFrame] }) RedTowerSpfArr: Array<cc.SpriteFrame> = [];
    /** 绿色塔形态的图片素材 */
    @property({tooltip:"塔的图片素材", type: [cc.SpriteFrame] }) GreenTowerSpfArr: Array<cc.SpriteFrame> = [];
    /** 蓝色塔形态的图片素材 */
    @property({tooltip:"塔的图片素材", type: [cc.SpriteFrame] }) BlueTowerSpfArr: Array<cc.SpriteFrame> = [];
    /** 紫色塔形态的图片素材 */
    @property({tooltip:"塔的图片素材", type: [cc.SpriteFrame] }) PurpleTowerSpfArr: Array<cc.SpriteFrame> = [];
    /** 单元形态的图片素材 */
    @property({tooltip:"单元形态的图片素材", type: [cc.SpriteFrame] }) ItemSpfArr: Array<cc.SpriteFrame> = [];
    /** 显示塔底的node组件 */
    @property({tooltip:"显示塔底的node组件", type: cc.Sprite }) TowerBase: cc.Sprite = null;
    /** 塔底的图片素材 */
    @property({tooltip:"塔底的图片素材", type: [cc.SpriteFrame] }) TowerBaseSpfArr: Array<cc.SpriteFrame> = [];
    /** 双倍攻速特效的node组件 */
    @property({tooltip:"双倍攻速特效的node组件", type: cc.Node }) DoubleSpeedAni: cc.Node = null;
    //----- 属性声明 -----//
    //颜色
    private Color: number = lib.defConfig.TowerColorEnum.red;
    //等级
    private level: number = 1;
    //防御塔攻击组件
    private towerattack: Towerattack = null;
    //防御塔碰撞组件
    private towerCollider: TowerCollider = null;

    //是否是鲲
    private isItem: boolean = false;

    //当前使用的spf数组
    private _spfArr: Array<cc.SpriteFrame> = null;
    //----- 生命周期 -----//
    onLoad () {
        this.towerattack = this.node.getComponent(Towerattack);
        this.towerCollider = this.node.getChildByName("towercollider").getComponent(TowerCollider);
        this.node.getComponent(cc.Animation).on('finished',this.ComposeAnimationFinished,this);
        lib.msgEvent.getinstance().addEvent(lib.msgConfig.showDoubleSpeed,"showDoubleSpeed",this);
        lib.msgEvent.getinstance().addEvent(lib.msgConfig.hideDoubleSpeed,"hideDoubleSpeed",this);
        // this.LevelLabel.getComponent(cc.BoxCollider).size = cc.size(this.node.width,this.node.width);
    }
    onDestroy(){
        this.node.getComponent(cc.Animation).off('finished',this.ComposeAnimationFinished,this);
        lib.msgEvent.getinstance().removeEvent(lib.msgConfig.showDoubleSpeed,"showDoubleSpeed",this);
        lib.msgEvent.getinstance().removeEvent(lib.msgConfig.hideDoubleSpeed,"hideDoubleSpeed",this);
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
        this.node.y = node.y + lib.defConfig.TowerInItemY;
        this.node.rotation = 0;
        if(this.towerattack)
        {
            this.towerattack.init(this.Color);
            this.towerattack.setAtt(this.level * this.level);
        }
        if(this.towerCollider)
        {
            this.towerCollider.init();
            this.towerCollider.setplaceNode(node);
        }
        if(this.Color == lib.defConfig.TowerColorEnum.red)
        {
            this._spfArr = this.RedTowerSpfArr;
        }
        else if(this.Color == lib.defConfig.TowerColorEnum.green)
        {
            this._spfArr = this.GreenTowerSpfArr;
        }
        else if(this.Color == lib.defConfig.TowerColorEnum.blue)
        {
            this._spfArr = this.BlueTowerSpfArr;
        }
        else if(this.Color == lib.defConfig.TowerColorEnum.purple)
        {
            this._spfArr = this.PurpleTowerSpfArr;
        }
        this.showSpf();
        this.TowerBase.spriteFrame = this.TowerBaseSpfArr[Color];
        this.TowerNode.opacity = 255;
        this.TowerNode.setPosition(0,0);
        this.TowerNode.scale = 1;
        this.TowerNode.getComponent(cc.Animation).play("PutItem");
    }
    //变成鲲
    turnItem(){
        this.TowerBase.node.active = false;
        this.isItem = true;
        this.towerattack.turnItem(this.ItemSpfArr[this.Color]);
        this.LevelLabel.node.y = -7;
        this.hideDoubleSpeed();
    }

    //变成炮塔
    turnTower(){
        this.TowerBase.node.active = true;
        this.isItem = false;
        this.showSpf();
        this.LevelLabel.node.y = 0;
        if(PropManager.getinstance().getIsDoubleSpeed())
        {
            this.showDoubleSpeed();
        }
        else
        {
            this.hideDoubleSpeed();
        }
    }

    //获取防御塔信息
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

    //升级
    levelUP(){
        this.level++;
        this.towerattack.setAtt(this.level * this.level);
        this.towerCollider.updatePlaceNodeInfo();
        this.showLevel();
        this.showSpf();
    }

    //播放在合成槽中的升级动画
    play(){
        this.ComposeArr[0].getComponent(cc.Sprite).spriteFrame = this.ItemSpfArr[this.Color];
        this.ComposeArr[0].getChildByName("Level").getComponent(cc.Label).string = (this.level - 1).toString();
        this.ComposeArr[1].getComponent(cc.Sprite).spriteFrame = this.ItemSpfArr[this.Color];
        this.ComposeArr[1].getChildByName("Level").getComponent(cc.Label).string = (this.level - 1).toString();

        for(let i = 0; i < this.ComposeArr.length; i++)
        {
            this.ComposeArr[i].active = true;
        }
        this.node.getComponent(cc.Animation).play();
    }

    //播放在攻击槽中的升级动画
    playSlotCompose(){
        this.node.getComponent(cc.Animation).play("SlotCompose");
    }


    //获取放置节点
    getPlaceNode(){
        return this.towerCollider.getplaceNode();
    }

    //设定放置节点
    setPlaceNode(node){
        this.towerCollider.setplaceNode(node);
    }

    //卖出
    sell(){
        lib.msgEvent.getinstance().emit(lib.msgConfig.sell,this.node.position);
        this.desTower();
    }

    setTowerBig(){
        this.node.scale = lib.defConfig.TouchTowerScale;
        this.towerattack.setRangSmall();
    }

    setTowerSmall(){
        this.node.scale = 1;
        this.towerattack.setRangBig();
    }
    //----- 私有方法 -----//
    private showDoubleSpeed(){
        if(!this.isItem)
        {
            this.DoubleSpeedAni.active = true;
        }
    }

    private hideDoubleSpeed(){
        this.DoubleSpeedAni.active = false;
    }

    //更新显示外形
    private showSpf(){
        if(this.isItem)
        {
            this.towerattack.turnItem(this.ItemSpfArr[this.Color]);
        }
        else
        {
            let temp = parseInt((this.level / 5).toString());
            if(temp >= this._spfArr.length)
            {
                temp = this._spfArr.length - 1;
            }
            this.towerattack.turnTower(this._spfArr[temp]);
        }
    }

    //更新显示等级
    private showLevel(){
        this.LevelLabel.string = this.level.toString();
    }

    private ComposeAnimationFinished(){
        this.TowerNode.opacity = 255;
        this.TowerNode.scale = 1;
        for(let i = 0; i < this.ComposeArr.length; i++)
        {
            this.ComposeArr[i].active = false;
        }
    }
}
