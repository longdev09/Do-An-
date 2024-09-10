using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Be_e_learning.DTO;
using Be_e_learning.Model;
using System.Linq;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;
namespace Be_e_learning.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NguoiDungController : ControllerBase
    {

        private readonly DataContext _dataContext;
        private readonly IConfiguration _configuration;

        public NguoiDungController(DataContext dataContext, IConfiguration configuration)
        {
            _dataContext = dataContext; 
            _configuration = configuration; 
        }
       
        // login nguoi dung/ dung cho admin, giang vien, hoc vien
        [HttpPost]
        [Route("login-nguoi-dung-giang-vien")]
        public IActionResult loginNguoiDungGiangVien([FromForm] DangNhapDTO dangNhap)
        {
            var user = _dataContext.nguoiDungs.SingleOrDefault(t => t.tenDn == dangNhap.tenDn && t.matKhau == dangNhap.matKhau && t.trangThai == "Đã duyệt");
          
            if (user != null)
            {
                var gv = _dataContext.giangViens.Where(t => t.maNg == user.maNg).FirstOrDefault();
                if(gv != null)
                {
                    string token = GenerateJWTToken("VTGV", "maGv", gv.maGv);
                    return Ok(new ApiResponse
                    {
                        success = true,
                        message = "Đăng nhập thành công",
                        data = token
                    });
                }
              
            }
            return Ok(new ApiResponse
            {
                success = false,
                message = "Đăng nhập thất bại",
                data = null
            });
        }




        [HttpPost]
        [Route("login-nguoi-dung-hoc-vien")]
        public IActionResult loginNguoiDungHocVien([FromForm] DangNhapDTO dangNhap)
        {
            var user = _dataContext.nguoiDungs.SingleOrDefault(t => t.tenDn == dangNhap.tenDn && t.matKhau == dangNhap.matKhau && t.trangThai == "Đã duyệt");

            if (user != null)
            {
              
                var hv = _dataContext.hocViens.Where(t => t.maNg == user.maNg).FirstOrDefault();
                if(hv != null)
                {
                    string token = GenerateJWTToken("VTHV", "maHv", hv.maHv);
                    return Ok(new ApiResponse
                    {
                        success = true,
                        message = "Đăng nhập thành công",
                        data = token
                    });
                }
               
            }
            return Ok(new ApiResponse
            {
                success = false,
                message = "Đăng nhập thất bại",
                data = null
            });
        }



        // ham dung de tao token nguoi dung, de xac thuc thong tin nguoi dung
        private string GenerateJWTToken(string maVt,  string nameMaDoiTuong, string maDoiTuong)
        {

            var jwt = new JwtSecurityTokenHandler();
            var securityKeyBytes = Encoding.UTF8.GetBytes(_configuration["AppSettings:SecretKey"]);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(nameMaDoiTuong, maDoiTuong),
                    new Claim(ClaimTypes.Role, maVt)
                }),
                Expires = DateTime.UtcNow.AddMonths(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(securityKeyBytes), SecurityAlgorithms.HmacSha256Signature),
            };
            var token = jwt.CreateToken(tokenDescriptor);
            return jwt.WriteToken(token);
        }





    }
}
