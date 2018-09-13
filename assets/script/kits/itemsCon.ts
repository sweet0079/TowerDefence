/** 单元管理组件 */
import * as lib from '../lib/lib'
import itemBase from './itemBase'
import uiCon from './UIControl'
import TowerControl from './TowerControl'
import GameManager from '../Manager/GameManager'
import nodePool from '../Manager/NodePoolInstance'
import JsonManager from '../Manager/JsonReaderManager'

const {ccclass, property} = cc._decorator;

@ccclass
export default class itemsCon extends cc.Component {
    //----- 编辑器属性 -----//
    //防御塔预制体
    @property(cc.Prefab) towerPfb: cc.Prefab = null;
    //防御塔层节点
    @property(cc.Node) towerLayer: cc.Node = null;
    //单元数组
    @property([itemBase]) items: Array<itemBase> = [];
    //UI控制节点
    @property(uiCon) uiControl: uiCon = null;

    //----- 属性声明 -----//
    //建塔需要的金币
    private price:number = 1;
    //建塔的初始等级
    private inital:number = 1;
    private _GameManager = GameManager.getinstance();
    //----- 生命周期 -----//
    // onLoad () {
        // JsonManager.getinstance();}

    // start () {
    // }

    // update (dt) {}
    //----- 按钮回调 -----//
    createTower(){
        if(this.price > this._GameManager.getMoney())
        {
            return;
        }
        if(this.findisEmpty())
        {
            let tower = nodePool.getinstance().createTower(this.towerPfb);
            // let color = lib.RandomParameters.RandomParameters.getRandomInt(lib.defConfig.TowerColorEnum.length);
            let color = lib.defConfig.TowerColorEnum.red;
            let level = this.inital;
            tower.parent = this.towerLayer;
            let item = this.findisEmpty();
            // console.log(color);
            tower.getComponent(TowerControl).init(color,level,item.node);
            item.putTower(tower);
            this._GameManager.addMoney(-this.price);
            this.uiControl.showMoney(this._GameManager.getMoney());
        }
    }
    //----- 事件回调 -----//
    //----- 公有方法 -----//
    //设定防御塔价格
    setprice(num:number){
        this.price = num;
        this.uiControl.showprice(this.price);
    }

    //设定防御塔价格
    setinital(num:number){
        this.inital = num;
    }

    //设定激活的合成槽位
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
    //寻找可放置的item
    private findisEmpty(){
        for(let i = 0; i < this.items.length; i++)
        {
            if(!this.items[i].node.active)
            {
                break;
            }
            if(this.items[i].isEmpty())
            {
                return this.items[i];
            }
        }
        return null;
    }
}
