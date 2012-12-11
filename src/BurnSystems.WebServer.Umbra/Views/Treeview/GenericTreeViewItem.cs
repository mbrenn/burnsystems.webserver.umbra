using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BurnSystems.WebServer.Umbra.Views.Treeview
{
    public class GenericTreeViewItem : ITreeViewItem
    {
        private List<ITreeViewItem> children = new List<ITreeViewItem>();

        public string Title
        {
            get;
            set;
        }

        public string ImageUrl
        {
            get;
            set;
        }

        public bool IsExpandable
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the children
        /// </summary>
        public IList<ITreeViewItem> Children
        {
            get { return this.children; }
        }

        IEnumerable<ITreeViewItem> ITreeViewItem.Children
        {
            get { return this.children; }
        }
    }
}
