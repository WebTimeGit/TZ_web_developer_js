document.addEventListener("DOMContentLoaded", function () {

    // ACCORDION INITIALIZATION START
    let containerAcc = document.querySelector('.accWrapper')
    let titleAcc = document.querySelectorAll('.accTitle')
    if (containerAcc && titleAcc) {
        for (let i = 0; i < titleAcc.length; i++) {
            titleAcc[i].addEventListener('click', function (e) {

                if (containerAcc.classList.contains('single')) {
                    titleAcc.forEach(accItem => {
                        accItem.classList.remove('active')
                        accItem.nextElementSibling.classList.remove('open')
                    })
                    this.classList.add('active')
                    this.nextElementSibling.classList.add('open')
                } else if (this.classList.contains('active')) {
                    this.classList.remove('active')
                    this.nextElementSibling.classList.remove('open')
                } else {
                    this.classList.toggle('active')
                    this.nextElementSibling.classList.toggle('open')
                }
            })
        }
    }
    // ACCORDION INITIALIZATION END


    // RESET PLACEHOLDER INPUT ON CLICK START
    let remove_placeholder = document.querySelectorAll('.remove_placeholder')
    if (remove_placeholder) {
        for (let i = 0; i < remove_placeholder.length; i++) {
            remove_placeholder[i].addEventListener('click', function () {
                let thisElement = this

                let savePlaceholder = this.getAttribute('placeholder')

                this.setAttribute('placeholder', ' ')
                document.addEventListener('mouseup', function () {
                    thisElement.setAttribute('placeholder', savePlaceholder)
                })
            })
        }
    }
    // RESET PLACEHOLDER INPUT ON CLICK END


    // Start clock  script
    let arrow_hh = document.querySelector('#arrow_hh')
    let arrow_mm = document.querySelector('#arrow_mm')
    let digital_clock__box = document.querySelectorAll('.digital_clock__box')

    let currentTimeBtn = document.querySelector('#currentTimeBtn')
    let customTimeBtn = document.querySelector('#customTimeBtn')
    let removeEventBtn = document.querySelector('#removeEvent')

    let currentTime;
    let customTime;

    let deg = 6
    let customTimeArr = document.querySelectorAll('[name="time"]')
    let getCustomTimeArr = []
    let customHh
    let customMm
    let customSec = 0

    // Получаем массив с полей input времени + мини проверка
    const getTimeArrFunction = () => {
        customTimeArr.forEach((el,i) => {
            if (el.value === '') {
                el.value = 0
            } else if (i === 0 && el.value > 2) {
                el.value = 0
            } else if (i === 2 && el.value > 5) {
                el.value = 0
            }
            getCustomTimeArr.push(el.value)
            customHh = Number(`${getCustomTimeArr[0]}${getCustomTimeArr[1]}`)
            customMm = Number(`${getCustomTimeArr[2]}${getCustomTimeArr[3]}`)
        })
    }

    //Валидация input ввода времени
    customTimeArr.forEach(el => {
        el.addEventListener('keydown', function(event) {
            // Разрешаем: backspace, delete, tab и escape
            if ( event.keyCode === 46 || event.keyCode === 8 || event.keyCode === 9 || event.keyCode === 27 ||
                // Разрешаем: Ctrl+A
                (event.keyCode === 65 && event.ctrlKey === true) ||
                // Разрешаем: home, end, влево, вправо
                (event.keyCode >= 35 && event.keyCode <= 39)) {
                // Ничего не делаем
                return
            } else {
                // Запрещаем все, кроме цифр на основной клавиатуре, а так же Num-клавиатуре
                if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
                    event.preventDefault()
                }
            }
        });
    })

    // Функция находит и удаляет с массива все не нужные индексы
    const findAndRemoveAllItemArr = (arr, value) => {
        let i = 0;
        while (i < arr.length) {
            if (arr[i] === value) {
                arr.splice(i, 1)
            } else {
                ++i
            }
        }
        return arr
    }

    // Функция отменяет все setInterval
    const removeEvent = () => {
        clearInterval(currentTime)
        clearInterval(customTime)
    }

    // Функция получаем и устанавливаем текущее время
    const currentTimeFunction = () => {
        let day = new Date()
        let getHh = day.getHours()
        let getMm = day.getMinutes()

        let hh = getHh * 30
        let mm = getMm * deg

        arrow_hh.style.transform = `rotateZ(${(hh) + (mm / 12)}deg)`
        arrow_mm.style.transform = `rotateZ(${mm}deg)`

        let timeString = day.toLocaleTimeString('en-GB');
        let newTimeArr = timeString.split('')
        findAndRemoveAllItemArr(newTimeArr, ':')

        digital_clock__box.forEach((el, i) => {
            el.textContent = newTimeArr[i]
        })
    }

    // Функция получаем и устанавливаем кастомное время
    const customTimeFunction = () => {
        let getHh = customHh
        let getMm = customMm
        customSec++
        if (getHh < 10) getHh = "0" + getHh
        if (getMm < 10) getMm = "0" + getMm
        if (customSec < 10) customSec = "0" + customSec

        if (customSec === 60) {
            console.log('+1 minute')
            customMm += 1
            customSec = 0
            arrow_hh.style.transition = `1s ease`
            arrow_mm.style.transition = `1s ease`
        } else if (getMm === 60 ) {
            console.log('+1 hour')
            customHh += 1
            customMm = 0
            arrow_hh.style.transition = `initial`
            arrow_mm.style.transition = `initial`
        } else if (customHh >= 24) {
            console.log('+1 hour')
            customHh = 0
            customMm = 0
            customSec = 0
            arrow_hh.style.transition = `initial`
            arrow_mm.style.transition = `initial`
        }

        let hh = customHh * 30
        let mm = customMm * deg
        arrow_hh.style.transform = `rotate(${(hh) + (mm / 12)}deg)`
        arrow_mm.style.transform = `rotate(${mm}deg)`

        let timeString = `${getHh}${getMm}`;
        let newTimeArr = timeString.split('')
        digital_clock__box.forEach((el, i) => {
            el.textContent = newTimeArr[i]
        })
    }

    // Кнопка активации текущего времени
    currentTimeBtn.addEventListener('click', () => {
        removeEvent()
        currentTime = setInterval(currentTimeFunction, 1000)
    })

    // Кнопка активации кастомного времени
    customTimeBtn.addEventListener('click', () => {
        removeEvent()
        getTimeArrFunction()
        customTime = setInterval(customTimeFunction, 200)
    })

    // кнопка отменяет все setInterval
    removeEventBtn.addEventListener('click', () => {
        removeEvent()
        getCustomTimeArr = []
    })

});



