
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    EndCallBack(){
        this.node.destroy();
    }
}
