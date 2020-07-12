﻿using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Validators
{
    public static class ValidatorExtension
    {
        public static IRuleBuilder<T, string> Password<T>(this IRuleBuilder<T, string> ruleBuilder)
        {
            var options = ruleBuilder
                .NotEmpty()
                .MinimumLength(6).WithMessage("Passowrd must be at least 6 character")
                .Matches("[A-Z]").WithMessage("Password must contain 1 uppercase letter")
                .Matches("[a-z]").WithMessage("Password must contain 1 lowercase atleast")
                .Matches("[0-9]").WithMessage("Passowrd must contain number")
                .Matches("[^a-zA-z0-9]").WithMessage("Password must contain non alphanumberic");

            return options;
        }
    }
}
