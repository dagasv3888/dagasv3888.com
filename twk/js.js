$(document).ready(function(){
    /*owl*/
    var owl = jQuery("#news_index");
    owl.owlCarousel({
        autoPlay: 5000,
        items: [3],
        itemsDesktop: [1000, 3],
        itemsDesktopSmall: [900, 2],
        itemsTablet: [600, 1],
        itemsMobile: [479, 1],
        slideSpeed: 1000
    });
    jQuery(".next").click(function () {
        owl.trigger('owl.next');
    });
    jQuery(".prev").click(function () {
        owl.trigger('owl.prev');
    });
    /*owl*/
	$("#amount").keyup(function() {
		var amount = $(this).val();
		var read_number = '';
		if(amount == 0 || amount == '' || amount.indexOf('.') > -1 || amount.indexOf(' ') > -1){
			read_number = 'Xin vui lòng nhập số. Không nhập dấu chấm và khoảng trắng';
		}else{
			read_number = readNumber.doc(amount)+' đồng.';
		}
		$(this).closest(".input").find(".read-number").html(read_number);
	});
	
    $("body").on("contextmenu",function(e){
        return false;
    });
});

function saveDeposit() {
	var username = $("#username").val();
	var fullname = $("#fullname").val();
	var phone = $("#phone").val();
	var amount = $("#amount").val();
	var bank_received = $("#bank_received").val();
	var account_number_received = $("#account_number_received").val();
	if(username.indexOf(' ') >= 0) {
	    $("#username").closest(".input").find(".error").html("Tên đăng nhập không được chứa khoảng trắng.");
	    return;
	}
	$("#loading").css("display", "block");
	$.ajax({
		url: "/home/insertDeposit",
		type: "POST",
		dataType: "json",
		data: {
			username: username,
			fullname: fullname,
			phone: phone,
			amount: amount,
			bank_received: bank_received,
			account_number_received: account_number_received
		},
		success: function (data) {
			// console.log(data);
			// var data = JSON.parse(data);
			$("#loading").css("display", "none");
			if(data.status == 'error'){
				if(data.error == 'validate'){
					error_message = JSON.parse(data.data);
					$("#username").closest(".input").find(".error").html(error_message.username);
					$("#fullname").closest(".input").find(".error").html(error_message.fullname);
					$("#phone").closest(".input").find(".error").html(error_message.phone);
					$("#amount").closest(".input").find(".error").html(error_message.amount);
					$("#bank_received").closest(".input").find(".error").html(error_message.bank_received);
					$("#account_number_received").closest(".input").find(".error").html(error_message.account_number_received);
				}else{
					swal({
                        title: "Lập lệnh thất bại!",
                        type: "warning",
                        text: "Đã có lỗi xảy ra trong quá trình xử lý. Quý khách vui lòng thử lại sau hoăc <b>Chát hỗ trợ trực tuyến</b> để được hỗ trợ.<br/><button type=\'button\' id=\'btnClosePopupSweetAlert\'>Đóng</button>",
                        html: true,
                        showConfirmButton: false
                    });
				}
			}else{
                swal({
                    title: "Lập lệnh thành công!",
                    type: "success",
                    text: "Lệnh nạp tiền của Quý khách sẽ được xử lý trong giây lát.<br/>Xin cảm ơn quý khách.<br/><button type=\'button\' id=\'btnClosePopupSweetAlert\'>Đóng</button>",
                    html: true,
                    showConfirmButton: false
                });
                $('#btnClosePopupSweetAlert').click(function(){
                    window.location.replace(window.location.protocol+'//'+window.location.hostname);
                })
			}
		}
	})
}

