using System.ComponentModel.DataAnnotations;
using VatCalculatorAPI.Enums;

namespace VatCalculatorAPI.Dtos;

/// <summary>
/// Dto for requests that use tax and vat value.
/// </summary>
public class WithVatDto
{
    /// <summary>
    /// Dto with necessary elements to calculate related price information based on Vat.
    /// </summary>
    /// <param name="tax">One of the valid tax percentages to apply.</param>
    /// <param name="vat">Vat amount pre-calculated.</param>
    public WithVatDto(TaxEnum tax, decimal vat)
    {
        Tax = tax;
        Vat = vat;
    }

    /// <summary>
    /// One of the valid tax percentages to apply.
    /// </summary>
    /// <example>10</example>
    [Required]
    [EnumDataType(typeof(TaxEnum), ErrorMessage = $"{nameof(Tax)} must be one of the accepted values.")]
    public TaxEnum Tax { get; private init; }


    /// <summary>
    /// Vat amount pre-calculated.
    /// </summary>
    /// <example>39.99</example>
    [Required]
    [Range(0d, double.MaxValue,
    ErrorMessage = $"{nameof(Vat)} must be a positive decimal number.")]
    public decimal Vat { get; private init; }
}