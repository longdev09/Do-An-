using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Be_e_learning.Services;
using Be_e_learning.Model;
using Be_e_learning.DTO;
using System.Threading;
using Microsoft.AspNetCore.Authorization;
namespace Be_e_learning.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NoiDungController : ControllerBase
    {
        private readonly INoiDungService _noiDungService;
        //private readonly SemaphoreSlim _semaphore = new SemaphoreSlim(1, 1);
        public NoiDungController(INoiDungService noiDungService)
        {
            _noiDungService = noiDungService;
        }



        // them bai giang danh cho giang vien
        [HttpPost]
        [Route("tao-noi-dung")]
        public IActionResult CreateNoiDung(string maKh, [FromForm] NoiDungDTO baiGiangDTO)
        {
          
            try {
                var res = _noiDungService.createNoiDung(maKh, baiGiangDTO);
                if (res != null)
                {

                    return Ok(new ApiResponse
                    {
                        success = true,
                        message = "Tạo nội dung thành công",
                        data = null
                    });
                }
                else
                {
                    return Ok(new ApiResponse
                    {
                        success = false,
                        message = "Tạo nội dung thất bại",
                        data = null
                    });
                }
            }
            catch
            {
                return Ok(new ApiResponse
                {
                    success = false,
                    message = "Tạo nội dung thất bại",
                    data = null
                });
            }     
        }


        // lay danh sach bai giang 
        [HttpGet]
        [Route("get-noi-dung-chuong")]
        public IActionResult GetNoiDungChuong(string maCh)
        {

            //await _semaphore.WaitAsync(); // Chờ để giữ Semaphore
            try
            { 
              
                var res = _noiDungService.getNoiDungByChuong(maCh);
                return Ok(res);

            }
            catch (Exception ex) { return BadRequest(ex.Message); }
        }
    }
}
