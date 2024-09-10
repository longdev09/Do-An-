using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Be_e_learning.Model;
using Be_e_learning.RadomKey;
using Microsoft.EntityFrameworkCore;
namespace Be_e_learning.Services
{
    public interface IChuongKhoaHocService
    {
        List<ChuongKhoaHoc> getAllChuong();
        ChuongKhoaHoc getChuong(string maChuong);
        ChuongKhoaHoc createChuong(ChuongKhoaHoc chuongKhoaHoc);

        List<ChuongKhoaHoc> getChuongMakh(string maKh);
        void updateChuong(ChuongKhoaHoc chuongKhoaHoc);
        int deleteChuong(string maChuong);
    }


    public class ChuongKhoaHocServices : IChuongKhoaHocService
    {

        private readonly DataContext _dataContext;
        public ChuongKhoaHocServices(DataContext dataContext)
        {
            _dataContext = dataContext;
        }


        //test kh725108522
        public ChuongKhoaHoc createChuong(ChuongKhoaHoc chuongKhoaHoc)
        {
            int stt = 1;
            var dsChuong = _dataContext.chuongKhoaHocs.Where(t => t.maKh == chuongKhoaHoc.maKh).ToList();
            if (dsChuong.Count > 0)
            {
                var phanTuCoSttLonNhat = dsChuong.OrderByDescending(chuong => chuong.stt).FirstOrDefault();
                stt = phanTuCoSttLonNhat.stt + 1;
            }
            ChuongKhoaHoc newChuongKhoaHoc = new ChuongKhoaHoc();
            newChuongKhoaHoc.maKh = chuongKhoaHoc.maKh;
            newChuongKhoaHoc.maCh = RandomKey.randomMa("CKH");
            newChuongKhoaHoc.tenChuong = chuongKhoaHoc.tenChuong;
            newChuongKhoaHoc.stt = stt;
            _dataContext.chuongKhoaHocs.Add(newChuongKhoaHoc);
            _dataContext.SaveChanges();

            return newChuongKhoaHoc;

        }

        public int deleteChuong(string maChuong)
        {
            var chuongKh = _dataContext.chuongKhoaHocs.Include(c => c.noiDungs)
                .ThenInclude(n => n.video).Include(c => c.noiDungs)
                .ThenInclude(n => n.tracNghiem).Where(t => t.maCh == maChuong).FirstOrDefault();

            if(chuongKh != null )
            {
                _dataContext.chuongKhoaHocs.Remove(chuongKh);
                return _dataContext.SaveChanges() ;
            }
            return 0;
        }

        public List<ChuongKhoaHoc> getAllChuong()
        {
            throw new NotImplementedException();
        }

        public ChuongKhoaHoc getChuong(string maChuong)
        {
            throw new NotImplementedException();
        }

        public List<ChuongKhoaHoc> getChuongMakh(string maKh)
        {
            var dsChuong = _dataContext.chuongKhoaHocs.Where(t => t.maKh == maKh).ToList();
            return dsChuong;
        }

        public void updateChuong(ChuongKhoaHoc chuongKhoaHoc)
        {
            var chuong = _dataContext.chuongKhoaHocs.Where(t => t.maCh == chuongKhoaHoc.maCh).FirstOrDefault();
            if(chuong != null)
            {
                chuong.tenChuong = chuongKhoaHoc.tenChuong;
            }
            _dataContext.SaveChanges();
        }
    }
}
