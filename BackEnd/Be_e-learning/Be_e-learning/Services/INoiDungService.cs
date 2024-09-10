using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Be_e_learning.Model;
using Be_e_learning.DTO;
using Be_e_learning.RadomKey;
using Microsoft.EntityFrameworkCore;
namespace Be_e_learning.Services
{
    public interface INoiDungService
    {
        List<NoiDung> getAllNoiDung();
        List<NoiDung> getNoiDungByChuong(string maCh);
        NoiDung createNoiDung(string maKh, NoiDungDTO noiDungDTO);


    }
    public class NoiDungService : INoiDungService
    {
        public readonly DataContext _dataContext;
        
        public NoiDungService (DataContext dataContext)
        {
            _dataContext = dataContext;
        }


        public NoiDung createNoiDung(string maKh, NoiDungDTO noiDungDTO)
        {
            // lay ra 1 chuong
            var dsChuong = _dataContext.chuongKhoaHocs.Where(t => t.maKh == maKh).Include(t => t.noiDungs).ToList();
            // sap xep lai theo stt
            dsChuong = dsChuong.OrderBy(t =>t.stt).ToList();

            NoiDung newNd = new NoiDung();
            if (dsChuong.Count <= 1)
            {
                var dsNoiDung = _dataContext.noiDungs.Where(t => t.maCh == noiDungDTO.maCh).ToList();
                
                newNd.maNd = RandomKey.randomMa("ND");
                newNd.tieuDe = noiDungDTO.tieuDe;
                newNd.moTa = noiDungDTO.moTa;
                newNd.stt = dsNoiDung.Count + 1;
                newNd.maCh = noiDungDTO.maCh;
                newNd.maLoaiNd = noiDungDTO.maLoaiNd;
                _dataContext.noiDungs.Add(newNd);
                _dataContext.SaveChanges();
                return newNd;
            }

            if(dsChuong.Count >= 1)
            {
                // lay ra xem la chuong bao nhieu
                int sttChuong = _dataContext.chuongKhoaHocs.Where(t => t.maCh == noiDungDTO.maCh).Select(t => t.stt).FirstOrDefault();

                for(int i = sttChuong - 1; i >= 0; i --)
                {
                    // if ma cai ch
                    if (dsChuong[i].noiDungs.Count == 0)
                    {
                        continue;
                    }
                    else
                    {
                        // neu chuong ke sau khac null
                        var a = dsChuong[i].maCh;

                        var nd = _dataContext.noiDungs.Where(t => t.maCh == a).ToList();
                        nd = nd.OrderBy(t => t.stt).ToList();
                        newNd.maNd = RandomKey.randomMa("ND");
                        newNd.tieuDe = noiDungDTO.tieuDe;
                        newNd.moTa = noiDungDTO.moTa;
                        newNd.stt = nd[nd.Count - 1].stt + 1; // lan phan tu cuoi nd chuong do cong them 1
                        newNd.maCh = noiDungDTO.maCh;
                        newNd.maLoaiNd = noiDungDTO.maLoaiNd;
                        _dataContext.noiDungs.Add(newNd);
                        _dataContext.SaveChanges();
                        int setStt = newNd.stt;
                        for (int z = sttChuong; z <= dsChuong.Count - 1; z++)
                        {
                            
                            if (dsChuong[z].noiDungs.Count > 0)
                            {
                                var ndz = _dataContext.noiDungs.Where(t => t.maCh == dsChuong[z].maCh).ToList();
                            
                                foreach (var y in ndz)
                                {
                                    y.stt = setStt + 1;
                                    setStt = y.stt;
                                    _dataContext.SaveChanges();
                                }    
                            }
                        }
                        break;
                        
                            
                                             
                    }
                    

                }

                   
            }
            //if(dsChuong.Count >= 1)
            //{
            //    //2 chuong tro len
            //    //1 - 2
                
            //    for(int )




            //    var dsNoiDung = _dataContext.noiDungs.Where(t => t.maCh == noiDungDTO.maCh).ToList();
            //    newNd.maNd = RandomKey.randomMa("ND");
            //    newNd.tieuDe = noiDungDTO.tieuDe;
            //    newNd.moTa = noiDungDTO.moTa;
            //    newNd.stt = dsNoiDung.Count + 1;
            //    newNd.maCh = noiDungDTO.maCh;
            //    newNd.maLoaiNd = noiDungDTO.maLoaiNd;
            //    _dataContext.noiDungs.Add(newNd);
            //    _dataContext.SaveChanges();
            //    return newNd;
            //}    
            return newNd;
        }

        public List<NoiDung> getAllNoiDung()
        {
            throw new NotImplementedException();
        }

        public List<NoiDung> getNoiDungByChuong(string maCh)
        {
            var dsNoiDung = _dataContext.noiDungs.Where(t => t.maCh == maCh).ToList();
            return dsNoiDung;
            
        }

        
    }
}
