using BurnSystems.ObjectActivation;
using BurnSystems.WebServer.Dispatcher;
using BurnSystems.WebServer.Modules.MVC;
using BurnSystems.WebServer.Responses;
using BurnSystems.WebServer.Umbra.Requests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BurnSystems.WebServer.Umbra.Views.Treeview
{
    public class TreeviewDispatcher : BaseDispatcher
    {
        /// <summary>
        /// Gets or sets the treeview data
        /// </summary>
        public ITreeViewItem TreeViewData
        {
            get;
            set;
        }

        /// <summary>
        /// Stores the prefix for weburl
        /// </summary>
        public string WebPrefix
        {
            get;
            set;
        }

        public TreeviewDispatcher(Func<ContextDispatchInformation, bool> filter, ITreeViewItem data)
            : this(filter, data, string.Empty)
        {
        }

        /// <summary>
        /// Initializes a new instance of the TreeviewDispatcher class
        /// </summary>
        /// <param name="prefix">Prefix being used.</param>
        public TreeviewDispatcher(Func<ContextDispatchInformation, bool> filter, ITreeViewItem data, string prefix)
            : base(filter)
        {
            this.WebPrefix = prefix;
            this.TreeViewData = data;
        }

        /// <summary>
        /// Performs the dispatching
        /// </summary>
        /// <param name="container">Container being used for dispatch</param>
        /// <param name="context">Context being used</param>
        public override void Dispatch(IActivates container, Dispatcher.ContextDispatchInformation context)
        {
            if (!context.RequestUrl.AbsolutePath.StartsWith(this.WebPrefix))
            {
                throw new InvalidOperationException("URL does not start with webprefix: " + this.WebPrefix);
            }

            // Action to be executed, not required now
            var action = context.Context.Request.QueryString["a"] ?? "list";

            // Gets the item
            var restUrl = context.RequestUrl.AbsolutePath.Substring(this.WebPrefix.Length);
            var item = this.TreeViewData.ResolveByPath(restUrl);

            if (item == null)
            {
                var response = container.Create<ErrorResponse>();
                response.Set(HttpStatusCode.NotFound);
                response.Dispatch(container, context);
                return;
            }

            // Returns jquery for this item
            var jsonResult = new JsonActionResult(
                item.Children.Select(
                    x => new
                    {
                        id = x.Id,
                        title = x.Title,
                        imageUrl = x.ImageUrl,
                        hasChildren = x.Children.Count() > 0
                    }));

            jsonResult.Execute(context.Context, container);
        }
    }
}
