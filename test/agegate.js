var AGEGATE = {

	configs : {
		'home' : '/'
		,'cookieId' : 'pra2Mk3EGHddM3pVMKAXvnRyapZB7HCQ'
	}

	,init : function() {
		AGEGATE.buildOverlay();
		AGEGATE.check();
	}

	,check : function() {
		var cookie = AGEGATE.cookie.get(AGEGATE.configs.cookieId);
		if(cookie) {
			AGEGATE.cookie.set(AGEGATE.configs.cookieId, 1, 365);
		} else {
			$('#agegate-overlay').show();
		}
	}

	,checkAge : function() {
		var month = $('[name=month]').val();
		var day = $('[name=day]').val();
		var year = $('[name=year]').val();

		if(!isNaN(parseInt(month)) && !isNaN(parseInt(day)) && !isNaN(parseInt(year))) {
			var tdate = new Date(),
				tyear = tdate.getFullYear(),
				tmonth = tdate.getMonth(),
				tday = tdate.getDate(),
				age = tyear - parseInt(year);
			if(tmonth < (parseInt(month) - 1))
				age--;
			if(((parseInt(month) - 1) == tmonth) && (tday < parseInt(day)))
				age--;
			if(age >= 21) {
				AGEGATE.cookie.set(AGEGATE.configs.cookieId, 1, 365);
				$('#agegate-overlay').fadeOut();
			} else  {
				$('#ag-error-text').html('You must be 21 to enter this site').show();
			}
		}
	}

	,buildOverlay : function() {
		var html = '';

		html += '<div id="agegate-overlay">';
		html += '<div class="ag-modal">';

		html += '<div class="logo"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAVoAAABpCAYAAAB7yOvBAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4FpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0N2NmNTRhOS0yNDU2LTRlZjEtYjkzOC1lNjJmMWMxMjE2NzkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RjNBQzRERkE1NjU2MTFFNTkzOEZFRTU5QTA5NTY2OUUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RjNBQzRERjk1NjU2MTFFNTkzOEZFRTU5QTA5NTY2OUUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDEyNTQ5YzUtOWFlMy00N2Q2LThjM2MtNjM5MGQzZGViNTY2IiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6NGNlNjhjNjAtOTE2OC0xMTc4LWEzNzEtZjhjNTFhNjE4ZDYwIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+riJH6AAAE1dJREFUeNrsnQe4FcUVx+c94AmIgIoKihoUo4KK2CVR7IoVe09ij4oa22csibFEjT1i18+GDUvsBQVFBFtEDRqNNQaVoogKooC893L+7tyPYd7se/fe3Z0t9//7vvPde2f37s7uzJ6dOXPmTF1zc7MipIbZXOREkToR82FoJzJdb/uet4lEoX0b27cRWS7G86Ei/6gr7kyRz0S+zMi9qBcZKtIpo2X1kcirEf6/i0hX4zfK4WGRpozX0a1FelppyPecmI7/C13uYZwW8/UMEFlLf8cz8FSO9MV2IssYv98QeS+mYzeI7F6GTorKAl13cO+naB3UmPSNq2ujRfuByGoJnn+eyBci/xV5W+R1kQkin6ZQiRp0frLKI20ohLaYK7KYlYbf8zP+cL8rsqaVtqrIJzEdf0OR10K2QYn0i/l6rhE5xvh9k8iROVG0k0VWNH7/VeSsmI69lMjXKVzTFK1v3tUvjlf1p9cW7dSEFS0e9FW0bG2kvyByu8jdHpUf3jgzRHpktJLPiPj/z7WCMo+XB7vRNIeiXRDj8Y9rZRvOO1DkzRjP9431+wiRsbquZ50plqL9LsZjN+lnfTHP17S8lkFG2oe6YXOvyMS4usttXXwaDBa5Rbd0z/R43sYMV/KeMVTkvFyrzzq4TBvb107ghW5zl25s5K0smgv6/KFxeYrRw/5t0i1al33jAlWdfQxKvYNIZ5HuKrD9rqRbWd1D/tNL5HyRfXR3a4LnGz5bv9mywFhFkuAckR1Cts31eN+fEenL4liEr0Tui/F49brFvITuufbSOqhzK/8ZpOUEkYuqzU+livYnkbNjvpldRPrrVuzeIhs49llHZLzIoSK3eixoGMoPZn0vNEu1sq2jCrwPfIAGx80ih7NIFunCD0v4HEuL/FLrne1VYMLs6NgPJqSRunzQ6PsoTtOBTZ2K34YJDwQYoC9WwcAEFO5DIfvCnHCYx4LuwLpeeLZvY/t6HvOCun0Qi2SRF13SYADuZZHhIjurwAsFdvPnQ/bfVgWDpBW9EOszeHPHiewhsp9yD4TdHNLqJaQa2rLBDvCcnxEqGJwh6TBd65it9Et4TIglAN4i1+RZ0ZYYqU0G3zi2PcP6QGJitYjbo+IauX+exZIJoGcwlwBjRC6vH5gQns67ogXw493Ekb6kyMmsByQiGJBdoY19+iSchytELrPSYDO8nsWTGe4XWUPkQcc2tHqfzbuiLSlbl68jBuUaWAdIBOATWleGok3yOcEI+CmOFtNRKjChkWwAW+5eKhhLskGr97G8K1pwtch/HBV0KMufRKB3Gfssq5K1ma6hP7dybEMLqheLKVNgSvbxjvSdQ5RwrhRtqYvlujhCorRoy6FngnkoDfhiCvoZju1PsZgyBzwU/uxIP1UFMUVyrWhdLl/0PiBRKDdg0lKe8nOhajm4Aq+Ha1lUmeM8kdsc6bDndsizosUsETtSEJy8u7LMSZUsmTFFCxDByg7LeLTITiyuzHGIyMdWGmae3ZFnRQvesX43VND9I8SmW5n7dfeYJ0z73c6RjtCQtNdmjyGONMwBWC/PinaqI40tWpK0ou3mOV+YqWSHH4STPO212QPThK9zpA/Ps6Kd7UjjNFmStKJdIoW8IdbraCsN9trLWWyZ4xTdEzFBIJr186poXT6P81jOpErKVaBdUsrfjiKzrLQTQ7qrJD1+UMFAps2FeVW0rkGJKSxnUiXlmp06p5Q/RMtzDYIhdGd3Fl+mgPupHZ8XAWh65lHR2vPOYbP9jGVMqqCjKt+boGOK+UR4UDv4PcxlY1iEmQJmTZcL6oF5U7SIC7qRlfYKy5dE6B2V2ypsn3JeEWzfDnq/Xkh3laTHjY60vfOmaBGQ17apjWTZkiqpZFrtMhnIL1y+vrXS/qjoX5slRqnA399kY9S1PCnaE6zfWC74AZYtqZLtK9h3www0SjDg4ppyjngI3VicmVK2NjvlRdFiqu2OVhrCJDayXEkVwBRwagX7Q5EdlYF8w3xwrpWGmUiMz5wdxjnSNsmLorWNzJiKexvLlFTJuVW0Ai9S6dtqwdmOhxljF7TXZoM3HGnr5kHRomtkhrNrrrDbR4gJBsBOr+J/cAXLiqlqV21KMIG9disWb+qgEfijldY364oWFdsOfgxnbbp0kWq5I8J/d1PBoGzaYPkb1xLpiPy1OIs4VfACtAPNdMiqot1EN8H3dLzJR7EsSZX0UyHxQitgWEau5UUVhOpb5IFWjIeQBSZbvxdkTdFirSQEY0BQjYFGOtZQh5vEYyxDEoFNYzjGlio7Sygh+LRtr91M5HwWdaq0mK1aqaKFfXRGzJmCP+MBIo+LvO9oMUDxYrmP11K4YT8VuDIsyMn1fR/jsZaL4RgYROubofsDb5z5Vhpmkg2ivkuNmXZCpaOo2P/kKit/nW4JIEDH0iIrqWBKbX9HPmBMvkfk7yKTUrxhiHU7wvM5P1HByHLSYFAII+lZd5EbEOOx4gqp2S5D92eOCgaH7SXKn9L1dxb1nndmRVW0sAFdmlDmmlQwrxvT2O7KyA3DTLSDPJ9zhidFi0GT02rsAehU0J7OWBWEVTzTeqk8KrIF9V76vbCs2WixtAhsYLA97axqc8YLPSqSI6763pzBa0OgcDv2x2BVnSsbicb8qC3apB+CtbWUwNzuUbqFWysDYb5WjICyyEMs34YYFWRcx2nK6L1CPIRpatGwjghIgwGzCdR/3mgXVdHiwfyVyDcRM4LzYuog7IR9VOBtsJbIuiIrG/th+75a3tQt3cc93rDPRfb3XEizPZooBqjsD4hhwsrmbNGWXXeGqpZTcp9QQWCcIg/uZonOURUt3uQTY87Ui9Zv+NDC1xErTJqL0Q3UrVo8eIcqP0Z+nGN8QSsDvA6m5iCfc2JuxcdBlgcQn1WBe5e55lg33TPkzDE/dIn6hofnQI+EMwk7E4z6WEoca/HYrhKYxPBvFe9odBhFXo+sPifX18DntmL+JPK6lYaxj5N5a7ywZFJdqSSAi9dlKnABe9ra1lubEtZlmZIUyEPUONhr7QUD4TG0AYsvcZbNk6ItgRYt4htc5Whdj1fpLZxHSJbBOMouIaaFet6eRFnB1lV5C/x9r5UGX1BOyyU+aVLZ9TqwGa17hSYYYH6YxZgoq1q/2+XtzQYPgP9ZaVuolkHBCUmKZpVdrwMXGOewp6/votNJ/MBrqqeV9lUeuxCHOdLOY/kSKtpQsK7YAivtEpH1WZyx4xqkn5RHRYtllt+z0rAiaB+WMfGkaPO2hNIMFW6vbc8ijRVXhLjX82oUH+5I25dlTEgo8Ny50kqDGxIXOI2XbR1po/OqaMeW+SYhJG4aVX4XBT1R5J9WGlaNOInFGguwz9rmmOkiE/KqaBEI/DvHRRJCWgf+tbaNGZ4J/XlrInOIIw0R1HLrT4c521Mc3SBCkqZJ5XuZewRq2tXVvVXZirNbFEV7Z54VLbBXmmxgRSGeaM55/hGY6QorDS5JD7JoqwZTnFey0hBLZFzeFW0HR0ujmeVNPLRomwpwHbDLvmWlwV57FIu4Ki52pF1U+pJnRWubCuYU5AEg2W/NFuWFjmhethnkekV7baVgwpQdQwKrLAzPu6JFbM1eVtqXLG9CRVsRiIewlyP9SRZzRdzgSPuLWU/yqmhXVy3tsZ+wvAlNBxWDuAeXW2mwNdJeWx6IiNbbSsMEkUViTORV0e7gSBvHMieeWrRFA3Fq37bS9lDu6e5kIdsqd4zfFr2EvCraIxxpj7LciQcaVTHHArBkub3Uzc2690hasopyRw7E+oYvFEHR7q1aBtZ9SdFGS0gU4Iq0pyN9jPGdcREClhZ5VQXrHpp8KnKQ6w95VLRXOdIuZdkTTxTNRmuCFtq1VhqCWJcGe+aw+H9eSBaru9hLesGkNDjsT3lTtAj8bcd6xCDYQyx/UgbNMR2jyP7ax4q8Y6UdqQKH/NdrvP5g+vIbIis6tm0tMrkIihajeK4IXbtTf5AyaYzpGEWfGOOKQIXGzDY1XHcQvxcrCS8eomSfb+3PeVC0sIOMUO4IQwj4PYn6g3huFRdd0U5zNGCwZHktLoYKDwKsuu1akQJxIzYTea6tg9Tn4CIR5NtlYEawhj/zuSdUtIkA/9oba7SMMb0fg+4vi9wv0s+xD8JNYjWF8eUcsH0VlWxGwhe5slawB4oMDNnnJhXYjZLmJ+qVwinJqBR5MMwGcQ8GiayV0vnnezwXTAJbqGDZH0Q3W6GVfRHD4PRKDl6poq3XWnxmhAvCMuGY1dVRd0eW1cq1n+6abKz3CXtQYEK40tPNX0JXtCyAAMIfU1dGIo4eXK0FLoJ/7RcpnRv6oX/M5Q9TZBcVuGhhRldfrXsG6LTWgB32LBW4k1ZEpYoWmXwrpZuO+deIEP+Bx3NidHFCRir83bqVT6pnsZhatLUE4j5jEHpkCudeU7X0gEiDV0QuVBEmRWXdARkjvFjT6AbVxqheDTBfkah0iOEYXWvwvt2nu9VH19A1I+DOP0TuUYtO2khE0f7gWZF8JfKhCgzNGMl72uP5YY9dkOGC/ypmRb1A5cMG7aqDk6s81tUiv4uYn+ci/v9r6/fsnCieY0SWV0HM2hJxzsb8NsXeAs4N88i7KpjxNSbunjsULQJHdA7ZvqWnC52mFSzMAvAy+FgrBgyKLeOp5Y1zrJDhig53m88i/N+2deFaT8z4yyWsDp5X5UNeF0N+5okcF+H/tvlnSMTj+XzhTbQU7aEqsKPGQRctvq/pI61vPtAChYtZX/uLLKWi2/VxzFF1zc3Nr+oDN4e0ouYlbBqYq1tW7bTC76ZveBpmjakqu+tBYVQ0yrpo0yylivvdKwcP+AxdR0x6qeqWLUJdnh7x4emoWk6/rIRZWkp0Um0PwmQFtMaxKGqD/t09RuUI/TNF+RtsnKsbc426DHAdXfX3upjOgXr2CBo0ULSKEEJIctTzFhBCCBUtIYRQ0RJCCKGiJYQQKlpCCKGiJYQQQkVLCCFUtIQQQkVLCCGEipYQQqhoCSGEUNESQggVLSGEUNESQgihoiWEECpaQgihoiWEEEJFSwghVLSEEFLrtOctKAy9RTaqYP/vRZ5JKC9Y3G5vFSwoiYU3R6rwpc13FFlOf8dCdjMTvEerify6jP1eUcFqzHkGC1juELINCyxi1em3U8xfX5HN9PfSMt8+6SkyyJGOBTyx2vSkWB8ILs5YGH4vcl0VCjEJsEKtueJud/1wu5gssqL+vrHIawneoz+IXFHGfpeKnJrz+rCrfnG1xpsip4uMSiF/KOcN9XcooQarziTNXiL3t7Idy5DfKHIJW7TE5EvdSjXB8u0l89BcqyJ/nHB+sHT08jpPTa3sZyraeQnnyVT23+p75mJSAerDHOP7TKO8odBWVcHy2gNFnhbZxHOLsrehZEsvfCi+ez3mYa7Vu5umnxUs/d5Nt7gvFllZZFjUk9FGWxwe0xXYlIeN7btb2zZLOD/N1mdb+/nmZpHVQ2REwerGoyowK0HW1eV/m7H9HM/5Ocx48ZVMRUd7zoNZ76DgV9MvIDQODjRe+sfqOkFFS37mJ11xTTFbuF9Y22bX+P2qJZtZO0fL/njj96opKdpbRU7R3zdXgV057brwg8jdIhcaaVtS0ZLWWMz43i3FfDRmUOHVUt1v50ibb3WdfYHBz5Kp6HGtbEsck9L9cZlQ3zS+N7CykazTpFsJYcxPKV/zaqgMZjnSLgj5njTHGd9f0p/v6M9hKd2fuY60/Yzvke3XHAwjSQMXrydV+IjywJTydbDIplbaNyL7Kr+j3z7YXuR2/b2TSD+R/iJviZws8pynfPRQC13O4BHxo/5+hwoGnuCdspPIE57vT1eRJXXLH25fh4rsb7wMqGhJ5kEdG5LBfK1odGGL3svro8XV0v3W88uthOlmd5NuVaOuHJ2Coj1AK1aYuDoY6a9oxZ+IbYKQOEGr5Uj9afrtlmyz54uskUK+xoo8ZKX9UMDWbKnre4PxIumhu8YYgJqo/PkNl8wG74u8YKRD2cNWe4RWbN09vwDqtJgv2XNFzo6ztUFIksAGe2cr249MSdGOFrmqRspgolp00An8TQUzw9ZSwcg/Jrt8kmAetjBa1Uvol1xH/Rt2/N7GvsP0C9gXD6hg4sb6aqEv75A4FS0Hw0jS1OsHK4zOKeWrRw2VQfeQdNPPep2E82D6ycJXdagK7LWQHa3zH+v5/kxXwUwwTBUvuXVhQsVjbNESEo1ZNXStc0LStzO+f5bg+TEguof+jlbzSSH7naACn9We2qwxztP9MV/2Z6jAZosZYTurwK4ceQILFS2pVfrobrOLqSJfF+halzeuFbZIBPH5jVoYhAjToN9I8PwHGbrmGhUeg+FTFXhClFrA41K6X/uohZ4Gt+iWf6QJPjQdFJuOxvd2ns+9uP7soloPXtPJY300R5TRUnk7RA4vQNmb5b2TcW2I4/CsWugBAB/S3VSyE0fMKb6txTP4l1oYf2I/3bJNivYhzwlAwJsrjP3GRD0ZFW2xMUMTNnk+9zzjs7nMPCY9S6yxzP2K4HnQVnmj9YjoVP2MVmQSDNYtaJTtfSoINtQa5xvldISnuuAK4XmS0crfUJs1qub/AgwAZCBxR8cx3e0AAAAASUVORK5CYII="/></div>';

		html += '<h1>MOST BARTENDERS IN AMERICA ARE OVER 21.</h1>';
		html += '<h2>But just in case, please enter your birthday.</h2>';

		html += '<div class="col">';
		html += '<label>MM</label>';
		html += '<div class="ag-select"><select name="month">';
		html += '<option value="">PLEASE CHOOSE</option>';
		for(i=1; i<=12; i++) {
			html += '<option value="'+i+'">'+i+'</option>';
		}
		html += '</select></div>';
		html += '</div>';

		html += '<div class="col">';
		html += '<label>DD</label>';
		html += '<div class="ag-select"><select name="day">';
		html += '<option value="">PLEASE CHOOSE</option>';
		for(i=1; i<=31; i++) {
			html += '<option value="'+i+'">'+i+'</option>';
		}
		html += '</select></div>';
		html += '</div>';

		html += '<div class="col">';
		html += '<label>YYYY</label>';
		html += '<div class="ag-select"><select name="year">';
		html += '<option value="">PLEASE CHOOSE</option>';
		for(i=2015; i>=1920; i--) {
			html += '<option value="'+i+'">'+i+'</option>';
		}
		html += '</select></div>';
		html += '</div>';

		html += '<div class="clearfix"></div>';

		html += '<div id="ag-error-text"></div>';
		html += '<button id="submit-age">SUBMIT</button>';

		html += '</div>';
		html += '</div>';

		$('body').prepend(html);

		$(document).on('click', '#submit-age', function(e) {
			AGEGATE.checkAge();
		});
	}

	,cookie : {
		set : function(name, value, days) {
			if (days) {
				var date = new Date();
				date.setTime(date.getTime()+(days*24*60*60*1000));
				var expires = "; expires="+date.toGMTString();
			} else var expires = "";
			document.cookie = name+"="+value+expires+"; path=/";
		}
		,get : function(name) {
			var nameEQ = name + "=";
			var ca = document.cookie.split(';');
			for (var i=0;i < ca.length;i++) {
				var c = ca[i];
				while (c.charAt(0)==' ') c = c.substring(1,c.length);
				if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
			}
			return null;
		}
		,remove : function(name) {
			AGEGATE.cookie.set(name,"",-1);
		}
	}

}
AGEGATE.init();
