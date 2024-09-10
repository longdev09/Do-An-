using Be_e_learning.DTO;
using Be_e_learning.Model;
using Be_e_learning.RadomKey;
using System;
using System.Linq;

namespace Be_e_learning.Services
{
    public interface IThongTinThanhToanService
    {

        public object getThongTinThanhToan(string maGv);

        public int createThongTinThanhToan(string maGv, ThongTinThanhToanDTO thongTinThanhToanDTO);
    }
    public class IThongTinThanhToan : IThongTinThanhToanService
    {
        private readonly DataContext _dataContex;
        public IThongTinThanhToan(DataContext dataContex)
        {
            _dataContex = dataContex;

        }

        public int createThongTinThanhToan(string maGv, ThongTinThanhToanDTO thongTinThanhToanDTO)
        {
            ThongTinThanhToan newTT = new ThongTinThanhToan();
            newTT.maGv = maGv;
            newTT.tenNganHang = thongTinThanhToanDTO.tenNganHang;
            newTT.stk = thongTinThanhToanDTO.stk;
            newTT.logoNganHang = thongTinThanhToanDTO.logoNganHang;
            newTT.nguoiThuHuong = thongTinThanhToanDTO.nguoiThuHuong;
            newTT.maTt = RandomKey.randomMa("TT");
            _dataContex.thongTinThanhToans.Add(newTT);
            return  _dataContex.SaveChanges();
      

        }

        public object getThongTinThanhToan(string maGv)
        {
           var tt =  _dataContex.thongTinThanhToans.Where(t => t.maGv == maGv).FirstOrDefault();
            if(tt == null)
            {
                return null;
            }    
            return new {tenNganHang = tt.tenNganHang, loGoNganHang = tt.logoNganHang, stk = tt.stk, nguoiThuHuong = tt.nguoiThuHuong  };
        }
    }
   
}
