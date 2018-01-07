sap.ui.define([
    "de/javue/csgogo/controller/BaseController"
], function (BaseController) {
    "use strict";

    return BaseController.extend("de.javue.csgogo.controller.Claim", {
        onLiveChange : function(oEvent) {
            var oBusyInd = oEvent.getSource().getParent().getContent()[1];
            var oResultText = oEvent.getSource().getParent().getContent()[2];

            if ( oEvent.getParameter("value").length == 4 && !isNaN(oEvent.getParameter("value")) ) {
                oBusyInd.setVisible(true);
                this._checkMatch(oEvent.getSource().getParent().getContent()[0].getValue()).then(function(data) {
                    oResultText.setText(data);
                    oBusyInd.setVisible(false);
                });

                this.byId("matchLinkContainer").addContent(sap.ui.xmlfragment("de.javue.csgogo.fragment.MatchLink", this));
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