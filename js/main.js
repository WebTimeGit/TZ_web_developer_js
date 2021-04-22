document.addEventListener("DOMContentLoaded", function () {

    //SCROLL TO TOP
    let toTopBtn = document.querySelector('#scroll_top')
    if (toTopBtn) {
        toTopBtn.addEventListener('click', scroll_top)

        function fadeScroll() {
            if (window.scrollY !== 0) {
                toTopBtn.classList.add('visible')
            } else {
                toTopBtn.classList.remove('visible')
            }
        }

        function scroll_top() {
            document.body.scrollIntoView({block: "start", behavior: "smooth"})
        }
    }

    window.onscroll = function () {
        fadeScroll()
    };


    // Start clock  script
    let arrow_hh = document.querySelector('#arrow_hh')
    let arrow_mm = document.querySelector('#arrow_mm')

    let currentTime;
    let customTime;

    let deg = 6
    let customTimeArr = document.querySelectorAll('[name="time"]')
    let getCustomTimeArr = []
    let customHh
    let customMm
    let customSec = 0

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


    // Функция получаем и устанавливаем текущее время
    const currentTimeFunction = () => {
        getCustomTimeArr = []
        let day = new Date()
        let getHh = day.getHours()
        let getMm = day.getMinutes()

        let hh = getHh * 30
        let mm = (getHh * 360) + (getMm * deg)

        arrow_hh.style.transform = `rotateZ(${(hh) + ((getMm * deg) / 12)}deg)`
        arrow_mm.style.transform = `rotateZ(${mm}deg)`

        let timeString = day.toLocaleTimeString('en-GB');
        let newTimeArr = timeString.split('')
        console.log('текущее время ' + timeString.substr(0, 5))
        findAndRemoveAllItemArr(newTimeArr, ':')

        customTimeArr.forEach((el, i) => {
            el.value = newTimeArr[i]
            getCustomTimeArr.push(el.value)
        })
    }

    currentTime = setInterval(currentTimeFunction, 1000)



    // Получаем массив с полей input времени + мини проверка
    const getTimeArrFunction = () => {
        customTimeArr.forEach((el, i) => {
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
        el.addEventListener('keydown', function (event) {
            // Разрешаем: backspace, delete, tab и escape
            if (event.keyCode === 46 || event.keyCode === 8 || event.keyCode === 9 || event.keyCode === 27 ||
                // Разрешаем: Ctrl+A
                (event.keyCode === 65 && event.ctrlKey === true) ||
                // Разрешаем: home, end, влево, вправо
                (event.keyCode >= 35 && event.keyCode <= 39)) {
                // Ничего не делаем
                return
            } else {
                // Запрещаем все, кроме цифр на основной клавиатуре, а так же Num-клавиатуре
                if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
                    event.preventDefault()
                }
            }
        });
    })


    // Функция получаем и устанавливаем кастомное время
    const customTimeFunction = () => {

        getCustomTimeArr = []
        getTimeArrFunction()

        let getHh = customHh
        let getMm = customMm
        customSec++
        if (getHh < 10) getHh = "0" + getHh
        if (getMm < 10) getMm = "0" + getMm
        if (customSec < 10) customSec = "0" + customSec


        let hh = getHh * 30
        let mm = (getHh * 360) + (+getMm * deg)

        arrow_hh.style.transform = `rotate(${(hh) + ((customMm * deg) / 12)}deg)`
        arrow_mm.style.transform = `rotate(${mm}deg)`

        let timeString = `${getHh}${getMm}`;
        console.log('кастомные часы ' + timeString.match(/.{1,2}/g).join(":"))
        let newTimeArr = timeString.split('')
        customTimeArr.forEach((el, i) => {
            el.value = newTimeArr[i]
        })

        if (customSec === 60) {
            console.log('+1 minute')
            customMm += 1
            customSec = 0
            console.log(customMm)
            console.log(customSec)
        } else if (getMm === 60) {
            console.log('+1 hour')
            customHh += 1
            customMm = 0
        } else if (customHh >= 24) {
            console.log('+1 hour')
            customHh = 0
            customMm = 0
            customSec = 0
        }
    }

    customTimeArr.forEach((el, i) => {
        el.addEventListener('keydown', ()=>{
            clearInterval(currentTime)
            clearInterval(customTime)

            customTime = setInterval(customTimeFunction, 1000)
        })
    })

});