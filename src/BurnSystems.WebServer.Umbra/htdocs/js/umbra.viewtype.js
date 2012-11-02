"use strict";

define([], function () {
    ///////////////////////////////////////////
    // Definition of ViewType-Class 
    var ViewTypeClass = function (token, initFunction) {
        this.token = token;
        this.init = initFunction;
    };

    ViewTypeClass.prototype =
    {
    };


    return ViewTypeClass;
});