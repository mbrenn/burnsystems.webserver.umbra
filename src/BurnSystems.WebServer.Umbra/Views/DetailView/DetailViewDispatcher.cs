﻿using BurnSystems.ObjectActivation;
using BurnSystems.WebServer.Dispatcher;
using BurnSystems.WebServer.Helper;
using BurnSystems.WebServer.Umbra.Views.SimpleContentView;
using BurnSystems.WebServer.Umbra.Views.Treeview;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BurnSystems.WebServer.Umbra.Views.DetailView
{
    /// <summary>
    /// Performs the 
    /// </summary>
    public class DetailViewDispatcher : BaseDispatcher
    {
        /// <summary>
        /// Gets or sets the View resolver being used
        /// </summary>
        [Inject]
        public IDetailViewResolver ViewResolver
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the tree view item
        /// </summary>
        [Inject]
        public ITreeViewItem Root
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

        public DetailViewDispatcher(Func<ContextDispatchInformation, bool> filter, ITreeViewItem data, IDetailViewResolver resolver)
            : this(filter, data, resolver, string.Empty)
        {
        }

        /// <summary>
        /// Initializes a new instance of the DetailViewDispatcher class
        /// </summary>
        /// <param name="filter">Filter for requests</param>
        /// <param name="data">Data to be shown</param>
        /// <param name="prefix">Prefix being used.</param>
        public DetailViewDispatcher(Func<ContextDispatchInformation, bool> filter, ITreeViewItem data, IDetailViewResolver resolver, string prefix)
            : base(filter)
        {
            this.WebPrefix = prefix;
            this.ViewResolver = resolver;
            this.Root = data;
        }

        /// <summary>
        /// Performs the dispatching for the object
        /// </summary>
        /// <param name="container"></param>
        /// <param name="context"></param>
        public override void Dispatch(ObjectActivation.IActivates container, ContextDispatchInformation context)
        {
            if (!context.RequestUrl.AbsolutePath.StartsWith(this.WebPrefix))
            {
                throw new InvalidOperationException("URL does not start with webprefix: " + this.WebPrefix);
            }

            context.Context.DisableBrowserCache();

            // Gets the item
            var restUrl = context.RequestUrl.AbsolutePath.Substring(this.WebPrefix.Length);
            var item = this.Root.ResolveByPath(restUrl);

            // Get the detail view
            var detailViewType = this.ViewResolver.ResolveDefaultView(item);

            if (detailViewType == null)
            {
                var contentDispatcher = new StaticContentView(
                    item.ToString(), "Unknown detailview", "No default view could be resolved for this item.");
                contentDispatcher.Dispatch(container, context);
                contentDispatcher.FinishDispatch(container, context);
            }
            else
            {
                var detailView = container.Create(detailViewType) as DetailView;
                detailView.Item = item;
                detailView.Dispatch(container, context);
                detailView.FinishDispatch(container, context);
            }
        }
    }
}
