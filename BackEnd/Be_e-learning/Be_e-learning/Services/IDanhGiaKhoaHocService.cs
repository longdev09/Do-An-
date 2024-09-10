using Be_e_learning.DTO;
using Be_e_learning.Model;
using Be_e_learning.RadomKey;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;

namespace Be_e_learning.Services
{
    public interface IDanhGiaKhoaHocService
    {
        int createDanhGia(string maHv, DanhGiaKhoaHocDTO danhGiaKhoaHocDTO);
        object getDanhGiaGiangVien(string maGv);
    }
    public class DanhGiaKhoaHocService : IDanhGiaKhoaHocService
    {
        private readonly DataContext _dataContext;
        public DanhGiaKhoaHocService(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        public int createDanhGia(string maHv, DanhGiaKhoaHocDTO danhGiaKhoaHocDTO)
        {
            DanhGiaKhoaHoc newDg = new DanhGiaKhoaHoc();
            newDg.maDanhGia = RandomKey.randomMa("DG");
            newDg.maHv  = maHv;
            newDg.ngayDg = DateTime.Now;
            newDg.maKh = danhGiaKhoaHocDTO.maKh;
            newDg.noiDung = danhGiaKhoaHocDTO.noiDung;
            newDg.soSao = danhGiaKhoaHocDTO.soSao;
            _dataContext.danhGiaKhoaHocs.Add(newDg);
            int check = _dataContext.SaveChanges();
            return check;
        }

        public object getDanhGiaGiangVien(string maGv)
        {
            var danhGias = _dataContext.danhGiaKhoaHocs
                .Include(dg => dg.khoaHoc).Include(hv =>  hv.hocVien)
                .Where(dg => dg.khoaHoc.maGv == maGv)
                .Select(dg => new
                {
                    khoaHoc = dg.khoaHoc.tenKh,
                    danhGia = dg.noiDung,
                    soSao = dg.soSao,
                    ngayDanhGia = dg.ngayDg,
                    tenHocVien = dg.hocVien.hoTen
                })
                .ToList();
            return danhGias;
        }
    }

}
