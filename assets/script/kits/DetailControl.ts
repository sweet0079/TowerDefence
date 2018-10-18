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
    //升级按钮节点
    @property(cc.Node) LevelUpBtn: cc.Node = null;
    //价格label
    @property(cc.Label) priceLabel: cc.Label = null;
    //升级成功
    @property(cc.Animation) LevelUpSuccess: cc.Animation = null;
    //----- 属性声明 -----//
    private Detailtype = 0;
    //----- 生命周期 -----//
    // onLoad () {}

    start () {
        this.LevelUpSuccess.on('finished',this.hideLevelUpSuccess,this);
    }

    // update (dt) {}
    onDestroy(){
        this.LevelUpSuccess.off('finished',this.hideLevelUpSuccess,this);
    }
    //----- 按钮回调 -----//
    clcikLevelUp(){
        switch(this.Detailtype)
        {
            case 0:
                PropManager.getinstance().addInitalTowerlFragment(-(PropManager.getinstance().getInitalTowerLevel() + 2));
                PropManager.getinstance().addInitalTowerLevel(1);
                this.init(0);
                this.LevelUpSuccess.node.active = true;
                this.LevelUpSuccess.play();
                break;
            case 1:
                PropManager.getinstance().addExtralItemFragment(-(PropManager.getinstance().getExtralItemNum() + 3));
                PropManager.getinstance().addExtralItemNum(1);
                this.init(1);
                this.LevelUpSuccess.node.active = true;
                this.LevelUpSuccess.play();
                break;
            default:
                break;
        }   
    }
    //----- 公有方法 -----//
    init(type:number){
        this.Detailtype = type;
        this.LogoSpr.spriteFrame = this.LogoSpfArr[type];
        this.TitleSpr.spriteFrame = this.TitleSpfArr[type];
        this.WenziSpr.spriteFrame = this.WenziSpfArr[type];
        switch(type)
        {
            case 0:
                let lv0 = PropManager.getinstance().getInitalTowerLevel();
                this.progressBar.node.active = true;
                this.LevelNum.string = lv0.toString();
                this.progressBarNum.string = PropManager.getinstance().getInitalTowerlFragment().toString() + "/" + (PropManager.getinstance().getInitalTowerLevel() + 2).toString();
                if(PropManager.getinstance().getInitalTowerlFragment() >= (PropManager.getinstance().getInitalTowerLevel() + 2))
                {
                    this.progressBarSpr.spriteFrame = this.progressBarSpfArr[1];
                    this.ArrowNode.active = true;
                    this.progressBar.progress = 1;
                    this.LevelUpBtn.active = true;
                    this.priceLabel.string = ((lv0 - 1) * 50).toString();
                }
                else
                {
                    this.progressBarSpr.spriteFrame = this.progressBarSpfArr[0];
                    this.ArrowNode.active = false;
                    this.progressBar.progress = PropManager.getinstance().getInitalTowerlFragment() / (PropManager.getinstance().getInitalTowerLevel() + 2);
                    this.NeedNum.string = ((PropManager.getinstance().getInitalTowerLevel() + 2) - PropManager.getinstance().getInitalTowerlFragment()).toString();
                    this.LevelUpBtn.active = false;
                }
                break;
            case 1:
                let lv1 = PropManager.getinstance().getExtralItemNum() + 1;
                this.progressBar.node.active = true;
                this.LevelNum.string = (lv1).toString();
                this.progressBarNum.string = PropManager.getinstance().getExtralItemFragment().toString() + "/" + (PropManager.getinstance().getExtralItemNum() + 3);
                if(PropManager.getinstance().getExtralItemFragment() >= (PropManager.getinstance().getExtralItemNum() + 3))
                {
                    this.progressBarSpr.spriteFrame = this.progressBarSpfArr[1];
                    this.ArrowNode.active = true;
                    this.progressBar.progress = 1;
                    this.LevelUpBtn.active = true;
                    this.priceLabel.string = ((lv1 - 1) * 50).toString();
                }
                else
                {
                    this.progressBarSpr.spriteFrame = this.progressBarSpfArr[0];
                    this.ArrowNode.active = false;
                    this.progressBar.progress = PropManager.getinstance().getExtralItemFragment() / (PropManager.getinstance().getExtralItemNum() + 3);
                    this.NeedNum.string = ((PropManager.getinstance().getExtralItemNum() + 3) - PropManager.getinstance().getExtralItemFragment()).toString();
                    this.LevelUpBtn.active = false;
                }
                break;
            default:
                break;
        }
    }
    //----- 私有方法 -----//
    private hideLevelUpSuccess(){
        this.LevelUpSuccess.node.active = false;
    }
}
