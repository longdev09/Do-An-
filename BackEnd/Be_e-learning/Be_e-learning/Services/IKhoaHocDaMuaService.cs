using Be_e_learning.Model;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Net;

namespace Be_e_learning.Services
{
    public interface IKhoaHocDaMuaService
    {
        int createKhoaHocDaMua(string maHd, string maHv);
        List<object> getKhoaHocDaMua(string maHv);
        int? getTienDoHocTap(string maHv, string maKh);
        public int updateTienDoKhoaHoc(string maHv, string maKh, int tienDo);

       
    }
    public class KhoaHocDaMuaService : IKhoaHocDaMuaService
    {
        private readonly DataContext _dataContext;
        public KhoaHocDaMuaService(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        public int createKhoaHocDaMua(string maHd, string maHv)
        {
           
            var cthd = _dataContext.chiTietHoaDons.Where(t => t.maHd == maHd).ToList();
            foreach(var ct in cthd)
            {
                KhoaHocDaMua newKh = new KhoaHocDaMua();
                newKh.maKh = ct.maKh;
                newKh.maHv = maHv;
                newKh.tienTrinh = 1;
                _dataContext.khoaHocDaMuas.Add(newKh);
                _dataContext.SaveChanges();
            }
            return 1;
        }
        

        // lay ds cac khoa hoc da mua chua hoan thanh
        public List<object> getKhoaHocDaMua(string maHv)
        {
           // lay ds cac khoa hoc ma hoc vien da mua
           var dsKhDaMua = _dataContext.khoaHocDaMuas.Where(t => t.maHv == maHv).ToList();
            List<object> dsKh = new List<object>();
           foreach(var  ds in dsKhDaMua)
           {
                var ttKh = _dataContext.khoaHocs.Include(k => k.giangVien).Where(t => t.maKh == ds.maKh).FirstOrDefault();
                var dsChuong = _dataContext.chuongKhoaHocs.Where(t => t.maKh == ds.maKh).ToList();
                int dem = 0;
                foreach(var ttChuong in dsChuong)
                {
                    var nd = _dataContext.noiDungs.Where(t => t.maCh == ttChuong.maCh).ToList();
                    dem += nd.Count;
                }
                var k = new
                {
                    maKh = ds.maKh,
                    tenKh = ttKh.tenKh,
                    hinh = ttKh.hinh,
                    tenGv = ttKh.giangVien.tenGv,
                    tienTrinh = ds.tienTrinh,
                    tongChuong = ttKh.chuongKhoaHocs.Count(),
                    tongBaiGiang = dem,
                };
                dsKh.Add(k);

           }
            return dsKh;
        }


        // lay tien do hoc cua khoa hoc
        public int? getTienDoHocTap(string maHv, string maKh)
        {
         
            int? tienDo = _dataContext.khoaHocDaMuas.Where(t => t.maKh == maKh && t.maHv == maHv).Select(t => t.tienTrinh).FirstOrDefault();
            return tienDo;

        }

        public int updateTienDoKhoaHoc(string maHv, string maKh, int tienDo)
        {
            var khDaMua = _dataContext.khoaHocDaMuas.Where(t => t.maKh == maKh && t.maHv == maHv).FirstOrDefault();
            khDaMua.tienTrinh = tienDo;
            int i = _dataContext.SaveChanges();
            return i;
        }

       

        
    }
}
