using System.Web.Http;

namespace OAuthSample.Controllers
{
    [Authorize]
    public class CalcController : ApiController
    {
        public IHttpActionResult Get(int x, int y)
        {
            return Ok(x + y);
        }
    }
}
