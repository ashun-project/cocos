// 系统为我们自动生成了一个 组件类的模板;
// class 定义了一个类, extends cc.Component --->
cc.Class({
    extends: cc.Component,

    properties: {
    },

    // 组件实例;
    start () {
        console.log("start");
        // this ---> 当前组件实例;
        // this.node ---> 当前组件实例所在节点;
    },

    // 每次刷新画面的时候 
    // 组件实例.update
    // |___dt___|   ---> 迭代出我们游戏世界的变化;
    update (dt) {
        // this ---> 当前组件实例;
        // this.node ---> 当前组件实例所在节点; 
    },
});
