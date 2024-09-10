using System;
using Be_e_learning.Model;
using Be_e_learning.DTO;
using Be_e_learning.RadomKey;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace Be_e_learning.Services
{
    public interface INguoiDungService
    {
        Task<NguoiDung> taoTaiKhoanNguoiDung(string tenDn, string matKhau, string vaiTro, string trangThai);
        //NguoiDung loginGiangVien(string username, string password);
        string updateTrangThaiNguoiDungGiangVien(string maNg, string trangThai);
        int updateMatKhauNguoiDung(string maKhau, string email);


    }
    public class NguoiDungService : INguoiDungService 
    {

        private readonly DataContext _dataContext;
        
        public NguoiDungService(DataContext dataContext) 
        { 
            _dataContext = dataContext; 
        }

        // tao tai khoan nguoi dung  cho hoc vien va giang vien
        public async Task<NguoiDung> taoTaiKhoanNguoiDung(string tenDn, string matKhau, string vaiTro, string trangThai)
        {
            NguoiDung nguoiDung = new NguoiDung();
            var res = _dataContext.nguoiDungs.Where(t => t.tenDn == tenDn).FirstOrDefault();
            if(res != null)
            {
                return null;
            }
      
            nguoiDung.maNg = RandomKey.randomMa("NG");
            nguoiDung.tenDn = tenDn;
            nguoiDung.matKhau = matKhau;
            nguoiDung.maVt = vaiTro;
            nguoiDung.trangThai = trangThai;
           
            _dataContext.nguoiDungs.Add(nguoiDung);
            await _dataContext.SaveChangesAsync(); 
            return nguoiDung;
        }

        public int updateMatKhauNguoiDung(string maKhau, string email)
        {
            var ng = _dataContext.nguoiDungs.Where(t => t.tenDn == email).FirstOrDefault();
            ng.matKhau = maKhau;
            return _dataContext.SaveChanges();

        }

        public string updateTrangThaiNguoiDungGiangVien(string maNg, string trangThai)
        {
            var ngDung = _dataContext.nguoiDungs.Where(t => t.maNg == maNg).FirstOrDefault(); 

            if(ngDung != null)
            {
                 ngDung.trangThai = trangThai;
                _dataContext.SaveChanges();
            }
            return ngDung.tenDn;
        }

    }


}
