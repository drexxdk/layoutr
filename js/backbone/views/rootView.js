var app = app || {};
var layoutr = layoutr || {};

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
            //showHome() {
            //    var $this = this;
            //    require(['views/homeView'],
            //        function (View) {
            //            $this.showChildView('content', new View());
            //            app.pageLoaded(app.initial);
            //        }
            //    );
            //},
            showPage(page) {
                require(['views/pageView', 'models/pageModel'], function (View, Model) {
                    var data = { };
                    if (page === null) {
                        data['title'] = 'Home';
                    } else {
                        data['title'] = page;
                    }
                    
                    var model = new Model(data);
                    var view = new View({ model: model });

                    layoutr.rootView.showChildView('content', view);
                    app.pageLoaded(app.initial);
                });
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