using Be_e_learning.DTO;
using Be_e_learning.Model;
using Be_e_learning.RadomKey;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Be_e_learning.Services
{
    public interface IHoaDonService
    {
        string createHoaDon(HoaDonDTO hoaDonDTO);
        List<object> getHoaDonGiangVien(string maGv);

        List<object> getHoaDonHocVien(string maHv);

        List<object> getChiTietHoaDon(string maHd);
    }
    public class HoaDonService : IHoaDonService
    {
        private readonly DataContext _dataContext;
        public HoaDonService(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public string createHoaDon(HoaDonDTO hoaDonDTO)
        {
            int check = 0;
            // tao hoa don
            HoaDon hoaDon = new HoaDon();
            hoaDon.maHd = RandomKey.randomMa("HD");
            hoaDon.maHv = hoaDonDTO.maHv;  
            hoaDon.tongTien = hoaDonDTO.tongTien;
            hoaDon.ngayThanhToan = DateTime.Now;
            _dataContext.Add(hoaDon);
            check = _dataContext.SaveChanges();
            // tao chi tiet hoa don 
            foreach (HoaDonDTO.ChiTietHoaDonDTO hoaDon1 in hoaDonDTO.ChiTietHoaDon)
            {
                
                ChiTietHoaDon chiTietHoaDon = new ChiTietHoaDon();
                chiTietHoaDon.maHd = hoaDon.maHd;
                chiTietHoaDon.maKh = hoaDon1.maKh;
                chiTietHoaDon.donGia = hoaDon1.donGia;
                _dataContext.Add(chiTietHoaDon);
                _dataContext.SaveChanges();

                // Thêm chi tiết hóa đơn vào danh sách hoặc thực hiện các thao tác khác ở đây
            }
            return hoaDon.maHd;
        }

        public List<object> getChiTietHoaDon(string maHd)
        {
            var ctHds = _dataContext.chiTietHoaDons.Include(kh => kh.khoaHoc).Where(ct => ct.maHd == maHd).ToList();
            var dsCts = new List<object>();
            if(ctHds.Any())
            {
                foreach (var i in ctHds)
                {
                    var ct = new
                    {
                        maKh = i.khoaHoc.maKh,
                        tenKh = i.khoaHoc.tenKh,
                        hinh = i.khoaHoc.hinh,
                        giaGoc = i.khoaHoc.gia,
                        giaMua = i.donGia,
                    };
                    dsCts.Add(ct);
                }
                return dsCts;
            }
            return dsCts;
           
        }

        public List<object> getHoaDonGiangVien(string maGv)
        {
            var hoaDons =  _dataContext.hoaDons
             .Include(hd => hd.hocVien)
            .Include(hd => hd.chiTietHoaDons)
            .ThenInclude(ct => ct.khoaHoc)
            .ThenInclude(kh => kh.giangVien).Where(hd => hd.chiTietHoaDons.Any(ct => ct.khoaHoc.maGv == maGv)).ToList();
            if(hoaDons.Count > 0)
            {
                var hds = new List<object>();
                foreach(var i in hoaDons)
                {
                    var hd = new
                    {

                        maHd = i.maHd,
                        tenHv = i.hocVien.hoTen,
                        tongTien = i.tongTien,
                        ngayMua = i.ngayThanhToan,
                    };
                    hds.Add(hd);
                }
                return hds;
            }
            return null;
        }

        public List<object> getHoaDonHocVien(string maHv)
        {
           var hoaDons = _dataContext.hoaDons.Where(t => t.maHv == maHv).ToList();
           if(hoaDons.Any())
            {
               var hds = new List<object>();
               foreach(var i in hoaDons)
                {
                    var hd = new
                    {
                        maHd = i.maHd,
                        tongTien = i.tongTien,
                        ngayMua = i.ngayThanhToan
                    };
                    hds.Add(hd);
                }
                return hds;
            }
            return null;
        }
    }
}
