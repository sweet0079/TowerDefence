import * as lib from '../lib'
//import { li } from '../li
const { ccclass, property } = cc._decorator;
// const { ccclass, property, executeInEditMode, requireComponent,
//     menu,executionOrder,disallowMultiple,playOnFocus,
//     inspector,help,mixins } = cc._decorator;
@ccclass
export default class ccFixPhone extends cc.Component {
    //----- 编辑器属性 -----//
    //@property(cc.Node) Node: cc.Node
    //@property([cc.Node]) Nodearr: Array<cc.Node>
    //@property(cc.Label) label: cc.Label
    //@property(cc.Button) Button: cc.Button
    //@property(cc.Toggle) Toggle: cc.Toggle
    //@property(cc.SpriteFrame) frams: cc.SpriteFrame
    //@property([cc.SpriteFrame]) frames: Array<cc.SpriteFrame>
    //@property(cc.EditBox) editname: cc.EditBox
    //@property(cc.Sprite) spritename: cc.Sprite
    //@property(cc.Prefab) prefabname: cc.Prefab
    //@property([cc.Prefab]) prefabsname: Array<cc.Prefab>
    //@property(cc.WebView) webview: cc.WebView
    @property(cc.SpriteFrame) stopFrame: cc.SpriteFrame = null
    @property([cc.Node]) widthBg: cc.Node[] = []
    @property([cc.Node]) heightBg: cc.Node[] = []
    @property(cc.Float) maxFixed = 300
    //@property({url: cc.AudioClip,default:null}) mic: string
    //----- 静态属性 -----//
    //----- 静态方法 -----//
    //----- 属性声明 -----//
    private canvas: cc.Node = null
    private stopNode: cc.Node = null
    //----- 公共方法 -----//
    //----- 事件回调 -----//
    //----- 按键回调 -----//
    //----- 生命周期 -----//
    onLoad() {
        if (!lib.tools.IsPc()) {
            // this.checkCanvas();
            //this.checkLandspace();
            this.fitscale();
            cc.view.setResizeCallback(() => {
                //this.checkLandspace();
                this.fitscale();
            });
            cc.director.on(cc.Director.EVENT_AFTER_DRAW, () => {
                // this.checkCanvas();
                // this.checkLandspace();
            });
        }
        else {
            // cc.Canvas.instance.fitHeight = true;
            // cc.Canvas.instance.fitWidth = true;
            this.fitscale();
        }
    }
    //start() { }
    //update(dt) { }
    //lateUpdate() { }
    //onEnable() { }
    //onDisable() { }
    onDestroy() {
        cc.director.off(cc.Director.EVENT_AFTER_DRAW);
    }
    //----- 保护方法 -----//
    //----- 私有方法 -----//
    private fitscale(){
        let designratY = cc.view.getVisibleSize().height / cc.view.getDesignResolutionSize().height;
        cc.Canvas.instance.node.scaleY = designratY;
        let designratX = cc.view.getVisibleSize().width / cc.view.getDesignResolutionSize().width;
        cc.Canvas.instance.node.scaleX = designratX;
    }
    private checkLandspace() {
        if (cc.Canvas.instance.fitHeight && cc.Canvas.instance.fitWidth) return;
        else if (cc.Canvas.instance.fitHeight && !cc.Canvas.instance.fitWidth) {
            if (cc.view.getVisibleSize().width < cc.view.getDesignResolutionSize().width - this.maxFixed ||
                cc.view.getVisibleSize().width > cc.view.getDesignResolutionSize().width + this.maxFixed) {
                if (this.stopNode) return;
                this.stopNode = new cc.Node();
                this.stopNode.addComponent(cc.Sprite).spriteFrame = this.stopFrame;
                cc.director.getScene().addChild(this.stopNode);
                this.stopNode.rotation = 90;
                this.stopNode.setContentSize(cc.view.getVisibleSize().height,
                    cc.view.getVisibleSize().width);
                this.stopNode.setPosition(this.stopNode.height / 2, this.stopNode.width / 2);
            }
            else {
                if (!this.stopNode) return;
                this.stopNode.destroy();
                this.stopNode = null;
            }
        }
        else if (!cc.Canvas.instance.fitHeight && cc.Canvas.instance.fitWidth) {
            if (cc.view.getVisibleSize().height < cc.view.getDesignResolutionSize().height - this.maxFixed ||
                cc.view.getVisibleSize().height > cc.view.getDesignResolutionSize().height + this.maxFixed) {
                if (this.stopNode) return;
                this.stopNode = new cc.Node();
                this.stopNode.addComponent(cc.Sprite).spriteFrame = this.stopFrame;
                cc.director.getScene().addChild(this.stopNode);
                this.stopNode.getComponent(cc.Sprite).sizeMode = cc.Sprite.SizeMode.TRIMMED;
                this.stopNode.setContentSize(cc.view.getVisibleSize().width,
                    cc.view.getVisibleSize().height);
                this.stopNode.setPosition(this.stopNode.width / 2, this.stopNode.height / 2);
            }
            else {
                if (!this.stopNode) return;
                this.stopNode.destroy();
                this.stopNode = null;
            }
        }
    }

    private checkCanvas() {
        if (cc.Canvas.instance.fitHeight && cc.Canvas.instance.fitWidth) return;
        else if (cc.Canvas.instance.fitHeight && !cc.Canvas.instance.fitWidth) {
            const width = cc.view.getVisibleSize().width;
            for (let i = 0; i < this.widthBg.length; i++) {
                this.widthBg[i].width = width;
            }
        }
        else if (!cc.Canvas.instance.fitHeight && cc.Canvas.instance.fitWidth) {
            const height = cc.view.getVisibleSize().height;
            for (let i = 0; i < this.heightBg.length; i++) {
                this.heightBg[i].height = height;
            }
        }
    }
}