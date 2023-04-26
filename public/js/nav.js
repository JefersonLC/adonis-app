// Topbar script
const topNavbar = document.querySelector('.top-navbar')
let lastScroll = window.scrollY

window.onscroll = function () {
  const currentScroll = window.scrollY

  if (lastScroll > currentScroll) topNavbar.classList.remove('hide')
  else topNavbar.classList.add('hide')

  lastScroll = currentScroll
}

// Sidebar script
const sidebar = document.querySelector('.side-navbar')
const toggleButtons = document.querySelectorAll('.sidebar-toggle')
const overlay = document.querySelector('.overlay')
const body = document.getElementsByTagName('body')[0]

toggleButtons.forEach((button) => {
  button.addEventListener('click', () => {
    sidebar.classList.toggle('sidebar-hidden')
    sidebar.classList.toggle('sidebar-show')
    overlay.classList.toggle('overlay-show')
    body.classList.toggle('overlay-show')
  })
})

const maxWidth = 768 //px
let previousWidth = window.innerWidth //px
let actualWidth

window.addEventListener('resize', () => {
  actualWidth = window.innerWidth

  if (actualWidth >= maxWidth && previousWidth <= maxWidth) {
    sidebar.classList.add('sidebar-hidden')
    sidebar.classList.remove('sidebar-show')
    overlay.classList.remove('overlay-show')
    body.classList.remove('overlay-show')
  }

  previousWidth = actualWidth
})
