/** 单个单元的控制组件的子类 */
import TowerControl from './TowerControl'
import itemBase from './itemBase'

const {ccclass, property} = cc._decorator;

@ccclass
export default class slotControl extends itemBase {
    //----- 编辑器属性 -----//
    //----- 属性声明 -----//
    //----- 生命周期 -----//

    // onLoad () {}

    // start () {

    // }

    // update (dt) {}
    //----- 公有方法 -----//
    putTower(Tower:cc.Node){
        if(this.NowTowerInfo)
        {
            let Towercon = Tower.getComponent(TowerControl);
            if(Towercon.getTowerInfo().Color == this.NowTowerInfo.Color 
            && Towercon.getTowerInfo().Level == this.NowTowerInfo.Level)
            {
                this.NowTowerInfo.node.getComponent(TowerControl).desTower();
                Towercon.levelUP();
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
            console.log("移动成功");
            return true;
        }
    }

    delTower(){
        this.NowTowerInfo = null;
    }
    //----- 私有方法 -----//
}
