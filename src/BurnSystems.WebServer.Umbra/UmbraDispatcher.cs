using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using BurnSystems.WebServer.Dispatcher;
using BurnSystems.WebServer.Responses;

namespace BurnSystems.WebServer.Umbra
{
    /// <summary>
    /// Defines the base dispatcher
    /// </summary>
    public class UmbraDispatcher : BaseDispatcher
    {
        public string WebPath
        {
            get;
            set;
        }

        public UmbraDispatcher(Func<ContextDispatchInformation, bool> filter, string webPath)
            : base(filter)
        {
            this.WebPath = webPath;
        }

        public override void Dispatch(ObjectActivation.IActivates container, ContextDispatchInformation context)
        {
            var staticResponse = new StaticContentResponse(DispatchFilter.All, "text/plain", "result");
            staticResponse.Dispatch(container, context);
        }
    }
}
