/** 单个单元的控制组件的基类 */
import * as lib from '../lib/lib'
import TowerControl from './TowerControl'

const {ccclass, property} = cc._decorator;

@ccclass
export default class itemBase extends cc.Component {

    //----- 编辑器属性 -----//
    /** Stage1Pos位置 */
    @property({tooltip:"Stage1Pos位置", type: cc.Vec2 }) Stage1Pos: cc.Vec2 = new cc.Vec2(0,0);
    /** Stage2Pos位置 */
    @property({tooltip:"Stage2Pos位置", type: cc.Vec2 }) Stage2Pos: cc.Vec2 = new cc.Vec2(0,0);
    //----- 属性声明 -----//
    //单元格存放的塔的属性
    protected NowTowerInfo: _kits.Item.TowerInfo = null;
    //----- 生命周期 -----//

    onLoad () {
        lib.msgEvent.getinstance().addEvent(lib.msgConfig.stageChange,"stageChange",this);
    }

    // start () {
    // }

    // update (dt) {}

    onDestroy(){
        lib.msgEvent.getinstance().removeEvent(lib.msgConfig.stageChange,"stageChange",this);
    }
    //----- 公有方法 -----//
    setNowTowerInfo(info:_kits.Item.TowerInfo){
        this.NowTowerInfo = info;
        cc.sys.localStorage.setItem(this.node.name + "Level", info.Level.toString());
        cc.sys.localStorage.setItem(this.node.name + "Color", info.Color.toString());
    }

    cleanNowTowerInfo(){
        this.NowTowerInfo = null;
        cc.sys.localStorage.setItem(this.node.name + "Level", "null");
        cc.sys.localStorage.setItem(this.node.name + "Color", "null");
    }
    getNowTowerInfo(){
        return this.NowTowerInfo;
    }
    putTower(Tower:cc.Node){

    }
    delTower(){

    }
    levelUP(){

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
    protected stageChange(num){
        if(num == 0)
        {
            this.node.setPosition(this.Stage1Pos);
        }
        else
        {
            this.node.setPosition(this.Stage2Pos);
        }
    }
}
