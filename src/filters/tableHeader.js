export default function(value) {
  if (!value) return ''

  const mapSpecialty = {
    apellidosynombre: 'Apellidos y nombre',
    tipodevacantes: 'Tipo de vacantes',
    'centroasignado/funciónasignada': 'Centro asignado/Funcón asignada',
  }
  return mapSpecialty[value] || value
}
