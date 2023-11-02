const latEmpresa = 16.6162396;
const lonEmpresa = -93.0904446;

function getLocation() {
  return new Promise((resolve, reject) => {
    document.addEventListener("DOMContentLoaded", () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
            //obtener la latitud y longitud del usuario de 14 decimales
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
          resolve({ lat, lon });
        },
        (error) => {
          reject(error);
        }
      );
    });
  });
}

getLocation()
  .then(({ lat, lon }) => {
    // Redondear a 6 decimales
    lat = lat
    lon = lon

    const distancia = distanciaHaversine(latEmpresa, lonEmpresa, lat, lon);

    console.log("Latitud empresa: ", latEmpresa);
    console.log("Longitud empresa: ", lonEmpresa);
    console.log("Latitud usuario: ", lat);
    console.log("Longitud usuario: ", lon);

    if (distancia < 0.01) {
      alert('Las ubicaciones están dentro de un rango de 10 metros.');
    } else {
      alert('Las ubicaciones están fuera del rango de 10 metros.');
    }
  })
  .catch((error) => {
    console.error('Error al obtener la ubicación: ', error);
  });

  function distanciaHaversine(latEmpresa, lonEmpresa, lat, lon) {
    const radioTierra = 6371; // Radio medio de la Tierra en kilómetros

    const radianesLatEmpresa = (latEmpresa * Math.PI) / 180;
    const radianesLat = (lat * Math.PI) / 180;

    const diferenciaLat = ((lat - latEmpresa) * Math.PI) / 180;
    const diferenciaLon = ((lon - lonEmpresa) * Math.PI) / 180;

    const a =
      Math.sin(diferenciaLat / 2) * Math.sin(diferenciaLat / 2) +
      Math.cos(radianesLatEmpresa) * Math.cos(radianesLat) *
      Math.sin(diferenciaLon / 2) * Math.sin(diferenciaLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distancia = radioTierra * c; // Distancia en kilómetros

    return distancia;
}

