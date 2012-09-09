using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Reflection;
using BurnSystems.WebServer.Dispatcher;
using BurnSystems.ObjectActivation;
using BurnSystems.WebServer.Parser;

namespace BurnSystems.WebServer.Umbra.Requests
{
    /// <summary>
    /// Returns some information about the 
    /// </summary>
    public class VersionUmbraRequest : BaseUmbraRequest
    {
        public VersionUmbraRequest(Func<ContextDispatchInformation, bool> filter)
            : base(filter)
        {
        }

        /// <summary>
        /// Dispatches the context
        /// </summary>
        /// <param name="container">Container being used</param>
        /// <param name="context">Context information</param>
        public override void Dispatch(ObjectActivation.IActivates container, Dispatcher.ContextDispatchInformation context)
        {
            var parser = container.Get<ITemplateParser>();

            var model = new
            {
                Version = Assembly.GetExecutingAssembly().GetName().Version.ToString(),
                Assemblies = AppDomain.CurrentDomain.GetAssemblies().OrderBy(x => x.FullName)
            };
            
            this.Title = "Umbra - Version";
            this.Content = parser.Parse(Resources_Umbra.umbra_version, model, null, typeof(VersionUmbraRequest).FullName);
        }
    }
}
