using Be_e_learning.DTO;
using Be_e_learning.Model;
using System.Linq;

namespace Be_e_learning.Services
{
    public interface IChiTietGiamGiaService
    {
        int createChiTietGiamGia(float tongTien, ChiTietGiamGiaDTO chiTietGiamGiaDTO);
        int deleteChiTietGiamGia(string maKh);

    }
    public class ChiTietGiamGiaService : IChiTietGiamGiaService
    {
        private readonly DataContext _dataContext;
        public ChiTietGiamGiaService(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        // tao chi tiet giam gia
        public int createChiTietGiamGia(float tongTien, ChiTietGiamGiaDTO chiTietGiamGiaDTO)
        {
            // cap nhat giaGiam trong khoa hoc
            var kh = _dataContext.khoaHocs.Where(t => t.maKh == chiTietGiamGiaDTO.maKh).FirstOrDefault();
            kh.giaGiam = tongTien;
            _dataContext.SaveChanges();

            ChiTietGiamGia newChiTietGiamGia = new ChiTietGiamGia();
            newChiTietGiamGia.maGg = chiTietGiamGiaDTO.maGg;
            newChiTietGiamGia.maKh = chiTietGiamGiaDTO.maKh;
            newChiTietGiamGia.ngayBatDau = chiTietGiamGiaDTO.ngayBatDau;
            newChiTietGiamGia.ngayKetThuc = chiTietGiamGiaDTO.ngayKetThuc;
            _dataContext.chiTietGiamGias.Add(newChiTietGiamGia);
            int check = _dataContext.SaveChanges();
            return check;
            
        }

        public int deleteChiTietGiamGia(string maKh)
        {
            int check = 0;
            var ct = _dataContext.chiTietGiamGias.Where(t => t.maKh == maKh).FirstOrDefault();
            var kh = _dataContext.khoaHocs.Where(t => t.maKh == maKh).FirstOrDefault();
            if (ct != null)
            {
               kh.giaGiam = 0;
 
               _dataContext.chiTietGiamGias.Remove(ct);
               
               return check = _dataContext.SaveChanges();
            }
            return check;
        }
    }

}
