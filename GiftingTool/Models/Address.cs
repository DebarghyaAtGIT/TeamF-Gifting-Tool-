using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace GiftingTool.Models
{
    public partial class Address
    {
        public Address()
        {
            Orders = new HashSet<Orders>();
        }

        public int PkAddressId { get; set; }
        public string State { get; set; }
        public string District { get; set; }
        public string Pincode { get; set; }
        public string Country { get; set; }

        public virtual ICollection<Orders> Orders { get; set; }
    }
}
