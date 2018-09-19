import itembase from "../../kits/itemBase"
const {ccclass, property,executeInEditMode} = cc._decorator;

@ccclass
@executeInEditMode
export default class NewClass extends cc.Component {


    @property(cc.SpriteFrame) newframe: cc.SpriteFrame

    onLoad() {
        // init logic
        for(let i = 0; i < this.node.children.length; i++)
        {
            this.node.children[i].getComponent(itembase).Stage1Pos = this.node.children[i].getPosition();
        }
    }
}
