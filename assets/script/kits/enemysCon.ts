/** 敌人管理组件 */
import * as lib from '../lib/lib'
import enemyCon from './enemy'
import GameManager from '../Manager/GameManager'
import nodePool from '../Manager/NodePoolInstance'

const {ccclass, property} = cc._decorator;

@ccclass
export default class enemysCon extends cc.Component {

    //----- 编辑器属性 -----//
    //敌人预制体
    @property(cc.Prefab) enemyPfb: cc.Prefab = null;
    //敌人层节点
    @property(cc.Node) enemyLayer: cc.Node = null;
    //----- 属性声明 -----//
    //路径
    private PointsVector: Array<_kits.Enemy.Point> = [];
    //路径
    private PointsVector1: Array<_kits.Enemy.Point> = [];
    //路径
    private PointsVector2: Array<_kits.Enemy.Point> = [];
    //----- 生命周期 -----//
    onLoad () {
        var url = "test2";
        var _type = cc.RawAsset;
        cc.loader.loadRes(url, _type,(err, res) =>{
            cc.log(res);
            var i = JSON.stringify(res);
            cc.log(i);
            cc.log(res.json);
            for(let i = 0; i < res.json.Points.length; i++)
            {
                let pos = cc.v2(res.json.Points[i].Pos[0],res.json.Points[i].Pos[1]);
                let roundPos;
                if(res.json.Points[i].roundPos)
                {
                    roundPos = cc.v2(res.json.Points[i].roundPos[0],res.json.Points[i].roundPos[1]);
                }
                else
                {
                    roundPos = null;
                }
                let point:_kits.Enemy.Point = {
                    Pos: pos,
                    roundPos: roundPos,
                }
                this.PointsVector1.push(point);
            }
        });
        var url = "test2";
        cc.loader.loadRes(url, _type,(err, res) =>{
            cc.log(res);
            var i = JSON.stringify(res);
            cc.log(i);
            cc.log(res.json);
            for(let i = 0; i < res.json.Points.length; i++)
            {
                let pos = cc.v2(res.json.Points[i].Pos[0],res.json.Points[i].Pos[1]);
                let roundPos;
                if(res.json.Points[i].roundPos)
                {
                    roundPos = cc.v2(res.json.Points[i].roundPos[0],res.json.Points[i].roundPos[1]);
                }
                else
                {
                    roundPos = null;
                }
                let point:_kits.Enemy.Point = {
                    Pos: pos,
                    roundPos: roundPos,
                }
                this.PointsVector2.push(point);
            }
        });
        lib.msgEvent.getinstance().addEvent(lib.msgConfig.stageChange,"stageChange",this);
    }

    // start () {
    // }

    // update (dt) {}
    onDestroy(){
        lib.msgEvent.getinstance().removeEvent(lib.msgConfig.stageChange,"stageChange",this);
    }
    //----- 按钮回调 -----//
    //----- 事件回调 -----//
    //----- 公有方法 -----//
    startCreate(Quantity:number,GetGold:number,HP:number,type:number){
        this.schedule(()=>{
            this._createEnemy(GetGold,HP,type);
        },0.6,Quantity - 1,3);
        this.scheduleOnce(()=>{
            GameManager.getinstance().createEnd();
        },0.6 * (Quantity - 1) + 3);
    }
    //----- 私有方法 -----//
    private _createEnemy(GetGold:number,HP:number,type:number){
        let enemy:cc.Node = nodePool.getinstance().createEnemy(this.enemyPfb);
        // let color = lib.RandomParameters.RandomParameters.getRandomInt(lib.defConfig.TowerColorEnum.length);
        enemy.getComponent(enemyCon).init(this.PointsVector,GetGold,HP,type);
        enemy.parent = this.enemyLayer;
        GameManager.getinstance().pushMonsterVector(enemy);
    }

    private stageChange(num){
        if(num == 0)
        {
            this.PointsVector = this.PointsVector1;
        }
        else
        {
            this.PointsVector = this.PointsVector2;
        }
    }
}
