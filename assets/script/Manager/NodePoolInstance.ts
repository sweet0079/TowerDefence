
export default class NodePoolInstance {
    static instance: NodePoolInstance
    /** 获取单例 */
    static getinstance() {
        if (NodePoolInstance.instance) return NodePoolInstance.instance;
        else return new NodePoolInstance();
    }
    /** 返回一个新的单例 */
    static newinstance() {
        return new NodePoolInstance();
    }

    private constructor() {
        NodePoolInstance.instance = this;
        this.enemyPool = new cc.NodePool();
        this.towerPool = new cc.NodePool();
        this.damagePool = new cc.NodePool();
        this.beateffPool = new cc.NodePool();
        this.AddMoneyPool = new cc.NodePool();
    }

    //敌人对象池
    private enemyPool: cc.NodePool;
    //防御塔对象池
    private towerPool: cc.NodePool;
    //伤害数字对象池
    private damagePool: cc.NodePool;
    //打击特效对象池
    private beateffPool: cc.NodePool;
    //增加金币对象池
    private AddMoneyPool: cc.NodePool;

    createEnemy(enemyPrefab:cc.Prefab) {
        let enemy = null;
        if (this.enemyPool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
            enemy = this.enemyPool.get();
        } else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
            enemy = cc.instantiate(enemyPrefab);
        }
        return enemy;
        // shape.parent = parentNode; // 将生成的敌人加入节点树
        // enemy.getComponent('Enemy').init(); //接下来就可以调用 enemy 身上的脚本进行初始化
    }

    dissEnemy(enemy:cc.Node) {
        // enemy 应该是一个 cc.Node
        this.enemyPool.put(enemy); // 和初始化时的方法一样，将节点放进对象池，这个方法会同时调用节点的 removeFromParent
    }

    createTower(towerPrefab:cc.Prefab) {
        let tower: cc.Node = null;
        if (this.towerPool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
            tower = this.towerPool.get();
        } else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
            tower = cc.instantiate(towerPrefab);
        }
        return tower;
        // shape.parent = parentNode; // 将生成的敌人加入节点树
        // enemy.getComponent('Enemy').init(); //接下来就可以调用 enemy 身上的脚本进行初始化
    }

    dissTower(tower:cc.Node) {
        // enemy 应该是一个 cc.Node
        this.towerPool.put(tower); // 和初始化时的方法一样，将节点放进对象池，这个方法会同时调用节点的 removeFromParent
    }

    createDamageLabel(damageLabelPrefab:cc.Prefab) {
        let damageLabel: cc.Node = null;
        if (this.damagePool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
            damageLabel = this.damagePool.get();
        } else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
            damageLabel = cc.instantiate(damageLabelPrefab);
        }
        return damageLabel;
        // shape.parent = parentNode; // 将生成的敌人加入节点树
        // enemy.getComponent('Enemy').init(); //接下来就可以调用 enemy 身上的脚本进行初始化
    }

    dissDamageLabel(damageLabel:cc.Node) {
        // enemy 应该是一个 cc.Node
        this.damagePool.put(damageLabel); // 和初始化时的方法一样，将节点放进对象池，这个方法会同时调用节点的 removeFromParent
    }

    createBeatEffect(beatEffectPrefab:cc.Prefab) {
        let beatEffect: cc.Node = null;
        if (this.beateffPool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
            beatEffect = this.beateffPool.get();
        } else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
            beatEffect = cc.instantiate(beatEffectPrefab);
        }
        return beatEffect;
        // shape.parent = parentNode; // 将生成的敌人加入节点树
        // enemy.getComponent('Enemy').init(); //接下来就可以调用 enemy 身上的脚本进行初始化
    }

    dissBeatEffect(beatEffect:cc.Node) {
        // enemy 应该是一个 cc.Node
        this.beateffPool.put(beatEffect); // 和初始化时的方法一样，将节点放进对象池，这个方法会同时调用节点的 removeFromParent
    }

    createAddMoney(addMoneyPrefab:cc.Prefab) {
        let addMoney: cc.Node = null;
        if (this.AddMoneyPool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
            addMoney = this.AddMoneyPool.get();
        } else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
            addMoney = cc.instantiate(addMoneyPrefab);
        }
        return addMoney;
        // shape.parent = parentNode; // 将生成的敌人加入节点树
        // enemy.getComponent('Enemy').init(); //接下来就可以调用 enemy 身上的脚本进行初始化
    }

    dissAddMoney(addMoney:cc.Node) {
        // enemy 应该是一个 cc.Node
        this.AddMoneyPool.put(addMoney); // 和初始化时的方法一样，将节点放进对象池，这个方法会同时调用节点的 removeFromParent
    }
}