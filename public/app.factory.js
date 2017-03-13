app.factory('userFctry', ['$resource', function ($resource) {

    var userFctryData = {};

    //REST API calls using resource for login and get videos
    var resource = $resource('http://localhost:8080' + '/api1/:action', {
        action: '@action',
    }, {
            'userLogin': {
                method: 'POST', params: { action: 'authenticate' }, headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }, transformRequest: function (data, headersGetter) {
                    var str = [];
                    for (var d in data)
                        str.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
                    return str.join("&");
                }
            },
            'getVideos': { method: 'GET', params: { action: 'videos' }, headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' } }
        });

    userFctryData.api = resource;

    return userFctryData;

}]);