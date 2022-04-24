using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace GiftingTool.Models
{
    public partial class OrderDetails
    {
        public int PkOrderDetailsId { get; set; }
        public int? FkOrderId { get; set; }
        public int? FkGiftId { get; set; }
        public long GiftQuantity { get; set; }
        public DateTime OrderDate { get; set; }

        public virtual Gifts FkGift { get; set; }
        public virtual Orders FkOrder { get; set; }
    }
}
