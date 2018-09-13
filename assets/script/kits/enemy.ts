/** 单个敌人的控制组件 */
import * as lib from '../lib/lib'
import nodePool from '../Manager/NodePoolInstance'
import GameManager from '../Manager/GameManager'
import JsonManager from '../Manager/JsonReaderManager'

const {ccclass, property} = cc._decorator;

@ccclass
export default class enemy extends cc.Component {
    //----- 编辑器属性 -----//
    //----- 属性声明 -----//
    //生命最大值
    private maxHp: number = 1000;
    //当前生命
    private currHp: number = this.maxHp;
    //死亡掉落的钱
    private gold: number = 0;
    //移动速度
    private runSpeed: number = 230;
    //路径
    private PointsVector: Array<_kits.Enemy.Point> = [];
    //减速倍数
    private Slow: number = 1;

    
    //格挡率
    private block: number = 1;
    //格挡塔的类型
    private Corresponding: number = 1;
    //----- 生命周期 -----//
    start () {
    }

    update(dt) {
        if(this.PointsVector.length >= 1)
        {
            this.flyToPoint(dt * this.Slow,this.PointsVector[0].Pos,this.PointsVector[0].roundPos);
            if(this.AboutEqualPos(this.PointsVector[0].Pos,this.node.getPosition()))
            {
                this.node.position = this.PointsVector[0].Pos;
                this.PointsVector.splice(0, 1);
            }
        }
    }
    //----- 公有方法 -----//
    /** 初始化 */
    init(Points:Array<_kits.Enemy.Point>,gold:number,hp:number,type:number){
        this.PointsVector = [];
        this.gold = gold;
        this.maxHp = hp;
        this.node.setPosition(cc.v2(30,-492));
        this.currHp = this.maxHp;
        let JsonObj = JsonManager.getinstance().getEnemyobj()[type]; 
        this.runSpeed = parseInt(JsonObj.speed);
        this.block = parseFloat(JsonObj.block);
        this.Corresponding = parseInt(JsonObj.Corresponding);
        for(let i = 0; i < Points.length; i++)
        {
            this.PointsVector.push(Points[i]);
        }
    }

    shooted(damage:number,type:number){
        this._minHp(damage);
    }

    //----- 私有方法 -----//
    /** 掉血 */
    private _minHp(damage:number){
        this.currHp -= damage;
        if(this.currHp <= 0)
        {
            this.die();
        }
    }
    //死亡
    private die(){
        GameManager.getinstance().addMoney(this.gold);
        GameManager.getinstance().delMonsterVector(this.node);
        nodePool.getinstance().dissEnemy(this.node);
    }
    //飞向某个点
    private flyToPoint(dt,pos:cc.Vec2,roundPos?:cc.Vec2){
        if(roundPos)
        {
            if(parseInt(roundPos.x.toString()) == parseInt(this.node.x.toString()))
            {
                if(pos.x > this.node.x)
                {
                    this.node.x += Math.abs(this.runSpeed) * dt;
                }
                else
                {
                    this.node.x -= Math.abs(this.runSpeed) * dt;
                }
            }
            else
            {
                let angle = Math.atan((this.node.y - roundPos.y) / (this.node.x - roundPos.x));
                if(this.node.x < pos.x)
                {
                    this.node.x += this.runSpeed * dt * Math.abs(Math.sin(angle));
                    if(this.node.y < pos.y)
                    {
                        this.node.y += this.runSpeed * dt * Math.cos(angle);
                    }
                    else
                    {
                        this.node.y -= this.runSpeed * dt * Math.cos(angle);
                    }
                }
                else
                {
                    this.node.x -= this.runSpeed * dt * Math.abs(Math.sin(angle));
                    if(this.node.y < pos.y)
                    {
                        this.node.y += this.runSpeed * dt * Math.cos(angle);
                    }
                    else
                    {
                        this.node.y -= this.runSpeed * dt * Math.cos(angle);
                    }
                }
            }
        }
        else
        {
            if(parseInt(pos.x.toString()) == parseInt(this.node.x.toString()))
            {
                if(pos.y > this.node.y)
                {
                    this.node.y += Math.abs(this.runSpeed) * dt;
                }
                else
                {
                    this.node.y -= Math.abs(this.runSpeed) * dt;
                }
            }
            else
            {
                let angle = Math.atan((this.node.y - pos.y) / (this.node.x - pos.x));
                if(this.node.x < pos.x)
                {
                    this.node.x += this.runSpeed * dt * Math.cos(angle);
                    this.node.y += this.runSpeed * dt * Math.sin(angle);
                }
                else
                {
                    this.node.x -= this.runSpeed * dt * Math.cos(angle);
                    this.node.y -= this.runSpeed * dt * Math.sin(angle);
                }
            }
            // if(this.node.x < pos.x)
            // console.log(dt);
            // console.log(Math.abs(this.runSpeed));
            // console.log(Math.abs(this.runSpeed) * dt * Math.sin(angle));
            // else
            // {
            //     this.node.x -= Math.abs(this.runSpeed) * dt * Math.cos(angle);
            //     this.node.y -= Math.abs(this.runSpeed) * dt * Math.sin(angle);
            // }
        }
    }

    /** 判断两个坐标是否相近的方法 */
    private AboutEqualPos(posA:cc.Vec2,posB:cc.Vec2){
        if(Math.abs(posA.x - posB.x) < 6
        && Math.abs(posA.y - posB.y) < 6)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
}
