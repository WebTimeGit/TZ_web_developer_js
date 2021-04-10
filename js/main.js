document.addEventListener("DOMContentLoaded", function () {

    // ACCORDION INITIALIZATION START
    let containerAcc = document.querySelector('.accWrapper');
    let titleAcc = document.querySelectorAll('.accTitle');

    if (containerAcc && titleAcc) {
        for (let i = 0; i < titleAcc.length; i++) {
            titleAcc[i].addEventListener('click', function (e) {

                if (containerAcc.classList.contains('single')) {
                    titleAcc.forEach(accItem => {
                        accItem.classList.remove('active');
                        accItem.nextElementSibling.classList.remove('open');
                    })
                    this.classList.add('active');
                    this.nextElementSibling.classList.add('open');
                }

                else if (this.classList.contains('active')){
                    this.classList.remove('active')
                    this.nextElementSibling.classList.remove('open');
                } else {
                    this.classList.toggle('active')
                    this.nextElementSibling.classList.toggle('open');
                }
            })
        }
    }
    // ACCORDION INITIALIZATION END


    // RESET PLACEHOLDER INPUT ON CLICK START
    let form_input = document.querySelectorAll('.remove_placeholder');

    if (form_input) {
        for (let i = 0; i < form_input.length; i++) {
            form_input[i].addEventListener('click', function () {
                let thisElement = this;

                let savePlaceholder = this.getAttribute('placeholder');

                this.setAttribute('placeholder', ' ');
                document.addEventListener('mouseup', function () {
                    thisElement.setAttribute('placeholder', savePlaceholder);
                });
            });
        }
    }
    // RESET PLACEHOLDER INPUT ON CLICK END



});



