﻿"use strict";

define(["umbra"], function (u) {
    ///
    /// Defines one entry for console
    var treeViewClass = function () {
    };

    var treeViewNodeClass = function () {
    }

    var result = {
        TreeViewClass: treeViewClass
    };

    u.umbra.addViewType(
        new u.ViewType(
            "BurnSystems.Umbra.TreeView",
            function (data) {
                data.viewPoint.domContent.html(
                    'TREEVIEW');
            }));

    return result;
});