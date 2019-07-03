
cc.Class({
    extends: cc.Component,

    properties: {
        target: {
            type: cc.Node, // 自己算出来的，明白;
            default: null,
        },

        bullet_prefab: {
            type: cc.Prefab,
            default: null,
        },

        bullet_root: {
            type: cc.Node,
            default: null,
        },

        shoot_time: 0.2,
    },

    start () {
        this.now_time = this.shoot_time;
    },

    shoot_bullet() {
        var src = this.node.getPosition();
        // var dst = this.target.getPosition();
        var dst = this.target.getComponent("nav_agent").get_next_point();
        var dir = dst.sub(src);

        var r = Math.atan2(dir.y, dir.x);
        var degree = r * 180 / Math.PI;

        var b = cc.instantiate(this.bullet_prefab);
        b.getComponent("bullet").shoot_to(degree);
        this.bullet_root.addChild(b);

        b.setPosition(src);
    },

    // 调整你的炮塔: 
    update (dt) {
        if(this.target === null) {
            return;
        }

        var src = this.node.getPosition();
        var dst = this.target.getPosition();
        var dir = dst.sub(src);

        var r = Math.atan2(dir.y, dir.x);
        var degree = r * 180 / Math.PI;
        this.node.angle = degree - 90;

        this.now_time += dt;
        if (this.now_time >= this.shoot_time) {
            this.shoot_bullet();
            this.now_time = 0;
        }
    },
});
