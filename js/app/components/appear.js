{
    layoutr.checkAppear = (elements) => {
        if (bowser.desktop) {
            $.appear(elements, { force_process: true });
            elements.one('appear', (e, appeared) => {
                appeared.addClass('visible');
            });
        }
    };
}