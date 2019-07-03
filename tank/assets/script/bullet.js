// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        // 角度转成幅度
        var r = cc.misc.degreesToRadians(this.node.rotation);
        // 固定算法， 幅度转成向量（绿色的轴）
        var v2 =  cc.v2(0, 1).rotate(-r);
        // 根据向量进行移动
        this.getComponent(cc.RigidBody).linearVelocity = cc.v2(v2.x * 50, v2.y * 50);
    },
    
    onBeginContact(contact, selfCollider, otherCollider) {
        if (otherCollider.node.name == 'tank_e' || otherCollider.node.name == 'bullet') {
            return;
        }
        this.node.destroy();
    }
    // update (dt) {},
});
