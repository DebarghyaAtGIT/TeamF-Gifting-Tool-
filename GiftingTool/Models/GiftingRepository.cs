using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GiftingTool.Models
{
    public interface GiftingRepository<T>
    {
        int Create(T createData);
        T GetById(string data);
        List<T> GetAll();
        int Delete(int id);
        int Update(int id);
    }
}
