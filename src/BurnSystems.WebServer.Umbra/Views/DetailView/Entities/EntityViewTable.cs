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
    public class EntityViewTable
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
        public EntityViewTable(
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
        public EntityViewTable AddElement(EntityViewElement element)
        {
            this.Elements.Add(element);
            return this;
        }

        /// <summary>
        /// Gets the table as json
        /// </summary>
        /// <param name="item">Item which shall be executed</param>
        /// <returns>Object that can be converted as a json object</returns>
        public object ToJson(ITreeViewItem item)
        {
            return new
            {
                elements = this.Elements.Select(x => x.ToJson()),
                data = this.Elements.Select(x => x.ObjectToJson(item.Entity)),
                updateUrlPostfix = "?t=update&n=" + this.Name
            };
        }
    }
}
