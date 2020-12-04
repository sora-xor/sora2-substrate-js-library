export const formatBalance = (amount: string, decimals: number) => {
  const integer = amount.slice(0, decimals)
  const fractional = amount.slice(decimals).replace(/0*$/g, '')
  return `${integer}${fractional ? '.' : ''}${fractional}`
}
