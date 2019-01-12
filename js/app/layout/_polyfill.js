// Promise.finally has not been implemented in Microsoft Edge
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally
if (Promise.prototype.finally === undefined) {
    // It's replaced unconditionally to preserve the expected behavior
    // in programs even if there's ever a native finally.
    window.Promise.prototype['finally'] = function finallyPolyfill(callback) {
        let constructor = this.constructor;

        return this.then((value) => {
            return constructor.resolve(callback()).then(() => {
                return value;
            });
        }, (reason) => {
            return constructor.resolve(callback()).then(() => {
                throw reason;
            });
        });
    };
}