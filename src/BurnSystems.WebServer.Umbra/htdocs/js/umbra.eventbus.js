"use strict";

define(['lychee.events'], function (Events) {

    ///////////////////////////////////////////
    // Definition of EventBus class	
    var EventBusClass = function () {

        this.events = new Events();
        };

    EventBusClass.prototype =
    {
    };

    return EventBusClass;
});