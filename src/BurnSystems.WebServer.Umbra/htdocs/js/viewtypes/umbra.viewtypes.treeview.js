"use strict";

define(["umbra", "jquery.cookie", "jquery.hotkeys", "jquery.jstree", "umbra.instance"], function (u, c, hk, jst, umbraInstance) {
    ///
    /// Defines one entry for console
    var treeViewClass = function () {
        this.currentPath = "/";

        // Dom-Element, where information shall be shown
        this.domElement = {};

        // Url, where entity information can be retrieved
        this.url = "";
    };

    treeViewClass.prototype =
        {

            loadAndShowChildren: function () {
                var tthis = this;

                $.ajax(
                    this.url + this.currentPath,
                    {
                    })
                    .success(function (data) {

                        var domUl = $("<ul></ul>");

                        for (var i = 0; i < data.children.length; i++) {
                            var item = data.children[i];
                            var currentId = item.id;

                            var domli = $("<li><a class=\"list\">" + item.title + "(" + item.id + ")</a> <a class=\"open\"><img src=\"i/arrow_right.png\" alt=\"Open\" /></a></li>");
                            $("a.list", domli).click((function (id) {
                                return function (e) {
                                    e.preventDefault();
                                    tthis.currentPath += id + "/";
                                    tthis.loadAndShowChildren();
                                }
                            })(currentId));

                            $("a.open", domli).click((function (id) {
                                return function (e) {
                                    e.preventDefault();

                                    umbraInstance.eventbus.onItemSelected(
                                        {
                                            path: tthis.currentPath + id + "/",
                                            sourceName: "umbra.viewtypes.treeview"
                                        });
                                }
                            })(currentId));

                            domUl.append(domli);
                        }

                        tthis.domElement.html("");

                        var domBack = $("<a>Back</>");
                        domBack.click(function (e) {
                            e.preventDefault();
                            tthis.navigateBack();
                        });

                        var domTitle = $("<h2>" + data.title + "</h2>");
                        $(domTitle).click(
                            function (e) {
                                e.preventDefault();

                                umbraInstance.eventbus.onItemSelected(
                                    {
                                        path: tthis.currentPath,
                                        sourceName: "umbra.viewtypes.treeview"
                                    });
                            });

                        tthis.domElement.append(domTitle);

                        tthis.domElement.append(domBack);
                        tthis.domElement.append(domUl);
                    })
                    .error(function (x, error, data) {
                        alert("ERROR: " + error);
                    });
            },

            navigateBack: function () {
                var lastIndexOf = this.currentPath.substring(0, this.currentPath.length - 1).lastIndexOf("/");

                this.currentPath = this.currentPath.substring(0, lastIndexOf + 1);
                if (this.currentPath == "") {
                    this.currentPath = "/";
                }

                this.loadAndShowChildren();
            }
        };

    var treeViewNodeClass = function () {
    }

    var result = {
        TreeViewClass: treeViewClass
    };

    u.umbra.addViewType(
        new u.ViewType(
            "BurnSystems.Umbra.TreeView",
            function (info) {
                info.viewPoint.domContent.html(
                    'TREEVIEW');

                var treeView = new treeViewClass();
                treeView.url = info.userData.entityUrl;
                treeView.domElement = info.viewPoint.domContent;

                // Load the entity information
                treeView.loadAndShowChildren();
            }));

    return result;
});