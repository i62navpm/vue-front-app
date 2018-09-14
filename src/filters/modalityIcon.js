export default function(value) {
  if (!value) return ''

  const mapModality = {
    assignmentList: 'sentiment_satisfied_alt',
    normalList: 'school',
    bilingualList: 'language',
    voluntaryList: 'directions_run',
    citationList: 'update',
    voluntaryListDynamic: 'pan_tool',
    incorporateList: 'sentiment_very_dissatisfied',
  }
  return mapModality[value]
}
