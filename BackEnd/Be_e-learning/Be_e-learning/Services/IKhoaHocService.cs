using Be_e_learning.Model;
using System.Collections.Generic;
using Be_e_learning.RadomKey;
using System.Linq;
using System.Threading.Tasks;
using Be_e_learning.FireBase;
using System;
using Be_e_learning.DTO;
using Microsoft.EntityFrameworkCore;
namespace Be_e_learning.Services
{
    public interface  IKhoaHocService
    {

        List<object> getAllKhoaHoc(string trangThai);
        List<object> getKhoaHocByGv(string maGv);
        object getKhoaHocGv(string maKh);
        object getRandDomDsKhoaHoc();
        object getDsKhoaHocDanhGiaCao();

        object getDetailKhoaHoc(string maKh);
        object getLearningKhoaHoc(string maKh, string maHv);
        string createKhoaHoc(KhoaHoc khoaHoc);

        Task<int> updateKhoaHoc(string maGv, KhoaHocDTO khoaHocDTO);
        int updateGiaKhoaHoc(KhoaHocDTO khoaHocDTO);
        int updateTrangThaiKhoaHoc(string maKh, string trangThai);
        void deleteKhoaHoc(string id);


        ///

        object getDsKhoaHocTheoDanhMuc(string maDanhMuc);


    }

    public class KhoaHocService: IKhoaHocService
    {

        private readonly DataContext _dataContext;

        public KhoaHocService(DataContext dataContext) {

            _dataContext = dataContext;
        }

        // lay thong tinh khoa hoc cho trang sua khoa hoc
        public object getKhoaHocGv(string maKh)
        {
            var res = _dataContext.khoaHocs.Where(t => t.maKh == maKh).FirstOrDefault();
            if (res != null)
            {
                var khoaHoc = new
                {
                    tenKh = res.tenKh,
                    maDm = res.maDm,
                    hinh = res.hinh,
                    ketQuaDatDuoc = res.ketQuaDatDuoc,
                    gioiThieu = res.gioiThieu
                };
                return khoaHoc;
            }
           
            return null;
        }

        // lay ds danh khoa hoc theo ma gv
        public List<object> getKhoaHocByGv(string maGv)
        {
            var khoaHocs =  _dataContext.khoaHocs.Where(t => t.maGv == maGv).ToList();
            var dskhGv = new List<object>();
            if (khoaHocs != null)
            {
                foreach (var item in khoaHocs)
                {
                    var kh = new
                    {
                        maKh = item.maKh,
                        tenDm = _dataContext.danhMucs.Where(t => t.maDm == item.maDm).Select(t => t.tenDm).FirstOrDefault(),
                        tenKh = item.tenKh,
                        gia = item.gia,
                        hinh = item.hinh,
                        trangThai = item.trangThai,
                        giaGiam = item.giaGiam,
                        

                    };
                    dskhGv.Add(kh);
                }
                return dskhGv;
            }
            return dskhGv;

        }



        // lay ngau nhien cac khoa hoc
        public object getRandDomDsKhoaHoc()
        {

            // lay ra 5 khoa hoc ngau nhien
            var res = _dataContext.khoaHocs.Where(t=> t.trangThai == "Đang bán").OrderBy(c => Guid.NewGuid()).Take(5).ToList();
            if (res != null)
            {
                List<object> list = new List<object>();
                foreach (var kh in res)
                {
                    int? tong = 0;
                    var danhGiaKh = _dataContext.danhGiaKhoaHocs.Where(t => t.maKh == kh.maKh).ToList();
                    foreach(var i in danhGiaKh)
                    {
                        tong += i.soSao;
                    }
                    var khoaHoc = new
                    {
                        maKh = kh.maKh,
                        tenKh = kh.tenKh,
                        hinh = kh.hinh,
                        gia = kh.gia,
                        trungBinhDanhGia = tong == 0 ? 0 : tong / danhGiaKh.Count,
                        tongDanhGia = danhGiaKh.Count,
                        tenGv = _dataContext.giangViens.Where(t => t.maGv == kh.maGv).Select(t => t.tenGv).FirstOrDefault(),
                        giaGiam = 0,
                        gioiThieu = kh.gioiThieu,
                        ketQuaDatDuoc = kh.ketQuaDatDuoc,
                    };
                    list.Add(khoaHoc);

                }
                return list;
            }
            return null;
        }


        // lay chi tiet tiet khoa hoc

        public object getDetailKhoaHoc(string maKh)
        {
    

