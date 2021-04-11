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
                } else if (this.classList.contains('active')) {
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


    let deg = 6
    let arrow_hh = document.querySelector('#arrow_hh')
    let arrow_mm = document.querySelector('#arrow_mm')
    let digital_clock__box = document.querySelectorAll('.digital_clock__box')

    let currentTimeBtn = document.querySelector('#currentTimeBtn')
    let customTimeBtn = document.querySelector('#customTimeBtn')
    let currentTime;
    let customTime;
    let count = 0

    const findAndRemoveAllItemArr = (arr, value) => {
        let i = 0;
        while (i < arr.length) {
            if (arr[i] === value) {
                arr.splice(i, 1);
            } else {
                ++i;
            }
        }
        return arr;
    }

    const currentTimeFunction = () => {
        let day = new Date()
        let hh = (day.getHours() + (1 / 60) * day.getMinutes()) * 30
        let mm = (day.getMinutes() + (1 / 60) * day.getSeconds()) * deg

        let timeString = day.toLocaleTimeString('en-GB');
        let newTimeArr = timeString.split('')
        findAndRemoveAllItemArr(newTimeArr,':')

        console.log(newTimeArr)

        arrow_hh.style.transform = `rotateZ(${(hh) + (mm / 12)}deg)`
        arrow_mm.style.transform = `rotateZ(${mm}deg)`


        digital_clock__box.forEach((el, i) => {
            el.textContent = newTimeArr[i]
        })

    }

    const customTimeFunction = () => {
        count += 1
        console.log(count)
    }

    const removeEvent = () => {
        clearInterval(currentTime)
        clearInterval(customTime)
    }

    currentTimeBtn.addEventListener('click', () => {
        removeEvent()
        currentTime = setInterval(currentTimeFunction, 1000)
    })

    customTimeBtn.addEventListener('click', () => {
        removeEvent()
        customTime = setInterval(customTimeFunction, 1000)
    })


});



