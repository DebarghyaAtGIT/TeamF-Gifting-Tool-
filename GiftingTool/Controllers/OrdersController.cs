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
    public class OrdersController : ControllerBase
    {
        GiftingRepository<Orders> _repo;
        public OrdersController(GiftingRepository<Orders> repo)
        {
            _repo = repo;
            _repo = new OrdersRepo(new GiftingToolContext());
        }

        // GET: api/<OrdersController>
        [HttpGet]
        public List<Orders> Get()
        {
            return _repo.GetAll();
        }

        // GET: api/<OrdersController>/5
        [HttpGet("recentorder/{type}")]
        public Orders GetById(string type)
        {
            return _repo.GetById(type);
        }

        // POST api/<OrdersController>
        [HttpPost]
        public void Post(Orders ord)
        {
            _repo.Create(ord);
        }

        // DELETE api/<OrdersController>/5
        [HttpDelete("{id}")]
        public string Delete(int id)
        {
            int i = _repo.Delete(id);
            if (i == 1)
                return "Record Deleted";
            else
                return ("Unable to find record with order id " + id);
        }

        [HttpGet("{id}")]
        public Object OrderHistory(int id)
        {
            OrdersRepo temp = new OrdersRepo();
            return temp.orderHistory(id);
        }
    }
}
