//obtener la latitud y longitud del usuario de 14 decimales
const getLocation = () => {
    return new Promise((resolve, reject) => {
        document.addEventListener("DOMContentLoaded", () => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
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
};

//imprimir la ubicacion del usuario
getLocation()
    .then(({ lat, lon }) => {
        // Redondear a 6 decimales
        lat = parseFloat(lat.toFixed(6));
        lon = parseFloat(lon.toFixed(6));

        console.log(lat, lon);
    })
    .catch((error) => {
        console.error('Error al obtener la ubicación: ', error);
    });