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
            get { return this.ToString(); }
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

        public override string ToString()
        {
            if (this.Entity != null)
            {
                return this.Entity.ToString();
            }

            return typeof(BaseTreeViewItem).FullName;
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
