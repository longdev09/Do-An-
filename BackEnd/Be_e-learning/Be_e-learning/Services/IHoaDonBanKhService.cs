using Be_e_learning.Model;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace Be_e_learning.Services
{
    public interface IHoaDonBanKhService
    {
        List<object> getHoaDonBanKhGiangVien(string maGv);
    }
    public class IHoaDonBanKh : IHoaDonBanKhService
    {
        private readonly DataContext _dataContext;
        public IHoaDonBanKh(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public List<object> getHoaDonBanKhGiangVien(string maGv)
        {
            var dsHd = _dataContext.hoaDonBanKhs.Where(t => t.maGv == maGv).ToList();
            List<object> result = new List<object>();
            foreach (var d in dsHd)
            {
                var hd = new
                {
                    maHd = d.maHdKhMua,
                    tenHv = d.tenHv,
                    tenKh = _dataContext.khoaHocs.Where(t => t.maKh == d.maKh).Select(t => t.tenKh).FirstOrDefault(),
                    donGia = d.donGia,
                    ngayMua = d.ngayMua,
                    loiNhuan = d.loiNhuanThuDc,
                };
                result.Add(hd);

            };
                
            return result;

        }
    }

}