            var khoaHoc = _dataContext.khoaHocs
            .Where(t => t.maKh == maKh)
            .Select(t => new
            {
                maKh = t.maKh,
                tenGV = t.giangVien.tenGv,
                hinhGV = t.giangVien.avata,
                maDM = t.maDm,
                gia = t.gia,
                //giaDaGiam = t.GiaDaGiam,
                gioiThieu = t.gioiThieu,
                kqdd = t.ketQuaDatDuoc,
                hinh = t.hinh,
                tenKh = t.tenKh,
                //tongSao = trungBinhSao,
                dsChuong = t.chuongKhoaHocs.Select(
                                r => new
                                {
                                    tenChuong = r.tenChuong,
                                    stt = r.stt,
                                    maChuong = r.maCh,
                                    noiDungChuongs = r.noiDungs.Select(
                                        e => new
                                        {
                                            tenNoiDung = e.tieuDe,
                                            maNoiDung = e.maNd,
                                            moTa = e.moTa,
                                            stt = e.stt,
                                            //video = e.Video
                                        }).ToList()
                                }).ToList()
            }).FirstOrDefault();
            return khoaHoc;
        }

        // tra va ma khoa hoc
        public string createKhoaHoc(KhoaHoc khoaHoc)
            {
                /* 
                 Ten Khoa hoc
                 Ma Danh Muc
                 Gioi Thieu Khoa Hoc
                 Ket Qua Dat Duoc
                 Hinh kieu base 64
                 */
                if (khoaHoc == null)
                { 
                   throw new System.NotImplementedException();
                }          
         
                _dataContext.khoaHocs.Add(khoaHoc);
                int check = _dataContext.SaveChanges();
                if(check == 0)
                {

                }
                return khoaHoc.maKh;
            }


        // chi cho xoa ban nhap va cho duyet
        public void deleteKhoaHoc(string maKh)
        {
            var res = _dataContext.khoaHocs.Where(t => t.maKh == maKh).FirstOrDefault();
            if (res != null)
            {
                if (res.trangThai == "Bản nháp" || res.trangThai == "Chờ duyệt")
                {

                }
            }
        }


        // cap nhat khoa hoc
        public async Task <int>updateKhoaHoc(string maGv, KhoaHocDTO khoaHocDTO)
        {
          var kh =  _dataContext.khoaHocs.Where(t => t.maKh == khoaHocDTO.maKh).FirstOrDefault();
            string ulrImg = null;
            if (khoaHocDTO.hinh != null)
            {
                UploadFireBase uploadFireBase = new UploadFireBase();
                // them anh khoa hoc vao fire base
                string folderName = maGv + "/" + kh.maKh + "/avata-kh";
                ulrImg  = await UploadFireBase.upLoadImg_Storage(khoaHocDTO.hinh, folderName, kh.maKh);
            }
           

            if (kh != null)
           {
                    kh.tenKh = khoaHocDTO.tenKh;
                    kh.maDm = khoaHocDTO.maDm;
                    kh.gioiThieu = khoaHocDTO.gioiThieu;
                    kh.ketQuaDatDuoc = khoaHocDTO.ketQuaDatDuoc;
                    if (ulrImg != null)
                    {
                        kh.hinh = ulrImg;
                    }
                   


           }
                int check = _dataContext.SaveChanges();
                return check;
            
          
         
        }

        // cap nhat khoa hoc
        public int updateGiaKhoaHoc(KhoaHocDTO khoaHocDTO)
        {
            var kh = _dataContext.khoaHocs.Where(t => t.maKh == khoaHocDTO.maKh).FirstOrDefault();
            try
            {
                if (kh != null)
                {
                    kh.gia = khoaHocDTO.gia;


                }
                int check = _dataContext.SaveChanges();
                return check;
            }
            catch (Exception ex)
            {
                return -1;
            }


        }


        // lay chi tien bai hoc de hoc
        public object getLearningKhoaHoc(string maKh, string maHv)
        {
            var khoaHoc = _dataContext.khoaHocs
            .Where(t => t.maKh == maKh)
            .Select(t => new
            {
                // lay ra ten kh va ma khoa hoc
                tenKh = t.tenKh,
                maKh = t.maKh,
                tienTrinh = t.khoaHocDaMuas.Where(x => x.maKh == maKh && x.maHv == maHv).Select(x => x.tienTrinh).FirstOrDefault(),
                // lay chuong khoa hoc
                dsChuong = t.chuongKhoaHocs.Select(
                                r => new
                                {
                                    tenChuong = r.tenChuong,
                                    stt = r.stt,
                                    maChuong = r.maCh,
                                    noiDungChuongs = r.noiDungs.Select(
                                        e => new
                                        {
                                            tenNoiDung = e.tieuDe,
                                            maNoiDung = e.maNd,
                                            moTa = e.moTa,
                                            stt = e.stt,
                                            loaiNoiDung = e.loaiNoiDung.maLoaiNd,

                                            noiDungChiTiet = e.loaiNoiDung.maLoaiNd == "LND01" ? (object)e.video : (object)new
                                            {
                                                tenCauHoi = e.tracNghiem.tenCauHoi,
                                                dapAnDung = e.tracNghiem.dapAnDung,
                                                dsDapAn = e.tracNghiem.dapAns.Select(da => new
                                                {
                                                    tenDa = da.tenDa,
                                                    sttDa = da.sttDn,
                                                    giaiThich = da.giaiThich,
                                                })
                                            }

                                        }).ToList()
                                }).ToList()
            }).FirstOrDefault();

