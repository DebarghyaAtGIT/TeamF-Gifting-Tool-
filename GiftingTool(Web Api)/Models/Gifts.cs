using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace GiftingTool.Models
{
    public partial class Gifts
    {
        public Gifts()
        {
            OrderDetails = new HashSet<OrderDetails>();
        }

        public int PkGiftId { get; set; }
        public int? FkGiftCategoryId { get; set; }
        public string GiftName { get; set; }
        public string GiftPrice { get; set; }
        public long GiftQuantity { get; set; }
        public string Image { get; set; }

        public virtual GiftCategory FkGiftCategory { get; set; }
        public virtual ICollection<OrderDetails> OrderDetails { get; set; }
    }
}
