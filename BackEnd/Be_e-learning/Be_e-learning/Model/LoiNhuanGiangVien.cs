namespace Be_e_learning.Model
{
    public class LoiNhuanGiangVien
    {
        public string maLoiNhuan { get; set; }
        public string maGv { get; set; }
        public float?  tongLoiNhuan { get; set; }
        public virtual GiangVien giangVien { get; set;}
    }
}
