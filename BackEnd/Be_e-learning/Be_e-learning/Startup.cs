using Be_e_learning.Model;
using Be_e_learning.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace Be_e_learning
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Be_e_learning", Version = "v1" });
            });

            var secretKey = Configuration["AppSettings:SecretKey"];
            var secretKeyBytes = System.Text.Encoding.UTF8.GetBytes(secretKey);

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                    {
                        //tu cap token
                        ValidateIssuer = false,
                        ValidateAudience = false,

                        // ky tonken
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(secretKeyBytes),
                        ClockSkew = TimeSpan.Zero
                    };

                });

            


            // add scors

            services.AddCors(option =>
            {
                option.AddPolicy("AllowReactApp",
                   builder => builder.WithOrigins("http://localhost:3000") // Thay thế bằng tên miền của ứng dụng React
                   .AllowAnyHeader()
                   .AllowAnyMethod()
                   .AllowCredentials());
            });

            // ket noi db

            services.AddDbContext<DataContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DatabaseConnection")));


            // khoi bao services

            services.AddScoped<IDanhMucService, DanhMucService>();
            services.AddScoped<IKhoaHocService, KhoaHocService>();
            services.AddScoped<IChuongKhoaHocService, ChuongKhoaHocServices>();
            services.AddScoped<INoiDungService, NoiDungService>();
            services.AddScoped<IVideoService, VideoServices>();
            services.AddScoped<IGiangVienService, GiangVienService>();
            services.AddScoped<INguoiDungService, NguoiDungService>();
            services.AddScoped<IHocVienService, HocViensService>();
            services.AddScoped<IGioHangService, GioHangService>();
            services.AddScoped<IHoaDonService, HoaDonService>();
            services.AddScoped<IKhoaHocDaMuaService, KhoaHocDaMuaService>();
            services.AddScoped<IDanhGiaKhoaHocService, DanhGiaKhoaHocService>();
            services.AddScoped<IGiamGiaServices, GiamGiaService >();
            services.AddScoped<IChiTietGiamGiaService, ChiTietGiamGiaService>();
            services.AddScoped<ITracNghiemService, TracNghiemService>();
            services.AddScoped<IThongKeService, ThongKeService>();
            services.AddScoped<IHoaDonBanKhService, IHoaDonBanKh>();
            services.AddScoped<IThongTinThanhToanService, IThongTinThanhToan>();
            services.AddScoped<ILichSuThanhToanService, ILichSuThanhToan>();








        }


        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Be_e_learning v1"));
            }

            app.UseCors("AllowReactApp");

            app.UseHttpsRedirection();

            app.UseRouting();

            // Sử dụng xác thực và phân quyền
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
