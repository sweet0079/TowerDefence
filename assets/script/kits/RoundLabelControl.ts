/** RoundLabel控制组件 */

const {ccclass, property} = cc._decorator;

@ccclass
export default class RoundLabelControl extends cc.Component {
    //----- 编辑器属性 -----//
    //关卡数label节点
    @property(cc.Label) levelLabel: cc.Label = null;
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
    showLevel(Num:number,totalRound:number){
        let level:number = parseInt((Num / 10000).toString());//大关
        let round:number = parseInt((Num % 10000).toString());//波
        this.setact(totalRound);
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
        this.levelLabel.string = "ROUND" + level + "/8";
        return level;
    }
    //----- 私有方法 -----//
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