function saveWithdrawal() {
	$("#loading").css("display", "block");
	var username = $("#username").val();
	var phone = $("#phone").val();
	var bank_account = $("#bank_account").val();
	var fullname = $("#fullname").val();
	var amount = $("#amount").val();
	var bank_account_number = $("#bank_account_number").val();
	$.ajax({
		url: "/home/insertWithdrawal",
		type: "POST",
		dataType: "json",
		data: {
			username: username,
			phone: phone,
			fullname: fullname,
			amount: amount,
			bank_account: bank_account,
			bank_account_number: bank_account_number
		},
		success: function (data) {
			// console.log(data);
			// var data = JSON.parse(data);
			$("#loading").css("display", "none");
			if(data.status == 'error'){
				if(data.error == 'validate'){
					error_message = JSON.parse(data.data);
					$("#username").closest(".input").find(".error").html(error_message.username);
					$("#phone").closest(".input").find(".error").html(error_message.phone);
					$("#fullname").closest(".input").find(".error").html(error_message.fullname);
					$("#amount").closest(".input").find(".error").html(error_message.amount);
					$("#bank_account").closest(".input").find(".error").html(error_message.bank_account);
					$("#bank_account_number").closest(".input").find(".error").html(error_message.bank_account_number);
				}else if(data.error == 'exist'){
					swal({
                        title: "Lập lệnh thất bại!",
                        type: "warning",
                        text: "Ngày hôm nay quý khách đã đặt lệnh rút tiền. Quý khách vui lòng đợi trong giây lát để bộ phận Nạp Rút tiền của công ty xử lý.<br/><button type=\'button\' id=\'btnClosePopupSweetAlert\'>Đóng</button>",
                        html: true,
                        showConfirmButton: false
                    });
				}else if(data.error == 'time'){
					swal({
                        title: "Lập lệnh thất bại!",
                        type: "warning",
                        text: "Quý khách vui lòng đặt lệnh rút tiền trong thời gian quy định để bộ phận Nạp Rút tiền của công ty xử lý.<br/><button type=\'button\' id=\'btnClosePopupSweetAlert\'>Đóng</button>",
                        html: true,
                        showConfirmButton: false
                    });
				}else{
					swal({
                        title: "Lập lệnh thất bại!",
                        type: "warning",
                        text: "Đã có lỗi xảy ra trong quá trình xử lý. Quý khách vui lòng thử lại sau hoăc <b>Chát hỗ trợ trực tuyến</b> để được hỗ trợ.<br/><button type=\'button\' id=\'btnClosePopupSweetAlert\'>Đóng</button>",
                        html: true,
                        showConfirmButton: false
                    });
				}
			}else{
                swal({
                    title: "Đặt lệnh rút tiền thành công!",
                    type: "success",
                    text: "Lệnh rút tiền của Quý khách đang được xử lý, Quý khách vui lòng đợi trong giây lát. Xin cảm ơn!<br/><button type=\'button\' id=\'btnClosePopupSweetAlert\'>Đóng</button>",
                    html: true,
                    showConfirmButton: false
                });
                $('#btnClosePopupSweetAlert').click(function(){
                    window.location.replace(window.location.protocol+'//'+window.location.hostname);
                })
			}
		}
	})
}

var readNumber=function(){var t=["không","một","hai","ba","bốn","năm","sáu","bảy","tám","chín"],r=function(r,n){var o="",a=Math.floor(r/10),e=r%10;return a>1?(o=" "+t[a]+" mươi",1==e&&(o+=" mốt")):1==a?(o=" mười",1==e&&(o+=" một")):n&&e>0&&(o=" lẻ"),5==e&&a>=1?o+=" lăm":4==e&&a>=1?o+=" bốn":(e>1||1==e&&0==a)&&(o+=" "+t[e]),o},n=function(n,o){var a="",e=Math.floor(n/100),n=n%100;return o||e>0?(a=" "+t[e]+" trăm",a+=r(n,!0)):a=r(n,!1),a},o=function(t,r){var o="",a=Math.floor(t/1e6),t=t%1e6;a>0&&(o=n(a,r)+" triệu",r=!0);var e=Math.floor(t/1e3),t=t%1e3;return e>0&&(o+=n(e,r)+" nghìn",r=!0),t>0&&(o+=n(t,r)),o};return{doc:function(r){if(0==r)return t[0];var n="",a="";do ty=r%1e9,r=Math.floor(r/1e9),n=r>0?o(ty,!0)+a+n:o(ty,!1)+a+n,a=" tỷ";while(r>0);return n.trim().charAt(0).toUpperCase() + n.trim().slice(1)}}}();
