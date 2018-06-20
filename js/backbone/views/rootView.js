var app = app || {};

define(['marionette', 'views/navigationView', 'views/settingsView'],
    function (Marionette, NavigationView, SettingsView) {
        return Marionette.View.extend({
            template: templates['rootTemplate'],
            regions: {
                navigation: {
                    el: '#left > .content > div',
                    replaceElement: true
                },
                settings: {
                    el: '#right > .content > div',
                    replaceElement: true
                },
                content: {
                    el: '#content > div',
                    replaceElement: true
                }
            },
            onRender() {
                app.variables();
                this.showChildView('navigation', new NavigationView());
                this.showChildView('settings', new SettingsView());
            },
            showHome() {
                var $this = this;
                require(['views/homeView'],
                    function (HomeView) {
                        $this.showChildView('content', new HomeView());
                        app.pageLoaded(app.initial);
                    }
                );
            },
            showPage(page) {
                debugger;
                //this.showChildView('main', new IndexView(page));
            }
        });
    });