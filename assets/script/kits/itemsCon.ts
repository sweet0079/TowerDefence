/** 单元管理组件 */
import * as lib from '../lib/lib';
import itemBase from './itemBase';
import uiCon from './UIControl';
import TowerControl from './TowerControl';
import GameManager from '../Manager/GameManager';
import PropManager from '../Manager/PropManager';
import nodePool from '../Manager/NodePoolInstance';
import JsonManager from '../Manager/JsonReaderManager';
import AddMoneyCon from "./AddMoneyCon";
import NoviceGuidanceControl from "./NoviceGuidanceControl";

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
    //加钱预制体
    @property(cc.Prefab) AddMoneyPfb: cc.Prefab = null;
    //特效层节点
    @property(cc.Node) effectLayer: cc.Node = null;
    //新手引导
    @property(NoviceGuidanceControl) NoviceGuidance: NoviceGuidanceControl = null;


    

    //----- 属性声明 -----//
    //建塔需要的金币
    private price:number = 1;
    //建塔的初始等级
    private inital:number = 1;
    private _GameManager = GameManager.getinstance();
    //----- 生命周期 -----//
    onLoad () {
        lib.msgEvent.getinstance().addEvent(lib.msgConfig.initalTowerLevelChange,"initalTowerLevelChange",this);
        lib.msgEvent.getinstance().addEvent(lib.msgConfig.extralItemNumChange,"extralItemNumChange",this);
        lib.msgEvent.getinstance().addEvent(lib.msgConfig.autoCompose,"autocompose",this);
    }

    start () {
        lib.msgEvent.getinstance().addEvent(lib.msgConfig.sell,"sell",this);
        // this.scheduleOnce(this.loadStorage,0.5);
        this.loadStorage();
    }

    onDestroy(){
        lib.msgEvent.getinstance().removeEvent(lib.msgConfig.sell,"sell",this);
        lib.msgEvent.getinstance().removeEvent(lib.msgConfig.initalTowerLevelChange,"initalTowerLevelChange",this);
        lib.msgEvent.getinstance().removeEvent(lib.msgConfig.extralItemNumChange,"extralItemNumChange",this);
        lib.msgEvent.getinstance().removeEvent(lib.msgConfig.autoCompose,"autocompose",this);
    }
    // update (dt) {}
    //----- 按钮回调 -----//
    createTower(){
        if(this.price > this._GameManager.getMoney())
        {
            this.uiControl.moneyNotEnough();
            return;
        }
        lib.wxFun.vibrateShort();
        if(this.findisEmpty())
        {
            this.NoviceGuidance.clickbuild();
            if(PropManager.getinstance().getAutoCompose())
            {
                let color = lib.RandomParameters.RandomParameters.getRandomInt(lib.defConfig.TowerColorEnum.length);
                if(color > this._GameManager.getLevel())
                {
                    color = lib.RandomParameters.RandomParameters.getRandomInt(this._GameManager.getLevel() + 1);
                }
                if(!this.autocomposeAfterCreate(color,this.inital))
                {
                    let tower = nodePool.getinstance().createTower(this.towerPfb);
                    // let color = lib.defConfig.TowerColorEnum.red;
                    let level = this.inital;
                    tower.parent = this.towerLayer;
                    let item = this.findisEmpty();
                    // console.log(color);
                    tower.getComponent(TowerControl).init(color,level,item.node);
                    item.putTower(tower);
                    this._GameManager.addMoney(-this.price);
                    this.uiControl.showMoney(this._GameManager.getMoney());
                }
                else
                {
                    this.scheduleOnce(()=>{
                        if(PropManager.getinstance().getAutoCompose())
                        {
                            lib.msgEvent.getinstance().emit(lib.msgConfig.autoCompose);
                        }
                    },0.5);
                }
            }
            else
            {
                let tower = nodePool.getinstance().createTower(this.towerPfb);
                let color = lib.RandomParameters.RandomParameters.getRandomInt(lib.defConfig.TowerColorEnum.length);
                if(color > this._GameManager.getLevel())
                {
                    color = lib.RandomParameters.RandomParameters.getRandomInt(this._GameManager.getLevel() + 1);
                }
                // let color = lib.defConfig.TowerColorEnum.red;
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
        else
        {
            lib.msgEvent.getinstance().emit(lib.msgConfig.itemLayervibrate);
        }
        this.CheckPlayFirstFull();
    }
    //----- 事件回调 -----//
    //----- 公有方法 -----//
    //设定防御塔价格
    setprice(num:number){
        this.price = num;
        this.uiControl.showprice(this.price);
    }

    //设定防御塔等级
    setinital(num:number){
        this.inital = num;
        this.uiControl.showInitLevel(this.inital);
        this.levelUpLowerTower();
        lib.msgEvent.getinstance().emit(lib.msgConfig.initchange,this.inital);
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
        }
    }

    private createTowerToItem(color:number,level:number,item:itemBase){
        let tower = nodePool.getinstance().createTower(this.towerPfb);
        // let color = lib.defConfig.TowerColorEnum.red;
        tower.parent = this.towerLayer;
        // console.log(color);
        tower.getComponent(TowerControl).init(color,level,item.node);
        tower.getComponent(TowerControl).turnItem();
        item.putTower(tower);
    }

    private extralItemNumChange(){
        this.setAct(lib.defConfig.OriginalItemNum + PropManager.getinstance().getExtralItemNum());
    }

    private initalTowerLevelChange(){
        this.setinital(PropManager.getinstance().getInitalTowerLevel());
    }

    private sell(Pos:cc.Vec2){
        this._GameManager.addMoney(this.price - 1);
        let addmoney = nodePool.getinstance().createAddMoney(this.AddMoneyPfb);
        this.effectLayer.addChild(addmoney);
        Pos.y += 25;
        addmoney.getComponent(AddMoneyCon).init(Pos,this.price - 1);
    }
    //在创建之后自动合成防御塔
    private autocomposeAfterCreate(color:number,level:number){
        console.log("autocomposeAfterCreate");
        for(let i = 0; i < this.items.length; i++)
        {
            if(!this.items[i].node.active)
            {
                continue;
            }
            if(this.items[i].getNowTowerInfo())
            {
                if(this.items[i].getNowTowerInfo().Level == level
                && this.items[i].getNowTowerInfo().Color == color)
                {
                    this.items[i].levelUP();
                    return true;
                }
            }
        }
        return false;
    }

    //自动合成防御塔
    private autocompose(){
        console.log("autocompose");
        for(let i = 0; i < this.items.length; i++)
        {
            if(!this.items[i].node.active)
            {
                continue;
            }
            if(this.items[i].getNowTowerInfo())
            {
                for(let j = i + 1; j < this.items.length; j++)
                {
                    if(!this.items[j].node.active)
                    {
                        continue;
                    }
                    if(this.items[j].getNowTowerInfo())
                    {
                        if(this.items[i].getNowTowerInfo().Level == this.items[j].getNowTowerInfo().Level
                        && this.items[i].getNowTowerInfo().Color == this.items[j].getNowTowerInfo().Color)
                        {
                            this.items[i].levelUP();
                            this.items[j].getNowTowerInfo().node.getComponent(TowerControl).desTower();
                            this.scheduleOnce(()=>{
                                if(PropManager.getinstance().getAutoCompose())
                                {
                                    lib.msgEvent.getinstance().emit(lib.msgConfig.autoCompose);
                                }
                            },0.5);
                        }
                    }
                }
            }
        }
    }

    //升级所有低于inital的塔
    private levelUpLowerTower(){
        for(let i = 0; i < this.items.length; i++)
        {
            if(!this.items[i].node.active)
            {
                continue;
            }
            if(this.items[i].getNowTowerInfo())
            {
                if(this.items[i].getNowTowerInfo().Level < this.inital)
                {
                    this.items[i].getNowTowerInfo().node.getComponent(TowerControl).levelUP();
                }
            }
        }
    }

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

    private CheckPlayFirstFull(){
        let temp:string = cc.sys.localStorage.getItem('firstFull');
        if(!temp)
        {
            if(!this.findisEmpty())
            {
                cc.sys.localStorage.setItem('firstFull', "false");
                lib.msgEvent.getinstance().emit(lib.msgConfig.firstfull);
            }
        }
    }
}
