using VatCalculatorAPI.Enums;

namespace VatCalculatorAPI.Dtos;

/// <summary>
/// Represents a PriceDto in different formats.
/// </summary>
public class PriceDto
{
    /// <summary>
    /// The Net amount of the price.
    /// </summary>
    /// <example>265.48</example>
    public decimal Net { get; init; }

    /// <summary>
    /// The Gross amount of the price.
    /// </summary>
    /// <example>299.99</example>
    public decimal Gross { get; init; }

    /// <summary>
    /// The vat amount of the price.
    /// </summary>
    /// <example>34.51</example>
    public decimal Vat { get; init; }
}