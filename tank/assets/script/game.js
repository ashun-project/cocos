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
        enemy: {
            default: null,
            type: cc.Prefab
        },
        createTime: 1
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // this.createEnemy();
    },

    start () {

    },

    update (dt) {
        this.createTime = this.createTime - dt;
        if (this.createTime <= 0) {
            this.createTime = Math.ceil(Math.random() * 10 + 1);
            this.createEnemy();
        }
    },

    createEnemy() {
        var enemy = cc.instantiate(this.enemy);
        enemy.setParent(cc.director.getScene());
        enemy.setPosition(cc.v2(96, 96));
        
    },
});
