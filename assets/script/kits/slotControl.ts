/** 单个单元的控制组件的子类 */
import * as lib from '../lib/lib'
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
    /** 是否是额外 */
    @property({tooltip:"是否是额外", type: cc.Boolean }) isExtral: boolean = false;
    //----- 属性声明 -----//
    //----- 生命周期 -----//

    onLoad () {
        super.onLoad();
        this.isItem = false;
    }

    // start () {
    //     this.show();
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
                lib.msgEvent.getinstance().emit(lib.msgConfig.micComposeTower);
                this.setNowTowerInfo(Towercon.getTowerInfo());
                console.log("合成成功");
                return true;
            }
            else
            {
                let placenode:cc.Node = Towercon.getPlaceNode();
                this.NowTowerInfo.node.getComponent(TowerControl).setPlaceNode(placenode);
                placenode.getComponent(itemBase).setNowTowerInfo(this.NowTowerInfo);
                // Towercon.getPlaceNode().getComponent(itemBase).setNowTowerInfo(this.NowTowerInfo);
                if(placenode.getComponent(itemBase).isItem)
                {
                    this.NowTowerInfo.node.runAction(cc.moveTo(0.2,placenode.x,placenode.y + lib.defConfig.TowerInItemY));
                }
                else
                {
                    this.NowTowerInfo.node.runAction(cc.moveTo(0.2,placenode.x,placenode.y));
                }
                this.setNowTowerInfo(Towercon.getTowerInfo());
                console.log("交换");
                return false;
            }
        }
        else
        {
            this.setNowTowerInfo(Tower.getComponent(TowerControl).getTowerInfo());
            console.log("移动成功");
            return true;
        }
    }

    delTower(){
        this.cleanNowTowerInfo();
    }

    show(){
        if(this.NowTowerInfo)
        {
            this.ShowNode.getComponent(cc.Animation).stop();
            this.ShowNode.width = 42;
            this.ShowNode.height = 47;
            this.ShowNode.setPosition(0,0);
            this.AmazingNode.active = false;
        }
        else
        {
            this.ShowNode.getComponent(cc.Animation).play();
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
