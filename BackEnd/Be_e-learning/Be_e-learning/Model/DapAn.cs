namespace Be_e_learning.Model
{
    public class DapAn
    {
        public string maDa {  get; set; }  
        public string tenDa { get; set; }   
        public string giaiThich { get; set; }
        public int? sttDn { get; set; }
        public string maTrn { get; set; }

        public TracNghiem tracNghiem { get; set; }
    }
}
