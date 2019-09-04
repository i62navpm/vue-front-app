export default function(value) {
  if (!value) return ''

  const mapSpecialty = {
    apellidosynombre: 'Apellidos y nombre',
    tipodevacantes: 'Tipo de vacantes',
    'centroasignado/funciónasignada': 'Centro asignado/Función asignada',
    datpresentación: 'Dat. presentación',
    tipopuesto: 'Tipo de puesto',
    tipovacante: 'Tipo de vacante',
    listName: 'Listado',
    puntuacion: 'Puntuación',
    date: 'Fecha',
    asinacion: 'Asignación',
    nif: 'NIF',
    baremo11: 'Baremo 1.1',
    baremo12: 'Baremo 1.2',
    baremo13: 'Baremo 1.3',
    baremo14: 'Baremo 1.4',
    baremo211: 'Baremo 2.1.1',
    baremo212: 'Baremo 2.1.2',
    baremo22: 'Baremo 2.2',
  }
  return mapSpecialty[value] || value
}
