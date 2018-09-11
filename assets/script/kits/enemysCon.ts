/** 敌人管理组件 */
import * as lib from '../lib/lib'
import enemyControl from './enemy'
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
    //----- 生命周期 -----//

    // onLoad () {}

    start () {
        this.schedule(()=>{
            this.createEnemy();
        },0.6);
        var url = "test"
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
                this.PointsVector.push(point);
            }
        });
    }

    // update (dt) {}
    //----- 按钮回调 -----//
    //----- 事件回调 -----//
    //----- 公有方法 -----//
    //----- 私有方法 -----//
    private createEnemy(){
        let enemy = nodePool.getinstance().createEnemy(this.enemyPfb);
        // let color = lib.RandomParameters.RandomParameters.getRandomInt(lib.defConfig.TowerColorEnum.length);
        enemy.getComponent(enemyControl).init(this.PointsVector);
        enemy.parent = this.enemyLayer;
    }
}
