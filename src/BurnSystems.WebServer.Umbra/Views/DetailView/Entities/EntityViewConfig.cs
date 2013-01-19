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
        public List<EntityViewTable> Tables
        {
            get;
            set;
        }

        /// <summary>
        /// Initializes a new instance of the entity view config
        /// </summary>
        public EntityViewConfig(params EntityViewTable[] tables)
        {
            this.Tables = new List<EntityViewTable>();
            foreach (var table in tables)
            {
                this.Tables.Add(table);
            }
        }
    }
}
