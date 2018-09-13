/** 单个单元的控制组件的基类 */
import TowerControl from './TowerControl'

const {ccclass, property} = cc._decorator;

@ccclass
export default class itemBase extends cc.Component {

    //----- 编辑器属性 -----//
    //----- 属性声明 -----//
    //单元格存放的塔的属性
    protected NowTowerInfo: _kits.Item.TowerInfo = null;
    //----- 生命周期 -----//

    // onLoad () {}

    // start () {

    // }

    // update (dt) {}
    //----- 公有方法 -----//
    setNowTowerInfo(info:_kits.Item.TowerInfo){
        this.NowTowerInfo = info;
    }
    putTower(Tower:cc.Node){
    }
    delTower(){
    }
    isEmpty(){
        if(this.NowTowerInfo == null)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    show(){
        
    }
    //----- 私有方法 -----//
}
