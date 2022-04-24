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
    public class AddressController : ControllerBase
    {
        GiftingRepository<Address> _repo;
        public AddressController(GiftingRepository<Address> repo)
        {
            _repo = repo;
            _repo = new AddressRepo(new GiftingToolContext());
        }

        // GET: api/<AddressController>
        [HttpGet]
        public List<Address> Get()
        {
            return _repo.GetAll();
        }

        // GET api/<AddressController>/5
        [HttpGet("{pincode}")]
        public Address Get(string pincode)
        {
            Address address = _repo.GetById(pincode);
            return address;
        }
    }
}
