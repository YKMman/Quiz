const data = [
    {
        name: {
            placeholder: 'Your name',
            pattern: '.{3,}',  // regexp,
            type: 'text',
            output: '' // user 
        },
        surname: {
            placeholder: 'Your surname',
            pattern: '.{3,}', // regexp
            type: 'text',
            output: '' // user
        },
        phone: {
            placeholder: 'Your number',
            pattern: '.{18,}', // regexp,
            type: 'number',
            output: '' // user
        },
        email: {
            placeholder: 'Your email',
            pattern: '[^@\s]+@[^@\s]+\.[^@\s]+', // regexp,
            type: 'email',
            output: '' // user
        }
    },
    {
        // select
        Ноутбук: {
            price: 1500,
            check: false,
        },
        Компьютер: {
            price: 1500,
            check: false
        },
        Микрофон: {
            price: 1500,
            check: false
        },
        Клавиатура: {
            price: 1500,
            check: false
        }
    }
]


window.addEventListener('DOMContentLoaded', () => {
    const quiz = document.querySelector('.quiz')
    const form = quiz.querySelector('.quiz__form')
    const passed = quiz.querySelector('.quiz__passed')
    const fase = quiz.querySelector('.quiz__fase')
    const modal = document.querySelector('.modal')
    const next = quiz.querySelector('.quiz__next')
    const prev = quiz.querySelector('.quiz__prev')

    let currentStep = 0


    form.addEventListener('submit', (e) => {
        e.preventDefault()
    })

    // ! 0 - этап
    function maskPhone(masked = '+7 (___) ___-__-__') {
        const elems = document.querySelectorAll("[attr-name='phone']");

        function mask(event) {
            const keyCode = event.keyCode;
            const template = masked,
                def = template.replace(/\D/g, ""),
                val = this.value.replace(/\D/g, "");
            let i = 0,
                newValue = template.replace(/[_\d]/g, function (a) {
                    return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
                });
            i = newValue.indexOf("_");
            if (i !== -1) {
                newValue = newValue.slice(0, i);
            }
            let reg = template.substr(0, this.value.length).replace(/_+/g,
                function (a) {
                    return "\\d{1," + a.length + "}";
                }).replace(/[+()]/g, "\\$&");
            reg = new RegExp("^" + reg + "$");
            if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
                this.value = newValue;
            }
            if (event.type === "blur" && this.value.length < 5) {
                this.value = "";
            }
            data[0]['phone'].output = this.value
            console.log(data[0]['phone'].output)
        }   
    
        for (const elem of elems) {
            elem.addEventListener("input", mask);
            elem.addEventListener("focus", mask);
            elem.addEventListener("blur", mask);
        }
        
    }

    const renderInputs = () => {
        const keys = Object.keys(data[currentStep])
        let values = Object.values(data[currentStep])
        const divContent = document.createElement('div')
        divContent.classList.add('quiz__form-grid')

        values = values.map((el,index) => {
            return `
            <label class="form__label">
                <input type='text' value='${el.output}' placeholder='${el.placeholder}' pattern='${el.pattern}' required class='form__input' attr-name='${keys[index]}'/>
            </label>
            `
        })

        for (let i = 0; i < values.length; i++) {
            divContent.innerHTML += values[i]
        }
        
        return divContent
    }

    function addInputListener(input) {
        input.addEventListener('input', (e) => {
            const inputName = e.target.getAttribute('attr-name')
            const inputData = e.data
    
            if (data[0][`${inputName}`].type === 'number') return 
            else data[0][`${inputName}`].output += inputData
        })
    }
    
    const listenerInputs = () => {
        const inputs = quiz.querySelectorAll('.form__input')
    
        inputs.forEach(input => {
            addInputListener(input)
        })
    }

    const checkFormInputs = () => {
        let count = 0
        let values = Object.values(data[0])

        values.forEach(el => {
            let regexp = new RegExp(`${el.pattern}`)

            if (!regexp.test(el.output)) {
                count++
            }
        })

        if (count === 0) {
            return true
        }
        activeModal()
        return false
    }

    const updateBtnClasses = () => {
        if (currentStep === 0) {
            prev.classList.add('quiz__prev-disabled')
        } else {
            prev.classList.remove('quiz__prev-disabled')
        }
    }
    
    next.addEventListener('click', (e) => {
        if (currentStep > 1) {
            e.preventDefault()
        } else {
            if (currentStep == 0) {
                if (checkFormInputs()) {
                    currentStep += 1
                    startQuiz(currentStep)
                }
            } else {
                currentStep += 1
                startQuiz(currentStep)
            }
        }
        updateBtnClasses()
    })
    
    prev.addEventListener('click', (e) => {
        if (currentStep > 1) {
            e.preventDefault()
        } else {
            if (currentStep < 1) {
                e.preventDefault()
            } else {
                currentStep -= 1
                startQuiz(currentStep)
                updateBtnClasses()
            }
        }
        

    })


    // ! 1 - этап
    const renderSelect = () => {
        const keys = Object.keys(data[currentStep])
        let values = Object.values(data[currentStep])

        const divContent = document.createElement('div')

        divContent.classList.add('quiz__form-flex')
        let content = ''

        values = values.map((el,index) => {
            return `
            <li class='select__product' attr-index='${index}' attr-price='${el.price}' attr-check='${el.check}' attr-name='${keys[index]}'>
                <input type="checkbox" id="option2" class='select__input' />
                <label for="option2" class='select__label'>${keys[index]}</label>
            </li>
            `
        })
        content = `    
            <div class="custom-select">
            <button class="select-button">
            <span class="selected-value">Выберите продукты</span>
            <span class="arrow"></span>
            </button>
        `
        for (let i = 0; i < values.length; i++) {
            if (i === 0) {
                content += `
                    <ul class="select-dropdown">
                `
            }
            content += values[i]
            if ((i + 1) === values.length) {
                content += `
                </ul>
                </div>
                `
            }
        }
        divContent.innerHTML = content


        return divContent
    }

    const listenerDropDown = () => {
        var selectButton = document.querySelector('.select-button');
        var selectDropdown = document.querySelector('.select-dropdown');
        
        if (!selectButton || !selectDropdown) {
            throw new Error('Dropdown button or list not found');
        }

        selectButton.addEventListener('click', function(e) {
            e.stopPropagation()
            e.preventDefault()
            selectDropdown.classList.toggle('select-active')
        });
    }

    const listenerCheckbox = () => {
        const selectProducts = quiz.querySelectorAll('.select__product')

        selectProducts.forEach((el, index) => {
            el.addEventListener('click', (e) => {
                e.preventDefault()
                let input = el.querySelector('.select__input')
                const targetName = el.getAttribute('attr-name')

                if (input.checked) {
                    input.checked = false
                    data[1][targetName].check = false
                } else {
                    input.checked = true
                    data[1][targetName].check = true
                }
            })
        })
    }

    const renderEnd = () => {
        const div = document.createElement('div')

        let values = Object.values(data[1])

        let productsPrice = 0

        const context = values.map((el, index) => {
            if (el.check) {
                productsPrice += el.price
            }
        })


        div.innerHTML = `
        <div class="last">
            <span class="last__name">${data[0].name.output}</span>
            <span class="last__price">${productsPrice}рублей</span>
        </div>
        `


        form.appendChild(div)
    }

    const activeModal = () => {
        modal.classList.add('modal-active')
        modal.textContent = 'Заполните поля'

        setTimeout(() => {
            modal.classList.remove('modal-active')
        }, 1500)
    }   


    const startQuiz = (currentStep) => {
        // очистка 
        form.innerHTML = ''
        if (currentStep <= 2) {
            // отображаем какой сейчас этап на экране
            passed.textContent = currentStep
            fase.textContent = `0${currentStep}/0${data.length}`
        }

        switch(currentStep) {
            case 0: 
                form.appendChild(renderInputs())
                listenerInputs()
                maskPhone()
            break 

            case 1: 
                form.appendChild(renderSelect())
                listenerDropDown()
                listenerCheckbox()
            break

            case 2:
                renderEnd()
            break
        }

        if (currentStep > 2) {
            renderEnd()
        }
        updateBtnClasses()
    }

    startQuiz(currentStep)

})
























