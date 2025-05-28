using BLL.Services.Implementations;
using BLL.Services.Interfaces;
using DAL.Context;
using DAL.Repositories.Implementations;
using DAL.Repositories.Interfaces;
using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;

namespace Presentation
{
    public static class ResolveBussinessLogic
    {
        public static IServiceCollection ResolveServices(this IServiceCollection services, string connectionString)
        {
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IAuthenService, AuthenService>();

            services.AddDbContext<AppDbContext>(option => option.UseSqlServer(connectionString, sqlOptions => {
                sqlOptions.CommandTimeout(30);
                sqlOptions.EnableRetryOnFailure(
                    maxRetryCount: 5,
                    maxRetryDelay: TimeSpan.FromSeconds(30),
                    errorNumbersToAdd: null);
            }));
            return services;
        }
    }
}
