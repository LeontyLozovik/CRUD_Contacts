var form = document.querySelector('.js-contact-form'),
    contactName = form.querySelector('.js-name'),
    phone = form.querySelector('.js-mobile-phone'),
    job = form.querySelector('.js-job-title'),
    birthday = form.querySelector('.js-birthday')

var removeBlockErrors = function () {
    let errors = form.querySelectorAll('.error')
    for (let i = 0; i < errors.length; i++) {
        errors[i].remove()
    }
}

var createBlockError = function (text) {
    let error = document.createElement('div')
    error.className = 'error'
    error.style.color = 'red'
    error.innerHTML = text
    return error
}

var createError = function (formObject, errorString) {
    if (errorString.length != 0) {
        let error = createBlockError(errorString)
        formObject.parentElement.insertBefore(error, formObject)
        formObject.style.border = '2px solid rgb(255, 0 , 0)'
        console.log(formObject + 'NOT valid')
    }
    else {
        formObject.style.border = '2px solid rgb(0, 196 , 0)'
        console.log(formObject + 'valid')
    }
}

var validateName = function (contactName) {
    let errorString = ''
    if (!contactName.value) {
        errorString += 'Field "Name" is required. '
    }
    else if (/[0-9]/.test(contactName.value)) {
        errorString += 'You should not have a numbers in your name.'
    }
    createError(contactName, errorString)
}

var validatePhone = function (phone) {
    let errorString = ''
    let reg = new RegExp('^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]{9,15}$')
    if (!phone.value) {
        errorString += 'Field "Mobile phone" is required. '
    }
    else if (!reg.test(phone.value)) {
        errorString += 'Incorrect phone number.'
    }
    createError(phone, errorString)
}

var validateJob = function (job) {
    let errorString = ''
    if (!job.value) {
        errorString += 'Field "Job title" is required.'
    }
    createError(job, errorString)
}

var validateBirthday = function (birthday) {
    let errorString = ''
    let date = new Date(birthday.value)
    if (!birthday.value) {
        errorString += 'Field "Birth date" is required.'
    }

    if (0 < (date - new Date))
        errorString += 'Incorrect date.'
    else if (date.getMonth < 1 || date.getMonth > 12)
        errorString += 'Incorrect month.'
    else if (date.getDay < 1 || date.getDay > 31)
        errorString += 'Incorrect day.'
    else if ((date.getMonth == 4 || date.getMonth == 6 || date.getMonth == 9 || date.getMonth == 11) && date.getDay == 31)
        errorString += 'Incorrect date.'
    else if (date.getMonth == 2) {
        let isleap = (date.getFullYear % 4 == 0 && (date.getFullYear % 100 != 0 || date.getFullYear % 400 == 0))
        if (date.getDay > 29 || (date.getDay == 29 && !isleap))
            errorString += 'Incorrect date.'
    }

    createError(birthday, errorString)
}

var validate = function (event) {
    removeBlockErrors()
    validateName(contactName)
    validatePhone(phone)
    validateJob(job)
    validateBirthday(birthday)

    let errors = form.querySelectorAll('.error')
    if (errors.length != 0) {
        event.preventDefault()
    }
}

form.addEventListener('submit', function (event) {
    validate(event)
    form.addEventListener('input', function () {
        validate(event)
    })
})