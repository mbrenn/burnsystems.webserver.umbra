using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BurnSystems.WebServer.Umbra.Views.Treeview
{
    /// <summary>
    /// Identifies one treeview item. Can be used as ModelView-Item
    /// </summary>
    public interface ITreeViewItem
    {
        /// <summary>
        /// Gets or sets the id of the item
        /// </summary>
        long Id
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the title
        /// </summary>
        string Title
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the image url
        /// </summary>
        string ImageUrl
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the value indicating whether the current item is expandable
        /// </summary>
        bool IsExpandable
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the children
        /// </summary>
        IEnumerable<ITreeViewItem> Children
        {
            get;
        }
    }
}