            if (khoaHoc != null)
            {
                var tongNoiDung = khoaHoc.dsChuong.Sum(c => c.noiDungChuongs.Count());
                return new
                {
                    tenKh = khoaHoc.tenKh,
                    maKh = khoaHoc.maKh,
                    tongNoiDung,
                    tienTrinh = khoaHoc.tienTrinh,
                    dsChuong = khoaHoc.dsChuong
                };
            }





            return null;
        }

        public int updateTrangThaiKhoaHoc(string maKh, string trangThai)
        {
            var kh = _dataContext.khoaHocs.Where(t=>t.maKh == maKh).FirstOrDefault();
            if(kh != null)
            {
                kh.trangThai = trangThai;
               return  _dataContext.SaveChanges();
            }
            return 0;
        }

        public List<object>  getAllKhoaHoc(string trangThai)
        {
            var khoaHocs = _dataContext.khoaHocs.Where(t => t.trangThai == trangThai).ToList();
            var dskhGv = new List<object>();
            if (khoaHocs != null)
            {
                foreach (var item in khoaHocs)
                {
                    var kh = new
                    {
                        maKh = item.maKh,
                        tenDm = _dataContext.danhMucs.Where(t => t.maDm == item.maDm).Select(t => t.tenDm).FirstOrDefault(),
                        tenKh = item.tenKh,
                        gia = item.gia,
                        hinh = item.hinh,
                        trangThai = item.trangThai,
                        giaGiam = item.giaGiam,


                    };
                    dskhGv.Add(kh);
                }
                return dskhGv;
            }
            return dskhGv;
        }



        public object getDsKhoaHocTheoDanhMuc(string maDanhMuc)
        {
            var res = _dataContext.khoaHocs.Where(t => t.danhMuc.maDm == maDanhMuc && t.trangThai == "Đang bán").ToList();
            if (res != null)
            {
                List<object> list = new List<object>();
                foreach (var kh in res)
                {
                    int? tong = 0;
                    var danhGiaKh = _dataContext.danhGiaKhoaHocs.Where(t => t.maKh == kh.maKh).ToList();
                    foreach (var i in danhGiaKh)
                    {
                        tong += i.soSao;
                    }
                    var khoaHoc = new
                    {
                        maKh = kh.maKh,
                        tenKh = kh.tenKh,
                        hinh = kh.hinh,
                        gia = kh.gia,
                        trungBinhDanhGia = tong == 0 ? 0 : tong / danhGiaKh.Count,
                        tongDanhGia = danhGiaKh.Count,
                        tenGv = _dataContext.giangViens.Where(t => t.maGv == kh.maGv).Select(t => t.tenGv).FirstOrDefault(),
                        giaGiam = kh.giaGiam,

                    };
                    list.Add(khoaHoc);

                }
                return list;
            }
            return null;
        }

        public object getDsKhoaHocDanhGiaCao()
        {
            // Lấy tất cả các khóa học có trạng thái "Đang bán"
            var khoaHocs = _dataContext.khoaHocs.Where(t => t.trangThai == "Đang bán").ToList();

            // Danh sách để chứa các khóa học có đánh giá trung bình từ 3 đến 5 sao
            List<object> list = new List<object>();

            foreach (var kh in khoaHocs)
            {
                // Lấy tất cả đánh giá của khóa học hiện tại
                var danhGiaKh = _dataContext.danhGiaKhoaHocs.Where(t => t.maKh == kh.maKh).ToList();

                // Tính tổng số sao
                int? tong = 0;
                foreach (var i in danhGiaKh)
                {
                    tong += i.soSao;
                }

                // Tính trung bình đánh giá
                double trungBinhDanhGia = tong == 0 ? 0 : (double)tong / danhGiaKh.Count;

                // Kiểm tra nếu trung bình đánh giá từ 3 đến 5 sao thì thêm vào danh sách
                if (trungBinhDanhGia >= 3 && trungBinhDanhGia <= 5)
                {
                    var khoaHoc = new
                    {
                        maKh = kh.maKh,
                        tenKh = kh.tenKh,
                        hinh = kh.hinh,
                        gia = kh.gia,
                        trungBinhDanhGia = trungBinhDanhGia,
                        tongDanhGia = danhGiaKh.Count,
                        tenGv = _dataContext.giangViens.Where(t => t.maGv == kh.maGv).Select(t => t.tenGv).FirstOrDefault(),
                        giaGiam = 0,
                    };
                    list.Add(khoaHoc);
                }
            }

            // Lấy ngẫu nhiên 5 khóa học từ danh sách
            var random = new Random();
            var result = list.OrderBy(x => random.Next()).Take(20).ToList();

            return result;
        }
    }
}

