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
            that.getRouter().initialize();
        }
    });
});