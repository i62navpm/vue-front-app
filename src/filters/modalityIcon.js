export default function(value) {
  if (!value) return ''

  const mapModality = {
    assignmentList: 'assignment_ind',
    normalList: 'school',
    bilingualList: 'language',
    voluntaryList: 'directions_run',
    citationList: 'update',
    voluntaryListDynamic: 'pan_tool',
    incorporateList: 'autorenew',
    nextCitationList: 'mood',
  }
  return mapModality[value]
}
