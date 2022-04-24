using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace GiftingTool.Models
{
    public partial class GiftCategory
    {
        public GiftCategory()
        {
            Gifts = new HashSet<Gifts>();
        }

        public int PkGiftCategoryId { get; set; }
        public string CategoryName { get; set; }
        public string CategoryDescription { get; set; }

        public virtual ICollection<Gifts> Gifts { get; set; }
    }
}
