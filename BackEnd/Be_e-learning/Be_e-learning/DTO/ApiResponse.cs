﻿using Microsoft.AspNetCore.Mvc;

namespace Be_e_learning.DTO
{
    public class ApiResponse
    {
        public bool success { get; set; }  
        public string message { get; set; }
        public object data { get; set; }

    
       
    }
}
