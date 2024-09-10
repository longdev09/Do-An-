using Be_e_learning.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Be_e_learning.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DanhMucController : ControllerBase
    {
        private readonly IDanhMucService _danhMucService;

        public DanhMucController (IDanhMucService danhMucService)
        {
            _danhMucService = danhMucService;
        }

        [HttpGet]
        [Route("get-all-danh-muc")]
        public IActionResult getAll()
        {
            return Ok(_danhMucService.getAllDanhMuc());
        }
    }
}
