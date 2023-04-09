/* eslint-disable prettier/prettier */
const navbar = document.querySelector('.navbar')
let lastScroll = window.scrollY

window.onscroll = function () {
  const currentScroll = window.scrollY

  if (lastScroll > currentScroll) 
    navbar.classList.remove('hide')
  else 
    navbar.classList.add('hide')

  lastScroll = currentScroll
}
