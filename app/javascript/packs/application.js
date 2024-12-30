// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import 'materialize-css/dist/js/materialize'

import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import * as ActiveStorage from "@rails/activestorage"
import "channels"

Rails.start()
Turbolinks.start()
ActiveStorage.start()

document.addEventListener('turbolinks:load', function () {
  M.updateTextFields();

  let textareas = document.querySelectorAll('.materialize-textarea')
  if (textareas.length) {
    textareas.forEach(textarea => M.textareaAutoResize(textarea))
  }

  let tooltippedElems = document.querySelectorAll('.tooltipped');
  if (tooltippedElems.length) {
    M.Tooltip.init(tooltippedElems);
  }

  if (localStorage.getItem('dark-mode') === 'enabled') {
    document.body.classList.add('dark-mode');
  }

  const toggleDarkModeButton = document.getElementById('toggle-dark-mode');
  if (toggleDarkModeButton) {
    toggleDarkModeButton.addEventListener('click', function(event) {
      event.preventDefault();
      document.body.classList.toggle('dark-mode');

      if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('dark-mode', 'enabled');
      } else {
        localStorage.setItem('dark-mode', 'disabled');
      }
    });
  }


  // Load language state from localStorage
  let currentLanguage = localStorage.getItem('language') || 'es';
  setLanguage(currentLanguage);

  // Toggle language
  const toggleLanguageButton = document.getElementById('toggle-language');
  if (toggleLanguageButton) {
    toggleLanguageButton.addEventListener('click', function(event) {
      event.preventDefault();
      currentLanguage = currentLanguage === 'es' ? 'en' : 'es';
      setLanguage(currentLanguage);
      localStorage.setItem('language', currentLanguage);
    });
  }

  function setLanguage(language) {
    const elements = document.querySelectorAll('[data-lang]');
    elements.forEach(element => {
      const langText = element.getAttribute(`data-lang-${language}`);
      if (element.tagName === 'INPUT' && element.type === 'text') {
        element.setAttribute('placeholder', langText);
      } else {
        element.textContent = langText;
      }
    });

    // Update tooltips
    const tooltippedElems = document.querySelectorAll('.tooltipped');
    if (tooltippedElems.length) {
      tooltippedElems.forEach(elem => {
        const instance = M.Tooltip.getInstance(elem);
        if (instance) {
          instance.destroy();
        }
        const tooltipText = elem.getAttribute(`data-lang-${language}`);
        elem.setAttribute('data-tooltip', tooltipText);
      });
      M.Tooltip.init(tooltippedElems);
    }
  }

  const orderSelector = document.getElementById('order-selector');
  if (orderSelector) {
    const savedOrder = localStorage.getItem('order') || 'created_at_desc';
    orderSelector.value = savedOrder;
    M.FormSelect.init(orderSelector);

    orderSelector.addEventListener('change', function() {
      localStorage.setItem('order', orderSelector.value);
      window.location.search = `order=${orderSelector.value}`;
    });
  }
  
})
