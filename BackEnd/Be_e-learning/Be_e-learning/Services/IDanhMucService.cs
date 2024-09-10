using Be_e_learning.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Be_e_learning.Services
{
    public interface IDanhMucService
    {
        List<DanhMuc> getAllDanhMuc();
        DanhMuc getDanhMucById(string id);
        DanhMuc createDanhMuc(DanhMuc danhMuc);
        void updateDanhMuc(DanhMuc danhMuc);
        void deleteDanhMuc(string maDm);
    }

    public class DanhMucService : IDanhMucService
    {
        private readonly DataContext _dataContext;

        public DanhMucService(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        public List<DanhMuc> getAllDanhMuc()
        {
           var loais = _dataContext.danhMucs.Where(t => true).ToList();
            return loais;
        }

        public DanhMuc getDanhMucById(string id)
        {
            throw new NotImplementedException();
        }

        public DanhMuc createDanhMuc(DanhMuc danhMuc)
        {
            throw new NotImplementedException();
        }

        public void updateDanhMuc(DanhMuc danhMuc)
        {
            throw new NotImplementedException();
        }

        public void deleteDanhMuc(string maDm)
        {
            throw new NotImplementedException();
        }

    }
}
