using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace GiftingTool.Models
{
    public partial class Orders
    {
        public Orders()
        {
            OrderDetails = new HashSet<OrderDetails>();
        }

        public int PkOrderId { get; set; }
        public int? FkUserId { get; set; }
        public string RecipientName { get; set; }
        public string RecipientPhoneNumber { get; set; }
        public string RecipientEmail { get; set; }
        public int? FkAddressId { get; set; }
        public string OrderCost { get; set; }
        public string DeliveryAddress { get; set; }

        public virtual Address FkAddress { get; set; }
        public virtual Users FkUser { get; set; }
        public virtual ICollection<OrderDetails> OrderDetails { get; set; }
    }
}
