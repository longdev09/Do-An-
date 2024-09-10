using System;
using Be_e_learning.Model;
using Be_e_learning.DTO;
using Be_e_learning.RadomKey;
using Be_e_learning.FireBase;
using System.Threading.Tasks;
using Be_e_learning.Migrations;
using System.Linq;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
namespace Be_e_learning.Services
{
    public interface IGiangVienService
    {

        GiangVien createGiangVien(GiangVienDTO giangVienDTO, string maGv, string ulrAvata, string ulrMatTrc, string ulrMatSau, string maNg);
        GiangVien getGiangVien(string maGv);
        List<object> getDsGiangVienAdminChuaDuyet();
        List<object> getDsGiangVienAdminDaDuyet();
        int updateMaNgGiangVien (string maGv, string maNg);
        GiangVien getGiangVienAdmin(string tenDn);
    }
    public class GiangVienService : IGiangVienService
    {
        private readonly DataContext _dataContext;
        public GiangVienService(DataContext dataContext) 
        { 
            _dataContext = dataContext;
        }

        public  GiangVien createGiangVien(GiangVienDTO giangVienDTO, string maGv ,string ulrAvata, string ulrMatTrc, string ulrMatSau, string maNg)
        {

            GiangVien giangVien = new GiangVien();
            giangVien.maGv = maGv;
            giangVien.tenGv = giangVienDTO.tenGv;
            giangVien.ngaySinh = giangVienDTO.ngaySinh;
            giangVien.phai = giangVienDTO.phai;
            giangVien.sdt = giangVienDTO.sdt;
            giangVien.email = giangVienDTO.email;
            giangVien.linhVuc = giangVienDTO.linhVuc;
            giangVien.avata = ulrAvata;
            giangVien.matTruocCccd = ulrMatTrc;
            giangVien.matSauCccd = ulrMatSau;
            giangVien.maNg = maNg;
            _dataContext.giangViens.Add(giangVien);
            _dataContext.SaveChanges();

            return giangVien;
        }

        public List<object> getDsGiangVienAdminChuaDuyet()
        {
            var dsGv = _dataContext.giangViens.Include(t => t.nguoiDung).Where(t => t.nguoiDung.trangThai == "Chờ duyệt").ToList();
            if(dsGv.Any())
            {
                var dsGvS = new List<object>();
                foreach(var i in dsGv)
                {
                    var gv = new
                    {
                        maNg = i.nguoiDung.maNg,
                        maGv = i.maGv,
                        tenGv = i.tenGv,
                        ngaySinh = i.ngaySinh,
                        sdt = i.sdt,
                        linhVuc = i.linhVuc,
                        trangThai = i.nguoiDung.trangThai,
                        macTrc = i.matTruocCccd,
                        macSau = i.matSauCccd,
                        anh = i.avata,

                    };
                    dsGvS.Add(gv);
                }
                return dsGvS;
            }  
            return null;
        }




        public List<object> getDsGiangVienAdminDaDuyet()
        {
            var dsGv = _dataContext.giangViens.Include(t => t.nguoiDung).Where(t => t.nguoiDung.trangThai == "Đã duyệt" || t.nguoiDung.trangThai == "Khóa tài khoản").ToList();
            if (dsGv.Any())
            {
                var dsGvS = new List<object>();
                foreach (var i in dsGv)
                {
                    var gv = new
                    {
                        maNg = i.nguoiDung.maNg,
                        maGv = i.maGv,
                        tenGv = i.tenGv,
                        ngaySinh = i.ngaySinh,
                        sdt = i.sdt,
                        linhVuc = i.linhVuc,
                        trangThai = i.nguoiDung.trangThai,
                        macTrc = i.matTruocCccd,
                        macSau = i.matSauCccd,
                        anh = i.avata,

                    };
                    dsGvS.Add(gv);
                }
                return dsGvS;
            }
            return null;
        }

        // lay thong tin giang vien, hien thi len trang quan ly cua giang vien va admin
        public GiangVien getGiangVien(string maGv)
        {
            var giangVien = _dataContext.giangViens.Where(t=> t.maGv == maGv).FirstOrDefault();
            return giangVien;
        }


        public GiangVien getGiangVienAdmin(string tenDn)
        {
            var giangVien = _dataContext.giangViens.Where(t => t.email == tenDn).FirstOrDefault();
            return giangVien;
        }

        // cap nhat maNg vao thong tin gv, khi dang ky duoc duyet
        public int updateMaNgGiangVien(string maGv, string maNg)
        {
            var gv = _dataContext.giangViens.Where(t => t.maGv == maGv).FirstOrDefault();
            if (gv != null)
            {
                gv.maNg = maNg;
            }
            return _dataContext.SaveChanges();
        }
    }
}
