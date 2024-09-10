using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Be_e_learning.DTO;
using Be_e_learning.Services;
using Be_e_learning.FireBase;
using System.Threading.Tasks;
using Be_e_learning.RadomKey;
using Be_e_learning.Helpers.Email;
using Org.BouncyCastle.Crypto.Macs;
using Microsoft.AspNetCore.Authorization;
using System.Linq;
using Be_e_learning.Model;
namespace Be_e_learning.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GiangVienController : ControllerBase
    {
        private readonly IGiangVienService _giangVienService;
        private readonly INguoiDungService _nguoiDungService;
        public GiangVienController(IGiangVienService giangVienService, INguoiDungService nguoiDungService)
        {
            _giangVienService = giangVienService;
            _nguoiDungService = nguoiDungService;
        }


        // hien thi len trang quan ly cua giang vien
        [Authorize(Roles = "VTGV")]
        [HttpGet]
        [Route("lay-thong-tin-giang-vien")]  
        public IActionResult layThongTinGiangVien()
        {
            var maGv = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "maGv")?.Value;

            var gv = _giangVienService.getGiangVien(maGv);
            if (gv != null)
            {
                return Ok(gv);
            }
            return BadRequest();
        
        }

        [HttpGet]
        [Route("lay-danh-sach-tai-khoan-gv-chua-duyet")]
        public IActionResult getDsGiangVienChuaDuyet()
        {
            var dsGv = _giangVienService.getDsGiangVienAdminChuaDuyet();
            if(dsGv != null)
            {
                return Ok(new ApiResponse
                {
                    success = true,
                    data = dsGv
                });
            }
            return Ok(new ApiResponse
            {
                success = false,
                data = null
            });
        }

        [HttpGet]
        [Route("lay-danh-sach-tai-khoan-gv-da-duyet")]
        public IActionResult getDsGiangVienDaDuyet()
        {
            var dsGv = _giangVienService.getDsGiangVienAdminDaDuyet();
            if (dsGv != null)
            {
                return Ok(new ApiResponse
                {
                    success = true,
                    data = dsGv
                });
            }
            return Ok(new ApiResponse
            {
                success = false,
                data = null
            });
        }



        [HttpPost]
        [Route("tao-giang-vien")]
        public async Task<IActionResult> createGiangVien([FromForm] GiangVienDTO giangVienDTO)
        {

            // tao mat khau ng



            //tao tai khoan nguoi dung
            
            var check = await _nguoiDungService.taoTaiKhoanNguoiDung(giangVienDTO.email, null, "VTGV", "Chờ duyệt");

            // tao thanh cong
            if(check != null)
            {
                string maGv = RandomKey.randomMa("GV");
                string folder = maGv + "/info_Gv";

                string ulrMatTrc = await UploadFireBase.upLoadImg_Storage(giangVienDTO.matTruocCccd, folder, "cccdMatTrc");
                string ulrAvata = await UploadFireBase.upLoadImg_Storage(giangVienDTO.avata, folder, "avata");
                string ulrMatSau = await UploadFireBase.upLoadImg_Storage(giangVienDTO.matSauCccd, folder, "cccdMatSau");
                var res = _giangVienService.createGiangVien(giangVienDTO, maGv, ulrAvata, ulrMatTrc, ulrMatSau, check.maNg);
                if(res != null)
                {
                    return Ok(new ApiResponse
                    {
                        success = true,
                        message = "Tạo tài khoản giang viên thành công, Vui lòng chờ duyệt !",
                        data = res
                    });
                }    
            }

            return Ok(new ApiResponse
            {
                success = false,
                message = "Email đã được đăng ký !",
                data = null
            });
        }


        [HttpPut]
        [Route("duyet-giang-vien")]
        public IActionResult duyetGiangVien(string maNg, string trangThai)
        {
            // lay ra giang vien do theo ma
            //tao nguoi dung
            var check =  _nguoiDungService.updateTrangThaiNguoiDungGiangVien(maNg , trangThai);
            

            if (check != null)
            {
                if(trangThai == "Đã duyệt")
                {
                    var thongTinGv = _giangVienService.getGiangVienAdmin(check);
                    // cap nhat lai mat khau
                    _nguoiDungService.updateMatKhauNguoiDung(thongTinGv.maGv, check);

                    SendEmail.guiEmailXacThucTkGv(check, thongTinGv.tenGv, thongTinGv.maGv);
                    return Ok(new ApiResponse
                    {
                        success = true,
                        message = "Duyệt tài khoản thành công !"
                    });
                }  
                if(trangThai == "Khóa tài khoản")
                {
                    return Ok(new ApiResponse
                    {
                        success = true,
                        message = "Khóa tài khoản thành công !"
                    });
                }    
                
               
            }
            return Ok(new ApiResponse
            {
                success = true,
                message = "lỗi hệ thống !"
            });
        }

       

    }
}
