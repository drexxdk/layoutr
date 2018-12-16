{
    layoutr.checkAssignmentPuzzle = (assignment) => {
        if (assignment.hasClass('puzzle')) {
            layoutr.body.off('keydown.assignmentPuzzle');
            let id = assignment.attr('data-id'),
                image = assignment.attr('data-image'),
                tiles = layoutr.tryParseInt(assignment.attr('data-tiles'), 0),
                size = layoutr.tryParseInt(assignment.attr('data-size'), 0),
                random = layoutr.tryParseInt(assignment.attr('data-random'), 3),
                tile = size / tiles,
                total = tiles * tiles - 1,
                content = assignment.find('.content'),
                positions = [],
                items,
                current,
                movingItem = false,
                correct = [],
                directions = {
                    up: 'up',
                    down: 'down',
                    left: 'left',
                    right: 'right'
                };

            layoutr.arrowKeyLocked = true;

            let shuffle = (array) => {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }
                return array;
            };

            content.css({
                'width': size + 'px',
                'height': size + 'px'
            });

            let setPositions = () => {
                positions = [];
                let count = 0;
                for (let i = 0; i <= tiles - 1; i++) {
                    for (let j = 0; j <= tiles - 1; j++) {
                        count++;
                        positions.push({
                            'id': count,
                            'top': i,
                            'left': j
                        });
                    }
                }
                shuffle(positions);
            };

            let setItems = () => {
                content.empty();
                for (let i = 0; i < total; i++) {
                    content.append('<div class="item" data-id="' + positions[i].id + '" ' +
                        'style="' +
                        'width: ' + tile + 'px; ' +
                        'height: ' + tile + 'px; ' +
                        'top: ' + positions[i].top * tile + 'px; ' +
                        'left: ' + positions[i].left * tile + 'px; ' +
                        '">' +
                        '<div style="' +
                        'width: ' + size + 'px; ' +
                        'height: ' + size + 'px; ' +
                        'background-image: url(' + image + '); ' +
                        'margin-left: -' + positions[i].left * tile + 'px; ' +
                        'margin-top: -' + positions[i].top * tile + 'px; ' +
                        '"></div>' +
                        '</div>');
                }
                items = content.children();
            };

            let setCurrent = () => {
                current = positions[total];
            };

            let setCorrect = () => {
                correct = [];
                items.each((i, e) => {
                    let item = $(items[i]);
                    correct.push({
                        'id': item.attr('data-id'),
                        'top': item.css('top'),
                        'left': item.css('left')
                    });
                });
            };

            let getItem = (direction) => {
                let top,
                    left;

                if (direction === directions.up) {
                    top = (current.top * tile + tile) + 'px';
                    left = current.left * tile + 'px';
                } else if (direction === directions.down) {
                    top = (current.top * tile - tile) + 'px';
                    left = current.left * tile + 'px';
                } else if (direction === directions.left) {
                    top = current.top * tile + 'px';
                    left = (current.left * tile + tile) + 'px';
                } else if (direction === directions.right) {
                    top = current.top * tile + 'px';
                    left = (current.left * tile - tile) + 'px';
                }
                return content.find('.item[style*="top: ' + top + '; left: ' + left + ';"]');
            };

            let moveItem = (item, direction, transition = false) => {
                return new Promise((resolve, reject) => {
                    movingItem = true;
                    if (direction === directions.up) {
                        // move up
                        item.animate({
                            top: (current.top * tile) + 'px'
                        }, transition ? layoutr.transitionTime : 0, function () {
                            movingItem = false;
                            current.top++;
                            resolve();
                        });
                    } else if (direction === directions.down) {
                        // move down
                        item.animate({
                            top: (current.top * tile) + 'px'
                        }, transition ? layoutr.transitionTime : 0, function () {
                            movingItem = false;
                            current.top--;
                            resolve();
                        });
                    } else if (direction === directions.left) {
                        // move left
                        item.animate({
                            left: (current.left * tile) + 'px'
                        }, transition ? layoutr.transitionTime : 0, function () {
                            movingItem = false;
                            current.left++;
                            resolve();
                        });
                    } else if (direction === directions.right) {
                        // move right
                        item.animate({
                            left: (current.left * tile) + 'px'
                        }, transition ? layoutr.transitionTime : 0, function () {
                            movingItem = false;
                            current.left--;
                            resolve();
                        });
                    }
                });

            };

            let lastMove;
            let setRandom = () => {
                let direction = [];

                if (current.top !== 0 && lastMove !== directions.up) {
                    // can go down
                    direction.push(directions.down);
                }
                if (current.top !== tiles - 1 && lastMove !== directions.down) {
                    // can go up
                    direction.push(directions.up);
                }
                if (current.left !== 0 && lastMove !== directions.left) {
                    // can go right
                    direction.push(directions.right);
                }
                if (current.left !== tiles - 1 && lastMove !== directions.right) {
                    // can go left
                    direction.push(directions.left);
                }

                shuffle(direction);

                direction = direction[0];
                lastMove = direction;
                moveItem(getItem(direction), direction, true).then(() => {
                    random--;
                    if (random > 0) {
                        setRandom();
                    }
                });
            };

            let checkSolved = () => {
                let solved = true;
                items.each((i, e) => {
                    let modified = {};

                    modified.item = $(e);
                    modified.id = modified.item.attr('data-id');
                    modified.top = modified.item.css('top');
                    modified.left = modified.item.css('left');

                    let original = $.grep(correct, (item) => {
                        return item.id === modified.id;
                    })[0];

                    if (original.top !== modified.top || original.left !== modified.left) {
                        solved = false;
                        return false;
                    }
                });
                if (solved) {
                    alert('todo: solved');
                }
            };

            let init = () => {
                setPositions();
                setItems();
                setCurrent();
                setCorrect();
                setRandom();
            };

            init();

            items.click((e) => {
                if (!assignment.hasClass('validated') && !movingItem) {
                    let item = $(e.target),
                        top = item.css('top'),
                        left = item.css('left');

                    if (top === (current.top * tile + tile) + 'px' && left === current.left * tile + 'px') {
                        moveItem(item, directions.up, true).then(() => {
                            checkSolved();
                        });
                    } else if (top === (current.top * tile - tile) + 'px' && left === current.left * tile + 'px') {
                        moveItem(item, directions.down, true).then(() => {
                            checkSolved();
                        });
                    } else if (top === current.top * tile + 'px' && left === (current.left * tile + tile) + 'px') {
                        moveItem(item, directions.left, true).then(() => {
                            checkSolved();
                        });
                    } else if (top === current.top * tile + 'px' && left === (current.left * tile - tile) + 'px') {
                        moveItem(item, directions.right, true).then(() => {
                            checkSolved();
                        });
                    }
                }
            });

            layoutr.body.on('keydown.assignmentPuzzle', (e) => {
                if (!assignment.hasClass('validated') && !movingItem) {
                    if (e.keyCode === 38 && current - top !== tiles - 1) {
                        e.preventDefault();
                        moveItem(getItem(directions.up), directions.up, true).then(() => {
                            checkSolved();
                        });
                    } else if (e.keyCode === 40 && current.top !== 0) {
                        e.preventDefault();
                        moveItem(getItem(directions.down), directions.down, true).then(() => {
                            checkSolved();
                        });
                    } else if (e.keyCode === 37 && current.left !== tiles - 1) {
                        e.preventDefault();
                        moveItem(getItem(directions.left), directions.left, true).then(() => {
                            checkSolved();
                        });
                    } else if (e.keyCode === 39 && current.left !== 0) {
                        e.preventDefault();
                        moveItem(getItem(directions.right), directions.right, true).then(() => {
                            checkSolved();
                        });
                    }
                }
            });

            assignment.on('click', 'button[type="submit"]', () => {
                if (!assignment.hasClass('validated') && !movingItem) {
                    assignment.addClass('validated');
                    checkSolved();
                }
            });

            assignment.on('click', 'button[type="reset"]', () => {
                if (!movingItem) {
                    assignment.removeClass('validated');
                    alert('todo: reset');
                    // set reset
                }
            });

            assignment.on('click', 'button.correct', () => {
                if (!movingItem) {
                    assignment.addClass('validated');
                    alert('todo: correct');
                    // set correct
                }
            });
        } else {
            layoutr.arrowKeyLocked = false;
        }
    };
}