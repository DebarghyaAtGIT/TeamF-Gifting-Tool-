using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GiftingTool.Models
{
    public class UserRepo : GiftingRepository<Users>
    {
        private GiftingToolContext _dbcontext;
        public UserRepo()
        {
            _dbcontext = new GiftingToolContext();
        }

        public UserRepo(GiftingToolContext context)
        {
            _dbcontext = context;
        }
        public int Create(Users createData)
        {
            int i = 0;
            try
            {
                if (createData != null)
                {
                    _dbcontext.Users.Add(createData);
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

        public int Delete(int id)
        {
            return 0;
        }

        public List<Users> GetAll()
        {
            try
            {
               return _dbcontext.Users.ToList<Users>();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Users GetById(string data)
        {
            try
            {
                var user = _dbcontext.Users.Where(x => x.Email == data).FirstOrDefault();
                return user;
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

        public int UpdatePassword(int id , string newPassword)
        {
            int i = 0;
            try
            {
                var element = _dbcontext.Users.Where(x => x.PkUserId == id).FirstOrDefault();
                if (element != null)
                {
                    element.Password = newPassword;
                    _dbcontext.SaveChanges();
                    i = 1;
                }
            }
            catch(Exception ex)
            {
                throw ex;
            }

            return i;
        }

        public string AuthTrue(int id)
        {
            try
            {
                var user = _dbcontext.Users.Where(x => x.PkUserId== id).FirstOrDefault();
                if (user == null) 
                    return "User Not Found";
                else
                {
                    if (user.IsOnline== true) 
                        return "Already Logged In";
                    user.IsOnline= true;
                    _dbcontext.SaveChanges();
                    return "Logged In";
                }

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public string AuthFalse(int id)
        {
            try
            {
                var user = _dbcontext.Users.Where(x => x.PkUserId == id).FirstOrDefault();
                if (user == null) return "User Not Found";
                else
                {
                    if (user.IsOnline == true)
                    {
                        user.IsOnline = false;
                        _dbcontext.SaveChanges();
                        return "Logged Out";
                    }
                    else
                    {
                        return "User Not Logged In";
                    }

                }
            }

            catch (Exception ex)
            {
                throw ex;
            }

        }
    }
}
