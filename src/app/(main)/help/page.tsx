import "bootstrap/dist/css/bootstrap.min.css"; // Asegúrate de importar Bootstrap

export default function HelpPage() {
  return (
    <main className="min-vh-100 d-flex flex-column align-items-center justify-content-center bg-light text-dark">
      <div className="container text-center py-5">
        <h1 className="display-4">Centro de Ayuda</h1>
        <p className="lead">
          Bienvenido al Centro de Ayuda. Aquí encontrarás información y recursos que te ayudarán a resolver tus dudas y problemas.
        </p>
        <div className="mt-4">
          <h2 className="h3">Secciones de Ayuda</h2>
          <ul className="list-unstyled mt-3">
            <li><a href="#faq" className="text-primary">Preguntas Frecuentes (FAQ)</a></li>
            <li><a href="#contact" className="text-primary">Contacto con Soporte</a></li>
            <li><a href="#troubleshooting" className="text-primary">Solución de Problemas</a></li>
            <li><a href="#guides" className="text-primary">Guías de Usuario</a></li>
          </ul>
        </div>
        <div className="mt-5">
          <h2 id="faq" className="h3">Preguntas Frecuentes (FAQ)</h2>
          <p>
            Aquí puedes encontrar respuestas a las preguntas más comunes sobre nuestro servicio.
          </p>
        </div>
        <div className="mt-5">
          <h2 id="contact" className="h3">Contacto con Soporte</h2>
          <p>
            Si necesitas asistencia personalizada, por favor contacta a nuestro equipo de soporte a través de <a href="mailto:dlatouches811@ulacit.ed.cr" className="text-primary">dlatouches811@ulacit.ed.cr</a>.
          </p>
        </div>
        <div className="mt-5">
          <h2 id="troubleshooting" className="h3">Solución de Problemas</h2>
          <p>
            Encuentra soluciones a problemas comunes y consejos útiles para resolver cualquier inconveniente.
          </p>
        </div>
        <div className="mt-5">
          <h2 id="guides" className="h3">Guías de Usuario</h2>
          <div className="container my-5">
  <h2>Guía de Usuario para la Red Social Artisan</h2>
  
  <h3>1. Crear una cuenta</h3>
  <ol>
    <li>Accede a la página principal de la red social y selecciona Registrarse.</li>
    <li>Rellena el formulario de registro con tu nombre, correo electrónico y una contraseña segura.</li>
    <li>
      Si lo prefieres, puedes registrarte utilizando tus cuentas de Google o Facebook haciendo clic en los botones correspondientes.
    </li>
    <li>Acepta los términos y condiciones, y haz clic en Registrarse.</li>
    <li>
      Recibirás un correo de confirmación. Haz clic en el enlace para verificar tu cuenta.
    </li>
  </ol>
  
  <h3>2. Iniciar sesión</h3>
  <ol>
    <li>Una vez creada tu cuenta, accede a la página de inicio de sesión.</li>
    <li>Introduce tu correo electrónico y contraseña, o inicia sesión con Google o Facebook si elegiste esa opción durante el registro.</li>
    <li>Haz clic en Iniciar sesión para acceder a tu perfil.</li>
  </ol>

  <h3>3. Publicar y compartir contenido</h3>
  <ol>
    <li>En tu página de inicio o perfil, verás un cuadro de texto donde puedes crear una nueva publicación.</li>
    <li>Escribe un mensaje, comparte enlaces, imágenes o videos.</li>
  </ol>
</div>

        </div>
      </div>
    </main>
  );
}
