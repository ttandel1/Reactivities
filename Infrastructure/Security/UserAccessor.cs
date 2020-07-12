using Application.Interfaces;
using Microsoft.AspNetCore.Http;
using System.Linq;
using System.Security.Claims;

namespace Infrastructure.Security
{
    public class UserAccessor : IUserAccessor
    {
        public UserAccessor(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public IHttpContextAccessor _httpContextAccessor { get; }

        /// <summary>
        /// get username from token-claims
        /// </summary>
        /// <returns></returns>
        public string GetCurrentUserName()
        {
            var username = _httpContextAccessor.HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;
            return username;
        }
    }
}
