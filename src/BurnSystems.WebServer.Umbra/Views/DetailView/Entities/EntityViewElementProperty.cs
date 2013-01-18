﻿using BurnSystems.Test;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BurnSystems.WebServer.Umbra.Views.DetailView.Entities
{
    /// <summary>
    /// Enumerates the possible property data types
    /// </summary>
    public enum PropertyDataType
    {
        String,
        Integer,
        Boolean,
        DateTime
    };

    /// <summary>
    /// Contains the information how one row shall be shoen 
    /// </summary>
    public class EntityViewElementProperty : EntityViewElement
    {
        /// <summary>
        /// Gets or sets the name of the row that will be shown on the left
        /// </summary>
        public string Label
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the data type
        /// </summary>
        public PropertyDataType DataType
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the property that shall be shown
        /// </summary>
        public string Property
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the width in 'em' (see CSS-Specification)
        /// /// May be set to 0 for automatic height calculation by browser
        /// </summary>
        public double WidthInEm
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the height in 'em' (see CSS-Specification).
        /// May be set to 0 for automatic height calculation by browser. (Single-Line)
        /// </summary>
        public double HeightInEm
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets a value indicating whether this entry is read only
        /// </summary>
        public bool IsReadOnly
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets converter
        /// </summary>
        public Func<object, string> ConvertToString
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets converter
        /// </summary>
        public Func<string, object> ConvertFromString
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the name, being used for auth
        /// </summary>
        public override string Name
        {
            get
            {
                return this.Property;
            }
        }

        /// <summary>
        /// Converts to json
        /// </summary>
        /// <returns>Converted object</returns>
        public override object ToJson()
        {
            return new
            {
                label = this.Label,
                dataType = this.DataType.ToString(),
                width = this.WidthInEm,
                height = this.HeightInEm,
                readOnly = this.IsReadOnly,
                name = this.Name
            };
        }

        /// <summary>
        /// Converts the object to json
        /// </summary>
        /// <param name="value">Object to be convered</param>
        /// <returns>Converted object</returns>
        public override object ObjectToJson(object value)
        {
            // Gets the content
            var property = value.GetType().GetProperty(this.Property);
            Ensure.IsNotNull(property, "Property '" + this.Property + "' has not been found for '" + value.GetType().FullName + "'");
            var result = property.GetValue(value, null);

            // Converts to string, to simplify ajax
            return this.ConvertToString(result);
        }

        /// <summary>
        /// Sets the property of the item
        /// </summary>
        /// <param name="item">Item to be set</param>
        /// <param name="value">Value of the item</param>
        public override void SetValue(object item, string value)
        {
            var property = item.GetType().GetProperty(this.Property);
            Ensure.IsNotNull(property, "Property '" + this.Property + "' has not been found for '" + value.GetType().FullName + "'");

            var valueObject = this.ConvertFromString(value);
            property.SetValue(item, valueObject, null);
        }

        #region Helper methods for stylish creation

        public static EntityViewElementProperty Create()
        {
            return new EntityViewElementProperty();
        }

        public EntityViewElementProperty Labelled(string label)
        {
            this.Label = label;
            return this;
        }

        public EntityViewElementProperty For(string property)
        {
            this.Property = property;
            return this; 
        }

        public EntityViewElementProperty AsString()
        {
            this.ConvertToString = (x) =>
                {
                    if (x == null)
                    {
                        return string.Empty;
                    }

                    return x.ToString();
                };

            this.ConvertFromString = (x) => x;
            this.DataType = PropertyDataType.String;
            return this;
        }

        public EntityViewElementProperty AsInteger()
        {
            this.ConvertToString = (x) => x.ToString();
            this.ConvertFromString = (x) => Convert.ToInt64(x);
            this.DataType = PropertyDataType.Integer;
            return this;
        }

        public EntityViewElementProperty AsBoolean()
        {
            this.ConvertToString = (x) => x.ToString();
            this.ConvertFromString = (x) => Convert.ToBoolean(x);
            this.DataType = PropertyDataType.Boolean;
            return this;
        }

        public EntityViewElementProperty As(Func<object, string> convertToString, Func<string, object> convertFromString, PropertyDataType datatype)
        {
            this.ConvertToString = convertToString;
            this.ConvertFromString = convertFromString;
            this.DataType = datatype;
            return this;
        }

        public EntityViewElementProperty WithWidth(double width)
        {
            this.WidthInEm = width;
            return this;
        }

        public EntityViewElementProperty WithHeight(double height)
        {
            this.HeightInEm = height;
            return this;
        }

        public EntityViewElementProperty AsReadOnly()
        {
            this.IsReadOnly = true;
            return this;
        }

        #endregion
    }
}