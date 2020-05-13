using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }


        public class Handler : IRequestHandler<Command>
        {
            public Handler(DataContext contex)
            {
                _contex = contex;
            }
            public DataContext _contex { get; }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activities = await _contex.Activities.FindAsync(request.Id);

                if(activities == null)
                    throw new Exception("Could not find Activity");

                _contex.Remove(activities);
                
                var success = await _contex.SaveChangesAsync() > 0;
                if (success) return Unit.Value;
                throw new Exception("Problem saving changes");
            }
        }
    }
}