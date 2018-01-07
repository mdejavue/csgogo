sap.ui.define([
    "de/javue/csgogo/controller/BaseController",
    "sap/ui/model/json/JSONModel"
], function (BaseController, JSONModel) {
    "use strict";

    return BaseController.extend("de.javue.csgogo.controller.History", {
        onInit: function() {
            var historyModel = new JSONModel();
            this.getView().setModel(historyModel, "history");
            this._getHistory().then(function(data) {
                historyModel.setData({ "items": JSON.parse(data) });
            });
        },

        _getHistory: function() {
            return new Promise(function(resolve, reject) {
                $.get("/history/", function(data, status) {
                    resolve(data);
                });
            });
        }
    });
});