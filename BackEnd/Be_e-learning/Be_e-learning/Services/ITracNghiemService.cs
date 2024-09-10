using Be_e_learning.DTO;
using Be_e_learning.Model;
using Be_e_learning.RadomKey;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;

namespace Be_e_learning.Services
{
    public interface ITracNghiemService
    {
        int createTracNghiem(TracNghiemDTO tracNghiemDTO);
        object getTracNghiem(string maNd);

    }
    public class TracNghiemService : ITracNghiemService
    {

        private readonly DataContext _dataContext;
        public TracNghiemService (DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public int createTracNghiem(TracNghiemDTO tracNghiemDTO)
        {
            // tao cau hoi trac nghiem
            TracNghiem tracNghiem = new TracNghiem();
            tracNghiem.maTrn = RandomKey.randomMa("TRN");
            tracNghiem.maNd = tracNghiemDTO.maNd;
            tracNghiem.tenCauHoi = tracNghiemDTO.tenCauHoi;
            tracNghiem.dapAnDung = tracNghiemDTO.dapAnDung;
            _dataContext.tracNghiems.Add(tracNghiem);

            // tao dap an trac nghiem
            int i = 0;
            foreach (var item in tracNghiemDTO.dsDapAn)
            { 
                DapAn dapAn = new DapAn();
                dapAn.maTrn = tracNghiem.maTrn;
                dapAn.maDa =  RandomKey.randomMa("DA");
                dapAn.tenDa = item.tenDa;
                dapAn.sttDn = i;
                dapAn.giaiThich = item.giaiThich;
                _dataContext.dapAns.Add(dapAn);
                i += 1;
            }
            int check = _dataContext.SaveChanges();
            return check;

        }

        public object getTracNghiem(string maNd)
        {
            var tracNghiem = _dataContext.tracNghiems.Where(t => t.maNd == maNd).FirstOrDefault();
            return tracNghiem;
        }
    }
}
