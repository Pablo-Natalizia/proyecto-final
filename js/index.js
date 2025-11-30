document.addEventListener('DOMContentLoaded', function() {
    
    // =========================================================
    // --- 1. LÓGICA DE VALIDACIÓN DEL FORMULARIO DE INICIO DE SESIÓN ---
    // =========================================================

    // Función principal para validar credenciales y campos vacíos
    function validarForm() {
        console.log("ValidarForm ejecutada");
        const emailValido = "admin@admin.com";
        const pswValido = "admin123";

        // Asegúrate de que estos IDs (id_mail, id_psw, btn_login) 
        // existan en tu HTML de inicio de sesión.
        const usrEmail = document.getElementById('id_mail').value;
        const usrPsw = document.getElementById('id_psw').value;

        let esValido = true;

        // Validación de campos vacíos
        if(usrEmail.length < 1) {
            mostrarError('empty_email', 'El campo email no puede estar vacío');
            esValido = false;
        } else {
            ocultarError('empty_email');
        }

        if(usrPsw.length < 1) {
            mostrarError('empty_psw', 'El campo password no puede estar vacío');
            esValido = false;
        } else {
            ocultarError('empty_psw');
        }

        // Validación de credenciales hardcodeadas (solo si los campos no están vacíos)
        if (esValido && (emailValido !== usrEmail || pswValido !== usrPsw)) {
            mostrarError('login_error', 'Las credenciales no son válidas');
            esValido = false;
        } else {
            ocultarError('login_error');
        }

        return esValido;
    }

    // Funciones auxiliares para mostrar/ocultar errores (deben existir los elementos en el HTML)
    function mostrarError(fieldId, message) {
        const errorElement = document.getElementById(fieldId + '_error');
        if (errorElement) {
            errorElement.textContent = "❌ " + message;
            errorElement.style.display = 'block';
        }
    }

    function ocultarError(fieldId) {
        const errorElement = document.getElementById(fieldId + '_error');
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    }

    // Listener para el botón de Ingresar
    const btnIngresar = document.getElementById('btn_login');
    if (btnIngresar) {
        btnIngresar.addEventListener('click', function(event) {
            // Se corrige: event.preventDefault() para detener el envío del formulario
            event.preventDefault(); 
            console.log("Entramos en el listener de Ingresar");
            if(validarForm()) {
                // Redirigir si la validación es correcta
                window.location.href = "pages/bienvenida.html";
            }
        });
    }

    // =========================================================
    // --- 2. LÓGICA DE SCROLL Y MENÚ ACORDEÓN (bienvenida.html) ---
    // =========================================================
    
    // --- LÓGICA DE SCROLL Y CONTRACCIÓN DEL HEADER ---
    const body = document.body;
    const scrollPoint = 100; 

    function checkScroll() {
        if (window.scrollY > scrollPoint) {
            body.classList.add('scrolled');
        } else {
            body.classList.remove('scrolled');
        }
    }

    // Solo agregar listeners si la lógica de scroll es relevante (generalmente en bienvenida.html)
    if (body.classList.contains('scrolled') || document.getElementById('main-nav')) {
        window.addEventListener('scroll', checkScroll);
        checkScroll(); 
    }

    // --- CÓDIGO PARA EL MENÚ ACORDEÓN (HAMBURGUESA) ---
    
    const menuToggle = document.querySelector('.menu-toggle');
    // Se asume que le pusiste el id="nav-list-menu" a la <ul>
    const navList = document.getElementById('nav-list-menu'); 
    // Se asume que le pusiste el id="main-nav" al <nav>
    const mainNav = document.getElementById('main-nav'); 
    
    if (menuToggle && navList && mainNav) {
        menuToggle.addEventListener('click', function() {
            // Alternar la clase 'open' en la lista (para mostrar/ocultar)
            navList.classList.toggle('open');
            
            // Alternar la clase 'open' en el nav principal (para expandir el contenedor)
            mainNav.classList.toggle('open'); 

            // Alternar el atributo ARIA para accesibilidad
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
        });
        
        // CERRAR EL MENÚ AL HACER CLIC EN UN ENLACE
        const navLinks = navList.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                // Solo si el menú está abierto, lo cerramos
                if (navList.classList.contains('open')) {
                    navList.classList.remove('open');
                    mainNav.classList.remove('open');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }
});