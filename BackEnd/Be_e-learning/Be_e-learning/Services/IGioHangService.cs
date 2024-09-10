using Be_e_learning.DTO;
using Be_e_learning.Model;
using Be_e_learning.RadomKey;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;

namespace Be_e_learning.Services
{
    public interface IGioHangService
    {
        int createGioHang(string maHv, string maKh);
        int deleteGioHang(string maHv, string maKh);
        int deleteGioHangMua(string maHv, string maHd);
        List<object> getAllGioHangHv(string maHv);
    }
    public class GioHangService : IGioHangService
    {
        private readonly DataContext _dataContext;
        public GioHangService(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        public int createGioHang(string maHv, string maKh)
        {
            var check = 0;

            // lay xem co gio hang chua
            var checkGio = _dataContext.gioHangs.Where(t => t.maHv == maHv).FirstOrDefault();
            if (checkGio == null)
            {
                // tao gio hang moi
                GioHang newGioHang = new GioHang(); 
                newGioHang.maGh = RandomKey.randomMa("GH");
                newGioHang.maHv = maHv;
                newGioHang.tongTien = 0;
                _dataContext.gioHangs.Add(newGioHang);
                _dataContext.SaveChanges();
                bool checkCt = themCtGioHang(newGioHang.maGh, maKh, maHv);
                if (checkCt)
                {
                    return check = 1;
                }    
            }
            else
            {
                var checkg = _dataContext.gioHangs.Where(t => t.maHv == maHv).FirstOrDefault();
                bool checkCt = themCtGioHang(checkg.maGh, maKh, maHv);
                if (!checkCt)
                {
                    return check = -1; // san pham da co trong gio hang
                }
            }
            return check = 1;
        }


        
        public int deleteGioHang(string maHv, string maKh)
        {
            var gioHang = _dataContext.gioHangs.Where(t => t.maHv == maHv).FirstOrDefault();
            if(gioHang == null)
            {
                return 0;
            }
            var spChiTiet = _dataContext.chiTietGioHangs.Where(t => t.maGh == gioHang.maGh && t.maKh == maKh).FirstOrDefault();
            if(spChiTiet != null)
            {
                _dataContext.chiTietGioHangs.Remove(spChiTiet);
                int check = _dataContext.SaveChanges();
                return check;
            }
            return 0;
        }

        public int deleteGioHangMua(string maHv, string maHd)
        {
            var gioHang = _dataContext.gioHangs.Where(t => t.maHv == maHv).FirstOrDefault();
            if (gioHang == null)
            {
                return 0;
            }
            var ctHd = _dataContext.chiTietHoaDons.Where(t => t.maHd == maHd).ToList();
            if(ctHd.Count > 0)
            {
                foreach( var t in ctHd)
                {
                    var spChiTiet = _dataContext.chiTietGioHangs.Where(t => t.maGh == gioHang.maGh && t.maKh == t.maKh).FirstOrDefault();
                    _dataContext.chiTietGioHangs.Remove(spChiTiet);
                    int check = _dataContext.SaveChanges();
                    return check;
                }
            }
            return 0;


        }

        public List<object> getAllGioHangHv(string maHv)
        {
            var gioHangs = _dataContext.gioHangs.Where(t => t.maHv == maHv).FirstOrDefault();
            var dsKhoaHoc = new List<object>();
            if (gioHangs != null)
            {
                var ctghs = _dataContext.chiTietGioHangs.Where(t => t.maGh == gioHangs.maGh).ToList();
                if (ctghs != null)
                {
                    foreach (var ct in ctghs)
                    {
                        var kh = _dataContext.khoaHocs
                                  .Include(k => k.giangVien)  // Bao gồm thông tin giảng viên
                                  .Include(k => k.chuongKhoaHocs)  // Bao gồm thông tin chương khóa học
                                  .ThenInclude(c => c.noiDungs)  // Bao gồm thông tin nội dung chương
                                  .FirstOrDefault(t => t.maKh == ct.maKh);
                        // Lấy tên giảng viên từ khóa học
                        var tenGv = kh.giangVien?.tenGv;

                        // Tính tổng chương và tổng bài giảng
                        var tongChuong = kh.chuongKhoaHocs.Count();
                        var tongBaiGiang = kh.chuongKhoaHocs.Sum(c => c.noiDungs.Count());
                        var khoaHoc = new
                        {
                            ctGh = gioHangs.maGh,
                            maKh = kh.maKh,
                            hinh = kh.hinh,
                            tenKh = kh.tenKh,
                            gia = ct.donGia, // gia khi mua
                            giaGiam = kh.gia, // gia mac dinh cua kh
                            tenGv = tenGv,
                            tongChuong = tongChuong,
                            tongBaiGiang = tongBaiGiang
                        };
                        dsKhoaHoc.Add(khoaHoc);
                    }
                }
            }
            return dsKhoaHoc;
        }
        
        private bool themCtGioHang(string maGh, string maKh, string maHv)
        {

            var checkKhDaThem = _dataContext.chiTietGioHangs.Any(t => t.maKh == maKh);
            var checkDaMua = _dataContext.khoaHocDaMuas.Any(t => t.maKh == maKh && t.maHv == maHv);
            var kh = _dataContext.khoaHocs.Where(t => t.maKh == maKh).FirstOrDefault();


            // neu san pham da dc them vao gio
            if (checkKhDaThem || checkDaMua)
            { 
                return false;
            }
            //if (kh.GiaDaGiam != null)
            //{
            //    donGia = kh.GiaDaGiam;
            //}
            ChiTietGioHang newCt = new ChiTietGioHang();
            newCt.maGh = maGh;
            newCt.maKh = maKh;
            newCt.donGia = kh.gia;
            _dataContext.chiTietGioHangs.Add(newCt);
            var ktr = _dataContext.SaveChanges();
            if (ktr > 0)
            {
                return true;
            }
            return false;

        }
    }
}
