/** 过关时的动画的控制组件 */
import * as lib from '../lib/lib'

const {ccclass, property} = cc._decorator;

@ccclass
export default class ShowLabelControl extends cc.Component {

    //----- 编辑器属性 -----//
    //Group数字Animation组件
    @property(cc.Animation) GroupLabel: cc.Animation = null;
    //Group数字Sprite组件
    @property(cc.Sprite) GroupNum: cc.Sprite = null;
    //Group数字图集
    @property([cc.SpriteFrame]) GroupNumSpfArr: Array<cc.SpriteFrame> = [];
    //Round数字Node组件
    @property(cc.Node) RoundNode: cc.Node = null;
    //Round数字Sprite组件
    @property(cc.Sprite) RoundLabel: cc.Sprite = null;
    //Round数字Animation组件
    @property(cc.Animation) RoundAnimation: cc.Animation = null;
    //Round数字图集
    @property([cc.SpriteFrame]) RoundNumSpfArr: Array<cc.SpriteFrame> = [];
    //失败Animation组件
    @property(cc.Animation) FailAnimation: cc.Animation = null;
    //----- 属性声明 -----//
    
    //----- 生命周期 -----//
    // onLoad () {}

    start () {
        this.RoundAnimation.on('finished',this.hideRoundNode,this);
        this.FailAnimation.on('finished',this.hideFailNode,this);
    }

    // update (dt) {}

    onDestroy(){
        this.RoundAnimation.off('finished',this.hideRoundNode,this);
        this.FailAnimation.off('finished',this.hideFailNode,this);
    }
    //----- 公有方法 -----//
    playGroupNum(num)
    {
        this.GroupNum.spriteFrame = this.GroupNumSpfArr[num];
        this.GroupLabel.play();
    }
    playRoundNum(num)
    {
        this.RoundLabel.spriteFrame = this.RoundNumSpfArr[num];
        this.RoundAnimation.play();
        this.RoundNode.active = true;
    }
    Fail(){
        this.FailAnimation.node.active = true;
        this.FailAnimation.play();
        lib.wxFun.vibrateShort();
    }
    //----- 私有方法 -----//
    private hideRoundNode(){
        this.RoundNode.active = false;
    }
    private hideFailNode(){
        this.FailAnimation.node.active = false;
    }
}
