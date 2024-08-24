export default function HelpPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-200 text-black">
      <div className="flex items-center justify-center w-full flex-col">

        <h1 className="text-4xl font-bold my-8">Centro de Ayuda</h1>
        <p className="text-lg mt-4">
          Bienvenido al Centro de Ayuda. Aquí encontrarás información y recursos que te ayudarán a resolver tus dudas y problemas.
        </p>

        <h2 className="mt-16 mb-8 text-3xl tracking-tight font-extrabold text-gray-900">Preguntas Frecuentes (FAQ)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
          <FAQItem
            question="¿Cómo puedo restablecer mi contraseña?"
            answer="Para restablecer tu contraseña, ve a la página de inicio de sesión y haz clic en '¿Olvidaste tu contraseña?'. Se te enviará un enlace de restablecimiento a tu correo electrónico."
          />
          <FAQItem
            question="¿Cómo puedo actualizar mi información de perfil?"
            answer="Para actualizar tu información de perfil, inicia sesión en tu cuenta y ve a la sección de configuración. Allí podrás cambiar tu nombre, correo electrónico, contraseña y otros detalles."
          />
          <FAQItem
            question="¿Cómo puedo eliminar mi cuenta?"
            answer="Para eliminar tu cuenta, inicia sesión y ve a la sección de configuración. Encontrarás la opción para eliminar tu cuenta al final de la página."
          />
          <FAQItem
            question="¿Cómo puedo cambiar mi dirección de correo electrónico?"
            answer="Para cambiar tu dirección de correo electrónico, inicia sesión y ve a la sección de configuración. Allí podrás actualizar tu correo electrónico y verificar la nueva dirección."
          />
        </div>

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
          <h2 id="contact" className="text-2xl font-semibold">Contacto con Soporte</h2>
          <p className="mt-2">
            Si necesitas asistencia personalizada, por favor contacta a nuestro equipo de soporte a través de <a href="mailto:artisan@help.com" className="text-blue-600 hover:underline">artisan@help.com</a>.
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

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="mb-10">
      <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900">
        <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
        </svg>
        {question}
      </h3>
      <p className="text-gray-500">{answer}</p>
    </div>
  );
}
