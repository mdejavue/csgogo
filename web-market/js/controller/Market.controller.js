sap.ui.define([
    "de/javue/csgogo/controller/BaseController"
], function (BaseController) {
    "use strict";

    return BaseController.extend("de.javue.csgogo.controller.Market", {
        addOffer : function(oEvent) {
            this.getRouter().navTo("offer");
        }
    });
});