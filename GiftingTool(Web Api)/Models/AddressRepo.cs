using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GiftingTool.Models
{
    public class AddressRepo : GiftingRepository<Address>
    {

        GiftingToolContext _dbcontext;
        public AddressRepo()
        {
            _dbcontext = new GiftingToolContext();
        }

        public AddressRepo(GiftingToolContext dbcontext)
        {
            this._dbcontext = dbcontext;
        }
        public int Create(Address createData)
        {
            return 0;
        }

        public int Delete(int id)
        {
            return 0;
        }


    //Get All the address stored in DB
        public List<Address> GetAll()
        {
            try
            {
                List<Address> addressList = _dbcontext.Address.ToList<Address>();
                return addressList;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    //Get Address By ID
        public Address GetById(string data)
        {
            try
            {
                Address address = _dbcontext.Address.Where(x => x.Pincode == data).FirstOrDefault();
                return address;
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
    }
}
