var app = app || {};
var layoutr = layoutr || {};

define([
    'marionette',
    'views/layout/headerView',
    'models/layout/headerModel',
    'views/layout/footerView',
    'models/layout/footerModel',
    'views/layout/navigationView',
    'models/layout/navigationModel',
    'views/layout/settingsView',
    'models/layout/settingsModel',
    'views/pageView',
    'models/pageModel'
],
    function (
        Marionette,
        HeaderView,
        HeaderModel,
        FooterView,
        FooterModel,
        NavigationView,
        NavigationModel,
        SettingsView,
        SettingsModel,
        PageView,
        PageModel
    ) {
        return Marionette.View.extend({
            template: templates['layout/rootTemplate'],
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

                layoutr.header = new HeaderView({ model: new HeaderModel() });
                this.showChildView('header', layoutr.header);

                layoutr.footer = new FooterView({ model: new FooterModel() });
                this.showChildView('footer', layoutr.footer);
                
                layoutr.navigation = new NavigationView({ model: new NavigationModel(api.navigation) });
                this.showChildView('navigation', layoutr.navigation);

                layoutr.settings = new SettingsView({ model: new SettingsModel() });
                this.showChildView('settings', layoutr.settings);
            },
            events: {
                'click #cookie-accept': 'cookieAccept'
            },
            showPage(page) {
                var data = {};
                if (page === null) {
                    data['title'] = 'Home';
                    data['contentHeader'] = {
                        class: 'overlay-dark rb',
                        'attributes': [
                            {
                                name: 'data-rb-image',
                                value: 'dist/img/rb/wonder-woman'
                            },
                            {
                                name: 'rb-image-filetype',
                                value: 'jpg'
                            },
                            {
                                name: 'rb-sizes',
                                value: '800,1024,1200,1920,3840'
                            },
                            {
                                name: 'rb-aspect-ratio',
                                value: '16by9'
                            },
                            {
                                name: 'rb-current',
                                value: '800'
                            },
                            {
                                name: 'style',
                                value: 'background-position: center 36%; background-image:url(dist/img/rb/wonder-woman-800.jpg)'
                            },
                        ],
                        title: 'Wonder Woman',
                        author: 'DC Comics',
                        position: [
                            {
                                class: 'bottom left',
                                children: [
                                    {
                                        class: '',
                                        text: 'test'
                                    }
                                ]
                            },
                            {
                                class: 'bottom right',
                                children: [
                                    {
                                        class: '',
                                        text: 'test'
                                    }
                                ]
                            },
                            {
                                class: 'top left',
                                children: [
                                    {
                                        class: '',
                                        text: 'test'
                                    }
                                ]
                            },
                            {
                                class: 'top right',
                                children: [
                                    {
                                        class: '',
                                        text: 'test'
                                    }
                                ]
                            }
                        ]
                    }
                } else {
                    data['title'] = page;
                }
                layoutr.header.model.set('title', data.title);
                
                layoutr.rootView.showChildView('content', new PageView({ model: new PageModel(data) }));
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