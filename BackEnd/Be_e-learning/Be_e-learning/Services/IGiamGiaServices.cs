using Be_e_learning.DTO;
using Be_e_learning.Model;
using Be_e_learning.RadomKey;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Be_e_learning.Services
{
    public interface IGiamGiaServices
    {
        List<GiamGia> getGiamGiaGv(string maGv);
        int createGiamGia(string maGv, GiamGiaDTO giamGiaDTO);
        int deleteGiamGia(string maGv, string maGg);
    }

    public class GiamGiaService : IGiamGiaServices
    {
        private readonly DataContext _dataContext;
        public GiamGiaService(DataContext dataContext) { 
            _dataContext = dataContext; 
        }
        public int createGiamGia(string maGv, GiamGiaDTO giamGiaDTO)
        {
            GiamGia gia = new GiamGia();
            gia.maGg = RandomKey.randomMa("GG");
            gia.maGv = maGv;
            gia.phanTramGiam = giamGiaDTO.phanTramGiam;
            gia.ghiChu = giamGiaDTO.ghiChu;
            gia.ngayTao = DateTime.Now.Date;
            _dataContext.giamGias.Add(gia);
            int check = _dataContext.SaveChanges();
            return check;

        }

       

        public int deleteGiamGia(string maGv, string maGg)
        {
            var giamGia = _dataContext.giamGias.Where(t => t.maGv == maGv && t.maGg == maGg).FirstOrDefault();
            _dataContext.giamGias.Remove(giamGia);
            int check = _dataContext.SaveChanges();
            return check;
        }

        public List<GiamGia> getGiamGiaGv(string maGv)
        {
            var dsGiamGia = _dataContext.giamGias.Where(t => t.maGv == maGv).ToList();
            return dsGiamGia;
        }

       
    }
}
