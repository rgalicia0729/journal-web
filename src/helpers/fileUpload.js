
export const fileUpload = async (file) => {
    if (!file) throw new Error('No se encontro ningun archivo a subir');

    const uploadUrl = 'https://api.cloudinary.com/v1_1/dy0vwldp7/upload';

    const formData = new FormData();
    formData.append('upload_preset', 'journal-web');
    formData.append('file', file);

    try {
        const resp = await fetch(uploadUrl, {
            method: 'POST',
            body: formData,
        });

        if (!resp.ok) throw new Error('Error al subir la imagen');

        const cloudResp = await resp.json();

        return cloudResp.secure_url;
    } catch (err) {
        console.error(err);
        throw new Error(err.message);
    }
}