using Be_e_learning.DTO;
using Be_e_learning.Model;
using Be_e_learning.RadomKey;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Be_e_learning.Services
{
    public interface ILichSuThanhToanService
    {
        public int createLichSuThanhToan(string maGv, LichSuThanhToanDTO lichSuThanhToanDTO);
        public int updateTrangThai(string maLs, LichSuThanhToanDTO lichSuThanhToanDTO);

        public List<LichSuThanhToan> getAllLichSuThanhToan(string maGv);
        public List<object> getAllLichSuThanhToanAdmin(string trangThai);

    }
    public class ILichSuThanhToan : ILichSuThanhToanService
    {
        public readonly DataContext _dataContext;
        public ILichSuThanhToan(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        public int createLichSuThanhToan(string maGv, LichSuThanhToanDTO lichSuThanhToanDTO)
        {
            LichSuThanhToan newLs = new LichSuThanhToan();
            newLs.maLs = RandomKey.randomMa("LS");
            newLs.donGiaRut = lichSuThanhToanDTO.donGiaRut;
            newLs.trangThai = "Đang chờ xử lý";
            newLs.ngayRut = DateTime.Now;
            newLs.maGv = maGv;

            // tru loi nhuan con lai
            var ln = _dataContext.loiNhuanGiangViens.Where(t => t.maGv == maGv).FirstOrDefault();
            ln.tongLoiNhuan = ln.tongLoiNhuan - lichSuThanhToanDTO.donGiaRut;

            ///
            _dataContext.lichSuThanhToans.Add(newLs);
            return _dataContext.SaveChanges();
            
            
        }

        public List<LichSuThanhToan> getAllLichSuThanhToan(string maGv)
        {
            var ds = _dataContext.lichSuThanhToans.Where(t => t.maGv == maGv).ToList();

            return ds;

        }

        public List<object> getAllLichSuThanhToanAdmin(string trangThai)
        {
            var ds = _dataContext.lichSuThanhToans.Include(t =>t.giangViens).Where(t => true).Select(t => new
            {
                maLs = t.maLs,
                donGiaRut = t.donGiaRut,
                ngayRut = t.ngayRut,
                ngayThanhToan = t.ngayThanhToan,
                trangThai = t.trangThai,
                maGv = t.maGv,
                tenGv = t.giangViens.tenGv
            }).ToList();

            return ds.Cast<object>().ToList();
        }

        //cap nhat trang thai
        public int updateTrangThai(string mals, LichSuThanhToanDTO lichSuThanhToanDTO)
        {
            var ls = _dataContext.lichSuThanhToans.Where(t => t.maLs == mals).FirstOrDefault();

            ls.trangThai = lichSuThanhToanDTO.trangThai;
            return _dataContext.SaveChanges();

        }
    }
}
