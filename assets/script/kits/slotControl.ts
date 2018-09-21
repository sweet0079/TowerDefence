/** 单个单元的控制组件的子类 */
import TowerControl from './TowerControl'
import itemBase from './itemBase'

const {ccclass, property} = cc._decorator;

@ccclass
export default class slotControl extends itemBase {
    //----- 编辑器属性 -----//
    /** 攻击槽显示节点 */
    @property({tooltip:"攻击槽显示节点", type: cc.Node }) ShowNode: cc.Node = null;
    /** 感叹号显示节点 */
    @property({tooltip:"感叹号显示节点", type: cc.Node }) AmazingNode: cc.Node = null;
    /** 塔基节点 */
    @property({tooltip:"塔基节点", type: cc.Sprite }) TowerBase: cc.Sprite = null;
    /** 塔基节点 */
    @property({tooltip:"塔基节点图片", type: [cc.SpriteFrame]}) TowerBaseSpfArr: Array<cc.SpriteFrame> = [];
    /** 是否是额外 */
    @property({tooltip:"是否是额外", type: cc.Boolean }) isExtral: boolean = false;
    //----- 属性声明 -----//
    //----- 生命周期 -----//

    // onLoad () {}

    // start () {

    // }

    // update (dt) {}
    //----- 公有方法 -----//
    setNowTowerInfo(info:_kits.Item.TowerInfo){
        super.setNowTowerInfo(info);
        this.show();
    }

    putTower(Tower:cc.Node){
        if(this.NowTowerInfo)
        {
            let Towercon = Tower.getComponent(TowerControl);
            if(Towercon.getTowerInfo().Color == this.NowTowerInfo.Color 
            && Towercon.getTowerInfo().Level == this.NowTowerInfo.Level)
            {
                this.NowTowerInfo.node.getComponent(TowerControl).desTower();
                Towercon.levelUP();
                Towercon.playSlotCompose();
                this.NowTowerInfo = Towercon.getTowerInfo();
                console.log("合成成功");
                return true;
            }
            else
            {
                let placenode:cc.Node = Towercon.getPlaceNode();
                this.NowTowerInfo.node.getComponent(TowerControl).setPlaceNode(placenode);
                placenode.getComponent(itemBase).setNowTowerInfo(this.NowTowerInfo);
                // Towercon.getPlaceNode().getComponent(itemBase).setNowTowerInfo(this.NowTowerInfo);
                this.NowTowerInfo.node.runAction(cc.moveTo(0.2,placenode.getPosition()));
                this.NowTowerInfo = Towercon.getTowerInfo();
                console.log("交换");
                return false;
            }
        }
        else
        {
            this.NowTowerInfo = Tower.getComponent(TowerControl).getTowerInfo();
            this.ShowNode.active = false;
            console.log("移动成功");
            return true;
        }
    }

    delTower(){
        this.NowTowerInfo = null;
    }

    show(){
        if(this.NowTowerInfo)
        {
            this.ShowNode.active = false;
            this.TowerBase.node.active = true;
            this.TowerBase.spriteFrame = this.TowerBaseSpfArr[this.NowTowerInfo.Color];
            this.AmazingNode.active = false;
        }
        else
        {
            this.ShowNode.active = true;
            this.TowerBase.node.active = false;
            if(!this.isExtral)
            {
                this.AmazingNode.active = true;
            }
        }
    }
    //----- 私有方法 -----//
    protected stageChange(num){
        super.stageChange(num);
        if(this.NowTowerInfo)
        {
            if(this.node.active)
            {
                this.NowTowerInfo.node.setPosition(this.node.getPosition());
            }
            else
            {
                this.NowTowerInfo.node.getComponent(TowerControl).desTower();
                this.delTower();
            }
        }
    }
}
