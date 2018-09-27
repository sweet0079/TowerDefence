/** 分享界面控制 */
import * as lib from '../lib/lib';
import proControl from './PropControl';

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
    //----- 属性声明 -----//
    private ShareType:number = 0;
    //----- 生命周期 -----//

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}
    //----- 按钮回调 -----//
    clickShare(){
        switch(this.ShareType)
        {
            case 0:
                lib.wxFun.shareAppMessage("小情侣在树林里发出奇怪的声音，原来是在玩这个......","res/raw-assets/pic/share/dapao.jpg");
                this.ProControl.addDoubleMoneyTime(300);
                this.init(0);
                break;
            case 1:
                lib.wxFun.shareAppMessage("小情侣在树林里发出奇怪的声音，原来是在玩这个......","res/raw-assets/pic/share/dapao.jpg");
                this.ProControl.addDoubleSpeedTime(300);
                this.init(1);
                break;
            default:
                break;
        } 
    }
    //----- 事件回调 -----//
    //----- 公有方法 -----//
    init(type){
        this.ShareType = type;
        this.TitleSpr.spriteFrame = this.TitleSpfArr[type];
        let time;
        let min;
        let sec;
        switch(type)
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
    //----- 私有方法 -----//
}
