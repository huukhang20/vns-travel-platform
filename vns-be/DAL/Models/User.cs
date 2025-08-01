﻿using DAL.Models.Enum;

namespace DAL.Models
{
    public class User
    {
        public Guid UserId { get; set; }
        public required string Email { get; set; }
        public string? PasswordHash { get; set; }
        public required string FullName { get; set; }
        public string? AvatarUrl { get; set; }
        public string? PhoneNumber { get; set; }
        public Role Role { get; set; }
        public List<Voucher> Vouchers { get; set; } = new();
        public List<Message> SentMessages { get; set; } = new();
        public List<Message> ReceivedMessages { get; set; } = new();

    }
}
