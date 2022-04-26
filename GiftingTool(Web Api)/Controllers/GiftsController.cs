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
    public class GiftsController : ControllerBase
    {
        GiftingRepository<Gifts> _repo;
        public GiftsController(GiftingRepository<Gifts> repo)
        {
            _repo = repo;
            _repo = new GiftsRepo(new GiftingToolContext());
        }
 
        // GET: api/<GiftsController>
        [HttpGet]
        public List<Gifts> Get()
        {
            return _repo.GetAll();
        }

        // GET api/<GiftsController>/5
        [HttpGet("{id}")]
        public Gifts Get(string id)
        {
            return _repo.GetById(id);
        }

        // GET api/<GiftsController>/5
        [HttpGet("category/{id}")]

        public List<Object> GetList(int id)
        {
            GiftsRepo temp = new GiftsRepo();
            return temp.GetGiftsById(id);
        }

        
        [HttpGet("search/{giftname}")]
        public List<Gifts> search(string giftname)
        {
            GiftsRepo temp = new GiftsRepo();
            return temp.serachByGift(giftname);
        }

        [HttpGet("otherproducts/{giftid}")]
        public List<Object> getOtherProducts(string giftid)
        {
          
            GiftsRepo gr = new GiftsRepo();
            Gifts g = _repo.GetById(giftid);
            if (g != null)
            {
                return gr.otherProducts(Convert.ToInt32(g.FkGiftCategoryId), Convert.ToInt32(g.PkGiftId));
            }
            else
            {
                return null;
            }
          
        }


    }
}
