export function phoneMask(value: string): string {
  // Remove all non-numeric characters
  value = value.replace(/\D/g, '')

  // Apply the mask
  if (value.length > 11) value = value.substring(0, 11)

  const formattedValue = value
    .replace(/^(\d{2})(\d)/g, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')

  return formattedValue
}
