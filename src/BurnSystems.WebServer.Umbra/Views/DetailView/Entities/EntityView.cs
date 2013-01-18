using BurnSystems.ObjectActivation;
using BurnSystems.WebServer.Modules.PostVariables;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BurnSystems.WebServer.Umbra.Views.DetailView.Entities
{
    /// <summary>
    /// Implements the entity view being used to show the contents of a specific object
    /// </summary>
    public class EntityView<T> : DetailView where T : class
    {
        /// <summary>
        /// Gets or sets  the configurations
        /// </summary>
        public EntityViewConfig<T> Config
        {
            get;
            set;
        }

        /// <summary>
        /// Initializes a new instance of the EntityView class
        /// </summary>
        /// <param name="config">Config to be used for this instance</param>
        public EntityView(EntityViewConfig<T> config)
        {
            this.Config = config;
        }

        public override void Dispatch(IActivates container, Dispatcher.ContextDispatchInformation context)
        {
            var type = context.Context.Request.QueryString["t"] ?? "show";

            if (type == "show")
            {
                this.AddScript(
                    "js/viewtypes/umbra.viewtypes.entityview.js");
                this.Title = this.Item.ToString();
                this.ViewTypeToken = "BurnSystems.Umbra.DetailView.EntityView";

                var viewData = new
                {
                    elements = this.Config.Elements.Select(x => x.ToJson()),
                    data = this.Config.Elements.Select(x => x.ObjectToJson(this.Item.Entity)),
                    updateUrl = context.Context.Request.Url.ToString() + "?t=update"
                };

                this.UserData = viewData;
            }
            else if (type == "update")
            {
                var postVariables = container.Get<PostVariableReader>();
                foreach (var pair in postVariables)
                {
                    var element = this.Config.Elements
                        .Where(x => x.Name == pair.Key)
                        .FirstOrDefault();;
                    if (element == null)
                    {
                        continue;
                    }

                    element.SetValue(this.Item.Entity, pair.Value);
                }
            }
        }
    }
}
