{
    layoutr.checkAssignmentPuzzle = (assignment) => {
        if (assignment.hasClass('puzzle')) {
            layoutr.body.off('keydown.assignmentPuzzle');
            let id = assignment.attr('data-id'),
                image = assignment.attr('data-image'),
                tiles = layoutr.tryParseInt(assignment.attr('data-tiles'), 0),
                size = layoutr.tryParseInt(assignment.attr('data-size'), 0),
                domRandom = layoutr.tryParseInt(assignment.attr('data-random'), 3),
                tile = 100 / tiles,
                total = tiles * tiles - 1,
                domContent = assignment.find('.content'),
                positions = [],
                items,
                current,
                movingItem = false,
                correct = [],
                transitionTime = 100,
                directions = {
                    up: 'up',
                    down: 'down',
                    left: 'left',
                    right: 'right'
                },
                domStart = assignment.find('button[type = "submit"]'),
                domReset = assignment.find('button[type="reset"]');

            layoutr.arrowKeyLocked = true;

            let shuffle = (array) => {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }
                return array;
            };

            domContent.css({
                'width': '100%',
                'height': '100%',
                'max-width': size + 'px',
                'max-height': size + 'px'
            });
            domContent.append('<div></div>');
            domContent = domContent.children();
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
                domContent.empty();
                for (let i = 0; i < total; i++) {
                    domContent.append('<div class="item" data-id="' + positions[i].id + '" ' +
                        'data-top="' + positions[i].top + '" ' +
                        'data-left="' + positions[i].left + '" ' +
                        'style="' +
                        'width: ' + tile + '%; ' +
                        'height: ' + tile + '%; ' +
                        'top: ' + (positions[i].top * tile) + '%; ' +
                        'left: ' + (positions[i].left * tile) + '%; ' +
                        '">' +
                        '<div style="' +
                        'width: ' + tiles * 100 + '%; ' +
                        'height: ' + tiles * 100 + '%; ' +
                        'background-image: url(' + image + '); ' +
                        'margin-left: -' + (positions[i].left * tile) * tiles + '%; ' +
                        'margin-top: -' + (positions[i].top * tile) * tiles + '%; ' +
                        '"></div>' +
                        '</div>');
                }
                items = domContent.children();
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
                        'top': item.attr('data-top'),
                        'left': item.attr('data-left')
                    });
                });
            };

            let getItem = (direction) => {
                let top = current.top,
                    left = current.left;

                if (direction === directions.up) {
                    top = current.top + 1;
                } else if (direction === directions.down) {
                    top = current.top - 1;
                } else if (direction === directions.left) {
                    left = current.left + 1;
                } else if (direction === directions.right) {
                    left = current.left - 1;
                }
                return domContent.find('.item[data-top="' + top + '"][data-left="' + left + '"]');
            };

            let moveItem = (item, direction, transition = false) => {
                return new Promise((resolve, reject) => {
                    movingItem = true;
                    if (direction === directions.up) {
                        // move up
                        item.animate({
                            top: (current.top * tile) + '%'
                        }, transition ? transitionTime : 0, function () {
                            movingItem = false;
                            item.attr('data-top', parseInt(item.attr('data-top')) - 1);
                            current.top++;
                            setMovable();
                            resolve();
                        });
                    } else if (direction === directions.down) {
                        // move down
                        item.animate({
                            top: (current.top * tile) + '%'
                        }, transition ? transitionTime : 0, function () {
                            movingItem = false;
                            item.attr('data-top', parseInt(item.attr('data-top')) + 1);
                            current.top--;
                            setMovable();
                            resolve();
                        });
                    } else if (direction === directions.left) {
                        // move left
                        item.animate({
                            left: (current.left * tile) + '%'
                        }, transition ? transitionTime : 0, function () {
                            movingItem = false;
                            item.attr('data-left', parseInt(item.attr('data-left')) - 1);
                            current.left++;
                            setMovable();
                            resolve();
                        });
                    } else if (direction === directions.right) {
                        // move right
                        item.animate({
                            left: (current.left * tile) + '%'
                        }, transition ? transitionTime : 0, function () {
                            movingItem = false;
                            item.attr('data-left', parseInt(item.attr('data-left')) + 1);
                            current.left--;
                            setMovable();
                            resolve();
                        });
                    }
                });

            };

            let setMovable = () => {
                items.removeClass('movable');
                if (current.top !== 0) {
                    getItem(directions.down).addClass('movable');
                }
                if (current.top !== tiles - 1) {
                    getItem(directions.up).addClass('movable');
                }
                if (current.left !== 0) {
                    getItem(directions.right).addClass('movable');
                }
                if (current.left !== tiles - 1) {
                    getItem(directions.left).addClass('movable');
                }
            }

            let lastMove,
                random;
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
                moveItem(getItem(direction), direction, false).then(() => {
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
                    modified.top = modified.item.attr('data-top');
                    modified.left = modified.item.attr('data-left');

                    let original = $.grep(correct, (item) => {
                        return item.id === modified.id;
                    })[0];

                    if (original.top !== modified.top || original.left !== modified.left) {
                        solved = false;
                        return false;
                    }
                });
                if (solved) {
                    domContent.append('<div class="correct">Correct</div>');
                }
            };

            let init = () => {
                setPositions();
                setItems();
                setCurrent();
                setCorrect();

                lastMove = undefined;
                random = domRandom;

                setRandom();
            };

            assignment.on('click', '.item.movable', (e) => {
                if (!assignment.hasClass('validated') && !movingItem) {
                    let item = $(e.target),
                        top = parseInt(item.attr('data-top')),
                        left = parseInt(item.attr('data-left'));

                    if (top === current.top + 1 && left === current.left) {
                        moveItem(item, directions.up, true).then(() => {
                            checkSolved();
                        });
                    } else if (top === current.top - 1 && left === current.left) {
                        moveItem(item, directions.down, true).then(() => {
                            checkSolved();
                        });
                    } else if (top === current.top && left === current.left + 1) {
                        moveItem(item, directions.left, true).then(() => {
                            checkSolved();
                        });
                    } else if (top === current.top && left === current.left - 1) {
                        moveItem(item, directions.right, true).then(() => {
                            checkSolved();
                        });
                    }
                }
            });

            layoutr.body.on('keydown.assignmentPuzzle', (e) => {
                if (!assignment.hasClass('validated') && !movingItem) {
                    if (e.keyCode === 38 && current.top !== tiles - 1) {
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

            domStart.click(() => {
                init();
                domStart.addClass('hidden');
                domReset.removeClass('hidden');
            });

            domReset.click(() => {
                if (!movingItem) {
                    init();
                    domContent.children('.correct').remove();
                }
            });
        } else {
            layoutr.arrowKeyLocked = false;
        }
    };
}