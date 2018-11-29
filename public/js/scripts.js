const toggleLock = (e) => {
  $(e.target).toggleClass('fa-lock-open')
  $(e.target).toggleClass('fa-lock')
}

$('.fas').on('click', toggleLock)

