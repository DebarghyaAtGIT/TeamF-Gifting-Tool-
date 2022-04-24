using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GiftingTool.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GiftingTool.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderDetailsController : ControllerBase
    {
        GiftingRepository<OrderDetails> _repo;
        public OrderDetailsController(GiftingRepository<OrderDetails> repo)
        {
            _repo = repo;
            _repo = new OrderDetailsRepo(new GiftingToolContext());
        }

        // GET: api/<OrderDetailsController>
        [HttpGet]
        public List<OrderDetails> Get()
        {
            return _repo.GetAll();
        }

        
        // POST api/<OrderDetailsController>
        [HttpPost]
        public string PostFromCart(List<OrderDetails> orderDetails)
        {
            OrderDetailsRepo temp = new OrderDetailsRepo();
            int i = temp.multipleOrders(orderDetails);
            if (i == 1)
                return "Order Placed";
            else
                return "Purchase failed";
        }



        // DELETE api/<OrderDetailsController>/5
        [HttpDelete("{id}")]
        public string Delete(int id)
        {
            int i = _repo.Delete(id);
            if (i == 1)
                return "Record Deleted";
            else
                return ("Unable to find record with order id " + id);
        }
    }
}
