﻿function openModal(parameters) {
    const id = parameters.data
    const url = parameters.url
    const modal = $('#modal')

    $.ajax({
        type: 'GET',
        url: url,
        data: { 'id': id },
        success: function (response) {
            modal.find('.modal-body').html(response)
            modal.modal('show')
        },
        failure: function () {
            modal.modal('hide')
        },
        error: function (response) {
            alert(response.responseText)
        }
    })
}