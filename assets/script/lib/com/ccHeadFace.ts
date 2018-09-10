import userInfo from "../mod/userInfo"

const { ccclass, property } = cc._decorator;
@ccclass
export default class ccHeadFaceBox extends cc.Component {
    @property(cc.Sprite) FaceSprite: cc.Sprite = null

    private FaceUrl: string = '';


    cleanFace() {
        this.FaceSprite.spriteFrame = null;
        this.FaceUrl = '';
    }

    initFace() {
        let width = this.FaceSprite.node.width;
        let height = this.FaceSprite.node.height;
        this.FaceSprite.node.width = width;
        this.FaceSprite.node.height = height;
    }

    initFaceByURL(url: string) {
        if (url === this.FaceUrl) return;
        this.FaceUrl = '';
        cc.loader.load({ url: url, type: 'png' }, (err, tex) => {
                if (tex instanceof cc.Texture2D) {
                    let faceframe = new cc.SpriteFrame(tex);
                    // let width = this.FaceSprite.node.width;
                    // let height = this.FaceSprite.node.height;
                    this.FaceSprite.spriteFrame = faceframe;
                    this.FaceSprite.node.width = 125;
                    this.FaceSprite.node.height = 125;
                    this.FaceUrl = url;
                }
                else {
                    lilog(url);
                    lierr('加载头像失败');
                }
        });
    }
    // 变灰
    BeGrey() {
        if (this.FaceSprite.node.color === cc.color(130, 130, 130)) return;
        this.FaceSprite.node.color = cc.color(130, 130, 130);
    }
    BeCommon() {
        if (this.FaceSprite.node.color === cc.color(255, 255, 255)) return;
        this.FaceSprite.node.color = cc.color(255, 255, 255);
    }

    
    start() {
        let url = userInfo.getinstance().User.avatarUrl;
        console.log(url);
        if(url)
        {
            console.log("初始化头像");
            this.initFaceByURL(url);
        }
    }
}
