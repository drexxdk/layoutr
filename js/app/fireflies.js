var app = app || {};

app.fireflies = function (element, palette, fireflies) {
    var canvas = element[0], //document.getElementById('canvas'),
        context = canvas.getContext('2d'),
        canvasWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        canvasHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
        requestAnimationFrame = window.requestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.msRequestAnimationFrame;
    var persons = [],
        numberOfFirefly = fireflies !== undefined ?fireflies : 300;

    var colors = palette !== undefined ? palette : ['rgba(85,77,0,', 'rgba(128,118,21,', 'rgba(170,160,57,', 'rgba(212,203,106,', 'rgba(255,247,170,'];

    function getRandomInt(min, max, exept) {
        var i = Math.floor(Math.random() * (max - min + 1)) + min;
        if (typeof exept === "undefined") return i;
        else if (typeof exept === 'number' && i === exept) return getRandomInt(min, max, exept);
        else if (typeof exept === "object" && (i >= exept[0] && i <= exept[1])) return getRandomInt(min, max, exept);
        else return i;
    }

    function isEven(n) {
        return n === parseFloat(n) ? !(n % 2) : void 0;
    }

    function degToRad(deg) {
        return deg * (Math.PI / 180);
    }

    function Firefly(id) {
        this.id = id;
        this.width = getRandomInt(3, 6);
        this.height = this.width;
        this.x = getRandomInt(0, canvas.width - this.width);
        this.y = getRandomInt(0, canvas.height - this.height);
        this.speed = this.width <= 10 ? 2 : 1;
        this.alpha = 1;
        this.alphaReduction = getRandomInt(1, 3) / 1000;
        this.color = colors[getRandomInt(0, colors.length - 1)];
        this.direction = getRandomInt(0, 360);
        this.turner = getRandomInt(0, 1) === 0 ? -1 : 1;
        this.turnerAmp = getRandomInt(1, 2);
        this.isHit = false;
        this.stepCounter = 0;
        this.changeDirectionFrequency = getRandomInt(1, 200);
        this.shape = 2; //getRandomInt(2,3);
        this.shadowBlur = getRandomInt(5, 25);
    }

    Firefly.prototype.stop = function () {
        this.update();
    };

    Firefly.prototype.walk = function () {
        var next_x = this.x + Math.cos(degToRad(this.direction)) * this.speed,
            next_y = this.y + Math.sin(degToRad(this.direction)) * this.speed;

        // Canvas limits
        if (next_x >= canvas.width - this.width && (this.direction < 90 || this.direction > 270)) {
            next_x = canvas.width - this.width;
            this.direction = getRandomInt(90, 270, this.direction);
        }
        if (next_x <= 0 && (this.direction > 90 && this.direction < 270)) {
            next_x = 0;
            var exept = [90, 270];
            this.direction = getRandomInt(0, 360, exept);
        }
        if (next_y >= canvas.height - this.height && (this.direction > 0 && this.direction < 180)) {
            next_y = canvas.height - this.height;
            this.direction = getRandomInt(180, 360, this.direction);
        }
        if (next_y <= 0 && (this.direction > 180 && this.direction < 360)) {
            next_y = 0;
            this.direction = getRandomInt(0, 180, this.direction);
        }

        this.x = next_x;
        this.y = next_y;

        this.stepCounter++;

        if (this.changeDirectionFrequency && this.stepCounter === this.changeDirectionFrequency) {
            this.turner = this.turner === -1 ? 1 : -1;
            this.turnerAmp = getRandomInt(1, 2);
            this.stepCounter = 0;
            this.changeDirectionFrequency = getRandomInt(1, 200);
        }

        this.direction += this.turner * this.turnerAmp;

        this.update();
    };

    Firefly.prototype.takeOppositeDirection = function () {
        // Right -> Left
        if (this.direction >= 0 && this.direction < 90 || this.direction > 270 && this.direction <= 360) {
            this.direction = getRandomInt(90, 270);
            return;
        }
        // Left -> Right
        if (this.direction > 90 && this.direction < 270) {
            var exept = [90, 270];
            this.direction = getRandomInt(0, 360, exept);
            return;
        }
        // Down -> Up
        if (this.direction > 0 && this.direction < 180) {
            this.direction = getRandomInt(180, 360);
            return;
        }
        // Up -> Down
        if (this.direction > 180) {
            this.direction = getRandomInt(0, 180);
        }
    };

    Firefly.prototype.update = function () {

        context.beginPath();

        context.fillStyle = this.color + this.alpha + ")";
        context.arc(this.x + this.width / 2, this.y + this.height / 2, this.width / 2, 0, 2 * Math.PI, false);
        context.shadowColor = this.color + this.alpha + ")";
        context.shadowBlur = this.shadowBlur;
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.fill();
    };

    function start() {
        resizeCanvas();
        instantiatePopulation();
        animate();
    }
    start();

    function instantiatePopulation() {
        var i = 0;
        while (i < numberOfFirefly) {
            persons[i] = new Firefly(i);
            i++;
        }
    }

    function animate() {
        window.addEventListener('resize', resizeCanvas, false);
        context.clearRect(0, 0, canvas.width, canvas.height);

        context.beginPath();

        // Création d'une copie de l'array persons
        persons_order = persons.slice(0);
        // Tri par ordre de position sur l'axe y (afin de gérer les z-index)
        persons_order.sort(function (a, b) {
            return a.y - b.y;
        });

        // Paint les instances dans l'ordre trié
        for (var i in persons_order) {
            var u = persons_order[i].id;
            persons[u].walk();
        }

        requestAnimationFrame(animate);
    }

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
};