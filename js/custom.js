$(function () {
    window.addEventListener('load', function () {
        let forms = $('.needs-validation');
        let validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                } else {
                    let from = $("#from").val();
                    let to = $("#to").val();
                    let value = $("#value").val();
                    if (from != to) {
                        event.stopPropagation();
                        let result = eval(from + 2 + to + "(value)");
                        $("#result").text(result);
                        if ($('#save-history').is(":checked")) {
                            let date = new Date();
                            let datetime = date.getDate() + "/"
                                    + (date.getMonth() + 1) + "/"
                                    + date.getFullYear() + "-"
                                    + date.getHours() + ":"
                                    + date.getMinutes() + ":"
                                    + date.getSeconds();
                            localStorage.setItem(datetime, [value + '(' + from + ')' + '=' + result + '(' + to + ')']);
                        }
                    } else {
                        $("#result").text("");
                    }
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);

    $("#clear").click(function () {
        $("#value").val("");
        $("#result").text("");
    });

    $("#get-local-storage").click(function () {
        $('#history > .card > .card-body > p, hr').remove();
        Object.keys(localStorage).forEach(function (key) {
            $('#history > .card > .card-body').append(
                "<p>" + key + " ---> " + localStorage.getItem(key) + " " +
                "<a href='#' class='del' data-value=" + key + ">delete</a>" + "</p><hr/>"
            );
        });
    });

    $("#clear-local-storage").click(function () {
        localStorage.clear();
        $('#history > .card > .card-body > p, hr').remove();
    });

    $(document.body).on('click', '.del', function () {
        localStorage.removeItem($(this).data('value'));
        $(this).closest('p').next().remove();
        $(this).closest('p').remove();
    });

    function bin2hex(param) {
        return parseInt(param, 2).toString(16);
    }

    function bin2dec(param) {
        return parseInt(param, 2).toString(10);
    }

    function dec2bin(param) {
        return parseInt(param, 10).toString(2);
    }

    function dec2hex(param) {
        return parseInt(param, 10).toString(16);
    }

    function hex2bin(param) {
        return parseInt(param, 16).toString(2);
    }

    function hex2dec(param) {
        return parseInt(param, 16).toString(10);
    }

});