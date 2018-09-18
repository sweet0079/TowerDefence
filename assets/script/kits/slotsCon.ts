/** 槽管理组件 */
import * as lib from '../lib/lib'
import itemBase from './itemBase'
import TowerControl from './TowerControl'

const {ccclass, property} = cc._decorator;

@ccclass
export default class slotsCon extends cc.Component {

    //----- 编辑器属性 -----//
    //槽数组
    @property([itemBase]) items: Array<itemBase> = [];

    //----- 属性声明 -----//
    //----- 生命周期 -----//

    // onLoad () {}

    start () {
        lib.msgEvent.getinstance().addEvent(lib.msgConfig.initchange,"levelUpLowerTower",this);
    }

    onDestroy(){
        lib.msgEvent.getinstance().removeEvent(lib.msgConfig.initchange,"levelUpLowerTower",this);
    }
    //----- 按钮回调 -----//
    //----- 事件回调 -----//
    //----- 公有方法 -----//
    setAct(num:number){
        for(let i = 0; i < this.items.length; i++)
        {
            if(i < num)
            {
                this.items[i].node.active = true;
            }
            else
            {
                this.items[i].node.active = false;
            }
        }
    }
    //----- 私有方法 -----//
    //升级所有低于inital的塔
    private levelUpLowerTower(inital){
        for(let i = 0; i < this.items.length; i++)
        {
            if(!this.items[i].node.active)
            {
                continue;
            }
            if(this.items[i].getNowTowerInfo())
            {
                if(this.items[i].getNowTowerInfo().Level < inital)
                {
                    this.items[i].getNowTowerInfo().node.getComponent(TowerControl).levelUP();
                }
            }
        }
    }
}
