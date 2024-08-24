export default function HelpPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-200 text-black">
      <div className="container text-center py-8 ml-16"> 
        <h1 className="text-4xl font-bold">Centro de Ayuda</h1>
        <p className="text-lg mt-4">
          Bienvenido al Centro de Ayuda. 
        </p>
        <p>
        Aquí encontrarás información y recursos que te ayudarán a resolver tus dudas y problemas.
        </p>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold">Secciones de Ayuda</h2>
          <ul className="list-disc list-inside mt-4">
            <li><a href="#faq" className="text-blue-600 hover:underline">Preguntas Frecuentes (FAQ)</a></li>
            <li><a href="#contact" className="text-blue-600 hover:underline">Contacto con Soporte</a></li>
            <li><a href="#troubleshooting" className="text-blue-600 hover:underline">Solución de Problemas</a></li>
            <li><a href="#guides" className="text-blue-600 hover:underline">Guías de Usuario</a></li>
          </ul>
        </div>
        <div className="mt-12">
          <h2 id="faq" className="text-2xl font-semibold">Preguntas Frecuentes (FAQ)</h2>
          <p className="mt-2">
            Aquí puedes encontrar respuestas a las preguntas más comunes sobre nuestro servicio.
          </p>
        </div>
        <div className="mt-12">
          <h2 id="contact" className="text-2xl font-semibold">Contacto con Soporte</h2>
          <p className="mt-2">
            Si necesitas asistencia personalizada, por favor contacta a nuestro equipo de soporte a través de <a href="mailto:dlatouches811@ulacit.ed.cr" className="text-blue-600 hover:underline">dlatouches811@ulacit.ed.cr</a>.
          </p>
        </div>
        <div className="mt-12">
          <h2 id="troubleshooting" className="text-2xl font-semibold">Solución de Problemas</h2>
          <p className="mt-2">
            Encuentra soluciones a problemas comunes y consejos útiles para resolver cualquier inconveniente.
          </p>
        </div>
        <div className="mt-12">
          <h2 id="guides" className="text-2xl font-semibold">Guías de Usuario</h2>
          <div className="container my-12">
            <h2 className="text-2xl font-bold">Guía de Usuario para la Red Social Artisan</h2>

            <h3 className="text-xl mt-6 font-semibold"> 1. Crear una cuenta</h3>
            <ol className="list-decimal list-inside mt-4">
              <li>Accede a la página principal de la red social y selecciona Registrarse.</li>
              <li>Rellena el formulario de registro con tu nombre, correo electrónico y una contraseña segura.</li>
              <li>Si lo prefieres, puedes registrarte utilizando tus cuentas de Google o Github.</li>
              
            </ol>

            <h3 className="text-xl mt-6 font-semibold"> 2. Iniciar sesión</h3>
            <ol className="list-decimal list-inside mt-4">
              <li>Una vez creada tu cuenta, accede a la página de inicio de sesión.</li>
              <li>Introduce tu correo electrónico y contraseña, o inicia sesión con Google o Github si elegiste esa opción.</li>
              <li>Haz clic en Iniciar sesión para acceder a tu perfil.</li>
            </ol>

            <h3 className="text-xl mt-6 font-semibold"> 3. Publicar y compartir contenido</h3>
            <ol className="list-decimal list-inside mt-4">
              <li>En tu página de inicio o perfil, verás un cuadro de texto donde puedes crear una nueva publicación.</li>
              <li>Escribe un mensaje, comparte enlaces, imágenes o videos.</li>
            </ol>
          </div>
        </div>
      </div>
    </main>
  );
}
