{
    //layoutr.loadTheme = (id) => {
    //    let stylesheet = layoutr.body.children(`link[rel="stylesheet"][href^="${layoutr.host}dist/css/theme/"]`),
    //        href1 = stylesheet.attr('href'),
    //        split1 = href1.split('/'),
    //        split2 = split1[split1.length - 1].split('.');
    //    let href2 = [];
    //    for (let i = 0; i < split1.length - 1; i++) {
    //        href2.push(split1[i] + '/');
    //    }
    //    let theme = id.substring(id.indexOf("-") + 1);
    //    href2.push(theme);

    //    for (let i = 1; i < split2.length; i++) {
    //        href2.push(`.${split2[i]}`);
    //    }
    //    href2 = href2.join("");
    //    if (href1 !== href2) {
    //        layoutr.showLoading();
    //        layoutr.load.css(href2).then(() => {
    //            stylesheet.remove();
    //        }).catch((e) => {
    //            layoutr.showPopupAlert('Failed to load theme', 'danger');
    //            console.error(e);
    //        }).finally(() => {
    //            layoutr.hideLoading();
    //        });
    //    }
    //};

    $(() => {

        layoutr.body = $("body"),
            colors = [
                {
                    name: 'blue',
                    value: '#0072ED'
                },
                {
                    name: 'indigo',
                    value: '#6610f2'
                },
                {
                    name: 'purple',
                    value: '´#6f42c1'
                },
                {
                    name: 'pink',
                    value: '#e83e8c'
                },
                {
                    name: 'red',
                    value: '#dc3545'
                },
                {
                    name: 'orange',
                    value: '#BE5A06'
                },
                {
                    name: 'yellow',
                    value: '#ffc107'
                },
                {
                    name: 'green',
                    value: '#218838'
                },
                {
                    name: 'teal',
                    value: '#20c997'
                },
                {
                    name: 'cyan',
                    value: '#138294'
                }
            ];
        let themeLight = {
            name: 'light',
            link: () => { return colors.find(x => x.name === 'blue').value },
            soft: -10,
            hover: 7.5,
            gradient: 0.15,
            body: '#f1f1f1',
            grays: [
                "#ffffff",
                "#f8f9fa",
                "#e9ecef",
                "#dee2e6",
                "#ced4da",
                "#adb5bd",
                "#6F7780",
                "#495057",
                "#343a40",
                "#212529",
                "#000000"
            ],
            colors: [
                {
                    name: "primary",
                    hex: () => { return colors.find(x => x.name === 'blue').value }
                },
                {
                    name: "secondary",
                    hex: () => { return themeLight.grays[6] }
                },
                {
                    name: "success",
                    hex: () => { return colors.find(x => x.name === 'green').value }
                },
                {
                    name: "info",
                    hex: () => { return colors.find(x => x.name === 'cyan').value }
                },
                {
                    name: "warning",
                    hex: () => { return colors.find(x => x.name === 'orange').value }
                },
                {
                    name: "danger",
                    hex: () => { return colors.find(x => x.name === 'red').value }
                },
                {
                    name: "light",
                    hex: () => { return themeLight.grays[1] }
                },
                {
                    name: "dark",
                    hex: () => { return themeLight.grays[8] }
                }
            ]
        };
        let themes = [
            themeLight
        ];

        let arraysEqual = (a, b) => {
            if (a === b) {
                return true;
            } else if (a == null || b == null || a.length != b.length) {
                return false;
            }

            // If you don't care about the order of the elements inside
            // the array, you should sort both arrays here.
            // Please note that calling sort on an array will modify that array.
            // you might want to clone your array first.

            for (var i = 0; i < a.length; ++i) {
                if (a[i] !== b[i]) {
                    return false;
                }
            }
            return true;
        };

        let rgbAlpha = (rgb, percentage) => {
            return rgb.map(d => (d += percentage) < 0 ? 0 : d > 255 ? 255 : d | 0);
        };

        let yiq = rgb => {
            return rgb[0] * 0.299 + rgb[1] * 0.587 + rgb[2] * 0.114 > 145 ? [0, 0, 0] : [255, 255, 255];
        };

        let lighten = (rgb, percent) => {
            return rgbAlpha(rgb, percent);
        };

        let darken = (rgb, percent) => {
            return rgbAlpha(rgb, -percent);
        };

        let border = (color, yiq, percent) => {
            if (arraysEqual(yiq, [0, 0, 0])) {
                return darken(color, percent);
            } else {
                return lighten(color, percent);
            }
        };

        let hexToRgb = (hex) => {
            hex = hex.replace('#', '');
            return [
                parseInt(hex.substring(0, 2), 16),
                parseInt(hex.substring(2, 4), 16),
                parseInt(hex.substring(4, 6), 16)
            ];
        }

        let luminanace = (rgb) => {
            rgb = rgb.map(function (v) {
                v /= 255;
                return v <= 0.03928
                    ? v / 12.92
                    : Math.pow((v + 0.055) / 1.055, 2.4);
            });
            return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
        }

        let contrast = (rgb1, rgb2) => {
            return (luminanace(rgb1) + 0.05) / (luminanace(rgb2) + 0.05);
        }

        let textContrast = (text, background) => {
            let treshold = 4.5,
                defaultRatio = contrast(text, background);

            if (defaultRatio > treshold) {
                return text;
            }
            for (var percent = 10; percent <= 100; percent += 10) {
                let lighter = lighten(text, percent),
                    darker = darken(text, percent),
                    lighterRatio = contrast(lighter, background),
                    darkerRatio = contrast(darker, background);
                if (lighterRatio > darkerRatio && lighterRatio > treshold) {
                    return lighter;
                }
                if (darkerRatio > lighterRatio && darkerRatio > treshold) {
                    return darker;
                }
            }
            return yiq(text);
        }

        //rgbA and rgbB are arrays, amountToMix ranges from 0.0 to 1.0
        let mix = (rgbA, rgbB, amount) => {
            let channelMix = (colorChannelA, colorChannelB, amount) => {
                var channelA = colorChannelA * amount;
                var channelB = colorChannelB * (1 - amount);
                return parseInt(channelA + channelB);
            }

            return [
                channelMix(rgbA[0], rgbB[0], amount),
                channelMix(rgbA[1], rgbB[1], amount),
                channelMix(rgbA[2], rgbB[2], amount)
            ];
        }

        let loadTheme = (name) => {
            let theme = themes.find(x => x.name === name),
                link = hexToRgb(theme.link()),
                body = hexToRgb(theme.body);

            layoutr.body.css(`--body`, body);


            $.each(theme.grays, (i, gray) => {
                layoutr.body.css(`--gray-${i * 10}`, hexToRgb(gray));
            });
            $.each(theme.colors, (i, color) => {
                let rgb = hexToRgb(color.hex());

                let variants = [
                    {
                        name: 'default',
                        value: rgb
                    },
                    {
                        name: 'default-hover',
                        value: rgbAlpha(rgb, theme.hover)
                    },
                    {
                        name: 'soft',
                        value: rgbAlpha(rgb, theme.soft)
                    },
                    {
                        name: 'soft-hover',
                        value: rgbAlpha(rgb, theme.soft + theme.hover)
                    }
                ];

                $.each(variants, (j, variant) => {
                    let textColor = yiq(variant.value);
                    layoutr.body.css(`--${color.name}-${variant.name}-background`, variant.value);
                    layoutr.body.css(`--${color.name}-${variant.name}-text`, textColor);
                    layoutr.body.css(`--${color.name}-${variant.name}-border`, border(variant.value, textColor, 20));
                    layoutr.body.css(`--${color.name}-${variant.name}-link`, textContrast(link, variant.value));
                    layoutr.body.css(`--${color.name}-${variant.name}-gradient`, mix(variant.value, body, theme.gradient));
                });
            });
        };

        loadTheme('light');
    });
}