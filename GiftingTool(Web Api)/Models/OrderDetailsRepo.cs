using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GiftingTool.Models
{
    public class OrderDetailsRepo : GiftingRepository<OrderDetails>
    {
        GiftingToolContext _dbcontext;
        public OrderDetailsRepo()
        {
            _dbcontext = new GiftingToolContext();
        }

        public OrderDetailsRepo(GiftingToolContext context)
        {
            _dbcontext = context;
        }
        public int Create(OrderDetails createData)
        {
            return 0;
        }

    //Buy multiple products via cart
        public int multipleOrders(List<OrderDetails> createData)
        {
      try
      {
                if (createData != null)
                {
                    _dbcontext.OrderDetails.AddRange(createData);
                    _dbcontext.SaveChanges();
                    
                    i = 1;
                }

            }
            catch (Exception ex)
            {

                throw ex;
            }

            return i;
        }

    //Cancel Order after placing
        public int Delete(int id)
        {
            int i = 0;
            try
            {
                var order = _dbcontext.OrderDetails.Where(x => x.FkOrderId == id).FirstOrDefault();
                if (order != null)
                {
                    _dbcontext.OrderDetails.Remove(order);
                    _dbcontext.SaveChanges();
                    i = 1;
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
            return i;
        }

        public List<OrderDetails> GetAll()
        {
            try
            {
                return _dbcontext.OrderDetails.ToList<OrderDetails>();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public OrderDetails GetById(string data)
        {
            return null;
        }

        public int Update(int id)
        {
            return 0;
        }
    }
}
