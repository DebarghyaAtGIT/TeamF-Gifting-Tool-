using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GiftingTool.Models
{
    public class GiftCategoriesRepo : GiftingRepository<GiftCategory>
    {
        private GiftingToolContext _dbcontext;

        public GiftCategoriesRepo(GiftingToolContext dbcontext)
        {
            _dbcontext = dbcontext;
        }
        public GiftCategoriesRepo()
        {
            _dbcontext = new GiftingToolContext();
        }
        public int Create(GiftCategory createData)
        {
            throw new NotImplementedException();
        }

        public int Delete(int id)
        {
            throw new NotImplementedException();
        }

        public List<GiftCategory> GetAll()
        {
            return _dbcontext.GiftCategory.ToList<GiftCategory>();
        }


       //Get Search Results
        public Object searchByCategory(string categoryName)
        {
            try
            {
                var category = (from g in _dbcontext.Gifts
                                join gc in _dbcontext.GiftCategory on
                                g.FkGiftCategoryId equals gc.PkGiftCategoryId
                                where (gc.CategoryName.Contains(categoryName) ||
                                 g.GiftName.Contains(categoryName)|| gc.CategoryDescription.Contains(categoryName))
                                select new
                                {
                                    GiftId = g.PkGiftId,
                                    Name = g.GiftName,
                                    Price = g.GiftPrice,
                                    CategoryId = g.FkGiftCategoryId,
                                    Quantity = g.GiftQuantity,
                                    CategoryName = gc.CategoryName,
                                    Description = gc.CategoryDescription,
                                    Image = g.Image
                                }).ToList();
                return category;
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }


    //Get Recommended products based on users' previous placed orders
        public List<Gifts> giftsRecomendation(int userid)
        {
            try
            {
                var recomendation = (from od in _dbcontext.OrderDetails
                                     join o in _dbcontext.Orders on
                                     od.FkOrderId equals o.PkOrderId
                                     join g in _dbcontext.Gifts on
                                     od.FkGiftId equals g.PkGiftId
                                     join gc in _dbcontext.GiftCategory on
                                     g.FkGiftCategoryId equals gc.PkGiftCategoryId
                                     where o.FkUserId == userid
                                     group od by new
                                     {
                                         od.OrderDate,
                                         gc.PkGiftCategoryId

                                     } into tblGroup
                                     orderby tblGroup.Key.OrderDate descending
                                     select new
                                     {
                                         categoryId = tblGroup.Key.PkGiftCategoryId
                                     }
                                     ).Take(2).ToList();
                List<Gifts> recomendedGifts = new List<Gifts>();
                foreach(var item in recomendation)
                {

                    List<Gifts> ele = _dbcontext.Gifts.Where(x => (x.FkGiftCategoryId == item.categoryId)).ToList();
                    recomendedGifts.AddRange(ele);
                }
                return recomendedGifts;
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public GiftCategory GetById(string data)
        {
            throw new NotImplementedException();
        }

        public int Update(int id)
        {
            throw new NotImplementedException();
        }

    //If user haven't made any purchases then this method will show one products from each category
    public List<Object> showRandomResult()
    {
      try
      {
        //return _dbcontext.Gifts.Take(6).ToList();
        List<Object> storedList = new List<Object>();
        var distinct = (from gifts in _dbcontext.Gifts
                        select gifts.FkGiftCategoryId).Distinct().ToList();
        var all = _dbcontext.Gifts.ToList();
        foreach (var item1 in distinct)
        {
          foreach (var item2 in all)
          {
            if (item1 == item2.FkGiftCategoryId)
            {
              storedList.Add(item2);
              break;
            }
          }
        }
        return storedList;
      }
      catch (Exception ex)
      {
        throw ex;
      }
    }
  }
}
