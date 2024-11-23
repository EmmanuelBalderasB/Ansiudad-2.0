// Menu
const toggleButtonCheckbox = document.querySelector('.menu__toggle-checkbox');
const menu = document.querySelector('.menu');
const menuBottom = document.querySelector('.menu__bottom');
const menuLinks = document.querySelectorAll('.menu__link');

// Función para alternar el menú
const toggleMenu = () => {
  const isExpanded = menu.classList.toggle('menu--expanded');
  if (isExpanded) {
    menuBottom.classList.add('menu__bottom--visible');
  } else {
    menuBottom.classList.remove('menu__bottom--visible');
  }
};

// Evento para mostrar/ocultar el menú al cambiar el estado del checkbox
toggleButtonCheckbox.addEventListener('change', toggleMenu);

// Cerrar el menú al hacer clic en un enlace
menuLinks.forEach((link) => {
  link.addEventListener('click', () => {
    menu.classList.remove('menu--expanded');
    menuBottom.classList.remove('menu__bottom--visible');
    toggleButtonCheckbox.checked = false; // Desmarcar el checkbox para restablecer el icono
  });
});