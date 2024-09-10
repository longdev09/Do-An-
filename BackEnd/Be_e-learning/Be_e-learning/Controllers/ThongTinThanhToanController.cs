using Be_e_learning.DTO;
using Be_e_learning.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace Be_e_learning.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ThongTinThanhToanController : ControllerBase
    {
        private readonly IThongTinThanhToanService _thongTinThanhToanService;
        public ThongTinThanhToanController (IThongTinThanhToanService thongTinThanhToanService)
        {
            _thongTinThanhToanService = thongTinThanhToanService;
        }

        [Authorize(Roles = "VTGV")]
        [HttpGet]
        [Route("lay-thong-tin-thanh-toan-giang-vien")]
        public IActionResult getThongTinThanhToanGiangVien ()
        {
            var maGv = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "maGv")?.Value;
            var tt = _thongTinThanhToanService.getThongTinThanhToan(maGv);

            if (tt == null)
            {
                return Ok(new ApiResponse
                {
                    success = true,
                    
                    data = null
                });
            }
            return Ok(new ApiResponse
            {
                success = false,
                data = tt
            });

        }



     
        [HttpGet]
        [Route("lay-thong-tin-thanh-toan-giang-vien-admin")]
        public IActionResult getThongTinThanhToanGiangVien(string maGv)
        {
            var tt = _thongTinThanhToanService.getThongTinThanhToan(maGv);

            if (tt == null)
            {
                return Ok(new ApiResponse
                {
                    success = true,

                    data = null
                });
            }
            return Ok(new ApiResponse
            {
                success = false,
                data = tt
            });

        }

        [Authorize(Roles = "VTGV")]
        [HttpPost]
        [Route("tao-thong-tin-thanh-toan")]
        public IActionResult createThongTinThanhToan([FromForm] ThongTinThanhToanDTO thongTinThanhToanDTO)
        {
            var maGv = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "maGv")?.Value;
            var res = _thongTinThanhToanService.createThongTinThanhToan(maGv, thongTinThanhToanDTO);
            if (res > 0)
            {
                return Ok(new ApiResponse
                {
                    success = true,
                    message = "Tạo thông tin thanh toán thành công",
                    data = null
                });
            }
            return Ok(new ApiResponse
            {
                success = false,
                message = "Tạo thông tin thanh toán thất bại", 
            });

        }  
    }
}
