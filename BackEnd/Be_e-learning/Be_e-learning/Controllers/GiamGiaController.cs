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
    public class GiamGiaController : ControllerBase
    {
        private readonly IGiamGiaServices _giaServices;
        public GiamGiaController(IGiamGiaServices giaServices)
        {
            _giaServices = giaServices;
        }

        [Authorize(Roles = "VTGV")]
        [HttpGet]
        [Route("lay-danh-sach-giam-gia")]
        public IActionResult getDanhSachGiamGia()
        {
            var maGv = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "maGv")?.Value;
            var ds = _giaServices.getGiamGiaGv(maGv);
            if(ds == null)
            {
                return Ok(new ApiResponse
                {
                    success = false,
                    message = "Lấy danh sách thất bại!",
                    data = null
                });
            }
            return Ok(new ApiResponse
            {
                success = true,
                message = "Lấy danh sách thành công !",
                data = ds
            });


        }


        [Authorize(Roles = "VTGV")]
        [HttpPost]
        [Route("tao-giam-gia")]
        public IActionResult createGiamGia([FromForm] GiamGiaDTO giamGiaDTO)
        {
            var maGv = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "maGv")?.Value;
            var check = _giaServices.createGiamGia(maGv, giamGiaDTO);
            if (check > 0)
            {
                return Ok(new ApiResponse
                {
                    success = true,
                    message = "Tạo giảm giá thành công",    
                });
            }
            return Ok(new ApiResponse
            {
                success = true,
                message = "Tạo giảm giá thất bại",
            });


        }


        [Authorize(Roles = "VTGV")]
        [HttpDelete]
        [Route("xoa-giam-gia")]
        public IActionResult deleteGiamGia(string maGg)
        {
            var maGv = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "maGv")?.Value;
            var check = _giaServices.deleteGiamGia(maGv, maGg);
            if (check > 0)
            {
                return Ok(new ApiResponse
                {
                    success = true,
                    message = "Xóa giảm giá thành công!",
                   
                });
            }
            return Ok(new ApiResponse
            {
                success = false,
                message = "Xóa giảm giá thất bại !",
             
            });


        }
    }
}
