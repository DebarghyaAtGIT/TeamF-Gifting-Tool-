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
    public class UsersController : ControllerBase
    {
        private GiftingRepository<Users> _repo;

        public UsersController(GiftingRepository<Users> repo)
        {
            _repo = repo;
            _repo = new UserRepo(new GiftingToolContext());
        }

        // GET: api/<UsersController>
        [HttpGet]
        public List<Users> Get()
        {
            return _repo.GetAll();
        }

        // GET api/<UsersController>/5
        [HttpGet("{email}")]
        public Users Get(string email)
        {
            return _repo.GetById(email);
        }

        // POST api/<UsersController>
        [HttpPost]
        public Users Post(Users user)
        {
            Users temp_user = _repo.GetById(user.Email);
            if (temp_user == null)
            {
                _repo.Create(user);
                return user;
            }
            else
                return null;
        }

        // POST api/<UsersController>
        [HttpPost("loginuser")]
        public Users postlogin(Users loginuser)
        {
            UserRepo user = new UserRepo();
            var temp = user.GetById(loginuser.Email);
            if (temp != null)
            {
                if (loginuser.Email == temp.Email && loginuser.Password == temp.Password)
                {
                    user.AuthTrue(temp.PkUserId);
                    return temp;

                }
                else
                {
                    return null;
                }
            }
            else
            {
                return null;
            }

           
        }

        [HttpPut("logout/{id}")]
        public string LogOutUser(int id)
        {
            UserRepo temp = new UserRepo();
            temp.AuthFalse(id);
            return "Logged out";
        }

        // PUT api/<UsersController>/5
        [HttpPut("{id}")]
        public string Put(int id,Users users)
        {
            UserRepo temp = new UserRepo();
            int i = temp.UpdatePassword(id,users.Password);
            if (i == 1)
                return "Password Updated";
            else
                return "User not found";
        }

    }
}
