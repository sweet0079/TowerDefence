/** 单元管理组件 */
import * as lib from '../lib/lib'
import itemBase from './itemBase'
import TowerControl from './TowerControl'
import nodePool from '../Manager/NodePoolInstance'

const {ccclass, property} = cc._decorator;

@ccclass
export default class itemsCon extends cc.Component {
    //防御塔预制体
    @property(cc.Prefab) towerPfb: cc.Prefab = null;
    //防御塔层节点
    @property(cc.Node) towerLayer: cc.Node = null;
    //单元数组
    @property([itemBase]) items: Array<itemBase> = [];

    //----- 编辑器属性 -----//
    //----- 属性声明 -----//
    //----- 生命周期 -----//
    // onLoad () {}

    start () {

    }

    // update (dt) {}
    //----- 按钮回调 -----//
    createTower(){
        if(this.findisEmpty())
        {
            let tower = nodePool.getinstance().createTower(this.towerPfb);
            // let color = lib.RandomParameters.RandomParameters.getRandomInt(lib.defConfig.TowerColorEnum.length);
            let color = 1;
            let level = 1;
            tower.parent = this.towerLayer;
            let item = this.findisEmpty();
            console.log(color);
            tower.getComponent(TowerControl).init(color,level,item.node);
            item.putTower(tower);
        }
    }
    //----- 事件回调 -----//
    //----- 公有方法 -----//
    //----- 私有方法 -----//
    findisEmpty(){
        for(let i = 0; i < this.items.length; i++)
        {
            if(this.items[i].isEmpty())
            {
                return this.items[i];
            }
        }
        return null;
    }
}
