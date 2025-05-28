using BLL.DTOs;

namespace BLL.Services.Interfaces
{
    public interface IAuthenService
    {
        Task<AuthenStatusDto> LoginAsync(LoginDto loginDto);
        Task<AuthenStatusDto> RegisterAsync(RegisterDto registerDto);
    }
}
