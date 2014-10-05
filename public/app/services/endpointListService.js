(function(window, undefined) {
    'use strict';

    angular.module('services')
        .factory('endpointListService', function() {
            return {
                //user endpoints
                loginUser: function (data) {
                    return {
                        url: '/api/user/login',
                        method: 'POST',
                        data: data
                    };
                },
                registerUser: function (data) {
                    return {
                        url: '/api/user/register',
                        method: 'POST',
                        data: data
                    };
                },
                getCurrentUserInfo: function () {
                    return {
                        url: '/api/user/currentuserinfo',
                        method: 'GET'
                    }
                },
                checkUsername: function (username) {
                    return {
                        url: '/api/user/usernameallowed',
                        method: 'POST',
                        data: {
                            value: username
                        }
                    }
                },
                checkEmail: function (email) {
                    return {
                        url: '/api/user/emailallowed',
                        method: 'POST',
                        data: {
                            value: email
                        }
                    }
                },
                getUsers: function(startIndex, takenCount) {
                    return {
                        url: '/api/user',
                        method: 'GET',
                        data: {
                            startIndex: startIndex,
                            takenCount: takenCount
                        }
                    };
                },
                deleteUser: function(id) {
                    return {
                        url: '/api/user',
                        method: 'DELETE',
                        data: {id: id}
                    };
                },

                //definitions endpoints
                getDefinitions: function() {
                    return {
                        url: '/api/definitions',
                        method: 'GET'
                    }
                },

                //film endpoints
                getFilm: function(id) {
                    return {
                        url: '/api/film',
                        method: 'GET',
                        data: {id: id}
                    };
                },
                getFilms: function(startIndex, takenCount) {
                    return {
                        url: '/api/film',
                        method: 'GET',
                        data: {
                            startIndex: startIndex,
                            takenCount: takenCount
                        }
                    };
                },
                postFilm: function(film) {
                    return {
                        url: '/api/film',
                        method: 'POST',
                        data: {film: film}
                    };
                },
                putFilm: function(film) {
                    return {
                        url: '/api/film',
                        method: 'PUT',
                        data: {film: film}
                    };
                },
                deleteFilm: function(id) {
                    return {
                        url: '/api/film',
                        method: 'DELETE',
                        data: {id: id}
                    };
                },

                //theater endpoints
                getTheater: function(id) {
                    return {
                        url: '/api/theater',
                        method: 'GET',
                        data: {id: id}
                    };
                },
                getTheaters: function(startIndex, takenCount) {
                    return {
                        url: '/api/theater',
                        method: 'GET',
                        data: {
                            startIndex: startIndex,
                            takenCount: takenCount
                        }
                    };
                },
                postTheater: function(theater) {
                    return {
                        url: '/api/theater',
                        method: 'POST',
                        data: {theater: theater}
                    };
                },
                putTheater: function(theater) {
                    return {
                        url: '/api/theater',
                        method: 'PUT',
                        data: {theater: theater}
                    };
                },
                deleteTheater: function(id) {
                    return {
                        url: '/api/theater',
                        method: 'DELETE',
                        data: {id: id}
                    };
                },

                //event endpoints
                getEvent: function(id) {
                    return {
                        url: '/api/event',
                        method: 'GET',
                        data: {id: id}
                    };
                },
                getEvents: function(startIndex, takenCount) {
                    return {
                        url: '/api/event',
                        method: 'GET',
                        data: {
                            startIndex: startIndex,
                            takenCount: takenCount
                        }
                    };
                },
                postEvent: function(event) {
                    return {
                        url: '/api/event',
                        method: 'POST',
                        data: {event: event}
                    };
                },
                putEvent: function(event) {
                    return {
                        url: '/api/event',
                        method: 'PUT',
                        data: {event: event}
                    };
                },
                deleteEvent: function(id) {
                    return {
                        url: '/api/event',
                        method: 'DELETE',
                        data: {id: id}
                    };
                }
            };
        });
})(window);