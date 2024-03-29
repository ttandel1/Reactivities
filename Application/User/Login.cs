﻿using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.User
{
    public class Login
    {
        public class Query : IRequest<User>
        {
            public string Email { get; set; }
            public string Password { get; set; }
        }

        public class QueryValidator : AbstractValidator<Query>
        {
            public QueryValidator()
            {
                RuleFor(x => x.Email).NotEmpty();
                RuleFor(x => x.Password).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Query, User>
        {
            public Handler(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, IJwtGenerator jwtGenerator)
            {
                _userManager = userManager;
                _signInManager = signInManager;
                _jwtGenerator = jwtGenerator;
            }

            public UserManager<AppUser> _userManager { get; }
            public SignInManager<AppUser> _signInManager { get; }
            public IJwtGenerator _jwtGenerator { get; }

            public async Task<User> Handle(Query request, CancellationToken cancellationToken)
            {
                // handler logic goes here
                var user = await _userManager.FindByEmailAsync(request.Email);

                if(user == null)
                {
                    throw new RestException(System.Net.HttpStatusCode.Unauthorized);
                }

                var result = await _signInManager.CheckPasswordSignInAsync(user, request.Password, false);
                if (result.Succeeded)
                {
                    // TODO: generate Token
                    return new User { 
                        DisplayName = user.DisplayName,
                        Token = _jwtGenerator.CreateToken(user),
                        UserName = user.UserName,
                        Image = null
                    };
                }

                throw new RestException(System.Net.HttpStatusCode.Unauthorized);
            }

        }
    }
}
