{
    layoutr.checkTabs = (elements) => {
        elements.on('click', '.top > li:not(.active)', (e) => {
            let item = $(e.currentTarget),
                index = item.index(),
                tabs = item.parent().parent();

            // css index starts at 1 for first element
            setTimeout(() => {
                tabs.find(`> ul > li:nth-child(${index + 1})`).addClass('active').siblings().removeClass('active');
            });
        });
    };
}