sap.ui.define([
    "de/javue/csgogo/controller/BaseController"
], function (BaseController) {
    "use strict";

    return BaseController.extend("de.javue.csgogo.controller.Claim", {
        addMatchLink : function(oEvent) {
            this.byId("matchLinkContainer").addContent(sap.ui.xmlfragment("de.javue.csgogo.fragment.MatchLink", this));

            // set busyIndicator
            this._checkMatch(oEvent.getSource().getParent().getContent()[0].getValue()).then(function(data) {
                console.log(data);
                // unset busyIndicator
            });
        },
        
        removeMatchLink : function(oEvent) {
            if (this.byId("matchLinkContainer").getContent().length > 2) {
                this.byId("matchLinkContainer").removeContent(oEvent.getSource().getParent());
            }
        },

        _checkMatch : function(sMatchLink) {
            var sMatchId = sMatchLink;
            return new Promise(function(resolve, reject) {
                $.get("/check/" + sMatchId, function(data, status) {
                    resolve(data);
                });
            });
        }
    });
});