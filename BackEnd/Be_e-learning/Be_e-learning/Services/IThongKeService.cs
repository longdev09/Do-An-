using Be_e_learning.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Be_e_learning.Services
{
    public interface IThongKeService
    {
        // thong ke theo giang vien
        //*****************************

        // thong ke thong thu nhap ban dc
        object tongThuNhapGiangVien(string maGv, DateTime ngayBd, DateTime ngayKt);
        object tongThuNhapGiangVienAll(string maGv);
        object tongLoiNhuanGiangVienAll(string maGv);
        object tongBaiGiang(string maGv, DateTime ngayBd, DateTime ngayKt);
        List<object> thongKeLoiNhuan(string maGv, DateTime ngayBd, DateTime ngayKt);
        





        //**********************************

    }
    public class ThongKeService : IThongKeService
    {
        private readonly DataContext _dataContext;
        public ThongKeService (DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public List<object> thongKeLoiNhuan(string maGv, DateTime ngayBd, DateTime ngayKt)
        {

            var purchases = _dataContext.hoaDonBanKhs
               .Where(p => p.maGv == maGv && p.ngayMua >= ngayBd && p.ngayMua <= ngayKt)
               .AsEnumerable()  // Chuyển đổi sang IEnumerable để xử lý phía client
               .GroupBy(p => p.maKh)
               .ToList();




            List<object> result = new List<object>();
            foreach (var group in purchases)
            {
                // Lấy thông tin tên khách hàng
                var tenKh = _dataContext.khoaHocs
                    .Where(t => t.maKh == group.Key)
                    .Select(t => t.tenKh)
                    .FirstOrDefault();

                // Tạo đối tượng kết quả cho khách hàng này
                var kh = new
                {
                    MaKh = group.Key,
                    TenKh = tenKh,
                    TongDonGia = group.Sum(p => p.donGia),
                    TongLoiNhuanThuDc = group.Sum(p => p.loiNhuanThuDc)
                };

                // Thêm vào danh sách kết quả
                result.Add(kh);
            }
            return result;
        }


           
        
        

        public object tongBaiGiang(string maGv, DateTime ngayBd, DateTime ngayKt)
        {
            var dsKh = _dataContext.khoaHocs.Where(t => t.maGv == maGv && t.ngayTao >= ngayBd && t.ngayTao <= ngayKt).ToList();
            if(dsKh.Count > 0)
            {
                return new { tongBaiGiang = dsKh.Count };
            }
            return new { tongBaiGiang = 0 };
        }

        public object tongLoiNhuanGiangVienAll(string maGv)
        {
            var tongLoiNhuan = _dataContext.loiNhuanGiangViens.Where(t => t.maGv == maGv).Select(t => t.tongLoiNhuan).FirstOrDefault();
            return new { tongLoiNhuan = tongLoiNhuan.ToString() };
        }

        public object tongThuNhapGiangVien(string maGv, DateTime ngayBd, DateTime ngayKt)
        {
            // lay ra danh sach khoa hoc cua giang vien
            var hdMuaKh = _dataContext.hoaDonBanKhs
                    .Where(t => t.maGv == maGv && t.ngayMua >= ngayBd && t.ngayMua <= ngayKt)
                    .ToList();
            float? tongTien = 0; // Initialize as non-nullable float

            foreach (var i in hdMuaKh)
            {
                tongTien += i.donGia;
            }

            return new { tongTien = tongTien.ToString() };
        }

        public object tongThuNhapGiangVienAll(string maGv)
        {
            // lay ra danh sach khoa hoc cua giang vien
            var hdMuaKh = _dataContext.hoaDonBanKhs
                    .Where(t => t.maGv == maGv )
                    .ToList();
            float? tongTien = 0; // Initialize as non-nullable float

            foreach (var i in hdMuaKh)
            {
                tongTien += i.donGia;
            }

            return new { tongTien = tongTien.ToString() };
        }
    }
}
