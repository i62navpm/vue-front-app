import { specialtyCodes } from '@i62navpm/specialty-codes'
let mapSpecialty = specialtyCodes.primary.normalSpecialties.reduce(
  (acc, curr) => {
    acc[curr.id] = curr.description
    return acc
  },
  {}
)
mapSpecialty = specialtyCodes.primary.bilingualSpecialties.reduce(
  (acc, curr) => {
    acc[curr.id] = curr.description
    return acc
  },
  mapSpecialty
)

export default function(value) {
  if (!value) return ''

  return mapSpecialty[value] || value
}
