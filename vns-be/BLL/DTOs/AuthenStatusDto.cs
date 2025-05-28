namespace BLL.DTOs
{
    public class AuthenStatusDto
    {
        public required bool Status { get; set; }
        public required string StatusMessage { get; set; }
        public string? Token { get; set; }
    }
}
