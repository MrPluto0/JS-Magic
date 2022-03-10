const emitter = {
    events: {},
    // 监听
    on(type, listener) {
        if (!this.events[type]) {
            this.events[type] = [];
        }
        this.events[type].push(listener);
    },
    // 触发
    emit(type, [...args]) {
        if (this.events[type]) {
            this.events[type].forEach((event) => {
                event.apply(this, args);
            })
        }
    },
    // 关闭监听
    off(type, listener) {
        if (this.events[type]) {
            if (listener) {
                this.events[type] = this.events[type].filter((event) => event !== listener)
            } else {
                this.events[type].length = 0;
            }
        }
    }
};
