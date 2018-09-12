export default function(value) {
  if (!value) return ''

  const mapModality = {
    assignmentList: 'Listado de asignaciones',
    normalList: 'Listado ordinario',
    bilingualList: 'Listado bilingüe',
    voluntaryList: 'Listado de voluntarios',
    citationList: 'Listado de citaciones',
  }
  return mapModality[value]
}
