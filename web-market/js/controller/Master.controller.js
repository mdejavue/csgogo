sap.ui.define([
    "de/javue/csgogo/controller/BaseController"
], function (BaseController) {
    "use strict";

    return BaseController.extend("de.javue.csgogo.controller.Master", {
        menuNavTo: function(oEvent) {
            var sNavTarget = oEvent.getSource().data("navTarget");
            this.getRouter().navTo(sNavTarget);
        }
    });
});