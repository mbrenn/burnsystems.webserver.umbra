﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using BurnSystems.ObjectActivation;
using BurnSystems.Test;
using BurnSystems.WebServer.Dispatcher;
using BurnSystems.WebServer.Responses;
using BurnSystems.WebServer.Resources;

namespace BurnSystems.WebServer.Umbra
{
    public class Umbra
    {
        /// <summary>
        /// Integrates umbra into 
        /// </summary>
        /// <param name="container">Container where umbra is integrated</param>
        public static void Integrate(ActivationContainer container)
        {
            Integrate(container, UmbraConfiguration.Default);
        }

        public static void Integrate(ActivationContainer container, UmbraConfiguration configuration)
        {
            var server = container.Get<Server>();
            Ensure.IsNotNull(server, "No Server in Actioncontainer");

            server.Add(
                new StaticContentResponse(
                    DispatchFilter.ByExactUrl(configuration.WebPath + "index.html"), "text/html", Resources_Umbra.index));
            server.Add(
                new StaticContentResponse(
                    DispatchFilter.ByExactUrl(configuration.WebPath + "init.js"), "text/javascript", Resources_Umbra.js_init));
            server.Add(
                new StaticContentResponse(
                    DispatchFilter.ByExactUrl(configuration.WebPath + "umbra.js"), "text/javascript", Resources_Umbra.js_umbra));
            server.Add(
                new StaticContentResponse(
                    DispatchFilter.ByExactUrl(configuration.WebPath + "umbra.css"), "text/css", Resources_Umbra.css_umbra));
            server.Add(
                new StaticContentResponse(
                    DispatchFilter.ByExactUrl(configuration.WebPath + "jquery.js"), "text/javascript", Files.JQuery));

            server.Add(
                new RelocationDispatcher(
                    DispatchFilter.ByExactUrl(configuration.WebPath), "index.html"));



            server.Add(
                new UmbraDispatcher(
                    DispatchFilter.ByUrl(configuration.WebPath), configuration.WebPath));
        }
    }
}
