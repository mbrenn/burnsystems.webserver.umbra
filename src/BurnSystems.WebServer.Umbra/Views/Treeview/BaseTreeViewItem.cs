using BurnSystems.ObjectActivation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BurnSystems.WebServer.Umbra.Views.Treeview
{
    public class BaseTreeViewItem : ITreeViewItem
    {
        private List<ITreeViewItem> children = new List<ITreeViewItem>();

        public virtual long Id
        {
            get;
            set;
        }

        public virtual string Title
        {
            get;
            set;
        }

        public virtual string ImageUrl
        {
            get;
            set;
        }

        public virtual bool IsExpandable
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the entity behind this treeview object
        /// </summary>
        public virtual object Entity
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the children
        /// </summary>
        public virtual IEnumerable<ITreeViewItem> GetChildren(IActivates activates)
        {
            return null;
        }
    }
}
