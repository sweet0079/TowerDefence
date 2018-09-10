/** 单个防御塔的攻击相关控制组件 */
import GameManager from '../Manager/GameManager'
import enemyControl from './enemy'

const {ccclass, property} = cc._decorator;

@ccclass
export default class TowerAttack extends cc.Component {

    //----- 编辑器属性 -----//
    /** 子弹预制体 */
    @property({tooltip:"子弹预制体", type: cc.Prefab }) bullet:cc.Prefab = null;
    //----- 属性声明 -----//
    //攻击力
    private att: number = 1;
    //范围
    private range: number = 300;
    //攻击间隔
    private speed: number = 0.78;
    //已间隔时间
    private time: number = this.speed;
    //敌人数组
    private EnemyList: Array<cc.Node> = [];
    //----- 生命周期 -----//
    start () {
        this.node.getComponent(cc.CircleCollider).radius = this.range;
    }

    update(dt) {
        this.time += dt;
        if(this.time > this.speed)
        {
            this.time = 0;
            this.rotateAndShoot();
        }
    }

    onCollisionEnter(other:cc.Collider, self:cc.Collider){
        this.EnemyList.push(other.node);
    }

    onCollisionExit(other:cc.Collider, self:cc.Collider) {
        let index = this.EnemyList.indexOf(other.node);
        if (index > -1) {
            // console.log("del");
            this.EnemyList.splice(index, 1);
            // console.log(this.shapeArr);
        }
    }
    //----- 公有方法 -----//
    //初始化
    init(){
        this.time = 0;
    }
    //----- 私有方法 -----//
    //获得节点间的距离
    private getDistance(SelfPos:cc.Vec2,OtherPos:cc.Vec2){
        let distance = Math.sqrt(Math.pow(SelfPos.x - OtherPos.x,2) + Math.pow(SelfPos.y - OtherPos.y,2));
        return distance;
    }

    // //获取距离最近的敌人
    // private checkNearestEnemy()
    // {
    //     let enemyVector = GameManager.getinstance().getMonsterVector();
        
    //     let currMinDistant = this.range;
        
    //     let enemyTemp = null;
    //     for(let i = 0; i < enemyVector.length; i++)
    //     {
    //         let enemy = enemyVector[i];
    //         let distance = this.getDistance(this.node.position,enemy.position);
            
    //         if (distance < currMinDistant) 
    //         {
    //             currMinDistant = distance;
    //             enemyTemp = enemy;
    //         }
    //     }
    //     this.EnemyList[0] = enemyTemp;
    // }

    //根据向量获得角度
    private getAngle(vec:cc.Vec2){
        return Math.atan2(vec.y, vec.x);
    }

    //旋转并射击
    private rotateAndShoot(){
        // this.checkNearestEnemy();
        if (this.EnemyList[0])
        {
            let currEnemy = this.EnemyList[0];
            let rotateVector:cc.Vec2 = currEnemy.getPosition().sub(this.node.getPosition());
            let rotateRadians = this.getAngle(rotateVector);
            let rotateDegrees = ((-1 * rotateRadians) * 57.29577951) + 90;
            // 3
            // let speed = 0.5 / Math.PI;
            // let rotateDuration = Math.abs(rotateRadians * speed);
            let rotateDuration = this.speed / 4;
            // 4
            this.node.runAction(
                cc.sequence(
                    cc.rotateTo(rotateDuration, rotateDegrees),
                        cc.callFunc(()=>{
                            this.shoot(currEnemy,this.att);
                            })));
        }
    }

    //攻击
    private shoot(enemy:cc.Node,damage:number)
    {
        let currBullet = this.ArrowTowerBullet();
        
        let moveDuration = this.speed / 4;
        // let shootVector:cc.Vec2 = this.EnemyList[0].getPosition().sub(this.node.getPosition());
        // let normalizedShootVector:cc.Vec2 = shootVector.normalizeSelf().mul(-1);
        
        // let farthestDistance = cc.director.getVisibleSize().width;
        // let overshotVector = normalizedShootVector.mul(farthestDistance);
        // let offscreenPoint = this.node.getPosition().sub(overshotVector);
        let offscreenPoint = enemy.getPosition();

        currBullet.runAction(cc.sequence(
            cc.moveTo(moveDuration, offscreenPoint),
                cc.callFunc(()=>{
                    enemy.getComponent(enemyControl).minHp(damage);
                    currBullet.destroy();
                    })));
    }

    //生成子弹
    private ArrowTowerBullet()
    {
        let bullet = cc.instantiate(this.bullet);
        bullet.rotation = this.node.rotation;
        bullet.setPosition(this.node.getPosition());
        bullet.zIndex = -1;
        this.node.parent.addChild(bullet);
        return bullet;
    }
}
