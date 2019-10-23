{
    layoutr.checkAccordion = (elements) => {
        elements.on('click', '.headline', (e) => {
            let item = $(e.currentTarget).parent(),
                content = item.children('.content'),
                accordion = item.closest('.accordion');

            if (!accordion.hasClass('multiple')) {
                item.siblings().removeClass('open').children('.content').slideUp(layoutr.accordionTime);
            }
            content.slideToggle(layoutr.accordionTime, () => {
                item.toggleClass('open');
            });
        });
    };
}