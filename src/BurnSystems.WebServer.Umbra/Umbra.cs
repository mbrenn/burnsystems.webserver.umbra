using System;
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

            AddWebFile(configuration, server, "index.html", "text/html", Resources_Umbra.index);
            AddWebFile(configuration, server, "scripts/umbra.js", "text/javascript", Resources_Umbra.js_umbra);
            AddWebFile(configuration, server, "scripts/umbra.console.js", "text/javascript", Resources_Umbra.js_umbra_console);
            AddWebFile(configuration, server, "css/umbra.css", "text/css", Resources_Umbra.css_umbra);
            AddWebFile(configuration, server, "scripts/jquery.js", "text/javascript", Files.JQuery);
            AddWebFile(configuration, server, "scripts/require.js", "text/javascript", Files.Require);
            AddWebFile(configuration, server, "scripts/test.js", "text/javascript", Resources_Umbra.js_test);
            AddWebFile(configuration, server, "scripts/init.js", "text/javascript", Resources_Umbra.js_init);

            server.Add(
                new RelocationDispatcher(
                    DispatchFilter.ByExactUrl(configuration.WebPath), "index.html"));

            server.Add(
                new UmbraDispatcher(
                    DispatchFilter.ByUrl(configuration.WebPath), configuration.WebPath));
        }

        private static void AddWebFile(UmbraConfiguration configuration, Server server, string url, string mimeType, string content)
        {
            server.Add(
                new StaticContentResponse(
                    DispatchFilter.ByExactUrl(configuration.WebPath + url), mimeType, content));
        }
    }
}
