using BurnSystems.ObjectActivation;
using BurnSystems.Test;
using BurnSystems.WebServer.Dispatcher;
using BurnSystems.WebServer.Umbra.Views.Treeview;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BurnSystems.WebServer.Umbra.Views.DetailView.Entities
{
    /// <summary>
    /// Defines the table
    /// </summary>
    public class EntityViewDetailTable : EntityViewTable
    {
        /// <summary>
        /// Gets or sets the name of the table
        /// </summary>
        public string Name
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the url, if the browser shall send the contents
        /// of the table to another url
        /// </summary>
        public string OverrideUrl
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the rows
        /// </summary>
        public List<EntityViewElement> Elements
        {
            get;
            set;
        }

        /// <summary>
        /// Initializes a new instance of the table
        /// </summary>
        /// <param name="name">Stores the name of the table</param>
        public EntityViewDetailTable(
            string name,
            params EntityViewElement[] elements)
        {
            this.Name = name;
            this.Elements = new List<EntityViewElement>();

            foreach (var element in elements)
            {
                this.AddElement(element);
            }
        }

        /// <summary>
        /// Adds a element
        /// </summary>
        /// <param name="element">Element to be added</param>
        /// <returns>Same instance</returns>
        public EntityViewDetailTable AddElement(EntityViewElement element)
        {
            this.Elements.Add(element);
            return this;
        }

        /// <summary>
        /// Gets the table as json
        /// </summary>
        /// <param name="item">Item which shall be executed</param>
        /// <returns>Object that can be converted as a json object</returns>
        public override object ToJson(IActivates container, ITreeViewItem item)
        {
            var context = container.Get<ContextDispatchInformation>();
            Ensure.That(context != null);

            if (this.OverrideUrl == null)
            {
                this.OverrideUrl = context.Context.Request.Url.ToString() + "?t=update&n=" + this.Name;
            }

            return new
            {
                type = "detail",
                elements = this.Elements.Select(x => x.ToJson(container)),
                data = this.Elements.Select(x =>
                    {
                        if (item == null)
                        {
                            return null;
                        }
                        else
                        {
                            return x.ObjectToJson(item.Entity);
                        }
                    }),
                overrideUrl = this.OverrideUrl
            };
        }

        #region Some helper methods

        public EntityViewDetailTable WithOverrideUrl(string overrideUrl)
        {
            this.OverrideUrl = overrideUrl;
            return this;
        }

        #endregion
    }
}
