"use strict";

define(["umbra", "umbra.instance"], function (u, umbraInstance) {

    var entityViewTable = function (tablename) {
        this.tablename = tablename;
        this.nextElementName = 0;
    };

    entityViewTable.prototype = {
        getNextElementId: function () {
            this.nextElementName++;
            return "e_" + this.tablename + "_" + this.nextElementName;
        }
    };

    var entityAssignResult = function () {
        this.updateCallback = function () {
            alert('Callback function has not been set');
        };
    };

    var entityPropertyTextbox = function () {
    };

    entityPropertyTextbox.prototype =
        {
            /* 
             * config: Configuration of the item. See init.cs and EntityViewElement.ToJson
             * item: The item itself, how it had been sent by EntityViewElement.ObjectToJson
             * dom: Dom-Element, where item shall be added
             * tableInfo: Instance of entityViewTable Instance
             */
            assignHtml: function (config, item, dom, tableInfo) {
                if (config.readOnly) {
                    dom.text(item);
                }
                else {
                    var elementId = tableInfo.getNextElementId();
                    var inputElement = $("<input type=\"textbox\"></input>");
                    inputElement.attr('id', elementId);

                    inputElement.val(item);

                    if (config.width > 0) {
                        inputElement.css("width", config.width + "em");
                    }

                    if (config.height > 0) {
                        inputElement.css("width", config.height + "em");
                    }

                    dom.append(inputElement);

                }

                var result = new entityAssignResult();
                result.updateCallback = function () {
                    if (config.readOnly) {
                        return undefined;
                    }

                    return $("#" + elementId).val();
                }

                return result;
            }
        };

    var entityPropertyCheckbox = function () {

        result.updateCallback = function () {
            if (config.readOnly) {
                return undefined;
            }

            return $("#" + elementId).val();
        }
    };

    entityPropertyCheckbox.prototype =
        {
            assignHtml: function (config, item, dom, tableInfo) {
                var elementId = tableInfo.getNextElementId();
                var inputElement = $("<input type=\"checkbox\"></input>");
                inputElement.attr('id', elementId);

                if (item == "True") {
                    inputElement.attr('checked', true);
                }

                if (config.readOnly) {
                    inputElement.attr('readonly', true);
                }

                dom.append(inputElement);

                var result = new entityAssignResult();
                result.updateCallback = function () {
                    if (config.readOnly) {
                        return undefined;
                    }

                    return $("#" + elementId).attr('checked') == 'checked';
                }

                return result;
            }
        };

    ///
    /// Defines one entry for console
    var entityViewClass = function () {
    };

    entityViewClass.prototype =
        {
            getView: function (datatype) {
                if (datatype == "String") {
                    return new entityPropertyTextbox();
                }

                if (datatype == "Integer") {
                    return new entityPropertyTextbox();
                }

                if (datatype == "Boolean") {
                    return new entityPropertyCheckbox();
                }

                if (datatype == "DateTime") {
                    // NOT SUPPORTED YET
                    throw "DateTime not supported yet";
                }
            }
        };

    var result = {
        EntityViewClass: entityViewClass
    };

    u.umbra.addViewType(
        new u.ViewType(
            "BurnSystems.Umbra.DetailView.EntityView",
            function (info) {
                var entityView = new entityViewClass();
                var tableNumber = 1;

                // TODO: Not fully multidom capable
                var viewTable = new entityViewTable("t_" + tableNumber);

                // Create table
                var tableDom = $("<table><tr><th>Property:</th><th>Value:</th></tr></table>");

                var elements = info.userData.elements;
                var data = info.userData.data;
                var assignResults = [];

                // Creates the table for the elements
                for (var i = 0; i < elements.length; i++) {
                    var item = elements[i];
                    var dataElement = data[i];
                    var rowDom = $("<tr></tr>");

                    ////////////////////////////////
                    // Name of the item
                    var columnDom = $("<td></td>");
                    columnDom.text(item.label + ": ");
                    rowDom.append(columnDom);
                    
                    ////////////////////////////////
                    // Value of the item
                    columnDom = $("<td></td>");
                    var view = entityView.getView(item.dataType);
                    var assignResult = view.assignHtml(item, dataElement, columnDom, viewTable);
                    assignResults.push(assignResult);

                    rowDom.append(columnDom);

                    // Addition to row
                    tableDom.append(rowDom);
                }

                //
                // Creates the button
                var buttonDom = $("<input type=\"button\" value=\"Update\"></input>");
                buttonDom.click(function () {
                    var data = {};

                    for (var i = 0; i < elements.length; i++) {
                        var element = elements[i];
                        var assignResult = assignResults[i];

                        if (assignResult === undefined) {
                            continue;
                        }

                        var result = assignResult.updateCallback();
                        if (result === undefined) {
                            continue;
                        }

                        data[element.name] = result;
                    }

                    var updateUrl = info.userData.updateUrl;
                    $.ajax(
                        updateUrl,
                        {
                            type: 'POST',
                            data: data
                        })
                    .success(function () { alert('YEAH'); })
                    .error(function () { alert('O NOES'); });
                });

                var trDom = $("<tr><td></td><td class=\"buttoncontainer\"></td></tr>");
                $(".buttoncontainer", trDom).append(buttonDom);
                tableDom.append(trDom);

                // Finishes view
                info.viewPoint.domContent.html(
                    'EntityView');
                info.viewPoint.domContent.append(tableDom);
            }));

    return result;
});