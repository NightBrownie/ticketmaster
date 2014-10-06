(function(window, undefined){
    'use strict';

    angular.module('constants')
        .constant('routingParameters', {
            defaultRoute: '/films',
            defaultState: 'main.films',
            defaultPageTitle: 'TicketMaster | Buy cinema tickets in five minutes',
            adminPanelParams: {
                filmsState: 'main.adminPanel.films',
                theatersState: 'main.adminPanel.theaters',
                eventsState: 'main.adminPanel.events'
            }
        });
})(window);