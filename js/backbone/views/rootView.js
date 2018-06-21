var app = app || {};

define(['marionette', 'views/headerView', 'views/footerView', 'views/navigationView', 'views/settingsView'],
    function (Marionette, HeaderView, FooterView, NavigationView, SettingsView) {
        return Marionette.View.extend({
            template: templates['rootTemplate'],
            regions: {
                header: {
                    el: 'header > div',
                    replaceElement: true
                },
                footer: {
                    el: 'footer > div',
                    replaceElement: true
                },
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

                app.loading = this.$el.find('#loading');
                app.modal = this.$el.find('#modal');
                app.cookie = this.$el.find('#cookie');

                app.showLoading();

                this.checkCookie();

                this.showChildView('header', new HeaderView());
                this.showChildView('footer', new FooterView());
                this.showChildView('navigation', new NavigationView());
                this.showChildView('settings', new SettingsView());
            },
            events: {
                'click #cookie-accept': 'cookieAccept'
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
            },
            checkCookie() {
                var cookie = localStorage.getItem("cookie");
                if (cookie === null) {
                    app.html.addClass('cookie');
                }
            },
            cookieAccept() {
                localStorage.setItem('cookie', 'cookie');
                app.html.removeClass('cookie');
            }
        });
    }
);