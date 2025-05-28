using BLL.DTOs;
using BLL.Services.Interfaces;
using DAL.Models;
using DAL.Repositories.Interfaces;

namespace BLL.Services.Implementations
{
    public class AuthenService : IAuthenService
    {
        private readonly IUnitOfWork _unitOfWork;

        public AuthenService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<AuthenStatusDto> LoginAsync(LoginDto loginDto)
        {
            var user = await _unitOfWork.User.GetAsync(
                u => (u.Email == loginDto.Email || u.PhoneNumber == loginDto.PhoneNumber) && 
                u.PasswordHash == loginDto.PasswordHash
                );

            if (user == null)
            {
                return new AuthenStatusDto
                {
                    Status = false,
                    StatusMessage = "Incorrect login informations! Please try again"
                };
            }

            return new AuthenStatusDto
            {
                Status = true,
                StatusMessage = "Login successfully!"
            };
        }

        public async Task<AuthenStatusDto> RegisterAsync(RegisterDto registerDto)
        {            
            try
            {
                if (string.IsNullOrEmpty(registerDto.Email) || string.IsNullOrEmpty(registerDto.PhoneNumber)
                                                           || string.IsNullOrEmpty(registerDto.PasswordHash))
                {
                    return new AuthenStatusDto { Status = false, StatusMessage = "Required field needed" };
                }

                var checkIfUserExisted = await _unitOfWork.User.GetAsync(c => c.Email == registerDto.Email || c.PhoneNumber == registerDto.PhoneNumber);
                if (checkIfUserExisted != null)
                {
                    return new AuthenStatusDto
                    {
                        Status = false,
                        StatusMessage = "This email or phone number already exist! Please try others."
                    };
                }

                User userToAdd = new User
                {
                    Email = registerDto.Email,
                    PhoneNumber = registerDto.PhoneNumber,
                    PasswordHash = registerDto.PasswordHash,
                    FullName = registerDto.FullName,
                };
                
                var addNewUser = _unitOfWork.User.AddAsync(userToAdd);

                return new AuthenStatusDto
                {
                    Status = true,
                    StatusMessage = "User created successfully!"
                };
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }            
        }
    }
}
