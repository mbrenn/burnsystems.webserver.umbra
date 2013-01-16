using BurnSystems.ObjectActivation;
using BurnSystems.Test;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BurnSystems.WebServer.Umbra.Views.DetailView
{
    /// <summary>
    /// Just a very simple resolver
    /// </summary>
    public class BasicDetailViewResolver : IDetailViewResolver
    {
        /// <summary>
        /// Stores the list of items
        /// </summary>
        private List<Item> items = new List<Item>();

        /// <summary>
        /// Adds one item
        /// </summary>
        /// <param name="filter">Filter to be added</param>
        /// <param name="type">Type being used</param>
        public void Add(
            Func<object, bool> filter,
            Type type)
        {
            this.items.Add(
                new Item()
                {
                    Filter = filter,
                    DetailViewType = type
                });
        }

        /// <summary>
        /// Resolves the type
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        public DetailView ResolveDefaultView(IActivates container, object item)
        {
            var found = this.items.FirstOrDefault(x => x.Filter(item));
            if (found == null)
            {
                return null;
            }

            var result = container.Create(found.DetailViewType) as DetailView;
            Ensure.IsNotNull(result, "Could not create " + found.DetailViewType + " as DetailView");

            return result;
        }

        #region Item Helper class

        /// <summary>
        /// Just a helper class
        /// </summary>
        private class Item
        {
            public Func<object, bool> Filter
            {
                get;
                set;
            }

            public Type DetailViewType
            {
                get;
                set;
            }
        }

        #endregion
    }
}
