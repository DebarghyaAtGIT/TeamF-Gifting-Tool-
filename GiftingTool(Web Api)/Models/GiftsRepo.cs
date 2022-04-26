using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GiftingTool.Models
{
    public class GiftsRepo : GiftingRepository<Gifts>
    {
        private GiftingToolContext _dbcontext;

        public GiftsRepo(GiftingToolContext dbcontext)
        {
            _dbcontext = dbcontext;
        }
        public GiftsRepo()
        {
            _dbcontext = new GiftingToolContext();
        }
        public int Create(Gifts createData)
        {
            return 0;
        }

        public int Delete(int id)
        {
            return 0;
        }

        public List<Gifts> GetAll()
        {
            try
            {
                var allGifts = _dbcontext.Gifts.ToList<Gifts>();
                return allGifts;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

    //Get gifts based on ID
        public Gifts GetById(string data)
        {
            try
            {
                var giftDetails = _dbcontext.Gifts.Where(x => x.PkGiftId == Convert.ToInt32(data)).FirstOrDefault();
                return giftDetails;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

    //Get products' recommendtion based on a particular product
        public List<Object> otherProducts(int categoryid,int giftid)
        {
            try
            {
                var otherproducts = (from g in _dbcontext.Gifts
                                     join gc in _dbcontext.GiftCategory on g.FkGiftCategoryId equals gc.PkGiftCategoryId
                                     where (g.FkGiftCategoryId == categoryid && g.PkGiftId != giftid)
                                     select new
                                     {
                                         giftId = g.PkGiftId,
                                         giftName = g.GiftName,
                                         price = g.GiftPrice,
                                         giftQuantity = g.GiftQuantity,
                                         categoryName = gc.CategoryName,
                                         categoryId = gc.PkGiftCategoryId,
                                         categoryDesc = gc.CategoryDescription,
                                         GiftImage = g.Image
                                     }).ToList<Object>();
                return otherproducts;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    //Get gifts according to category 
        public List<Object> GetGiftsById(int id)
        {
            try
            {
                //var giftByCategory = await _dbcontext.Gifts.Where(x => x.FkGiftCategoryId == id).ToListAsync<Gifts>();


                var category = (from g in _dbcontext.Gifts
                                join c in _dbcontext.GiftCategory on g.FkGiftCategoryId equals c.PkGiftCategoryId
                                where g.PkGiftId == id
                                select new
                                {
                                    giftId = g.PkGiftId,
                                    giftName = g.GiftName,
                                    price = g.GiftPrice,
                                    giftQuantity = g.GiftQuantity,
                                    categoryName = c.CategoryName,
                                    categoryId = c.PkGiftCategoryId,
                                    categoryDesc = c.CategoryDescription,
                                    GiftImage = g.Image
                                }).ToList<Object>();

                return category;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public int Update(int id)
        {
            return 0;
        }

      
        public List<Gifts> serachByGift(string giftName)
        {
            try
            {
                return _dbcontext.Gifts.Where(x => x.GiftName.Contains(giftName)).ToList();
            }

            catch(Exception ex)
            {
                throw ex;
            }
        }
    }
}
