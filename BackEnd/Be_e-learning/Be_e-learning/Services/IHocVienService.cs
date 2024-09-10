using Be_e_learning.DTO;
using Be_e_learning.Model;
using Be_e_learning.RadomKey;
using System.Linq;

namespace Be_e_learning.Services
{
    public interface IHocVienService
    {
        int createHocVien(string maNg, HocVienDTO hocVien);
        object getThongTienHocVien(string maHv);
        int updateHocVien(string maHv, HocVienDTO hocVienDTO);
        

    }
    public class HocViensService : IHocVienService
    {

        private readonly DataContext _dataContext;

        public HocViensService(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        // tao hoc vien
        public int createHocVien(string maNg, HocVienDTO hocVien)
        {
            HocVien hocVien1 = new HocVien();
            hocVien1.maHv = RandomKey.randomMa("HV");
            hocVien1.hoTen = hocVien.hoTen;
            hocVien1.email = hocVien.email;
            hocVien1.maNg = maNg;
            _dataContext.Add(hocVien1);
            int check = _dataContext.SaveChanges();
            return check;
        }

        public object getThongTienHocVien(string maHv)
        {
            var hv = _dataContext.hocViens.Where(t => t.maHv == maHv).FirstOrDefault();
            return hv;
        }

        public int updateHocVien(string maHv,   HocVienDTO hocVienDTO)
        {
            var hv = _dataContext.hocViens.Where(t => t.maHv == maHv).FirstOrDefault();
            if(hv != null)
            {
                hv.hoTen = hocVienDTO.hoTen;
                //hv.avata = avata;
                hv.email = hocVienDTO.email;
                hv.sdt = hocVienDTO.sdt;   
                return _dataContext.SaveChanges();
            }
            return 0;
        }
    }
}
