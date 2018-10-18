/** 经验值控制组件 */
import * as lib from '../lib/lib';

const {ccclass, property} = cc._decorator;

@ccclass
export default class ExperienceControl extends cc.Component {
    //----- 编辑器属性 -----//
    //经验值进度条
    @property(cc.Sprite) ExperienceSprite: cc.Sprite = null;
    //等级数字Label组件
    @property(cc.Label) LevelNum: cc.Label = null;
    //LevelUp动画组件
    @property(cc.Animation) LevelUpAni: cc.Animation = null;
    //----- 属性声明 -----//
    //当前经验值
    private experience: number = 0;
    //当前等级
    private level: number = 0;
    //升下一级需要的经验
    private NeedExp: number = 0;
    //----- 生命周期 -----//

    // onLoad () {}

    start () {
        lib.msgEvent.getinstance().addEvent(lib.msgConfig.addExp,"addExp",this);
        let tempexperience:number = parseInt(cc.sys.localStorage.getItem('Experience'));
        if(!tempexperience)
        {
            tempexperience = 0;
        }
        this.experience = tempexperience;
        this.level = this.CalLevel();
        this.ShowExperience();
    }

    // update (dt) {}

    onDestroy(){
        lib.msgEvent.getinstance().removeEvent(lib.msgConfig.addExp,"addExp",this);
    }
    //----- 按钮回调 -----//
    //----- 事件回调 -----//
    private addExp(num){
        this.experience += num;
        let sumExp = 0;
        if(this.level == 2)
        {
            sumExp = 10;
        }
        else
        {
            sumExp = (10 + this.level * 5) * (this.level - 1) / 2;
        }
        if(this.experience - sumExp >= this.NeedExp)
        {
            this.levelUp();
        }
        this.ShowExperience();
        cc.sys.localStorage.setItem('Experience', this.experience.toString());
    }
    //----- 公有方法 -----//
    //----- 私有方法 -----//
    //升级
    private levelUp(){
        this.level++;
        this.LevelUpAni.node.active = true;
        this.LevelUpAni.once('finished',()=>{
            this.LevelUpAni.node.active = false;
            lib.msgEvent.getinstance().emit(lib.msgConfig.levelUp);
            this.ShowExperience();
        },this);
        this.LevelUpAni.play();
    }

    //显示经验值精度条和等级
    private ShowExperience(){
        this.LevelNum.string = this.level.toString();
        let sumExp = 0;
        if(this.level == 2)
        {
            sumExp = 10;
        }
        else
        {
            sumExp = (10 + this.level * 5) * (this.level - 1) / 2;
        }
        let nowExp = this.experience - sumExp;
        this.NeedExp = this.level * 5 + 5;
        this.ExperienceSprite.fillRange = nowExp / this.NeedExp;
    }

    //根据总经验值计算当前等级
    private CalLevel(){
        let temp = 0;
        let sum = 0;
        while(sum <= this.experience)
        {
            temp++;
            sum += temp * 5 + 5;
        }
        return temp;
    }
}
