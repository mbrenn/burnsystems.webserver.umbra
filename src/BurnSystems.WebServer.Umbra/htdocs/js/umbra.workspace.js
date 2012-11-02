﻿"use strict";

define(["umbra.ribbonbar", "umbra.area", "umbra.dragbar", "umbra.view", "umbra.instance", "dateformat"], function (RibbonBarClass, AreaClass, DragBarClass, ViewClass, umbraInstance) {
    ///////////////////////////////////////////
    // Definition of WorkSpace class	
    var WorkspaceClass = function () {
        this.domPrefix = "ws" + WorkspaceClass.nextDomPrefix + "_";
        this.ribbonBar = new RibbonBarClass();
        this.areaTop = new AreaClass(this.domPrefix + "t", "top");
        this.areaTop.height = 100;
        this.areaLeft = new AreaClass(this.domPrefix + "l", "left");
        this.areaLeft.width = 200;
        this.areaRight = new AreaClass(this.domPrefix + "r", "right");
        this.areaRight.width = 200;
        this.areaBottom = new AreaClass(this.domPrefix + "b", "bottom");
        this.areaBottom.height = 200
        this.areaCentered = new AreaClass(this.domPrefix + "c", "centered");
        WorkspaceClass.nextDomPrefix++;
    };

    WorkspaceClass.nextDomPrefix = 0;
    WorkspaceClass.dragWidth = 5;
    WorkspaceClass.dragHeight = 5;

    WorkspaceClass.prototype =
    {
        /* Creates the DOM elements for the workspace */
        create: function (domElement) {
            var innerAreaHtml = '<div class="tabs"></div><div class="content"></div>';

            var buttonBarDom = $('<div class="fullwidth"><div id="' + this.domPrefix + 'buttons" class="umbra_ribbon">Buttons</div></div>');
            var topDom = $('<div class="fullwidth"><div id="' + this.domPrefix + 't" class="umbra_top umbra_area">' + innerAreaHtml + '</div></div>');
            var scrollTopDom = '<div id="' + this.domPrefix + 'dt" class="umbra_dragarea horizontal"></div>';
            var centeredDom = $('<div class="fullwidth fullheight" id="' + this.domPrefix + 'center">' +
                    '<div id="' + this.domPrefix + 'l" class="umbra_left umbra_area">' + innerAreaHtml + '</div>' +
                    '<div id="' + this.domPrefix + 'dl" class="umbra_dragarea vertical"></div>' +
                    '<div id="' + this.domPrefix + 'c" class="umbra_centered umbra_area">' + innerAreaHtml + '</div>' +
                    '<div id="' + this.domPrefix + 'dr" class="umbra_dragarea vertical"></div>' +
                    '<div id="' + this.domPrefix + 'r" class="umbra_right umbra_area">' + innerAreaHtml + '</div>' +
                '</div>');
            var scrollBottomDom = '<div id="' + this.domPrefix + 'db" class="umbra_dragarea horizontal"></div>';
            var bottomDom = $('<div class="fullwidth"><div id="' + this.domPrefix + 'b" class="umbra_bottom umbra_area">' + innerAreaHtml + '</div></div>');

            domElement.append(buttonBarDom);
            domElement.append(topDom);
            domElement.append(scrollTopDom);
            domElement.append(centeredDom);
            domElement.append(scrollBottomDom);
            domElement.append(bottomDom);

            this.ribbonBar.init(domElement.find(".umbra_ribbon"));

            this.updateLayout();

            this.makeAreasDraggable();
            var _this = this;

            // Event for resizing
            $(window).resize(function () {
                _this.updateLayout();
            });

            $("#");
        },

        makeAreasDraggable: function () {
            var _this = this;
            // Sets the dragbar information
            var topDragBar = new DragBarClass(
                "h",
                $("#" + this.domPrefix + "dt"),
                function (dragBar, change) {
                    _this.areaTop.height -= change;
                    _this.updateLayout();
                });

            // Sets the dragbar information
            var bottomDragBar = new DragBarClass(
                "h",
                $("#" + this.domPrefix + "db"),
                function (dragBar, change) {
                    _this.areaBottom.height += change;
                    _this.updateLayout();
                });

            // Sets the dragbar information
            var leftDragBar = new DragBarClass(
                "v",
                $("#" + this.domPrefix + "dl"),
                function (dragBar, change) {
                    _this.areaLeft.width -= change;
                    _this.updateLayout();
                });

            // Sets the dragbar information
            var rightDragBar = new DragBarClass(
                "v",
                $("#" + this.domPrefix + "dr"),
                function (dragBar, change) {
                    _this.areaRight.width += change;
                    _this.updateLayout();
                });
        },

        updateLayout: function () {
            var restHeight = this.areaTop.height + this.areaBottom.height + this.ribbonBar.height + 10;
            var height = $("body").height();
            var width = $("body").width();

            // Set height of center area
            var centerHeight = height - restHeight - 2 * WorkspaceClass.dragHeight;
            $("#" + this.domPrefix + "c").css("height", (centerHeight) + "px");
            $("#" + this.domPrefix + "center").css("height", (centerHeight) + "px");
            $("#" + this.domPrefix + "l").css("height", (centerHeight) + "px");
            $("#" + this.domPrefix + "r").css("height", (centerHeight) + "px");
            $("#" + this.domPrefix + "dl").css("height", (centerHeight) + "px");
            $("#" + this.domPrefix + "dr").css("height", (centerHeight) + "px");

            // Set height of bottom, top and buttons
            $("#" + this.domPrefix + "buttons").css("height", this.ribbonBar.height + "px");
            $("#" + this.domPrefix + "t").css("height", this.areaTop.height + "px");
            $("#" + this.domPrefix + "b").css("height", this.areaBottom.height + "px");

            // Set width and align right to right border
            $("#" + this.domPrefix + "l").css("width", this.areaLeft.width + "px");
            $("#" + this.domPrefix + "r").css("width", this.areaRight.width + "px");
            $("#" + this.domPrefix + "r").css("margin-left", (width - this.areaRight.width) + "px");

            // Position center center and dragging lines
            $("#" + this.domPrefix + "dl").css("left", (this.areaLeft.width) + "px");
            $("#" + this.domPrefix + "c").css("left", (this.areaLeft.width + WorkspaceClass.dragWidth) + "px");
            $("#" + this.domPrefix + "c").css("width", (width - this.areaRight.width - this.areaLeft.width - WorkspaceClass.dragWidth * 2) + "px");
            $("#" + this.domPrefix + "dr").css("left", (width - this.areaRight.width - WorkspaceClass.dragWidth) + "px");

            // We have finished the layout for the areas, 
            // now we have to update the height of the content region
            var areas = this.getAreas();
            for (var i = 0; i < areas.length; i++) {
                areas[i].updateLayout();
            }
        },

        getRibbonBar: function () {
            return this.ribbonBar;
        },

        // Gets an area with all areas
        getAreas: function () {
            var result = [
                this.areaCentered,
                this.areaTop,
                this.areaLeft,
                this.areaRight,
                this.areaBottom];
            return result;
        },

        // Finds the area
        // @token Token of the area
        findArea: function (token) {
            var areas = this.getAreas();
            for (var i = 0; i < areas.length; i++) {
                if (areas[i].token == token) {
                    return areas[i];
                }
            }
        },

        // Finds the view and the area and returns it
        // @token Token of the view
        findAreaAndView: function (token) {
            var areas = this.getAreas();
            for (var i = 0; i < areas.length; i++) {
                var area = areas[i];
                var viewPoints = area.getViewPoints();
                for (var j = 0; j < viewPoints.length; j++) {
                    var viewPoint = viewPoints[j];
                    if (viewPoint.getView().token === token) {
                        var result =
                        {
                            viewPoint: viewPoint,
                            view: viewPoint.getView(),
                            area: area
                        };

                        return result;
                    }
                }
            }

            return undefined;
        },

        findView: function (token) {
            var areaAndView = this.findAreaAndView(token);
            if (areaAndView === undefined) {
                return undefined;
            }

            return areaAndView.view;
        },

        /// Loads the umbra content from the url and shows it in the given area.
        /// The url shall return a json data structure with commands
        /// @url Url, where content shall be retrieved
        /// @areaToken Token of area, where content shall be shown
        loadContent: function (url, areaToken, settings) {
            if (settings === undefined) {
                settings = {};
            }

            var _this = this;
            $.ajax(
                url)
                .success(function (data) {
                    _this.evaluateRequest(data, areaToken, settings);
                });
        },

        evaluateRequest: function (data, areaToken, settings) {
            var _this = this;
            var area = this.findArea(areaToken);
            var view, viewPoint;
            if (area === undefined) {
                alert('Unknown Area: ' + areaToken);
                return;
            }

            var content = data["Content"];
            var title = data["Title"];
            if (content !== undefined) {
                view = new ViewClass(title, settings.viewToken, content);
                viewPoint = area.addView(view);
            }

            if (settings.success !== undefined) {
                settings.success(area, view);
            }

            if (data.ScriptFiles.length > 0 && data.ViewTypeToken !== undefined && data.viewTypeToken !== "") {
                requirejs(
                    data.ScriptFiles,
                    function () {
                        var viewType = umbraInstance.findViewType(data.ViewTypeToken);
                        if (viewType === undefined) {
                            alert("Unknown viewtype: " + data.ViewTypeToken);
                        }

                        viewType.init(
                            {
                                view: view,
                                area: area,
                                viewPoint: viewPoint,
                                workSpace: _this
                            });
                    });
            }
        },

        openView: function (areaToken, title, viewToken, content, scriptFiles, viewTypeToken) {
            var _this = this;
            var area = this.findArea(areaToken);
            var view, viewPoint;
            if (area === undefined) {
                alert('Unknown Area: ' + areaToken);
                return;
            }

            view = new ViewClass(title, viewToken, content);
            viewPoint = area.addView(view);
            requirejs(
                scriptFiles,
                function () {
                    var viewType = umbraInstance.findViewType(viewTypeToken);
                    if (viewType === undefined) {
                        alert("Unknown viewtype: " + viewTypeToken);
                    }

                    viewType.init(
                        {
                            view: view,
                            area: area,
                            viewPoint: viewPoint,
                            workSpace: _this
                        });
                });

            return viewPoint;
        }
    };

    return WorkspaceClass;
});