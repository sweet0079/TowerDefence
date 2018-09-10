const {ccclass, property,executeInEditMode} = cc._decorator;

@ccclass
@executeInEditMode
export default class NewClass extends cc.Component {


    @property(cc.SpriteFrame) newframe: cc.SpriteFrame

    onLoad() {
        // init logic
        for(let i = 0; i < this.node.children.length; i++)
        {
            this.node.children[i].name = (i + 1).toString();
            let angle = i * -10 * (2 * Math.PI / 360);
            this.node.children[i].x = 120 * Math.sin(angle);
            this.node.children[i].y = 120 * Math.cos(angle);
            this.node.children[i].scale = 0.4;
            this.node.children[i].rotation = i * 10;
        }
    }
}
