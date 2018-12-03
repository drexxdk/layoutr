{
    layoutr.promiseFont = new Promise((resolve, reject) => {
        WebFont.load({
            typekit: {
                id: ['bhz3dxx']
            },
            active: () => {
                resolve();
            },
            inactive: () => {
                reject();
            }
        });
    }).catch(() => {
        layoutr.showPopupAlert('Failed to load fonts', 'danger');
    });
}