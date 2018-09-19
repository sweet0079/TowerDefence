/** json获取管理器脚本 */
export default class JsonReaderManager {
    static instance: JsonReaderManager
    /** 获取单例 */
    static getinstance() {
        if (JsonReaderManager.instance) return JsonReaderManager.instance;
        else return new JsonReaderManager();
    }
    /** 返回一个新的单例 */
    static newinstance() {
        return new JsonReaderManager();
    }

    private constructor() {
        JsonReaderManager.instance = this;
        this.readTowerJson();
        this.readLevelJson();
        this.readEnemyJson();
    }

    private Towerobj:Array<_kits.JSON.Tower>;
    private Levelobj1:Array<_kits.JSON.Level>;
    private Levelobj2:Array<_kits.JSON.Level>;
    private Enemyobj:Array<_kits.JSON.Enemy>;

    readTowerJson(){
        var url = "tower";
        var _type = cc.RawAsset;
        cc.loader.loadRes(url, _type,(err, res) =>{
            cc.log(res);
            var i = JSON.stringify(res);
            cc.log(i);
            cc.log(res.json);
            this.Towerobj = res.json;
        });
    }

    getTowerobj(){
        return this.Towerobj;
    }

    readLevelJson(){
        var url = "level";
        var _type = cc.RawAsset;
        cc.loader.loadRes(url, _type,(err, res) =>{
            cc.log(res);
            var i = JSON.stringify(res);
            cc.log(i);
            cc.log(res.json);
            this.Levelobj1 = res.json;
        });
        url = "level2";
        cc.loader.loadRes(url, _type,(err, res) =>{
            cc.log(res);
            var i = JSON.stringify(res);
            cc.log(i);
            cc.log(res.json);
            this.Levelobj2 = res.json;
        });
    }

    getLevelobj(num){
        if(num == 0)
        {
            return this.Levelobj1;
        }
        else
        {
            return this.Levelobj2;
        }
    }

    readEnemyJson(){
        var url = "enemy";
        var _type = cc.RawAsset;
        cc.loader.loadRes(url, _type,(err, res) =>{
            cc.log(res);
            var i = JSON.stringify(res);
            cc.log(i);
            cc.log(res.json);
            this.Enemyobj = res.json;
        });
    }

    getEnemyobj(){
        return this.Enemyobj;
    }
}