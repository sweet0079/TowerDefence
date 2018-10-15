/** 单个单元的控制组件的子类 */
import * as lib from '../lib/lib'
import TowerControl from './TowerControl'
import itemBase from './itemBase'

const {ccclass, property} = cc._decorator;

@ccclass
export default class itemControl extends itemBase {

    //----- 编辑器属性 -----//
    //----- 属性声明 -----//
    //----- 生命周期 -----//

    // onLoad () {}

    // start () {

    // }

    // update (dt) {}
    //----- 公有方法 -----//
    putTower(Tower:cc.Node){
        console.log("putTower" + this.node.name);
        let Towercon = Tower.getComponent(TowerControl);
        if(this.NowTowerInfo)
        {
            if(Towercon.getTowerInfo().Color == this.NowTowerInfo.Color 
            && Towercon.getTowerInfo().Level == this.NowTowerInfo.Level)
            {
                this.NowTowerInfo.node.getComponent(TowerControl).desTower();
                Towercon.levelUP();
                Towercon.play();
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
                this.NowTowerInfo.node.runAction(cc.moveTo(0.2,placenode.x,placenode.y + lib.defConfig.TowerInItemY));
                this.setNowTowerInfo(Towercon.getTowerInfo());
                console.log("交换");
                return false;
            }
        }
        else
        {
            this.setNowTowerInfo(Towercon.getTowerInfo());
            console.log("移动成功");
            return true;
        }
    }

    levelUP(){
        let Towercon = this.NowTowerInfo.node.getComponent(TowerControl);
        Towercon.levelUP();
        Towercon.play();
        let newTowerInfo = Towercon.getTowerInfo();
        this.setNowTowerInfo(newTowerInfo);
    }

    delTower(){
        this.cleanNowTowerInfo();
    }
    //----- 私有方法 -----//
    protected stageChange(num){
        super.stageChange(num);
        if(this.NowTowerInfo)
        {
            this.NowTowerInfo.node.setPosition(this.node.getPosition());
            this.NowTowerInfo.node.y = this.node.y + lib.defConfig.TowerInItemY;
        }
    }
}
