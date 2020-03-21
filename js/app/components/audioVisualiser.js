{
    let setupAudioVisualiser = function (audio, canvas, theme) {
        let WIDTH,
            HEIGHT,
            DIFFERENCE,
            INTERVAL = 128, // 256;
            SAMPLES = 2048, // 512 1024 2048 4096
            r = 0,
            g = 0,
            b = 255,
            x = 0,
            context = canvas.getContext("2d"),
            audioctx = new AudioContext(),
            analyser = audioctx.createAnalyser(),
            source = audioctx.createMediaElementSource(audio),
            freqArr = new Uint8Array(analyser.frequencyBinCount),
            barHeight = HEIGHT;

        setSize();

        analyser.fftSize = SAMPLES;
        source.connect(analyser);
        source.connect(audioctx.destination);

        window.requestAnimationFrame(draw);

        function setSize() {
            WIDTH = canvas.clientWidth;
            HEIGHT = canvas.clientHeight;
            DIFFERENCE = getDifference();
            context.canvas.width = WIDTH;
            context.canvas.height = HEIGHT;
        }

        function getDifference() {
            return ((HEIGHT - 256) * 100) / 256;
        }

        function draw() {
            if (!audio.paused) {
                r = 0;
                g = 0;
                b = 255;
                x = 0;
                context.clearRect(0, 0, WIDTH, HEIGHT);
                analyser.getByteFrequencyData(freqArr);

                //let idx = Math.round(140 * analyser.fftSize / analyser.context.sampleRate),
                //    number = freqArr[idx] / 255,
                //    percentage = number * 100,
                //    scale = 1 + (number / 4);

                for (var i = 0; i < INTERVAL; i++) {
                    var num = i;

                    barHeight = ((freqArr[num] - 128) * 2) + 2;
                    if (barHeight <= 1) {
                        barHeight = 2;
                    } else {
                        barHeight = (barHeight / 100) * (100 + DIFFERENCE);
                    }

                    if (theme === 'theme-primary') {
                        context.fillStyle = `rgb(${.58 * (barHeight / 10)},0,${1 * barHeight})`;
                    }
                    else if (theme === 'theme-success') {
                        context.fillStyle = `rgb(0,${2 / 3 * barHeight},0)`;
                    }
                    else if (theme === 'theme-danger') {
                        context.fillStyle = `rgb(${2 / 3 * barHeight},0,0)`;
                    }
                    else if (theme === 'theme-warning') {
                        context.fillStyle = `rgb(${1 * barHeight},${.6 * barHeight},0)`;
                    }
                    else {
                        r = r + 10;
                        if (r > 255) {
                            r = 255;
                        }
                        g = g + 1;
                        if (g > 255) {
                            g = 255;
                        }
                        b = b - 2;
                        if (b < 0) {
                            b = 0;
                        }
                        context.fillStyle = `rgb(${r},${g},${b})`;
                    }



                    context.fillRect(x, HEIGHT - barHeight, (WIDTH / INTERVAL) - 1, barHeight);
                    x = x + (WIDTH / INTERVAL);
                }
            }
            window.requestAnimationFrame(draw);
        }


        $(window).on('resize.av', () => {
            setSize();
        });
    };

    layoutr.checkAudioVisualiser = (audioVisualisers) => {
        if (audioVisualisers.length) {
            audioVisualisers.each((i, e) => {
                let element = $(e),
                    audio = element.attr('data-audio') ? $('#' + element.attr('data-audio')) : undefined;

                if (audio.length) {
                    let canvas = $('<canvas></canvas'),
                        theme = layoutr.getThemeFromAttr(element.attr('class'));

                    element.append(canvas);

                    setupAudioVisualiser(audio[0], canvas[0], theme);

                }
            });
        } else {
            $(window).off('resize.av');
        }
    };
}