using Be_e_learning.DTO;
using Be_e_learning.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Be_e_learning.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChiTietGiamGiaController : ControllerBase
    {
        private readonly IChiTietGiamGiaService _chiTietGiamGiaService;
        public ChiTietGiamGiaController (IChiTietGiamGiaService chiTietGiamGiaService)
        {
            _chiTietGiamGiaService = chiTietGiamGiaService; 
        }
        [HttpPost]
        [Route("tao-chi-tiet-giam-gia")]
        public IActionResult createChiTietGiamGia(float tongTien, ChiTietGiamGiaDTO chiTietGiamGiaDTO)
          {
            int check = _chiTietGiamGiaService.createChiTietGiamGia(tongTien, chiTietGiamGiaDTO);
            if (check > 0)
            {
              
                return Ok(new ApiResponse
                {
                    success = true,
                    message = "Áp dụng giảm giá thành công",
                  
                });
            }
            return Ok(new ApiResponse
            {
                success = false,
                message = "Áp dụng giảm giá thất bại",
               
            });

        }


        [HttpDelete]
        [Route("xoa-chi-tiet-giam-gia")]
        public IActionResult deleteChiTietGiamGia(string maKh)
        {
           var check =  _chiTietGiamGiaService.deleteChiTietGiamGia(maKh);
           if (check > 0)
            {

                return Ok(new ApiResponse
                {
                    success = true,
                    message = "Xóa giảm giá thành công",

                });
            }
            return Ok(new ApiResponse
            {
                success = false,
                message = "Xóa giảm giá thất bại",

            });

        }
    }
}
