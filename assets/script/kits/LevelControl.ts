/** 关卡相关控制组件 */
import * as lib from '../lib/lib'
import itemsCon from './itemsCon'
import slotsCon from './slotsCon'
import enemysCon from './enemysCon'
import uiCon from './UIControl'
import JsonManager from '../Manager/JsonReaderManager'
import GameManager from '../Manager/GameManager';

const {ccclass, property} = cc._decorator;

@ccclass
export default class LevelControl extends cc.Component {

    //----- 编辑器属性 -----//
    //合成槽控制组件
    @property(itemsCon) itemsControl: itemsCon = null;
    //攻击槽控制组件
    @property(slotsCon) slotsControl: slotsCon = null;
    //敌人控制组件
    @property(enemysCon) enemysControl: enemysCon = null;
    //UI控制组件
    @property(uiCon) uiControl: uiCon = null;
    //----- 属性声明 -----//
    //失败后返回的关卡
    private FailLevel:number = 1;
    //当前大关
    private StageNum:number = 0;
    //----- 生命周期 -----//
    onLoad () {
        //读取相关json
        JsonManager.getinstance();
        lib.msgEvent.getinstance().addEvent(lib.msgConfig.nextlevel,"nextlevel",this);
        lib.msgEvent.getinstance().addEvent(lib.msgConfig.gameover,"failsetlevel",this);
    }
    
    start () {
        let tempLevel = GameManager.getinstance().getLevel();
        if(tempLevel >= JsonManager.getinstance().getLevelobj(0).length)
        {   
            this.StageNum = 1;
        }
        lib.msgEvent.getinstance().emit(lib.msgConfig.stageChange,this.StageNum);
        this.FailLevel = this.setlevel(tempLevel,false);
    }

    onDestroy(){
        lib.msgEvent.getinstance().removeEvent(lib.msgConfig.nextlevel,"nextlevel",this);
        lib.msgEvent.getinstance().removeEvent(lib.msgConfig.gameover,"failsetlevel",this);
    }
    //----- 按钮回调 -----//
    //----- 事件回调 -----//
    private nextlevel(num){
        console.log("nextlevel");
        if(num >= JsonManager.getinstance().getLevelobj(0).length)
        {   
            this.StageNum = 1;
        }
        lib.msgEvent.getinstance().emit(lib.msgConfig.stageChange,this.StageNum);
        let temp = this.setlevel(num);
        if(this.FailLevel != temp)
        {
            this.FailLevel = temp;
            lib.msgEvent.getinstance().emit(lib.msgConfig.showRoundLabel,this.FailLevel - 1);
            console.log("this.FailLevel = " + this.FailLevel);
        }
    }
    //----- 公有方法 -----//
    //----- 私有方法 -----//

    private setlevel(num,isShowAni:boolean = true){
        console.log("setlevel");
        let temp = 0;
        if(this.StageNum == 1)
        {
            num -= (JsonManager.getinstance().getLevelobj(0).length);
        }
        if(num >= JsonManager.getinstance().getLevelobj(this.StageNum).length - 1)
        {
            num = JsonManager.getinstance().getLevelobj(this.StageNum).length - 1;
        }
        // this.itemsControl.setAct(parseInt(JsonManager.getinstance().getLevelobj(this.StageNum)[num].Upgrade));
        this.itemsControl.setprice(parseInt(JsonManager.getinstance().getLevelobj(this.StageNum)[num].TowerGold));
        // this.itemsControl.setinital(parseInt(JsonManager.getinstance().getLevelobj(this.StageNum)[num].initial));
        this.slotsControl.setAct(parseInt(JsonManager.getinstance().getLevelobj(this.StageNum)[num].TowerQuantity));
        this.enemysControl.startCreate(parseInt(JsonManager.getinstance().getLevelobj(this.StageNum)[num].Quantity),
                                        parseInt(JsonManager.getinstance().getLevelobj(this.StageNum)[num].GetGold),
                                        parseInt(JsonManager.getinstance().getLevelobj(this.StageNum)[num].HP)
                                        ,parseInt(JsonManager.getinstance().getLevelobj(this.StageNum)[num].monsterID));
        temp = this.uiControl.showLevel(parseInt(JsonManager.getinstance().getLevelobj(this.StageNum)[num].stage1),3 + this.StageNum,isShowAni);
        GameManager.getinstance().initEnd();
        return temp;
    }

    private failsetlevel(){
        let temp = (this.FailLevel - 1) * 4;
        if(this.StageNum == 1)
        {
            temp = (this.FailLevel - 1) * 5;
            temp += JsonManager.getinstance().getLevelobj(0).length;
        }
        GameManager.getinstance().setLevel(temp);
        lib.msgEvent.getinstance().emit(lib.msgConfig.showFailLabel);
        this.scheduleOnce(()=>{
            this.setlevel(temp);
            lib.msgEvent.getinstance().emit(lib.msgConfig.showGroupLabel,0);
        },1);
    }
}
