/** 新手引导控制组件 */
import * as lib from '../lib/lib';
import itemsControl from "./itemsCon";
import slotsControl from "./slotsCon";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NoviceGuidanceControl extends cc.Component {

    //----- 编辑器属性 -----//
    //手
    @property(cc.Node) HandNode: cc.Node = null;
    //按钮
    @property(cc.Node) buildBtn: cc.Node = null;
    //合成区
    @property(cc.Node) itemsCont: cc.Node = null;
    //放置区
    @property(cc.Node) slotsCont: cc.Node = null;
    //垃圾桶引导动画
    @property(cc.Animation) RubbishAni: cc.Animation = null;
    //获得塔页面
    @property(cc.Node) getTowerLayer: cc.Node = null;
    //塔精灵
    @property(cc.Sprite) TowerSpr: cc.Sprite = null;
    //塔精灵
    @property(cc.Label) disLabel: cc.Label = null;
    /** 塔的图片素材 */
    @property([cc.SpriteFrame]) TowerSpfArr: Array<cc.SpriteFrame> = [];
    //----- 属性声明 -----//
    private clickNum = 0;
    private isNeeded:boolean = true;
    //----- 生命周期 -----//

    onLoad () {
        lib.msgEvent.getinstance().addEvent(lib.msgConfig.stageChange,"stageChange",this);
        lib.msgEvent.getinstance().addEvent(lib.msgConfig.firstfull,"showRubbishAni",this);
        lib.msgEvent.getinstance().addEvent(lib.msgConfig.showGetTowerLayer,"showGetTowerLayer",this);
    }

    start () {       
        this.RubbishAni.on('finished',this.RubbishAniend,this);
    }

    // update (dt) {}

    onDestroy(){
        lib.msgEvent.getinstance().removeEvent(lib.msgConfig.stageChange,"stageChange",this);
        lib.msgEvent.getinstance().removeEvent(lib.msgConfig.firstfull,"showRubbishAni",this);
        lib.msgEvent.getinstance().removeEvent(lib.msgConfig.showGetTowerLayer,"showGetTowerLayer",this);
        this.RubbishAni.off('finished',this.RubbishAniend,this);
    }
    //----- 按钮回调 -----//
    closeGetTowerLayer(){
        this.getTowerLayer.active = false;
    }
    //----- 事件回调 -----//
    private showGetTowerLayer(type:number){
        this.getTowerLayer.active = true;
        this.TowerSpr.spriteFrame = this.TowerSpfArr[type];
        switch(type)
        {
            case 0:
                this.disLabel.string = "毒气炮塔";
                break;
            case 1:
                this.disLabel.string = "冰冻炮塔";
                break;
            case 2:
                this.disLabel.string = "散射炮塔";
                break;
            default:
                break;
        }
    }

    private stageChange(){
        let temp:string = cc.sys.localStorage.getItem('firstPlay');
        if(!temp)
        {
            cc.sys.localStorage.setItem('firstPlay', "false");
            this.init();
        }
        else
        {
            this.isNeeded = false;
        }
    }

    private showRubbishAni(){
        this.RubbishAni.node.active = true;
        this.RubbishAni.play();
    }
    //----- 公有方法 -----//
    clickbuild(){
        if(!this.isNeeded)
        {
            return;
        }
        this.clickNum++;
        if(this.clickNum == 2)
        {
            this.compose();
            this.isNeeded = false;
        }
    }

    init(){
        this.HandNode.active = true;
        this.HandNode.position = this.buildBtn.getPosition();
    }

    compose(){
        let act = cc.moveTo(0.75,this.itemsCont.getComponent(itemsControl).items[1].node.getPosition());
        let seq = cc.sequence(cc.callFunc(()=>{
            this.HandNode.position = this.itemsCont.getComponent(itemsControl).items[0].node.getPosition();
        }),act);
        let rep = cc.repeat(seq,3);
        let finseq = cc.sequence(rep,cc.callFunc(()=>{
            this.place();
        }));
        this.HandNode.runAction(finseq);
    }

    place(){
        let act = cc.moveTo(0.75,this.slotsCont.getComponent(slotsControl).items[2].node.getPosition());
        let seq = cc.sequence(cc.callFunc(()=>{
            this.HandNode.position = this.itemsCont.getComponent(itemsControl).items[1].node.getPosition();
        }),act);
        let rep = cc.repeat(seq,3);
        let finseq = cc.sequence(rep,cc.callFunc(()=>{
            this.HandNode.active = false;
            this.isNeeded = false;
        }));
        this.HandNode.runAction(finseq);
    }
    //----- 私有方法 -----//
    private RubbishAniend(){
        this.RubbishAni.node.active = false;
    }
}
