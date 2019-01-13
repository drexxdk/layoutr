{
    layoutr.checkAssignmentPuzzle = (assignment) => {
        if (assignment.hasClass('puzzle')) {
            let id = assignment.attr('data-id'),
                image = assignment.attr('data-image'),
                tiles = layoutr.tryParseInt(assignment.attr('data-tiles'), 0),
                size = layoutr.tryParseInt(assignment.attr('data-size'), 0),
                random = layoutr.tryParseInt(assignment.attr('data-random'), 3),
                tile = 100 / tiles,
                total = tiles * tiles - 1,
                positions = [],
                items = [],
                movingItem = false,
                correct = [],
                transitionTime = 100,
                directions = {
                    up: 'up',
                    down: 'down',
                    left: 'left',
                    right: 'right'
                },
                current,
                movesUsed,
                lastMove,
                randomUsed,
                domContent,
                domStart,
                domGiveUp;

            {
                assignment.attr('data-state', 'initial');

                let html = 
`<div class="content" style="max-width: ${size}px; max-height: ${size}px">
    <div style="background-image: url(${image})"></div>
</div>
<div class="buttons">
    <div class="flex wrap column gap-2">
        <button type="submit" class="btn start">Start</button>
        <button type="button" class="btn theme-secondary give-up">Give up</button>
    </div>
</div>`;
                assignment.append(html);

                domContent = assignment.find('.content > div');
                domStart = assignment.find('button.start');
                domGiveUp = assignment.find('button.give-up');

                domStart.click(() => {
                    start();
                });

                domGiveUp.click(() => {
                    if (!movingItem) {
                        reset();
                    }
                });
            }

            let shuffle = (array) => {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }
                return array;
            };
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
                    let html = 
`<div class="item"
    data-id="${positions[i].id}" 
    data-top="${positions[i].top}" 
    data-left="${positions[i].left}" 
    style="
    width: ${tile}%; 
    height: ${tile}%; 
    top: ${positions[i].top * tile}%; 
    left: ${positions[i].left * tile}%; 
">
    <div style="
        width: ${tiles * 100}%; 
        height: ${tiles * 100}%; 
        background-image: url(${image}); 
        margin-left: -${positions[i].left * tile * tiles}%; 
        margin-top: -${positions[i].top * tile * tiles}%; 
    "></div>
</div>`;
                    domContent.append(html);
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
                return domContent.find(`.item[data-top="${top}"][data-left="${left}"]`);
            };

            let moveItem = (item, direction, initial = true) => {
                return new Promise((resolve, reject) => {
                    movingItem = true;
                    if (direction === directions.up) {
                        // move up
                        item.animate({
                            top: `${current.top * tile}%`
                        }, !initial ? transitionTime : 0, function () {
                            if (!initial) {
                                movesUsed++;
                            }
                            movingItem = false;
                            item.attr('data-top', parseInt(item.attr('data-top')) - 1);
                            current.top++;
                            setMovable();
                            resolve();
                        });
                    } else if (direction === directions.down) {
                        // move down
                        item.animate({
                            top: `${current.top * tile}%`
                        }, !initial ? transitionTime : 0, function () {
                            if (!initial) {
                                movesUsed++;
                            }
                            movingItem = false;
                            item.attr('data-top', parseInt(item.attr('data-top')) + 1);
                            current.top--;
                            setMovable();
                            resolve();
                        });
                    } else if (direction === directions.left) {
                        // move left
                        item.animate({
                            left: `${current.left * tile}%`
                        }, !initial ? transitionTime : 0, function () {
                            if (!initial) {
                                movesUsed++;
                            }
                            movingItem = false;
                            item.attr('data-left', parseInt(item.attr('data-left')) - 1);
                            current.left++;
                            setMovable();
                            resolve();
                        });
                    } else if (direction === directions.right) {
                        // move right
                        item.animate({
                            left: `${current.left * tile}%`
                        }, !initial ? transitionTime : 0, function () {
                            if (!initial) {
                                movesUsed++;
                            }
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
            };

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
                moveItem(getItem(direction), direction).then(() => {
                    randomUsed--;
                    if (randomUsed > 0) {
                        setRandom();
                    }
                });
            };


            let start = () => {
                layoutr.arrowKeyLocked = true;
                setPositions();
                setItems();
                setCurrent();
                setCorrect();

                movesUsed = 0;
                lastMove = undefined;
                randomUsed = random;

                setRandom();
                assignment.attr('data-state', 'start');
            };

            let reset = () => {
                layoutr.arrowKeyLocked = false;
                domContent.empty();
                assignment.attr('data-state', 'initial');
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
                    reset();

                    let html = 
`<div class="alert theme-success">
    <div>
        <h3 class="align-center">You Win</h3>
        <div class="table">
            <table>
                <tbody>
                    <tr><th>Moves used</th><td>${movesUsed}</td></tr>
                    <tr><th>Perfect moves</th><td>${random}</td></tr>
                </tbody>
            </table>
        </div>
    </div>
</div>`;
                    domContent.append(html);
                }
            };

            assignment.on('click', '.item.movable', (e) => {
                if (assignment.attr('data-state') === 'start' && !movingItem) {
                    let item = $(e.target),
                        top = parseInt(item.attr('data-top')),
                        left = parseInt(item.attr('data-left'));

                    if (top === current.top + 1 && left === current.left) {
                        moveItem(item, directions.up, false).then(() => {
                            checkSolved();
                        });
                    } else if (top === current.top - 1 && left === current.left) {
                        moveItem(item, directions.down, false).then(() => {
                            checkSolved();
                        });
                    } else if (top === current.top && left === current.left + 1) {
                        moveItem(item, directions.left, false).then(() => {
                            checkSolved();
                        });
                    } else if (top === current.top && left === current.left - 1) {
                        moveItem(item, directions.right, false).then(() => {
                            checkSolved();
                        });
                    }
                }
            });

            layoutr.body.on('keydown.assignmentPuzzle', (e) => {
                if (assignment.attr('data-state') === 'start' && !movingItem) {
                    if (e.keyCode === 38 && current.top !== tiles - 1) {
                        e.preventDefault();
                        moveItem(getItem(directions.up), directions.up, false).then(() => {
                            checkSolved();
                        });
                    } else if (e.keyCode === 40 && current.top !== 0) {
                        e.preventDefault();
                        moveItem(getItem(directions.down), directions.down, false).then(() => {
                            checkSolved();
                        });
                    } else if (e.keyCode === 37 && current.left !== tiles - 1) {
                        e.preventDefault();
                        moveItem(getItem(directions.left), directions.left, false).then(() => {
                            checkSolved();
                        });
                    } else if (e.keyCode === 39 && current.left !== 0) {
                        e.preventDefault();
                        moveItem(getItem(directions.right), directions.right, false).then(() => {
                            checkSolved();
                        });
                    }
                }
            });
        } else {
            layoutr.arrowKeyLocked = false;
        }
    };
}