sap.ui.define([
   "sap/ui/core/UIComponent"
], function (UIComponent) {
    "use strict";
    return UIComponent.extend("de.javue.csgogo.Component", {
        metadata : {
            manifest: "json"
        },

        init: function() {
            UIComponent.prototype.init.apply(this, arguments);
            var that = this;
            var checkReady = setInterval(function() {
                if (window.web3) {
                    clearInterval(checkReady);
                    that.getRouter().initialize();
                }
            },100);
        }
    });
});