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
        vertical: 0,
        horizontal: 0,
        // 刚体
        rBody: {
            default: null,
            type: cc.RigidBody
        },
        // 移动
        moveClie: {
            default: null,
            type: cc.AudioClip
        },
        // 射击
        shootClie: {
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
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
    },

    start () {
        this.input();
        this.rBody = this.getComponent(cc.RigidBody);
        this.firePoint = this.node.getChildByName('firePoint');
    },

    update (dt) {
        var v2 = this.rBody.getWorldPosition();
        // 精灵的位置
        var numY = v2.y + this.vertical;
        var numX = v2.x + this.horizontal;
        if (this.vertical != 0 && numY > 22 && numY < 169.4) {
            // 移动
            this.rBody.linearVelocity = cc.v2(0, 20 * this.vertical);
            // 旋转
            this.node.rotation = this.vertical > 0 ? 0 : 180;
            // 声音
            if (cc.audioEngine.isMusicPlaying() == false) {
                cc.audioEngine.playMusic(this.moveClie, true);
            }
        } else if (this.horizontal != 0 && numX > 22 && numX < 170) {
            this.rBody.linearVelocity = cc.v2(20 * this.horizontal, 0);
            this.node.rotation = this.horizontal > 0 ? 90 : 270;
            if (cc.audioEngine.isMusicPlaying() == false) {
                cc.audioEngine.playMusic(this.moveClie, true);
            }
        } else {
            this.rBody.linearVelocity = cc.v2(0, 0);
            if (cc.audioEngine.isMusicPlaying() == true) {
                cc.audioEngine.stopMusic();
            }
        }
    },
    
    fire() {
        // 声音
        cc.audioEngine.playEffect(this.shootClie, false);
        // 创建子弹
        var bullet = cc.instantiate(this.bullet);
        bullet.rotation = this.node.rotation;
        
        // console.log(bullet.getComponent('buttle'))
        // debugger
        bullet.getComponent('bullet').buttleName = 'buttle';
        bullet.setParent(cc.director.getScene());
        
        // 位置
        // 本地坐标系转世界坐标系
        var pos = this.firePoint.convertToWorldSpaceAR(cc.v2(0, 0));
        bullet.x = pos.x;
        bullet.y = pos.y;
    },

    input() {
        // 按键
        // 按下
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, (event) => {
            if (event.keyCode == cc.macro.KEY.w) {
                this.vertical = 1;
            }
            if (event.keyCode == cc.macro.KEY.s) {
                this.vertical = -1;
            }
            if (event.keyCode == cc.macro.KEY.a) {
                this.horizontal = -1;
            }
            if (event.keyCode == cc.macro.KEY.d) {
                this.horizontal = 1;
            }
            if (event.keyCode == cc.macro.KEY.u) {
                this.fire();
            }
        });
        // 抬起
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, (event) => {
            if (event.keyCode == cc.macro.KEY.w && this.vertical == 1) {
                this.vertical = 0;
            }
            if (event.keyCode == cc.macro.KEY.s && this.vertical == -1) {
                this.vertical = 0;
            }
            if (event.keyCode == cc.macro.KEY.a && this.horizontal == -1) {
                this.horizontal = 0;
            }
            if (event.keyCode == cc.macro.KEY.d && this.horizontal == 1) {
                this.horizontal = 0;
            }
        })
    },

    onBeginContact(contact, selfCollider, otherCollider) {
        if (otherCollider.node.name != 'Canvas') {
            this.node.destroy();
            cc.director.loadScene('game');
        }
    }
});
