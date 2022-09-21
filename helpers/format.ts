export const numberFormatter = new Intl.NumberFormat('en-US', {
  style: 'decimal',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

export const formatNumber = {
  format: (val?: number): string => {
    if (!val) {
      return '0';
    }
    return numberFormatter.format(val);
  },

  /**
   * works like formatNumber.format but do not round number
   * formatRoundDown(66.6666) => 66.66
   * format(66.6666) => 66.67
   * @param value
   * @param decimals Significant decimals
   */
  formatRoundDown: (value: number, decimals = 3): string => {
    if (!value) {
      return '0';
    }
    const significantDigits =
      parseInt(value.toExponential().split('e-')[1]) || 0;
    const decimalsUpdated = (decimals || 0) + significantDigits - 1;
    decimals = Math.min(decimalsUpdated, value.toString().length);

    return numberFormatter.format(
      Math.floor(value * 10 ** decimals) / 10 ** decimals
    );
  },

  /**
   * Works as formatNumber.format but adds % at the end
   * @param val
   */
  formatPercent: (val?: number) => {
    return `${formatNumber.format(val)}%`;
  },

  /**
   * Works as formatNumber.formatPercent but prints integer value if it is possible
   * @param val
   * @param precision (default = 3)
   */
  formatPercentRounded: (val: number, precision = 3) => {
    const power = Math.pow(10, precision);
    const precisedValue = Math.round(val * power) / power;
    return Number.isInteger(precisedValue) ? `${precisedValue}%` : `${formatNumber.format(precisedValue)}%`;
  },

  /**
   * Works as formatNumber.format but adds $ at the start of the string
   * @param val
   */
  formatUsd: (val?: number) => {
    return `$ ${formatNumber.format(val)}`;
  }
};
