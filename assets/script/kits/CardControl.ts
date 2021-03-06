/** 卡片控制组件 */
import * as lib from '../lib/lib';
import PropManager from '../Manager/PropManager';

const {ccclass, property} = cc._decorator;

@ccclass
export default class CardControl extends cc.Component {

    //----- 编辑器属性 -----//
    //等级数字
    @property(cc.Label) LevelNum: cc.Label = null;
    //碎片进度
    @property(cc.Label) progressBarNum: cc.Label = null;
    //箭头节点
    @property(cc.Node) ArrowNode: cc.Node = null;
    //MoneyLabel
    @property(cc.Node) MoneyLabel: cc.Node = null;
    //图标精灵
    @property(cc.Sprite) LogoSpr: cc.Sprite = null;
    //标题精灵
    @property(cc.Sprite) TitleSpr: cc.Sprite = null;
    //进度条组件
    @property(cc.ProgressBar) progressBar: cc.ProgressBar = null;
    //进度条精灵
    @property(cc.Sprite) progressBarSpr: cc.Sprite = null;
    //标题
    @property([cc.SpriteFrame]) TitleSpfArr: Array<cc.SpriteFrame> = [];
    //图标图集
    @property([cc.SpriteFrame]) LogoSpfArr: Array<cc.SpriteFrame> = [];
    //进度条图集
    @property([cc.SpriteFrame]) progressBarSpfArr: Array<cc.SpriteFrame> = [];
    //----- 属性声明 -----//
    
    //----- 生命周期 -----//
    // onLoad () {}

    start () {

    }

    // update (dt) {}
    //----- 按钮回调 -----//
    //----- 公有方法 -----//
    init(type:number){
        this.LogoSpr.spriteFrame = this.LogoSpfArr[type];
        this.TitleSpr.spriteFrame = this.TitleSpfArr[type];
        switch(type)
        {
            case lib.defConfig.CardTypeEnum.initTower:
                this.progressBar.node.active = true;
                this.MoneyLabel.active = false;
                this.LevelNum.string = PropManager.getinstance().getInitalTowerLevel().toString();
                this.progressBarNum.string = PropManager.getinstance().getInitalTowerlFragment().toString() + "/" + (PropManager.getinstance().getInitalTowerLevel() + 2);
                if(PropManager.getinstance().getInitalTowerlFragment() >= (PropManager.getinstance().getInitalTowerLevel() + 2))
                {
                    this.progressBarSpr.spriteFrame = this.progressBarSpfArr[1];
                    this.ArrowNode.active = true;
                    this.progressBar.progress = 1;
                }
                else
                {
                    this.progressBarSpr.spriteFrame = this.progressBarSpfArr[0];
                    this.ArrowNode.active = false;
                    this.progressBar.progress = PropManager.getinstance().getInitalTowerlFragment() / (PropManager.getinstance().getInitalTowerLevel() + 2);
                }
                break;
            case lib.defConfig.CardTypeEnum.extralItem:
                this.progressBar.node.active = true;
                this.MoneyLabel.active = false;
                this.LevelNum.string = (PropManager.getinstance().getExtralItemNum() + 1).toString();
                this.progressBarNum.string = PropManager.getinstance().getExtralItemFragment().toString() + "/" + (PropManager.getinstance().getExtralItemNum() + 3);
                if(PropManager.getinstance().getExtralItemFragment() >= (PropManager.getinstance().getExtralItemNum() + 3))
                {
                    this.progressBarSpr.spriteFrame = this.progressBarSpfArr[1];
                    this.ArrowNode.active = true;
                    this.progressBar.progress = 1;
                }
                else
                {
                    this.progressBarSpr.spriteFrame = this.progressBarSpfArr[0];
                    this.ArrowNode.active = false;
                    this.progressBar.progress = PropManager.getinstance().getExtralItemFragment() / (PropManager.getinstance().getExtralItemNum() + 3);
                }
                break;
            case lib.defConfig.CardTypeEnum.autoCompose:
                this.MoneyLabel.active = false;
                this.LevelNum.node.parent.active = false;
                this.progressBar.node.active = false;
                break;
            case lib.defConfig.CardTypeEnum.money:
                this.MoneyLabel.active = true;
                this.LevelNum.node.parent.active = false;
                this.progressBar.node.active = false;
                break;
            default:
                break;
        }
    }
    //----- 私有方法 -----//
}
