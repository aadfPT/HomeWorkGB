using System.ComponentModel.DataAnnotations;
using VatCalculatorAPI.Enums;

namespace VatCalculatorAPI.Dtos;

/// <summary>
/// Dto for requests that use tax and gross value.
/// </summary>
public class WithGrossDto
{
    /// <summary>
    /// Dto with necessary elements to calculate related price information based on Gross.
    /// </summary>
    /// <param name="tax">One of the valid tax percentages to apply.</param>
    /// <param name="gross">Gross amount pre-calculated.</param>
    public WithGrossDto(TaxEnum tax, decimal gross)
    {
        Tax = tax;
        Gross = gross;
    }

    /// <summary>
    /// One of the valid tax percentages to apply.
    /// </summary>
    /// <example>10</example>
    [Required]
    [EnumDataType(typeof(TaxEnum), ErrorMessage = $"{nameof(Tax)} must be one of the accepted values.")]
    public TaxEnum Tax { get; private init; }


    /// <summary>
    /// Gross amount pre-calculated.
    /// </summary>
    /// <example>39.99</example>
    [Required]
    [Range(0d, double.MaxValue,
        ErrorMessage = $"{nameof(Gross)} must be a positive decimal number.")]
    public decimal Gross { get; private init; }
}