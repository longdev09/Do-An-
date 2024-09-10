using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace Be_e_learning.RadomKey
{
    public class RandomKey
    {

        public RandomKey()
        {

        }



        public static string randomMa(string prefix)
        {
            using (var rng = new RNGCryptoServiceProvider())
            {
                byte[] randomBytes = new byte[4]; // Độ dài của mã ngẫu nhiên
                rng.GetBytes(randomBytes);

                int randomInt = BitConverter.ToInt32(randomBytes, 0);

                // Chuyển đổi số nguyên thành chuỗi để lưu vào cơ sở dữ liệu và thêm tiền tố
                return prefix + Math.Abs(randomInt).ToString();
            }
           
        }
    }
}
