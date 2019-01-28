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
    }).catch((e) => {
        layoutr.showPopupAlert('Failed to load fonts', 'danger');
        console.error(e);
    });
}