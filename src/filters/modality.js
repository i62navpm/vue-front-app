export default function(value) {
  if (!value) return ''

  const mapModality = {
    assignmentList: 'Asignación definitiva',
    normalList: 'Listado ordinario',
    bilingualList: 'Listado bilingüe',
    voluntaryList: 'Listado de voluntarios',
    citationList: 'Citaciones ordinarias',
    voluntaryListDynamic: 'Citaciones de voluntarios',
    incorporateList: 'Listado de incorporados',
    nextCitationList: 'Siguientes a citar',
    nextVoluntaryList: 'Siguientes voluntarios a citar',
  }
  return mapModality[value] || value
}
