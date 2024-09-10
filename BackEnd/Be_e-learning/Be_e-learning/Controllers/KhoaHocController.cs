using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Be_e_learning.Services;
using Be_e_learning.Model;
using Firebase.Storage;
using System.IO;
using Be_e_learning.FireBase;
using Be_e_learning.RadomKey;
using Microsoft.AspNetCore.Authorization;
using Be_e_learning.DTO;
using Microsoft.AspNetCore.Routing;
using Newtonsoft.Json.Linq;

namespace Be_e_learning.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KhoaHocController : ControllerBase
    {
        private readonly IKhoaHocService _khoaHocService;

        public KhoaHocController (IKhoaHocService khoaHocService)
        {
            _khoaHocService = khoaHocService;
        }

        // lay random khoa hoc

        [HttpGet]
        [Route("lay-ramdom-danh-sach-khoa-hoc")]
        public IActionResult getRamdDomDsKhoaHoc()
        {
            var res = _khoaHocService.getRandDomDsKhoaHoc();
            if(res != null)
            {
                return Ok(res);

            }
            return Ok(res);
        }

        [HttpGet]
        [Route("lay-khoa-hoc-danh-gia-cao")]
        public IActionResult getKhHocDanhGiaCao()
        {
            var res = _khoaHocService.getDsKhoaHocDanhGiaCao();
            if (res != null)
            {
                return Ok(res);

            }
            return Ok(res);
        }


        [HttpGet]
        [Route("chi-tiet-khoa-hoc")]
        public IActionResult getDetailKhoaHoc(string maKh)
        {
            var res = _khoaHocService.getDetailKhoaHoc(maKh);
            if (res != null)
            {
                return Ok(res);

            }
            return Ok(res);
        }


        // lay thong tin khoa hoc them ma
        [Authorize(Roles = "VTGV")]
        [HttpGet]
        [Route("lay-thong-tin-khoa-hoc-gv")]
        public IActionResult getThongTinKhGv(string maKh)
        {
            var kh = _khoaHocService.getKhoaHocGv(maKh);
            return Ok(kh);
        }



        // lay thong tin khoa hoc voi quyen giang vien // thong qua token
        [Authorize(Roles = "VTGV")]
        [HttpGet]
        [Route("lay-danh-sach-khoa-hoc-gv")]
        public IActionResult getKhoaHocGv()
        {
            var maGv = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "maGv")?.Value; // lay magv thong qua token
            try
            {
                var res = _khoaHocService.getKhoaHocByGv(maGv);
                return Ok(res);
            }
            catch
            {
                return BadRequest();
            }

        }


        //tao khoa hoc moi chi danh cho giang vien tao
        [Authorize(Roles = "VTGV")]
        [HttpPost]
        [Route("tao-khoa-hoc")]
        public async Task<IActionResult> createKhoaHocGv([FromForm] KhoaHocDTO khoaHoc)
        {
            var maGv = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "maGv")?.Value; // lay magv thong qua token
            string maKh = RandomKey.randomMa("KH");
            UploadFireBase uploadFireBase = new UploadFireBase();
            // them anh khoa hoc vao fire base
            string folderName = maGv + "/" +  maKh + "/avata-kh";
            string ulrImg = await UploadFireBase.upLoadImg_Storage(khoaHoc.hinh, folderName, maKh);

            KhoaHoc newKhoaHoc = new KhoaHoc();
            newKhoaHoc.maGv = maGv;
            newKhoaHoc.maKh = maKh;
            newKhoaHoc.maDm = khoaHoc.maDm;
            newKhoaHoc.tenKh = khoaHoc.tenKh;
            newKhoaHoc.trangThai = "Bản nháp";
            newKhoaHoc.gioiThieu = khoaHoc.gioiThieu;
            newKhoaHoc.ketQuaDatDuoc = khoaHoc.ketQuaDatDuoc;
            newKhoaHoc.hinh = ulrImg;
            var res = _khoaHocService.createKhoaHoc(newKhoaHoc);
            if (res != null)
            {
                return StatusCode(StatusCodes.Status201Created, res);
            }
            else
            {
                return StatusCode(StatusCodes.Status400BadRequest); // Trả về mã 400 Bad Request nếu không thành công
            }


        }


        // cap nhat khoa hoc 
        [Authorize(Roles = "VTGV")]
        [HttpPut]
        [Route("update-khoa-hoc")]
        public async Task <IActionResult> updateKhoaHoc([FromForm] KhoaHocDTO khoaHocDTO)
        {
            var maGv = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "maGv")?.Value;
            var res  = await _khoaHocService.updateKhoaHoc(maGv,khoaHocDTO);
            if(res > 0)
            {
                return Ok(new ApiResponse
                {
                    success = true,
                    message = "Cập nhật thành công",
                    data = null
                });
            }
            return Ok(new ApiResponse
            {
                success = false,
                message = "Cập nhật thất bại",
                data = null
            });
        }


        // cap nhat khoa hoc 
        [Authorize(Roles = "VTGV")]
        [HttpPut]
        [Route("update-gia-khoa-hoc")]
        public IActionResult updateGiaKhoaHoc([FromForm] KhoaHocDTO khoaHocDTO)
        {

            var res = _khoaHocService.updateGiaKhoaHoc(khoaHocDTO);
            if (res > 0)
            {
                return Ok(new ApiResponse
                {
                    success = true,
                    message = "Cập nhật thành công",
                    data = null
                });
            }
            return Ok(new ApiResponse
            {
                success = false,
                message = "Cập nhật thất bại",
                data = null
            });
        }

        [Authorize(Roles = "VTHV")]
        [HttpGet]
        [Route("lay-thong-tin-hoc-khoa-hoc")]
        public IActionResult getLearningKhoaHoc (string maKh)
        {
            var maHv = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "maHv")?.Value;
            var kh = _khoaHocService.getLearningKhoaHoc(maKh, maHv);
            return Ok(kh);

        }



        [HttpPut]
        [Route("cap-nhat-trang-thai")]
        public IActionResult updateTrangThai(string maKh, string trangThai)
        {
            var res  = _khoaHocService.updateTrangThaiKhoaHoc(maKh, trangThai);
            if(res > 0)
            {

                return Ok(new ApiResponse
                {
                    success = true,
                    message = "Gửi yêu cầu phê duyệt thành công !",
                    data = null
                });

            }
            return Ok(new ApiResponse
            {
                success = false,
                message = "Gửi yêu cầu phê duyệt thất bại !",
                data = null
            });

        }



        // admin



        [HttpGet]
        [Route("lay-danh-sach-khoa-hoc-admin")]
        public IActionResult getAllDanhSachAdmin (string trangThai)
        {
            var res = _khoaHocService.getAllKhoaHoc( trangThai);
            if(res != null)
            {
                return Ok(new ApiResponse
                {
                    success = true,
                    message = "Lấy danh sách khóa học thành công !",
                    data = res
                });
            }

            return Ok(new ApiResponse
            {
                success = false,
                message = "Lấy danh sách khóa học thất bại!",
                data = null,
            });
        }



        [HttpGet]
        [Route("lay-danh-sach-khoa-hoc-theo-danh-muc")]
        public IActionResult getKhoaHocTheoDanhMuc(string maDanhMuc)
        {
            var res = _khoaHocService.getDsKhoaHocTheoDanhMuc(maDanhMuc);
            if (res != null)
            {
                return Ok(new ApiResponse
                {
                    success = true,
                    message = "Lấy danh sách khóa học thành công !",
                    data = res
                });
            }

            return Ok(new ApiResponse
            {
                success = false,
                message = "Lấy danh sách khóa học thất bại!",
                data = null,
            });

        }
    }



}
