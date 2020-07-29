{
    layoutr.checkRatings = (ratings) => {
        ratings.each((i, item) => {
            let guid = layoutr.guid();
            for (i = 1; i <= 5; i++) {
                ratings.append(`<input type="radio" name="ratings-${guid}" id="ratings-${guid}-${i}" />`);
            }
            let container = $('<div></div>');
            ratings.append(container);
            for (i = 1; i <= 5; i++) {
                container.append(`
<label for="ratings-${guid}-${i}">
    <svg focusable="false"><use xlink:href="#svg-star"></use></svg>
    <svg focusable="false"><use xlink:href="#svg-star-1"></use></svg>
    <svg focusable="false"><use xlink:href="#svg-star-2"></use></svg>
</label>
`);
            }
        });
    }
}