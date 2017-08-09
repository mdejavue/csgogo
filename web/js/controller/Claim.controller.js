sap.ui.define([
    "de/javue/csgogo/controller/BaseController"
], function (BaseController) {
    "use strict";

    return BaseController.extend("de.javue.csgogo.controller.Claim", {
        addMatchLink : function(oEvent) {
            this.byId("matchLinkContainer").addContent(sap.ui.xmlfragment("de.javue.csgogo.fragment.MatchLink", this));
        },
        
        removeMatchLink : function(oEvent) {
            if (this.byId("matchLinkContainer").getContent().length > 2) {
                this.byId("matchLinkContainer").removeContent(oEvent.getSource().getParent());
            }
        }
    });
});