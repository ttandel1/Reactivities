using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Persistence;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.User
{
    public class CurrentUser
    {
        public class Query : IRequest<User> { }

        public class Handler : IRequestHandler<Query, User>
        {
            public UserManager<AppUser> _userManager { get; }
            public IJwtGenerator _jwtGeneartor { get; }
            public IUserAccessor _userAccessor { get; }

            public Handler(UserManager<AppUser> userManager, IJwtGenerator jwtGeneartor, IUserAccessor userAccessor)
            {
             
                _userManager = userManager;
                _jwtGeneartor = jwtGeneartor;
                _userAccessor = userAccessor;
            }

            
            public async Task<User> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _userManager.FindByNameAsync(_userAccessor.GetCurrentUserName());
                return new User
                {
                    DisplayName = user.DisplayName,
                    UserName = user.UserName,
                    Token = _jwtGeneartor.CreateToken(user),
                    Image = null
                };
            }
        }
    }
}
