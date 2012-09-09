using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using BurnSystems.WebServer.Dispatcher;
using BurnSystems.ObjectActivation;
using System.Web.Script.Serialization;

namespace BurnSystems.WebServer.Umbra.Requests
{
    /// <summary>
    /// Defines the base request for all requests made by umbra. 
    /// The method is returning a special format. 
    /// </summary>
    public abstract class BaseUmbraRequest : BaseDispatcher
    {
        /// <summary>
        /// Gets or sets the content
        /// </summary>
        public string Content
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the title
        /// </summary>
        public string Title
        {
            get;
            set;
        }

        /// <summary>
        /// Initializes a new instance of the BaseRequest class.
        /// </summary>
        /// <param name="filter">Filter being used</param>
        public BaseUmbraRequest(Func<ContextDispatchInformation, bool> filter)
            : base(filter)
        {
        }

        public override void FinishDispatch(IActivates container, ContextDispatchInformation context)
        {
            var result = new
            {
                Content = this.Content,
                Title = this.Title
            };

            var serializer = new JavaScriptSerializer();
            var resultString = serializer.Serialize(result);

            SendString(context, resultString);        
        }

        /// <summary>
        /// Sends string to browser
        /// </summary>
        /// <param name="context">Context of the webserver</param>
        /// <param name="resultString">Result to be sent</param>
        private static void SendString(ContextDispatchInformation context, string resultString)
        {
            // Sends result
            context.Context.Response.ContentType = "application/json";

            var bytes = Encoding.UTF8.GetBytes(resultString);
            context.Context.Response.ContentLength64 = bytes.LongLength;

            using (var stream = context.Context.Response.OutputStream)
            {
                stream.Write(bytes, 0, bytes.Length);
            }
        }
    }
}
