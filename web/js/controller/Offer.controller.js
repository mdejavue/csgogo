sap.ui.define([
    "de/javue/csgogo/controller/BaseController"
], function (BaseController) {
    "use strict";

    return BaseController.extend("de.javue.csgogo.controller.Offer", {
        onNavBack : function(oEvent) {
            history.go(-1);
        }
    });
});