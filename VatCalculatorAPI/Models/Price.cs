using VatCalculatorAPI.Dtos;
using VatCalculatorAPI.Enums;

namespace VatCalculatorAPI.Models
{
    internal class Price
    {
        private Price() { }
        public static Price WithVat(TaxEnum tax, decimal vat)
        {
            return new Price
            {
                Tax = tax,
                Net = 100M * vat / (int)tax
            };
        }
        public static Price WithNet(TaxEnum tax, decimal net)
        {
            return new Price
            {
                Tax = tax,
                Net = net
            };
        }
        public static Price WithGross(TaxEnum tax, decimal gross)
        {
            return new Price
            {
                Tax = tax,
                Net = 100M * gross / (100M + (int)tax)
            };
        }

        public TaxEnum Tax { get; set; }

        public decimal Net { get; set; }

        public decimal Gross => Net + Vat;

        public decimal Vat => Net * ((int)Tax / 100M);

        public static PriceDto ToDto(Price priceToExpose)
        {
            var result = new PriceDto
            {
                Net = priceToExpose.Net,
                Vat = priceToExpose.Vat,
                Gross = priceToExpose.Gross,
            };
            return result;
        }
    }
}