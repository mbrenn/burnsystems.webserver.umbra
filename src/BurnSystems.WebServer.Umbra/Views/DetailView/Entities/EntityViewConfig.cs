using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BurnSystems.WebServer.Umbra.Views.DetailView.Entities
{
    /// <summary>
    /// Stores the configuration for the view
    /// </summary>
    public class EntityViewConfig<T>
    {
        /// <summary>
        /// Gets or sets the create function being used to create an item
        /// </summary>
        public Func<T> CreateFunction
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
        /// Initializes a new instance of the entity view config
        /// </summary>
        public EntityViewConfig()
        {
            this.Elements = new List<EntityViewElement>();
        }

        /// <summary>
        /// Adds a element
        /// </summary>
        /// <param name="element">Element to be added</param>
        /// <returns>Same instance</returns>
        public EntityViewConfig<T> AddElement(EntityViewElement element)
        {
            this.Elements.Add(element);
            return this;
        }
    }
}
