using BurnSystems.WebServer.Dispatcher;
using BurnSystems.WebServer.Umbra.Requests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BurnSystems.WebServer.Umbra.Views.Treeview
{
    public class TreeviewDispatcher : BaseUmbraRequest
    {
        /// <summary>
        /// Gets or sets the treeview data
        /// </summary>
        public ITreeViewData TreeViewData
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

        public TreeviewDispatcher(Func<ContextDispatchInformation, bool> filter, ITreeViewData data)
            : this(filter, data, string.Empty)
        {
        }

        /// <summary>
        /// Initializes a new instance of the TreeviewDispatcher class
        /// </summary>
        /// <param name="prefix">Prefix being used.</param>
        public TreeviewDispatcher(Func<ContextDispatchInformation, bool> filter, ITreeViewData data, string prefix)
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
        public override void Dispatch(ObjectActivation.IActivates container, Dispatcher.ContextDispatchInformation context)
        {
            
        }
    }
}
