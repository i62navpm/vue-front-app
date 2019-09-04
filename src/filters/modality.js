export default function(value) {
  if (!value) return ''

  const mapModality = {
    assignmentList: 'Asignación definitiva',
    normalList: 'Listado ordinario',
    bilingualList: 'Listado bilingüe',
    voluntaryList: 'Listado de voluntarios',
    citationList: 'Citaciones ordinarias',
    citationVoluntaryList: 'Citaciones de voluntarios',
    incorporateList: 'Listado de incorporados',
    nextCitationList: 'Siguientes a citar',
  }
  return mapModality[value] || value
}
