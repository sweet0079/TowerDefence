/** RoundLabel控制组件 */
import * as lib from '../lib/lib';

const {ccclass, property} = cc._decorator;

@ccclass
export default class RoundLabelControl extends cc.Component {
    //----- 编辑器属性 -----//
    //关卡数label节点
    @property(cc.Sprite) levelLabel: cc.Sprite = null;
    //关卡数label图集
    @property([cc.SpriteFrame]) levelLabelSpfArr: Array<cc.SpriteFrame> = [];
    //关卡数label进度条
    @property(cc.Sprite) levelLabelBack: cc.Sprite = null;
    //钩Node节点
    @property(cc.Node) GouNode: cc.Node = null;
    //ExpStar Node节点
    @property(cc.Node) ExpStar: cc.Node = null;
    //levelBackNode节点
    @property(cc.Node) levelBackNode: cc.Node = null;
    //关卡点组件
    @property([cc.Node]) levelnodeArr: Array<cc.Node> = [];
    //boss关卡点组件
    @property(cc.Sprite) bosslevelnode: cc.Sprite = null;
    //关卡点未完成图片
    @property(cc.SpriteFrame) levelUnfinishedSpf: cc.SpriteFrame = null;
    //关卡点完成图片
    @property(cc.SpriteFrame) levelFinishedSpf: cc.SpriteFrame = null;
    //关卡点进行中图片
    @property(cc.SpriteFrame) levelDoingSpf: cc.SpriteFrame = null;
    //boss关卡点未完成图片
    @property(cc.SpriteFrame) bosslevelUnfinishedSpf: cc.SpriteFrame = null;
    //boss关卡点进行中图片
    @property(cc.SpriteFrame) bosslevelDoingSpf: cc.SpriteFrame = null;
    //----- 属性声明 -----//
    private activeLevelNodeArr:Array<cc.Node> = [];
    //----- 生命周期 -----//

    // onLoad () {}

    start () {

    }

    // update (dt) {}
    //----- 按钮回调 -----//
    //----- 事件回调 -----//
    //----- 公有方法 -----//
    showBossExpAni(){
        this.ExpStar.setPosition(this.bosslevelnode.node.getPosition());
        let starJumpaction = cc.spawn(cc.jumpTo(0.5,-258,10,-100,1),cc.scaleTo(0.5,0.3));
        let staraction = cc.sequence(starJumpaction,cc.callFunc(()=>{
            lib.msgEvent.getinstance().emit(lib.msgConfig.addExp,2);
            this.ExpStar.active = false;
        }));
        this.ExpStar.active = true;
        this.ExpStar.scale = 0.75;
        this.ExpStar.runAction(staraction);
    }

    showLevel(Num:number,totalRound:number,isShowAni:boolean = true){
        let level:number = parseInt((Num / 10000).toString());//大关
        let round:number = parseInt((Num % 10000).toString());//波
        this.setact(totalRound);
        let gouMove;
        for(let i = 0 ; i < this.activeLevelNodeArr.length; i++)
        {
            if(i == round - 2)
            {
                gouMove = cc.moveTo(0.5,this.activeLevelNodeArr[i].getPosition().x,1);
                this.ExpStar.setPosition(this.activeLevelNodeArr[i].getPosition());
            }
        }
        if(gouMove && isShowAni)
        {
            let starJumpaction = cc.spawn(cc.jumpTo(0.5,-258,10,-100,1),cc.scaleTo(0.5,0.3));
            let staraction = cc.sequence(starJumpaction,cc.callFunc(()=>{
                lib.msgEvent.getinstance().emit(lib.msgConfig.addExp,2);
                this.ExpStar.active = false;
            }));
            this.GouNode.setPosition(0,-410);
            this.GouNode.scale = 1;
            this.GouNode.active = true;
            let Gouspawn = cc.spawn(cc.scaleTo(0.5,0.15),cc.callFunc(()=>{
                this.ExpStar.active = true;
                this.ExpStar.scale = 0.75;
                this.ExpStar.runAction(staraction);
                this.updateLabel(level,round);
                this.scheduleOnce(()=>{
                    lib.msgEvent.getinstance().emit(lib.msgConfig.showGroupLabel,round - 1);
                    this.GouNode.active = false;
                },0.5);
            }));
            let Gouact = cc.sequence(gouMove,Gouspawn);
            this.GouNode.runAction(Gouact);
        }
        else
        {   
            this.updateLabel(level,round);
        }
        return level;
    }
    //----- 私有方法 -----//
    private updateLabel(level:number,round:number){
        let act;
        for(let i = 0 ; i < this.activeLevelNodeArr.length; i++)
        {
            if(i < round - 1)
            {
                this.activeLevelNodeArr[i].getComponent(cc.Sprite).spriteFrame = this.levelFinishedSpf;
            }
            else if(i == round - 1)
            {
                if(this.levelBackNode.scaleX == 1)
                {
                    act = cc.moveTo(0.5,this.activeLevelNodeArr[i].getPosition().x,1);
                }
                else
                {
                    act = cc.spawn(cc.moveTo(0.5,this.activeLevelNodeArr[i].getPosition().x,1),cc.scaleTo(0.5,1,1));
                }
                this.activeLevelNodeArr[i].getComponent(cc.Sprite).spriteFrame = this.levelDoingSpf;
            }
            else
            {
                this.activeLevelNodeArr[i].getComponent(cc.Sprite).spriteFrame = this.levelUnfinishedSpf;
            }
        }
        if(round == this.activeLevelNodeArr.length + 1)
        {
            act = cc.spawn(cc.moveTo(0.5,this.bosslevelnode.node.getPosition().x,1),cc.scaleTo(0.5,1.7,1));
            this.bosslevelnode.spriteFrame = this.bosslevelDoingSpf;
        }
        else
        {
            this.bosslevelnode.spriteFrame = this.bosslevelUnfinishedSpf; 
        }
        if(act)
        {
            this.levelBackNode.runAction(act);
        }
        // this.levelLabel.string = "ROUND" + level + "/8";
        this.levelLabel.spriteFrame = this.levelLabelSpfArr[level - 1];
        this.levelLabelBack.fillRange = level / 8;
    }

    private setact(num:number){
        this.activeLevelNodeArr = [];
        for(let i = this.levelnodeArr.length - 1; i >= 0; i--)
        {
            if(i < this.levelnodeArr.length - num)
            {
                this.levelnodeArr[i].active = false;
            }
            else
            {
                this.levelnodeArr[i].active = true;
            }
        }
        for(let i = 0 ; i < this.levelnodeArr.length; i++)
        {
            if(this.levelnodeArr[i].active)
            {
                this.activeLevelNodeArr.push(this.levelnodeArr[i]);
            }
        }
    }
}
