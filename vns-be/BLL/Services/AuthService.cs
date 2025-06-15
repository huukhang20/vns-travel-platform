using BLL.DTOs;
using DAL.Models;
using DAL.Models.Enum;
using DAL.Repositories.Interfaces;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace BLL.Services
{
    public interface IAuthService
    {
        Task<AuthResponseDTO> RegisterAsync(RegisterDTO model);
        Task<AuthResponseDTO> LoginAsync(LoginDTO model);
        Task<AuthResponseDTO> RefreshTokenAsync(string refreshToken);
    }

    public class AuthService : IAuthService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IJwtService _jwtService;
        private readonly IPasswordHasher<User> _passwordHasher;

        public AuthService(
            IUnitOfWork unitOfWork,
            IJwtService jwtService,
            IPasswordHasher<User> passwordHasher)
        {
            _unitOfWork = unitOfWork;
            _jwtService = jwtService;
            _passwordHasher = passwordHasher;
        }

        public async Task<AuthResponseDTO> RegisterAsync(RegisterDTO model)
        {
            var existingUser = await _unitOfWork.User.GetAsync(u => u.Email == model.Email);
            if (existingUser != null)
            {
                throw new Exception("User with this email already exists");
            }

            var user = new User
            {
                UserId = Guid.NewGuid(),
                Email = model.Email,
                FullName = $"{model.FirstName} {model.LastName}",
                PhoneNumber = model.PhoneNumber,
                Role = Role.Customer, // Default role
                PasswordHash = _passwordHasher.HashPassword(null!, model.Password)
            };

            await _unitOfWork.User.AddAsync(user);
            await _unitOfWork.SaveChangesAsync();

            var token = _jwtService.GenerateJwtToken(user);
            var refreshToken = _jwtService.GenerateRefreshToken();

            return new AuthResponseDTO
            {
                Token = token,
                RefreshToken = refreshToken,
                ExpiresAt = DateTime.Now.AddHours(24), // Match with JWT expiration
                UserId = user.UserId.ToString(),
                Email = user.Email,
                Role = user.Role.ToString()
            };
        }

        public async Task<AuthResponseDTO> LoginAsync(LoginDTO model)
        {
            var user = await _unitOfWork.User.GetAsync(u => u.Email == model.Email);
            if (user == null)
            {
                throw new Exception("Invalid email or password");
            }

            var result = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, model.Password);
            if (result == PasswordVerificationResult.Failed)
            {
                throw new Exception("Invalid email or password");
            }

            var token = _jwtService.GenerateJwtToken(user);
            var refreshToken = _jwtService.GenerateRefreshToken();

            return new AuthResponseDTO
            {
                Token = token,
                RefreshToken = refreshToken,
                ExpiresAt = DateTime.Now.AddHours(24),
                UserId = user.UserId.ToString(),
                Email = user.Email,
                Role = user.Role.ToString()
            };
        }

        public async Task<AuthResponseDTO> RefreshTokenAsync(string refreshToken)
        {
            var principal = _jwtService.GetPrincipalFromExpiredToken(refreshToken);
            if (principal == null)
            {
                throw new Exception("Invalid refresh token");
            }

            var userId = Guid.Parse(principal.FindFirst(ClaimTypes.NameIdentifier)?.Value!);
            var user = await _unitOfWork.User.GetAsync(u => u.UserId == userId);
            if (user == null)
            {
                throw new Exception("User not found");
            }

            var newToken = _jwtService.GenerateJwtToken(user);
            var newRefreshToken = _jwtService.GenerateRefreshToken();

            return new AuthResponseDTO
            {
                Token = newToken,
                RefreshToken = newRefreshToken,
                ExpiresAt = DateTime.Now.AddHours(24),
                UserId = user.UserId.ToString(),
                Email = user.Email,
                Role = user.Role.ToString()
            };
        }
    }
} 