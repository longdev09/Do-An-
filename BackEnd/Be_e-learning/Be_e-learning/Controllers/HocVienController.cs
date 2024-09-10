using Be_e_learning.DTO;
using Be_e_learning.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;

namespace Be_e_learning.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HocVienController : ControllerBase
    {

        private readonly IHocVienService _hocVienService;
        private readonly INguoiDungService _nguoiDungService;
        public HocVienController(IHocVienService hocVienService, INguoiDungService nguoiDungService)
        {
            _hocVienService = hocVienService;
            _nguoiDungService = nguoiDungService;
        }

        // tao tai khoan hoc vien
        [HttpPost]
        [Route("tao-tai-khoan-hoc-vien")]
        public async Task<IActionResult> createHocVien(string tenDn, string matKhau, string vaiTro,  [FromForm] HocVienDTO hocVienDTO)
        {
            // tao tai khoan

            var res  = await _nguoiDungService.taoTaiKhoanNguoiDung(tenDn, matKhau, vaiTro, "Đã duyệt");
            if(res != null)
            {
                int check2 = _hocVienService.createHocVien(res.maNg, hocVienDTO);
                if(check2 > 0)
                {
                    return Ok(new ApiResponse
                    {
                        success = true,
                        message = "Tạo tài khoản thành công",
                        data = null
                    });
                }
                return Ok(new ApiResponse
                {
                    success = false,
                    message = "Tạo tài khoản thất bại",
                    data = null
                });

            }
            return Ok(new ApiResponse
            {
                success = false,
                message = "Tài khoản đã tồn tại",
                data = null
            });


        }

        [Authorize(Roles = "VTHV")]
        [HttpGet]
        [Route("lay-thong-tin-hoc-vien")]
        public IActionResult getThongTinHocVien()
        {
            var maHv = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "maHv")?.Value;
            var res = _hocVienService.getThongTienHocVien(maHv);
            if(res != null )
            {
                return Ok(new ApiResponse
                {
                    success = true,
                 
                    data = res
                });
            }
            return Ok(new ApiResponse
            {
                success = false,
                data = res
            });
        }





        [Authorize(Roles = "VTHV")]
        [HttpPut]
        [Route("cap-nhat-thong-tin-hoc-vien")]
        public IActionResult capNhatThongTinHocVien([FromForm] HocVienDTO hocVienDTO)
        {
            var maHv = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "maHv")?.Value;
            var res = _hocVienService.updateHocVien(maHv, hocVienDTO);
            if (res != null)
            {
                return Ok(new ApiResponse
                {
                    success = true,

                    data = res
                });
            }
            return Ok(new ApiResponse
            {
                success = false,
                data = res
            });
        }
    }




}
