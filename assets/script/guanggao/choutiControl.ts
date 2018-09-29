import * as lib from '../lib/lib';
import advControl from './advControl';

const {ccclass, property} = cc._decorator;

@ccclass
export default class choutiControl extends cc.Component {

    //----- 编辑器属性 -----//
    //游戏名
    @property(cc.Prefab) advPfb: cc.Prefab = null;
    //抽屉
    @property(cc.Node) chouTi: cc.Node = null;
    //箭头
    @property(cc.Node) showArrow: cc.Node = null;
    //lunbo
    @property(cc.Sprite) lunboSpr: cc.Sprite = null;
    //----- 属性声明 -----//
    private index = 0;
    private lunboarr = [];
    private Spfindex = 0;
    private appid = "";
    private path = "";
    private ad_pos = "";
    private id = "";
    //----- 生命周期 -----//

    onLoad () {
        lib.msgEvent.getinstance().addEvent(lib.msgConfig.initAdv,"init",this);
    }

    // start () {
        
    // }

    // update (dt) {}

    onDestroy(){
        lib.msgEvent.getinstance().removeEvent(lib.msgConfig.initAdv,"init",this);
    }
    //----- 按钮回调 -----//
    clickshow(){
        this.chouTi.runAction(cc.moveTo(0.75,-120,300));
        this.showArrow.active = false;
    }

    clickhide(){
        this.chouTi.runAction(cc.moveTo(0.75,-580,300));
        this.showArrow.active = true;
    }
    click(){
        wx.navigateToMiniProgram(
            {
                appId:this.appid, 
                path:this.path,
                success: ()=>{
                    let url = "https://click.xyx.bkdau.cn/click/" + lib.userInfo.getinstance().getappID() + "/" + this.ad_pos + "/" + this.id;
                    lib.httpRequest.getinstance().send(url);
                }
            }
        );
    }
    //----- 事件回调 -----//
    init()
    {
        let choutiArr:Array<any> = lib.userInfo.getinstance().getadvnfo().chouti;
        let lasty;
        let arr = choutiArr.sort((t1, t2) => {
			let val1 = parseInt(t1.score);
			let val2 = parseInt(t2.score);
			if (val1 < val2) {
				return 1;
			} else if (val1 > val2) {
				return -1;
			} else {
				return 0;
			}
		});
        for(let i = 0 ; i < arr.length; i++)
        {
            let adv = cc.instantiate(this.advPfb);
            let temp = false;
            let apid;
            let path;
            if(arr[i].chouti_tag != "0")
            {
                temp = true;
            }
            if(arr[i].url_tiao == "0")
            {
                apid = lib.userInfo.getinstance().getadvnfo().hezi_appId;
                path = arr[i].url_page + arr[i].url_path;
            }
            else
            {
                apid = arr[i].url_appId;
                path = arr[i].url_tiao_query;
            }
            adv.getComponent(advControl).init(arr[i].btn.imgs[0],arr[i].game_name,temp,apid,path,arr[i].ad_pos,arr[i].id);
            adv.x = (i % 4) * 90 - 135;
            adv.y = parseInt((i / 4).toString()) * -120 - 60;
            lasty = adv.y;
            this.chouTi.addChild(adv);
        }
        this.chouTi.height = 100 + Math.abs(lasty);

        let shouyeArr:Array<any> = lib.userInfo.getinstance().getadvnfo().shouye;
        this.lunboarr = shouyeArr.sort((t1, t2) => {
			let val1 = parseInt(t1.score);
			let val2 = parseInt(t2.score);
			if (val1 < val2) {
				return 1;
			} else if (val1 > val2) {
				return -1;
			} else {
				return 0;
			}
        });
        this.nextLunbo();
        this.schedule(this.nextLunbo,15);
    }
    //----- 公有方法 -----//
    //----- 私有方法 -----//
    private nextLunbo(){
        this.lunboSpr.node.stopActionByTag(100);
        this.index++;
        this.Spfindex = 0;
        if(this.index == this.lunboarr.length)
        {
            this.index = 0;
        }
        let url = lib.userInfo.getinstance().getadvnfo().url_prefix + this.lunboarr[this.index].btn.imgs[this.Spfindex];
        cc.loader.load({ url: url, type: 'png' }, (err, tex) => {
            if (tex instanceof cc.Texture2D) {
                let faceframe = new cc.SpriteFrame(tex);
                this.lunboSpr.spriteFrame = faceframe;
            }
            else {
                lilog(url);
                lierr('加载头像失败');
            }
        });
        if(this.lunboarr[this.index].url_tiao == "0")
        {
            this.appid = lib.userInfo.getinstance().getadvnfo().hezi_appId;
            this.path = this.lunboarr[this.index].url_page + this.lunboarr[this.index].url_path;
        }
        else
        {
            this.appid = this.lunboarr[this.index].url_appId;
            this.path = this.lunboarr[this.index].url_tiao_query;
        }
        this.ad_pos = this.lunboarr[this.index].ad_pos;
        this.id = this.lunboarr[this.index].id;
        let time = parseInt(this.lunboarr[this.index].btn.time) / 1000; 
        let seq = cc.sequence(cc.delayTime(time),cc.callFunc(()=>{
            this.Spfindex++;
            if(this.Spfindex == this.lunboarr[this.index].btn.imgs.length)
            {
                this.Spfindex = 0;
            }
            let url = lib.userInfo.getinstance().getadvnfo().url_prefix + this.lunboarr[this.index].btn.imgs[this.Spfindex];
            cc.loader.load({ url: url, type: 'png' }, (err, tex) => {
                if (tex instanceof cc.Texture2D) {
                    let faceframe = new cc.SpriteFrame(tex);
                    this.lunboSpr.spriteFrame = faceframe;
                }
                else {
                    lilog(url);
                    lierr('加载头像失败');
                }
            });
        }));
        let act = cc.repeatForever(seq);
        act.setTag(100);
        this.lunboSpr.node.runAction(act);
    }
}
