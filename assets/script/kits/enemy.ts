/** 单个敌人的控制组件 */
import GameManager from '../Manager/GameManager'

const {ccclass, property} = cc._decorator;

@ccclass
export default class enemy extends cc.Component {
    //----- 编辑器属性 -----//
    //----- 属性声明 -----//
    //生命最大值
    private maxHp: number = 10;
    //当前生命
    private currHp: number = this.maxHp;
    //移动速度
    private runSpeed: number = 200;
    //路径
    private PointsVector: Array<_kits.Enemy.Point> = [];
    //----- 生命周期 -----//
    start () {
        GameManager.getinstance().pushMonsterVector(this.node);
        var url = "test"
        var _type = cc.RawAsset;
        cc.loader.loadRes(url, _type,(err, res) =>{
            cc.log(res);
            var i = JSON.stringify(res);
            cc.log(i);
            cc.log(res.Points);
            for(let i = 0; i < res.Points.length; i++)
            {
                let pos = cc.v2(res.Points[i].Pos[0],res.Points[i].Pos[1]);
                let roundPos;
                if(res.Points[i].roundPos)
                {
                    roundPos = cc.v2(res.Points[i].roundPos[0],res.Points[i].roundPos[1]);
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
        this.node.setPosition(cc.v2(0,-960));
        // let point1:_kits.Enemy.Point = {
        //     Pos: cc.v2(0,-650),
        //     roundPos: null,
        // }
        // this.PointsVector.push(point1);
        // let point2:_kits.Enemy.Point = {
        //     Pos: cc.v2(-200,-650),
        //     roundPos: null,
        // }
        // this.PointsVector.push(point2);
        // let point3:_kits.Enemy.Point = {
        //     Pos: cc.v2(-350,-500),
        //     roundPos: cc.v2(-200,-500),
        // }
        // this.PointsVector.push(point3);
        // let point4:_kits.Enemy.Point = {
        //     Pos: cc.v2(-200,-350),
        //     roundPos: cc.v2(-200,-500),
        // }
        // this.PointsVector.push(point4);
        // let point5:_kits.Enemy.Point = {
        //     Pos: cc.v2(200,-350),
        //     roundPos: null,
        // }
        // this.PointsVector.push(point5);
        // let point6:_kits.Enemy.Point = {
        //     Pos: cc.v2(350,-200),
        //     roundPos: cc.v2(200,-200),
        // }
        // this.PointsVector.push(point6);
        // let point7:_kits.Enemy.Point = {
        //     Pos: cc.v2(200,-50),
        //     roundPos: cc.v2(200,-200),
        // }
        // this.PointsVector.push(point7);
        // let point8:_kits.Enemy.Point = {
        //     Pos: cc.v2(-200,-50),
        //     roundPos: null,
        // }
        // this.PointsVector.push(point8);
        // this.schedule(()=>{
        //     this.flyToPoint(0.1,this.PointsVector[0].Pos,this.PointsVector[0].roundPos);
        // },1);
    }

    update(dt) {
        if(this.PointsVector.length >= 1)
        {
            this.flyToPoint(dt,this.PointsVector[0].Pos,this.PointsVector[0].roundPos);
            if(this.AboutEqualPos(this.PointsVector[0].Pos,this.node.getPosition()))
            {
                this.node.position = this.PointsVector[0].Pos;
                this.PointsVector.splice(0, 1);
            }
        }
    }
    //----- 公有方法 -----//
    minHp(damage:number){
        this.currHp -= damage;
        console.log("minhp");
    }
    //----- 私有方法 -----//
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
                    this.node.y += this.runSpeed * dt * Math.cos(angle);
                }
                else
                {
                    this.node.x -= this.runSpeed * dt * Math.abs(Math.sin(angle));
                    this.node.y += this.runSpeed * dt * Math.cos(angle);
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
        if(Math.abs(posA.x - posB.x) < 5
        && Math.abs(posA.y - posB.y) < 5)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
}
