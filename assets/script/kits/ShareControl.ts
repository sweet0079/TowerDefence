/** 分享界面控制 */
import * as lib from '../lib/lib';
import proControl from './PropControl';
import GameManager from '../Manager/GameManager';

const {ccclass, property} = cc._decorator;

@ccclass
export default class ShareControl extends cc.Component {

    //----- 编辑器属性 -----//
    //标题精灵
    @property(cc.Sprite) TitleSpr: cc.Sprite = null;
    //进度条
    @property(cc.ProgressBar) progressBar: cc.ProgressBar = null;
    //道具控制组件
    @property(proControl) ProControl: proControl = null;
    //标题精灵图集
    @property([cc.SpriteFrame]) TitleSpfArr: Array<cc.SpriteFrame> = [];
    //时间
    @property(cc.Label) TimeLabel: cc.Label = null;
    //获得物品界面
    @property(cc.Node) ItemLayer: cc.Node = null;
    //物品精灵
    @property(cc.Sprite) ItemSprite: cc.Sprite = null;
    //物品精灵图集
    @property([cc.SpriteFrame]) ItemSpfArr: Array<cc.SpriteFrame> = [];
    //----- 属性声明 -----//
    private ShareType:number = 0;
    private itemType:number = 0;
    //----- 生命周期 -----//

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}
    //----- 按钮回调 -----//
    closeShare(){
        this.node.active = false;
    }
    clickShare(){
        if(lib.userInfo.getinstance().getisLegal())
        {
            lib.wxFun.showToast("功能暂未开放！");
        }
        else
        {
            switch(this.ShareType)
            {
                case 0:
                    lib.wxFun.shareAppMessage("小情侣在树林里发出奇怪的声音，原来是在玩这个......","res/raw-assets/pic/share/dapao.jpg","",
                            ()=>{
                                this.ProControl.addDoubleMoneyTime(300);
                                this.init(0);
                            });
                    break;
                case 1:
                    lib.wxFun.shareAppMessage("小情侣在树林里发出奇怪的声音，原来是在玩这个......","res/raw-assets/pic/share/dapao.jpg","",
                        ()=>{
                            this.ProControl.addDoubleSpeedTime(300);
                            this.init(1);
                        });
                    break;
                case 2:
                    lib.wxFun.shareAppMessage("小情侣在树林里发出奇怪的声音，原来是在玩这个......","res/raw-assets/pic/share/dapao.jpg","",
                        ()=>{
                            switch(this.itemType)
                            {
                                case 0:
                                    GameManager.getinstance().addMoney(120);
                                    break;
                                case 1:
                                    this.ProControl.addDoubleSpeedTime(300);
                                    break;
                                case 2:
                                    this.ProControl.addDoubleMoneyTime(300);
                                    break;
                                case 3:
                                    this.ProControl.addExtraSlotTime(300);
                                    break;
                                default:
                                    break;
                            }
                            this.closeShare();
                        });
                    // this.ProControl.addDoubleSpeedTime(300);
                    break;
                default:
                    break;
            } 
        }
    }
    //----- 事件回调 -----//
    //----- 公有方法 -----//
    updateTime(){
        let time;
        let min;
        let sec;
        switch(this.ShareType)
        {
            case 0:
                time = this.ProControl.getDoubleMoneyTime();
                min = parseInt((time / 60).toString());
                sec = time % 60;
                this.progressBar.progress = this.ProControl.getDoubleMoneyTime() / 3600;
                if(sec < 10)
                {
                    this.TimeLabel.string = min + ":0" + sec;
                }
                else
                {
                    this.TimeLabel.string = min + ":" + sec;
                }
                break;
            case 1:
                time = this.ProControl.getDoubleSpeedTime();
                min = parseInt((time / 60).toString());
                sec = time % 60;
                this.progressBar.progress = this.ProControl.getDoubleSpeedTime() / 3600;
                if(sec < 10)
                {
                    this.TimeLabel.string = min + ":0" + sec;
                }
                else
                {
                    this.TimeLabel.string = min + ":" + sec;
                }
                break;
            default:
                break;
        }
    }

    init(type){
        this.ShareType = type;
        this.TitleSpr.spriteFrame = this.TitleSpfArr[type];
        let time;
        let min;
        let sec;
        switch(type)
        {
            case 0:
                this.progressBar.node.active = true;
                this.ItemLayer.active = false;
                time = this.ProControl.getDoubleMoneyTime();
                min = parseInt((time / 60).toString());
                sec = time % 60;
                this.progressBar.progress = this.ProControl.getDoubleMoneyTime() / 3600;
                if(sec < 10)
                {
                    this.TimeLabel.string = min + ":0" + sec;
                }
                else
                {
                    this.TimeLabel.string = min + ":" + sec;
                }
                break;
            case 1:
                this.progressBar.node.active = true;
                this.ItemLayer.active = false;
                time = this.ProControl.getDoubleSpeedTime();
                min = parseInt((time / 60).toString());
                sec = time % 60;
                this.progressBar.progress = this.ProControl.getDoubleSpeedTime() / 3600;
                if(sec < 10)
                {
                    this.TimeLabel.string = min + ":0" + sec;
                }
                else
                {
                    this.TimeLabel.string = min + ":" + sec;
                }
                break;
            case 2:
                this.progressBar.node.active = false;
                this.ItemLayer.active = true;
                let num = lib.RandomParameters.RandomParameters.getRandomInt(this.ItemSpfArr.length);
                this.itemType = num;
                this.ItemSprite.spriteFrame = this.ItemSpfArr[num];
                break;
            default:
                break;
        } 
    }
    //----- 私有方法 -----//
}
