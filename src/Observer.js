class Observer {
    constructor() {
        this.map = new Map()
        this.map.set('event', new Set())
        this.map.set('change', new Set())
        this.map.set('enter', new Set())
    }
    listen(key, callback) {
        const callbacks = this.map.get(key)
        callbacks.add(callback)
        return () => {
            callbacks.delete(callback)
        }
    }
    emit(key, ...args) {
        const callbacks = this.map.get(key)
        for (const callback of callbacks) {
            callback(...args)
        }
    }
}

export default new Observer()