/** 槽管理组件 */
import * as lib from '../lib/lib'
import itemBase from './itemBase'
import nodePool from '../Manager/NodePoolInstance';
import TowerControl from './TowerControl'

const {ccclass, property} = cc._decorator;

@ccclass
export default class slotsCon extends cc.Component {

    //----- 编辑器属性 -----//
    //槽数组
    @property([itemBase]) items: Array<itemBase> = [];
    //防御塔预制体
    @property(cc.Prefab) towerPfb: cc.Prefab = null;
    //防御塔层节点
    @property(cc.Node) towerLayer: cc.Node = null;

    //----- 属性声明 -----//
    //----- 生命周期 -----//

    // onLoad () {}

    start () {
        lib.msgEvent.getinstance().addEvent(lib.msgConfig.initchange,"levelUpLowerTower",this);
        this.loadStorage();
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
    private loadStorage(){
        for(let i = 0 ; i < this.items.length ; i++)
        {
            let tempLevel:number = parseInt(cc.sys.localStorage.getItem(this.items[i].node.name + "Level"));
            let tempColor:number = parseInt(cc.sys.localStorage.getItem(this.items[i].node.name + "Color"));
            if(isNaN(tempLevel))
            {
                tempLevel = null;
            }
            if(isNaN(tempColor))
            {
                tempColor = null;
            }
            if(tempLevel != null && tempColor != null)
            {
                this.createTowerToItem(tempColor,tempLevel,this.items[i]);
            }
            else
            {
                this.items[i].show();
            }
        }
    }

    private createTowerToItem(color:number,level:number,item:itemBase){
        let tower = nodePool.getinstance().createTower(this.towerPfb);
        // let color = lib.defConfig.TowerColorEnum.red;
        tower.parent = this.towerLayer;
        // console.log(color);
        tower.getComponent(TowerControl).init(color,level,item.node);
        tower.getComponent(TowerControl).turnTower();
        item.putTower(tower);
    }
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
