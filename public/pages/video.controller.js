// Video Controller ===============
app.controller('VideoController', function ($scope, $filter, $templateCache, localStorageService, $location, userFctry) {

  //Init Function it calls on page load
  function Init() {
    if (localStorageService.get('userDetails')) {
      $scope.userName = localStorageService.get('userDetails').userName;
    }
    getGridData(0, 25);
  }

  //GET call to get grid data
  function getGridData(sc, ic) {
    userFctry.api.getVideos({ startCount: sc, itemCount: ic },
      function (response) {
        $scope.videosData = response.data;
        $scope.totalItems = $scope.videosData.length;
        $scope.gridOptions.data = $scope.videosData;
        $scope.gridOptions.totalItems = response.totalCount;
      });

    $scope.gridOptions = {
      paginationPageSizes: [
        { label: '25', value: 25 },
        { label: '50', value: 50 },
        { label: "ALL", value: $scope.totalItems }],
      useExternalPagination: true,
      paginationPageSize: 25,
      rowHeight: 70,
      columnDefs: [
        { field: 'poster', cellTemplate: "<img height=\"50px\" ng-src=\"{{grid.getCellValue(row, col)}}\" lazy-src>" },
        { field: 'title' },
        { field: 'channel', cellTemplate: "<img height=\"50px\" ng-src=\"{{grid.getCellValue(row, col)}}\" lazy-src>" }
      ],
      onRegisterApi: function (gridApi) {
        $scope.grid1Api = gridApi;

        gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
          getGridData(((newPage - 1) * pageSize), pageSize);
        });
      }
    };

    $scope.gridOptions.data = $scope.videosData;
  }

  //refresh grid data when user change value in serach box
  $scope.refreshData = function () {
    $scope.gridOptions.data = $filter('filter')($scope.videosData, $scope.searchText, undefined);
  };


  //logout function
  $scope.logout = function () {
    localStorageService.clearAll();        //clear all cache
    alert('Logged out');
    $location.path('/login');
  };

  //change in ui grid templete for pagination
  $templateCache.put('ui-grid/pagination',
    "<div class=\"ui-grid-pager-panel\" ui-grid-pager ng-show=\"grid.options.enablePaginationControls\"><div class=\"ui-grid-pager-container\"><div class=\"ui-grid-pager-control\"><button type=\"button\" ng-click=\"paginationApi.seek(1)\" ng-disabled=\"cantPageBackward()\"><div class=\"first-triangle\"><div class=\"first-bar\"></div></div></button> <button type=\"button\" ng-click=\"paginationApi.previousPage()\" ng-disabled=\"cantPageBackward()\"><div class=\"first-triangle prev-triangle\"></div></button> <input type=\"number\" ng-model=\"grid.options.paginationCurrentPage\" min=\"1\" max=\"{{ paginationApi.getTotalPages() }}\" required> <span class=\"ui-grid-pager-max-pages-number\" ng-show=\"paginationApi.getTotalPages() > 0\">/ {{ paginationApi.getTotalPages() }}</span> <button type=\"button\" ng-click=\"paginationApi.nextPage()\" ng-disabled=\"cantPageForward()\"><div class=\"last-triangle next-triangle\"></div></button> <button type=\"button\" ng-click=\"paginationApi.seek(paginationApi.getTotalPages())\" ng-disabled=\"cantPageToLast()\"><div class=\"last-triangle\"><div class=\"last-bar\"></div></div></button></div><div class=\"ui-grid-pager-row-count-picker\">" +

    "<select ng-model=\"grid.options.paginationPageSize\"" +

    //"ng-init=\"grid.options.paginationPageSize = grid.options.paginationPageSizes[0]\" " +

    "ng-options=\"o.value as o.label for o in grid.options.paginationPageSizes\" ng-init=\"grid.options.paginationPageSize = grid.options.paginationPageSizes[0].value\">" +

    "</select><span class=\"ui-grid-pager-row-count-label\">&nbsp;{{sizesLabel}}</span></div></div><div class=\"ui-grid-pager-count-container\"><div class=\"ui-grid-pager-count\"><span ng-show=\"grid.options.totalItems > 0\">{{showingLow}} - {{showingHigh}} {{paginationOf}} {{grid.options.totalItems}} {{totalItemsLabel}}</span></div></div></div>"
  );
  Init();
});