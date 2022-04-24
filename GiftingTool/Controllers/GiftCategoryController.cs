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
    public class GiftCategoryController : ControllerBase
    {

        GiftingRepository<GiftCategory> _repo;
        public GiftCategoryController(GiftingRepository<GiftCategory> repo)
        {
            _repo = repo;
            _repo = new GiftCategoriesRepo(new GiftingToolContext());
        }

        // GET: api/<GiftCategoryController>
        [HttpGet]
        public List<GiftCategory> Get()
        {
            return _repo.GetAll();
        }

        // GET api/<GiftCategoryController>/5
        [HttpGet("search/{categoryname}")]
        public Object searchByCategory(string categoryname)
        {
            GiftCategoriesRepo temp = new GiftCategoriesRepo();
            return temp.searchByCategory(categoryname);
        }

        // GET api/<GiftCategoryController>/5
        [HttpGet("recomendation/{userid}")]
        public List<Gifts> recomendation(int userid)
        {
            GiftCategoriesRepo temp = new GiftCategoriesRepo();
            return temp.giftsRecomendation(userid);
        }

        [HttpGet("random")]

        public List<Object> getRandom()
        {
            GiftCategoriesRepo temp = new GiftCategoriesRepo();
            return temp.showRandomResult();
        }

    }
}
