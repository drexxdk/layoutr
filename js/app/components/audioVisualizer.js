{
    let setupAudioVisualizer = function (element, visualizer, theme) {
        let WIDTH,
            HEIGHT,
            DIFFERENCE,
            INTERVAL = 128, // 256;
            SAMPLES = 2048, // 512 1024 2048 4096
            r = 0,
            g = 0,
            b = 255,
            x = 0,
            canvas = visualizer[0],
            context = canvas.getContext("2d"),
            audio = element[0],
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
            WIDTH = visualizer.width();
            HEIGHT = visualizer.height();
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
                for (var i = 0; i < INTERVAL; i++) {
                    var num = i;

                    barHeight = ((freqArr[num] - 128) * 2) + 2;
                    if (barHeight <= 1) {
                        barHeight = 2;
                    } else {
                        barHeight = (barHeight / 100) * (100 + DIFFERENCE);
                    }

                    if (theme === 'primary') {
                        context.fillStyle = `rgb(${.58 * (barHeight / 10)},0,${1 * barHeight})`;
                    }
                    else if (theme === 'success') {
                        context.fillStyle = `rgb(0,${2 / 3 * barHeight},0)`;
                    }
                    else if (theme === 'danger') {
                        context.fillStyle = `rgb(${2 / 3 * barHeight},0,0)`;
                    }
                    else if (theme === 'warning') {
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

    layoutr.checkAudioVisualizer = (audioVisualizers) => {
        if (audioVisualizers.length) {
            audioVisualizers.each((i, e) => {
                let audioVisualizer = $(e),
                    element = audioVisualizer.attr('data-audio') ? $('#' + audioVisualizer.attr('data-audio')) : undefined,
                    theme = audioVisualizer.attr('data-theme');
                if (element.length) {
                    setupAudioVisualizer(element, audioVisualizer, theme);
                }
            });
        } else {
            $(window).off('resize.av');
        }
    };
}