sap.ui.define([
    "de/javue/csgogo/controller/BaseController"
], function (BaseController) {
    "use strict";

    return BaseController.extend("de.javue.csgogo.controller.App", {
        onInit: function(oEvent) {
            this.byId("idApp").attachDetailNavigate(function(oEvent) {
                oEvent.getSource().hideMaster();
            });
        }
    });
});