export default function(value) {
  if (!value) return ''

  const mapSpecialty = {
    apellidosynombre: 'Apellidos y nombre',
    tipodevacantes: 'Tipo de vacantes',
    'centroasignado/funciónasignada': 'Centro asignado/Funcón asignada',
    datpresentación: 'Dat. presentación',
    tipopuesto: 'Tipo de puesto',
  }
  return mapSpecialty[value] || value
}
