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

getLocation()
.then(({ lat, lon }) => {
    // Redondear a 6 decimales
    lat = parseFloat(lat.toFixed(14));
    lon = parseFloat(lon.toFixed(14));

    console.log(lat, lon);
})