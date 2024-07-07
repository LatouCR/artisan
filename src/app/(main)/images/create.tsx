"use client"
import { useUser } from "@clerk/nextjs"
import { UploadButton } from "src/utils/uploadthing"

const Create = () => {

    const { isLoaded, user } = useUser();

    if (!isLoaded || !user) {
        return null;
    }
   

    return (
        <>
            <div>
                <h1>Prueba de Subida de Imagenes</h1>
                <h1 className="text-red-600 text-base font-semibold">Para subir una imagen, iniciar sesion!</h1>
            </div>

            <div>
                { user.id && <UploadButton endpoint="imageUploader" />}
            </div>
        </>
    )
}

export default Create