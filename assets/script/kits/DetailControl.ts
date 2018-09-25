/** 卡片详情控制组件 */
import * as lib from '../lib/lib';
import PropManager from '../Manager/PropManager';

const {ccclass, property} = cc._decorator;

@ccclass
export default class DetailControl extends cc.Component {

    //----- 编辑器属性 -----//
    //还需要几个
    @property(cc.Label) NeedNum: cc.Label = null;
    //等级数字
    @property(cc.Label) LevelNum: cc.Label = null;
    //碎片进度
    @property(cc.Label) progressBarNum: cc.Label = null;
    //箭头节点
    @property(cc.Node) ArrowNode: cc.Node = null;
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
    //文字精灵
    @property(cc.Sprite) WenziSpr: cc.Sprite = null;
    //文字精灵图集
    @property([cc.SpriteFrame]) WenziSpfArr: Array<cc.SpriteFrame> = [];
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
        this.WenziSpr.spriteFrame = this.WenziSpfArr[type];
        switch(type)
        {
            case 0:
                this.progressBar.node.active = true;
                this.LevelNum.string = PropManager.getinstance().getInitalTowerLevel().toString();
                this.progressBarNum.string = PropManager.getinstance().getInitalTowerlFragment().toString() + "/3";
                if(PropManager.getinstance().getInitalTowerlFragment() >= 3)
                {
                    this.progressBarSpr.spriteFrame = this.progressBarSpfArr[1];
                    this.ArrowNode.active = true;
                    this.progressBar.progress = 1;
                }
                else
                {
                    this.progressBarSpr.spriteFrame = this.progressBarSpfArr[0];
                    this.ArrowNode.active = false;
                    this.progressBar.progress = PropManager.getinstance().getInitalTowerlFragment() / 3;
                    this.NeedNum.string = (3 - PropManager.getinstance().getInitalTowerlFragment()).toString();
                }
                break;
            case 1:
                this.progressBar.node.active = true;
                this.LevelNum.string = (PropManager.getinstance().getExtralItemNum() + 1).toString();
                this.progressBarNum.string = PropManager.getinstance().getExtralItemFragment().toString() + "/3";
                if(PropManager.getinstance().getExtralItemFragment() >= 3)
                {
                    this.progressBarSpr.spriteFrame = this.progressBarSpfArr[1];
                    this.ArrowNode.active = true;
                    this.progressBar.progress = 1;
                }
                else
                {
                    this.progressBarSpr.spriteFrame = this.progressBarSpfArr[0];
                    this.ArrowNode.active = false;
                    this.progressBar.progress = PropManager.getinstance().getExtralItemFragment() / 3;
                    this.NeedNum.string = (3 - PropManager.getinstance().getExtralItemFragment()).toString();
                }
                break;
            default:
                break;
        }
    }
    //----- 私有方法 -----//
}
