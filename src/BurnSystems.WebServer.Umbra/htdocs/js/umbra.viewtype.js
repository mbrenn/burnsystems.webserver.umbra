"use strict";

define([], function () {

    ///////////////////////////////////////////
    // Definition of ViewType-Class 

    // Initializes a new function
    // @token Token of the view type
    // @initFunction This function will be called with 1 argument: 
    //  view: View, where the new content shall be shown
    //  area: Area, where the new shall be shown
    //  viewPoint: ViewPoint of content
    //  workSpace: Reference to workspace
    //  settings: User-Defined structure that is created for the loadContent class
    var ViewTypeClass = function (token, initFunction) {
        this.token = token;
        this.init = initFunction;
    };

    ViewTypeClass.prototype =
    {
    };


    return ViewTypeClass;
});