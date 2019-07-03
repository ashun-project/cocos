
// 知识 ---> 灵活运用;

cc.Class({
    extends: cc.Component,

    properties: {
        speed: 800,
        degree: 45,
    },

    start () {
        // this.shoot_to(this.degree);
    },

    shoot_to(degree) {
        this.degree = degree;

        var r = this.degree * Math.PI / 180;
        this.vx = this.speed * Math.cos(r);
        this.vy = this.speed * Math.sin(r);

        this.node.angle = degree - 90;
    },

    update (dt) {
        var sx = this.vx * dt;
        var sy = this.vy * dt;
        this.node.x += sx;
        this.node.y += sy;

        // 完全移出屏幕的时候，我们要删除他;
        if (this.node.x <= -cc.winSize.width * 0.5 || this.node.x >= cc.winSize.width * 0.5 ||
            this.node.y <= -cc.winSize.height * 0.5 || this.node.y >= cc.winSize.height * 0.5) {
            this.node.removeFromParent();
        }
    },
});
