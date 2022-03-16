using System.ComponentModel.DataAnnotations;
using VatCalculatorAPI.Enums;

namespace VatCalculatorAPI.Dtos;

/// <summary>
/// Dto for requests that use tax and net value.
/// </summary>
public class WithNetDto
{
    /// <summary>
    /// Dto with necessary elements to calculate related price information based on Net.
    /// </summary>
    /// <param name="tax">One of the valid tax percentages to apply.</param>
    /// <param name="net">Net amount pre-calculated.</param>
    public WithNetDto(TaxEnum tax, decimal net)
    {
        Tax = tax;
        Net = net;
    }

    /// <summary>
    /// One of the valid tax percentages to apply.
    /// </summary>
    /// <example>10</example>
    [Required]
    [EnumDataType(typeof(TaxEnum), ErrorMessage = $"{nameof(Tax)} must be one of the accepted values.")]
    public TaxEnum Tax { get; private init; }


    /// <summary>
    /// Net amount pre-calculated.
    /// </summary>
    /// <example>39.99</example>
    [Required]
    [Range(0d, double.MaxValue,
        ErrorMessage = $"{nameof(Net)} must be a positive decimal number.")]
    public decimal Net { get; private init; }
}