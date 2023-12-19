// Inicie com o modo claro
document.documentElement.setAttribute('data-modo', 'claro');
document.getElementById('changeColorIconLightMode').style.display = 'none';

document.getElementById('changeColorIconNightlight').addEventListener('click', function() {
    document.documentElement.setAttribute('data-modo', 'escuro');
    document.getElementById('changeColorIconNightlight').style.display = 'none';
    document.getElementById('changeColorIconLightMode').style.display = 'block';
});

document.getElementById('changeColorIconLightMode').addEventListener('click', function() {
    document.documentElement.setAttribute('data-modo', 'claro');
    document.getElementById('changeColorIconNightlight').style.display = 'block';
    document.getElementById('changeColorIconLightMode').style.display = 'none';
});


document.getElementById('changeLanguageIcon').addEventListener('click', function() {
    mostrarIdiomas();
});

function mostrarIdiomas() {
    const languageOptionsContainer = document.querySelector('.language-options-container');
    languageOptionsContainer.style.display = 'flex'; // Alterado para flex para centralizar os itens
}

document.getElementById('closeButton').addEventListener('click', function() {
    fecharIdiomas();
});

function fecharIdiomas() {
    const languageOptionsContainer = document.querySelector('.language-options-container');
    languageOptionsContainer.style.display = 'none';
}

const btnMobile = document.getElementById('btn-mobile');

function toggleMenu(event) {
  if (event.type === 'touchstart') event.preventDefault();
  const nav = document.getElementById('nav');
  nav.classList.toggle('active');
  const active = nav.classList.contains('active');
  event.currentTarget.setAttribute('aria-expanded', active);
  if (active) {
    event.currentTarget.setAttribute('aria-label', 'Fechar Menu');
  } else {
    event.currentTarget.setAttribute('aria-label', 'Abrir Menu');
  }
}

btnMobile.addEventListener('click', toggleMenu);
btnMobile.addEventListener('touchstart', toggleMenu);