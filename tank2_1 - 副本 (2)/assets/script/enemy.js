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
        // 刚体
        rBody: {
            default: null,
            type: cc.RigidBody
        },
        boom:{
            default: null,
            type: cc.AudioClip
        },
        bullet: {
            default: null,
            type: cc.Prefab
        },
        firePoint: {
            default: null,
            type: cc.Node
        },
        gofire: true,
        fireNum: 5,
        randomNum: 5,
        vertical: 1,
        horizontal: 0,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.rBody = this.getComponent(cc.RigidBody);
        this.firePoint = this.node.getChildByName('firePoint');
        this.randomNum = Math.ceil(Math.random() * 8 + 1);
    },

    onBeginContact(contact, selfCollider, otherCollider) {
        if (otherCollider.node.name == 'bullet' && otherCollider.node.bulletName != 'enemy') {
            cc.audioEngine.playEffect(this.boom, false);
            this.node.destroy();
        }
    },

    update (dt) {
        // 精灵的位置
        var v2 = this.rBody.getWorldPosition();
        var numY = v2.y + this.vertical;
        var numX = v2.x + this.horizontal;
        var type = '';
        var value = 0;
        if (this.vertical != 0) {
            type = 'horizontal';
            if (numX <= 26) {
                value = 90;
            } else if (numX >= 166) {
                value = 270;
            } else {
                value = Math.floor(Math.random() * 10) + 1 > 5 ? 270 : 90;
            }
        }
        if (this.horizontal != 0) {
            type = 'vertical';
            // value = numY > 96 ? 180 : 0;
            if (numY <= 26) {
                value = 0;
            } else if (numY >= 166) {
                value = 180;
            } else {
                value = Math.floor(Math.random() * 10) + 1 > 5 ? 180 : 0;
            }
        }
        if (numY <= 22 || numY >= 170 || numX <= 22 || numX >= 170) {
            this.vertical = 0;
            this.horizontal = 0;
            this.randowV2(type, value);
        }
        this.rBody.linearVelocity = cc.v2(20 * this.horizontal, 20 * this.vertical);

        // 重新获取方向
        this.randomNum = this.randomNum - dt;
        if (this.randomNum < 1) {
            this.vertical = 0;
            this.horizontal = 0;
            this.randowV2(type, value);
        }
        // 发射子弹
        this.fireNum = this.fireNum - dt;
        if (this.fireNum < 1 && this.gofire) {
            this.fireNum = Math.ceil(Math.random() * 3 + 1);
            this.fire();
        }
    },

    fire() {
        // 创建子弹
        var bullet = cc.instantiate(this.bullet);
        bullet.rotation = this.node.rotation;
        bullet.bulletName = 'enemy';
        bullet.setParent(cc.director.getScene());
        // 位置
        // 本地坐标系转世界坐标系
        var pos = this.firePoint.convertToWorldSpaceAR(cc.v2(0, 0));
        bullet.x = pos.x;
        bullet.y = pos.y;
    },

    randowV2 (type, value) {
        this.randomNum = Math.ceil(Math.random() * 8 + 1);
        this.gofire = false;
        this.node.runAction(cc.sequence(cc.rotateTo(0.3, value), cc.callFunc(function () {
            this[type] = value > 90 ? -1 : 1;
            this.gofire = true;
        }, this)))
    }
});