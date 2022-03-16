using Microsoft.AspNetCore.Mvc;
using VatCalculatorAPI.Dtos;
using VatCalculatorAPI.Models;

namespace VatCalculatorAPI.Controllers
{
    /// <summary>
    /// VatCalculatorAPI that exposes methods to calculate the different price representations.
    /// </summary>
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class CalculatorController : ControllerBase
    {
        private readonly ILogger<CalculatorController> _logger;

        /// <summary>
        /// Constructor to use for Dependency injection
        /// </summary>
        /// <param name="logger"></param>
        public CalculatorController(ILogger<CalculatorController> logger)
        {
            _logger = logger;
        }

        /// <summary>
        /// Returns a price based on a given tax and Vat amount.
        /// </summary>
        /// <param name="withVatDto">Includes the tax to apply and the Vat amount.</param>
        /// <returns>PriceDto</returns>
        [HttpPost]
        public PriceDto WithVat(WithVatDto withVatDto)
        {
            var result = Price.WithVat(withVatDto.Tax, withVatDto.Vat);
            _logger.LogTrace($"Returning Tax {result.Tax}; Net {result.Net:5}; Gross {result.Gross:5}, VAT: {result.Vat}");
            return Price.ToDto(result);
        }

        /// <summary>
        /// Returns a price based on a given tax and Net amount.
        /// </summary>
        /// <param name="withNetDto">Includes the tax to apply and the Net amount.</param>
        /// <returns>PriceDto</returns>
        [HttpPost]
        public PriceDto WithNet(WithNetDto withNetDto)
        {
            var result = Price.WithNet(withNetDto.Tax, withNetDto.Net);
            _logger.LogTrace($"Returning Tax {result.Tax}; Net {result.Net:5}; Gross {result.Gross:5}, VAT: {result.Vat}");
            return Price.ToDto(result);
        }

        /// <summary>
        /// Returns a price based on a given tax and Gross amount.
        /// </summary>
        /// <param name="withGrossDto">Includes the tax to apply and the Gross amount.</param>
        /// <returns>PriceDto</returns>
        [HttpPost]
        public PriceDto WithGross(WithGrossDto withGrossDto)
        {
            var result = Price.WithGross(withGrossDto.Tax, withGrossDto.Gross);
            _logger.LogTrace($"Returning Tax {result.Tax}; Net {result.Net:5}; Gross {result.Gross:5}, VAT: {result.Vat}");
            return Price.ToDto(result);
        }
    }
}