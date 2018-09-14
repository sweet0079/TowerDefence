/** 单个敌人的控制组件 */
import * as lib from '../lib/lib'
import nodePool from '../Manager/NodePoolInstance'
import GameManager from '../Manager/GameManager'
import JsonManager from '../Manager/JsonReaderManager'

const {ccclass, property} = cc._decorator;

@ccclass
export default class enemy extends cc.Component {
    //----- 编辑器属性 -----//
    //被红球攻击
    @property(cc.Animation) redBeat: cc.Animation = null;
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
    //已经死亡
    private isDie: boolean = false;
    //减速倍数
    private Slow: number = 1;


    
    //格挡率
    private block: number = 1;
    //格挡塔的类型
    private Corresponding: number = 1;
    //减速率
    private slowRadius: number = 1;
    //aoe范围
    private AoeLength: number = 1;

    //中毒伤害
    private bePoisionDamage: number = 0;
    //----- 生命周期 -----//
    start () {
        this.slowRadius = parseFloat(JsonManager.getinstance().getTowerobj()[2].splashRadius);
        this.AoeLength = parseInt(JsonManager.getinstance().getTowerobj()[3].aoeLenght);
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
        else
        {
            this.complete();
        }
    }
    //----- 公有方法 -----//
    /** 初始化 */
    init(Points:Array<_kits.Enemy.Point>,gold:number,hp:number,type:number){
        this.isDie = false;
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
        this.initBeat();
    }

    shooted(damage:number,type:number){
        if(this.isDie)
        {
            return;
        }
        if(type == this.Corresponding)
        {
            damage *= this.block;
        }
        // switch(type){
        //     case lib.defConfig.TowerColorEnum.red:
        //         this._minHp(damage * 10);
        //         this.ShowredBeat();
        //         break;
        //     case lib.defConfig.TowerColorEnum.green:
        //         this.poison(damage * 2);
        //         this._minHp(damage * 8);
        //         break;
        //     case lib.defConfig.TowerColorEnum.blue:
        //         this.slowFun(this.slowRadius,1);
        //         this._minHp(damage * 7);
        //         break;
        //     case lib.defConfig.TowerColorEnum.purple:
        //         this.AOE(damage * 15,this.AoeLength);
        //         this._minHp(damage * 7);
        //         break;
        //     default:
        //         break;
        // }
        if(type == lib.defConfig.TowerColorEnum.red)
        {
            this._minHp(damage * 10);
            this.ShowredBeat();
        }
        else if(type == lib.defConfig.TowerColorEnum.green)
        {
            this.poison(damage * 2);
            this._minHp(damage * 8);
        }
        else if(type == lib.defConfig.TowerColorEnum.blue)
        {
            this.slowFun(this.slowRadius,1);
            this._minHp(damage * 7);
        }
        else if(type == lib.defConfig.TowerColorEnum.purple)
        {
            this.AOE(damage * 15,this.AoeLength);
            this._minHp(damage * 7);
        }
    }

    aoeed(damage:number){
        if(lib.defConfig.TowerColorEnum.purple == this.Corresponding)
        {
            damage *= this.block;
        }
        this._minHp(damage);
    }

    //----- 私有方法 -----//
    /** 初始化所有被击动画组件及特殊效果计时器 */
    private initBeat(){
        this.redBeat.stop();
        this.redBeat.node.opacity = 0;
        this.unschedule(this.initSlow);
        this.unschedule(this.poisionDamage);
        this.initSlow();
    }
    /** 被红塔攻击 */
    private ShowredBeat(){
        this.redBeat.play();
    }

    /** AOE */
    private AOE(damage,aoeLenght){
        if(this.isDie)
        {
            return;
        }
        let arr = GameManager.getinstance().getMonsterVector();
        for(let i = 0; i < arr.length; i++)
        {
            if(Math.abs(arr[i].x - this.node.x) > aoeLenght + this.node.width / 2)
            {
                continue;
            }
            else if(Math.abs(arr[i].y - this.node.y) > aoeLenght + this.node.width / 2)
            {
                continue;
            }
            else if(Math.sqrt(Math.pow((arr[i].x - this.node.x),2) + Math.pow((arr[i].y - this.node.y),2)) <= aoeLenght + this.node.width / 2)
            {
                arr[i].getComponent(enemy).aoeed(damage);
            }
        }
    }

    /** 减速结束 */
    private initSlow(){
        this.Slow = 1;
    }

    /** 减速 */
    private slowFun(Radius,time){
        if(this.Slow != 1)
        {
            this.unschedule(this.initSlow);
        }
        this.Slow = Radius;
        this.scheduleOnce(this.initSlow,time);
    }

    /** 中毒 */
    private poison(damage){
        if(this.bePoisionDamage)
        {
            this.unschedule(this.poisionDamage);
        }
        this.schedule(this.poisionDamage,1,2,1);
        this.bePoisionDamage = damage;
    }

    /** 中毒跳伤害 */
    private poisionDamage(){
        this._minHp(this.bePoisionDamage);
    }

    /** 掉血 */
    private _minHp(damage:number){
        this.currHp -= damage;
        if(this.currHp <= 0)
        {
            this.die();
        }
    }
    //走到终点
    private complete(){
        console.log("game over");
        // GameManager.getinstance().addMoney(this.gold);
        // GameManager.getinstance().delMonsterVector(this.node);
        // nodePool.getinstance().dissEnemy(this.node);
    }
    //死亡
    private die(){
        this.isDie = true;
        let _GameManager = GameManager.getinstance();
        _GameManager.addMoney(this.gold);
        _GameManager.delMonsterVector(this.node);
        if(_GameManager.isEnd()
        && _GameManager.getMonsterVector().length == 0)
        {
            _GameManager.addLevel();
            console.log("_GameManager.getLevel() = " + _GameManager.getLevel());
            console.log("过关");
            lib.msgEvent.getinstance().emit(lib.msgConfig.nextlevel,_GameManager.getLevel());
            _GameManager.initEnd();
        }
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
