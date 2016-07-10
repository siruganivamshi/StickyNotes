var stickyNotes;

function addNewStickyNote(title, content) {
    var stickyDiv = "<div class='" + '  stickydiv zoomInDown animated  ' + "'>" +
        "<i class='fa fa-times fa-2x close_sticky' aria-hidden='true'></i>" +
        "<div class='note-title'>" + title + "</div>" +
        "<div class='note-content'>" + content + "</div>" +
        "</div>";
    $("#stickyList").append(stickyDiv);
    $('.stickydiv').draggable();

    $('.close_sticky').click(function() {
        $(this).parent('div').fadeOut(500);
        //$(this).parent('div').remove();
    });


    var newNote = stickyNotes.find("li:last");
    newNote.find("img").click(function() {
        newNote.remove();
    });
}


$(document).ready(function() {
    stickyNotes = $("#stickyNotes");
    var dialog = document.querySelector('dialog');
    var showDialogButton = document.querySelector('#show-dialog');
    if(!dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
    }
    showDialogButton.addEventListener('click', function() {
        dialog.showModal();
    });
    dialog.querySelector('.close').addEventListener('click', function() {
        dialog.close();
    });
    dialog.querySelector('.create').addEventListener('click', function() {
        var header = $('#stkyHeader').val();
        var notes = $('#stkyNotes').val();
        var toastMessage = document.querySelector('#toastMessage');
        if(!header) {
            toastMessage.MaterialSnackbar.showSnackbar(
                {
                    message: 'Error: Missing sticky notes header.'
                }
            );
            return;
        }

        if(!notes) {
            toastMessage.MaterialSnackbar.showSnackbar(
                {
                    message: 'Error: Missing sticky notes message.'
                }
            );
            return;
        }
        if(header && notes) {
            toastMessage.MaterialSnackbar.showSnackbar(
                {
                    message: 'Success : sticky notes has been created.'
                }
            );
        }
        var stickyNotes = {header: header, notes: notes};
        addNewStickyNote(header, notes);
        dialog.close();
        $("#stkyHeader").val('');
        $("#stkyNotes").val('');

    });
});
