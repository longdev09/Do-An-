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
    public class LichSuThanhToanController : ControllerBase
    {

        private readonly ILichSuThanhToanService _ILichSuThanhToanService;
        public LichSuThanhToanController (ILichSuThanhToanService lichSuThanhToanService)
        {
            _ILichSuThanhToanService = lichSuThanhToanService;
        }


        [Authorize(Roles = "VTGV")]
        [HttpGet]
        [Route("lay-danh-sach-thanh-toan-giang-vien")]
        public IActionResult getDsThanhToanGiangVien()
        {
            var maGv = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "maGv")?.Value;
            var res = _ILichSuThanhToanService.getAllLichSuThanhToan(maGv);
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
                data = null
            });
        }

        
        [HttpGet]
        [Route("lay-danh-sach-thanh-toan")]
        public IActionResult getDsThanhToanAdmin(string trangThai)
        {
            var res = _ILichSuThanhToanService.getAllLichSuThanhToanAdmin(trangThai);
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
                data = null
            });
        }





        [Authorize(Roles = "VTGV")]
        [HttpPost]
        [Route("tao-thanh-toan-giang-vien")]
        public IActionResult createThanhToan([FromForm] LichSuThanhToanDTO lichSuThanhToanDTO)
        {
            var maGv = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "maGv")?.Value;
            var res = _ILichSuThanhToanService.createLichSuThanhToan(maGv, lichSuThanhToanDTO);
            if (res > 0)
            {
                return Ok(new ApiResponse
                {
                    success = true,
                    message = "Gửi yêu cầu rút tiền thành công",
                 
                });
            }
            return Ok(new ApiResponse
            {
                success = false,
                message = "Gửi yêu cầu rút tiền thất bại",
             
            });

        }
    }
}
