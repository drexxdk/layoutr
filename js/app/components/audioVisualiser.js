{
    layoutr.checkAudioVisualiser = (audioVisualisers) => {
        if (audioVisualisers.length) {
            audioVisualisers.each((i, e) => {
                let element = $(e),
                    audio = element.attr('data-audio') ? $('#' + element.attr('data-audio')) : undefined;

                if (audio.length) {
                    audio = audio[0];
                    let type = element.attr('data-type') ? element.attr('data-type') : 'bars',
                        canvas = $('<canvas></canvas')[0],
                        canvasWidth,
                        canvasHeight,
                        difference,
                        interval = 128, // 256;
                        samples = 2048, // 512 1024 2048 4096
                        canvasContext = canvas.getContext("2d"),
                        audioContext = new AudioContext(),
                        analyser = audioContext.createAnalyser(),
                        freqArr = new Uint8Array(analyser.frequencyBinCount),
                        barHeight = canvasHeight,
                        source,
                        animationFrame,
                        buffer,  // should be generated server-side
                        content = $('<div class="content"></div>'),
                        title = element.attr('data-title'),
                        theme = layoutr.getThemeFromAttr(element.attr('class'));

                    analyser.fftSize = samples;

                    element.attr('data-type', type);

                    element.append(canvas);
                    element.append(content);

                    audio.onpause = () => {
                        window.cancelAnimationFrame(animationFrame);
                    };

                    audio.onplay = () => {
                        window.cancelAnimationFrame(animationFrame);
                        animationFrame = window.requestAnimationFrame(draw);
                    };

                    audio.onseeked = $.throttle(layoutr.throttleInterval, false, () => {
                        window.cancelAnimationFrame(animationFrame);
                        animationFrame = window.requestAnimationFrame(draw);
                    });

                    if (layoutr.html.hasClass('mobile') || layoutr.html.hasClass('tablet')) {
                        let interactionTimeout;
                        element.on('click', (e) => {
                            let target = $(e.target);
                            if (!target.closest('.controls button').length) {
                                element.toggleClass('shown');
                            }
                            clearTimeout(interactionTimeout);
                            interactionTimeout = setTimeout(() => {
                                element.removeClass('shown');
                            }, layoutr.interactionTime);
                        });
                    }

                    if (title) {
                        content.append(`<h3 class="title">${title}</h3>`);
                    }

                    content.append(`
<div class="controls">
    <div>
        <button type="button" class="btn" data-type="bars" aria-label="Bars">
            <svg focusable="false"><use xlink:href="#svg-audio-bars"></use></svg>
        </button>
        <button type="button" class="btn" data-type="oscilloscope" aria-label="Oscilloscope">
            <svg focusable="false"><use xlink:href="#svg-audio-oscilloscope"></use></svg>
        </button>
        <button type="button" class="btn" data-type="waveform" aria-label="Waveform">
            <svg focusable="false"><use xlink:href="#svg-audio-waveform"></use></svg>
        </button>
    </div>
</div>
`);

                    fetch(audio.currentSrc)
                        .then(response => response.arrayBuffer())
                        .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
                        .then((audioBuffer) => {
                            const rawData = audioBuffer.getChannelData(0); // We only need to work with one channel of data
                            const blockSize = Math.floor(rawData.length / samples); // the number of samples in each subdivision
                            const filteredData = [];
                            for (let i = 0; i < samples; i++) {
                                let blockStart = blockSize * i; // the location of the first sample in the block
                                let sum = 0;
                                for (let j = 0; j < blockSize; j++) {
                                    sum = sum + Math.abs(rawData[blockStart + j]); // find the sum of all the samples in the block
                                }
                                filteredData.push(sum / blockSize); // divide the sum by the block size to get the average
                            }
                            buffer = filteredData;
                            if (type === 'waveform') {
                                window.cancelAnimationFrame(animationFrame);
                                animationFrame = window.requestAnimationFrame(draw);
                            }
                        });

                    element.find('button').click((e) => {
                        type = $(e.target).attr('data-type');
                        element.attr('data-type', type);
                        window.cancelAnimationFrame(animationFrame);
                        animationFrame = window.requestAnimationFrame(draw);
                    });

                    let setSize = () => {
                        canvasWidth = canvas.clientWidth;
                        canvasHeight = canvas.clientHeight;
                        difference = ((canvasHeight - 256) * 100) / 256;
                        canvasContext.canvas.width = canvasWidth;
                        canvasContext.canvas.height = canvasHeight;
                    };

                    let draw = () => {
                        analyser.minDecibels = -100;
                        analyser.maxDecibels = -30;
                        analyser.smoothingTimeConstant = 0.8;
                        canvasContext.resetTransform();
                        canvasContext.shadowBlur = 0;
                        canvasContext.lineWidth = 1;
                        canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);
                        let x = 0;
                        if (type === 'oscilloscope') {
                            analyser.minDecibels = -90;
                            analyser.maxDecibels = -10;
                            analyser.smoothingTimeConstant = 0.85;
                            analyser.getByteTimeDomainData(freqArr);
                            canvasContext.lineWidth = 2;
                            canvasContext.shadowOffsetX = 0;
                            canvasContext.shadowOffsetY = 0;
                            canvasContext.shadowBlur = 4;
                            canvasContext.shadowColor = "gray";
                            canvasContext.beginPath();

                            let sliceWidth = canvasWidth * 1.0 / analyser.frequencyBinCount,
                                prev = 0;
                            for (let i = 0; i < analyser.frequencyBinCount; i++) {
                                var v = freqArr[i] / 128.0;
                                var y = v * canvasHeight / 2;
                                if (y > prev) {
                                    canvasContext.strokeStyle = "black";
                                } else {
                                    if (theme === 'theme-primary') {
                                        canvasContext.strokeStyle = "#0072ED";
                                    }
                                    else if (theme === 'theme-success') {
                                        canvasContext.strokeStyle = "#218838";
                                    }
                                    else if (theme === 'theme-danger') {
                                        canvasContext.strokeStyle = "#dc3545";
                                    }
                                    else if (theme === 'theme-warning') {
                                        canvasContext.strokeStyle = "#BE5A06";
                                    } else {
                                        canvasContext.strokeStyle = "#6F7780";
                                    }
                                }
                                if (i === 0) {
                                    canvasContext.moveTo(x, y);
                                } else {
                                    canvasContext.lineTo(x, y);
                                }
                                prev = y;
                                x += sliceWidth;
                            }

                            canvasContext.lineTo(canvasWidth, canvasHeight / 2);
                            canvasContext.stroke();
                        } else if (type === 'bars') {
                            let x = 0;
                            let r = 0;
                            let g = 0;
                            let b = 255;
                            analyser.getByteFrequencyData(freqArr);

                            for (let i = 0; i < interval; i++) {
                                let num = i;

                                barHeight = ((freqArr[num] - 128) * 2) + 2;
                                if (barHeight <= 1) {
                                    barHeight = 2;
                                } else {
                                    barHeight = (barHeight / 100) * (100 + difference);
                                }

                                if (theme === 'theme-primary') {
                                    canvasContext.fillStyle = `rgb(${.58 * (barHeight / 10)},0,${1 * barHeight})`;
                                }
                                else if (theme === 'theme-success') {
                                    canvasContext.fillStyle = `rgb(0,${2 / 3 * barHeight},0)`;
                                }
                                else if (theme === 'theme-danger') {
                                    canvasContext.fillStyle = `rgb(${2 / 3 * barHeight},0,0)`;
                                }
                                else if (theme === 'theme-warning') {
                                    canvasContext.fillStyle = `rgb(${1 * barHeight},${.6 * barHeight},0)`;
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
                                    canvasContext.fillStyle = `rgb(${r},${g},${b})`;
                                }
                                canvasContext.fillRect(x, canvasHeight - barHeight, (canvasWidth / interval) - 1, barHeight);
                                x = x + (canvasWidth / interval);
                            }
                        } else if (type === 'waveform' && buffer) {
                            canvasContext.translate(0, canvasHeight / 2);
                            let width = canvasWidth / buffer.length;
                            for (let i = 0; i < buffer.length; i++) {
                                const x = width * i;
                                let height = buffer[i] * canvasHeight;
                                if (height < 0) {
                                    height = 0;
                                } else if (height > canvasHeight / 2) {
                                    height = height > canvasHeight / 2;
                                }

                                if (theme === 'theme-primary') {
                                    canvasContext.fillStyle = "#0072ED";
                                }
                                else if (theme === 'theme-success') {
                                    canvasContext.fillStyle = "#218838";
                                }
                                else if (theme === 'theme-danger') {
                                    canvasContext.fillStyle = "#dc3545";
                                }
                                else if (theme === 'theme-warning') {
                                    canvasContext.fillStyle = "#BE5A06";
                                } else {
                                    canvasContext.fillStyle = "#6F7780";
                                }

                                canvasContext.fillRect(x, -height, 1, height * 2);
                            }

                            let currentTime = audio.currentTime,
                                duration = audio.duration,
                                percentage = currentTime / duration,
                                progress = canvasWidth * percentage;


                            canvasContext.resetTransform();
                            canvasContext.fillStyle = 'black';
                            canvasContext.fillRect(progress, 0, 2, canvasHeight);
                        }
                        if (!audio.paused) {
                            animationFrame = window.requestAnimationFrame(draw);
                        }
                    };

                    try {
                        source = audioContext.createMediaElementSource(audio);
                    } catch (e) {
                        // there can only be one source for HTML5 audio
                        element.remove();
                        return;
                    }

                    source.connect(analyser);
                    source.connect(audioContext.destination);

                    setSize();

                    if (type !== 'waveform') {
                        animationFrame = window.requestAnimationFrame(draw);
                    }

                    element.sizeChanged($.throttle(layoutr.throttleInterval, false, () => {
                        setSize();
                        window.cancelAnimationFrame(animationFrame);
                        animationFrame = window.requestAnimationFrame(draw);
                    }));

                }
            });
        }
    };
}