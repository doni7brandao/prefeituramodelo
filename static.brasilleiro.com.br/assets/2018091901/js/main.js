$(document).ready(function() {
	var bannerModal = $('#bannerFloat');
	if (bannerModal.length) {
		setTimeout(function () {
			bannerModal.modal('show');

			setTimeout( function () {
				bannerModal.modal('hide');
			}, 20000);
		}, 5000);
	}
	$(document).on('click', 'a.delete', function() {
		var url = $(this).attr('data-url');
		var ajax = $(this).attr('data-ajax');

		if ($(this).hasClass('info-delete-conta')) {
			$('.info-modal-delete').text('Aviso: Ao deletar essa conta, você vai deletar todos os itens e os anexos');
		}

		if (ajax == 'true') {
			$('#deleteModal .modal-footer a.delete-url').attr('href', 'javascript: void(0);')
				.attr('data-url', url).addClass('delete-ajax');
		} else {
			$('#deleteModal .modal-footer a.delete-url').attr('href', url);
		}
	});

	$('td, div').on('click', 'a.modal_geral', function() {
		$('#geralModal .modal-body').html('');
		var url = $(this).attr('data-url');
		$('#geralModal .modal-body').load(url);
	});

	$('form, p').on('click', 'input[type=submit], a.btn.loading', function(){
		$(this).button('loading');
	});
	if ($.fn.dotdotdot) {
		$(".dotdotdot").dotdotdot({
			height		: 40,
		});

		$(".contentServicos, .content.mhservicos").on("shown.bs.tab", function() {
			$(".btn-servico strong").addClass("dotdotdot");
			$(".dotdotdot").dotdotdot({
				height		: 40,
			});
		});
	}

	var t = 0;
	$(".tab-pane.fade.destaque").each(function() {
		var v = $(this).height();
		if (v > t) {
			t = v;
		};
	});

	$(".tab-pane.fade.destaque").height(t+5);

	$('.message_alert').delay(10000).fadeOut('fast');
	if ($.fn.carousel) {
		$('#carousel').carousel();
	};
	$('#carousel_banner').carousel({'interval': 4000});

	if ($.fn.nanoScroller) {
		$(".nano").nanoScroller({ preventPageScrolling: true, scrollTo: $('#sidebar-admin .nav .active').parents('ul') });
	};
	if ($.fn.chosen) {
		$(".chzn-select").chosen();
		$(".chzn-select-deselect").chosen({allow_single_deselect:true});
	}

	$('.text-help').tooltip();

	$(".texto-aumentar").click(function () {
		changefont('+');
	});
	$(".texto-diminuir").click(function () {
		changefont('-');
	});
	$(".texto-normal").click(function () {
		changefont('=');
	});

	$('#carousel-bras-generic').on('slide.bs.carousel', function (evt) {
		$('.carousel-thumbs a.active').removeClass('active');
		$('.carousel-thumbs a:eq('+$(evt.relatedTarget).index()+')').addClass('active');
	});

	$("#form_head").on('submit', function(e) {
        e.preventDefault();
        var val = $("#q").val();
        var urlform = $(this).attr('action')+'?q=site:'+location.hostname+'+'+val;
        window.location = urlform;
    });

    $("#form_busca").on('submit', function(e) {
        e.preventDefault();
        var val = $("#q_busca").val();
        var urlform = $(this).attr('action')+'?q=site:'+location.hostname+'+'+val;
        window.location = urlform;
    });

	//Nav fixed top scroll
	$(window).bind('scroll', function() {
		var $win = $(window),
	        winHeight = $win.height(),
	        winWidth = $win.width();

	   	if (winWidth >= 768) {
			if ($(window).scrollTop() > 113) {
				$('ul.primeirograu').addClass('fixed');
				$('div.primeirograu').addClass('navbar-fixed-top navbar-default');
			}
			else {
				$('ul.primeirograu').removeClass('fixed');
				$('div.primeirograu').removeClass('navbar-fixed-top navbar-default');
			}
		}
	});

	form_remember();

	enquete();
});

// Se o usuário alterou algum dado no formulário e clicar em outro link sem ser o botão de salvar ou enviar, dá uma mensagem avisando-o das alterações
function form_remember (press) {
	$('form.remember input:submit').attr('disabled', true);
	var $buttonpressed = null;
	$('form.remember').bind('change', function(){
		$(this).find('input:submit').attr('disabled', false).addClass('btn-primary');
		$buttonpressed = true;
	});

	$('form.remember input[type=submit]').click(function(){
		$buttonpressed = false;
	});

	$('form.remember input[type=reset]').click(function(){
		$buttonpressed = false;
		$('form input[type=submit]').removeClass('btn-primary');
		$('form.remember input:submit').attr('disabled', true);
	});

	if (press) {
		$buttonpressed = true;
		$('form.remember input:submit').attr('disabled', false).addClass('btn-primary');
	};

	window.onbeforeunload = function(){
		if ($buttonpressed) {
			return 'Você iniciou uma alteração no formulário mas ainda não salvou.';
		};
	};
}

function enquete (el) {

	$('#widget_enquete').on('submit', 'form', function(e){
		e.preventDefault();
		el = $(this);
		var url = el.attr('action');
		var dados = el.serialize();
		$.post(url, dados, function(data){
			if (data.html) {
				el.parents('#widget_enquete').replaceWith(data.html);
				$('html,body').animate({
					scrollTop: $("#msg").offset().top - '120'},
				'slow');
			};
		}, 'json');
	});

	$('#widget_enquete').on('click', '.show_result, .show_voto', function(e){
		e.preventDefault();
		var url = $(this).attr('data-url');
		var el = $(this);
		$.getJSON(url, function(data) {
			el.parents('#widget_enquete').replaceWith(data.html);
		});
	});
}

function changefont (q) {
	var el = [];
	el['h1'] = parseFloat(38.5);
	el['h2'] = parseFloat(31.5);
	el['h3'] = parseFloat(24.5);
	el['h4'] = parseFloat(17.5);
	el['h5'] = parseFloat(14);
	el['h6'] = parseFloat(11.9);
	el['legend'] = parseFloat(21);
	el['p'] = parseFloat(14);
	el['p.lead'] = parseFloat(21);
	el['label'] = parseFloat(14);
	var size = 3;
	for(key in el){
		if (q == '+') {
			var newsize = parseFloat(el[key]) + parseFloat(size);
		} else if(q == '-') {
			var newsize = parseFloat(el[key]) - parseFloat(size);
		}
		else {
			var newsize = el[key];
		}
		$('#content '+key).animate({'font-size' : newsize+'px'})
	}
	$('#content').animate({'font-size' : newsize+'px'});
}

/*function abasdenoticias () {
	$('.abasdenoticias .btn-group li a').click(function(e){
		e.preventDefault();
		var classe = $(this).attr('class');
		$('.abasdenoticias .aba').hide();
		$('.abasdenoticias #'+classe).fadeIn();
	});
}*/

//Script para as páginas de transparência
function transparencia () {
	$(".datepickerdata").datetimepicker({
		viewMode: 'months',
		format: 'MM/YYYY',
		locale: 'pt-br'
	})
		.on('dp.change', function(ev){
			var href = $('a.filtrar').attr('href');
			var data = href.substr(-7);
			var d = new Date(ev.date);
			var mes = d.getMonth();
			mes = mes == 11 ? '01' : ( '0' + (mes+1) ).slice( -2 );
			var ano = d.getFullYear();
			window.location = href.replace(data, ano+'/'+mes);
		});

	$(".datepickertipo").datetimepicker({
		format: 'YYYY',
		viewMode: 'years',
	})
		.on('dp.change', function(ev){
			var href = $('a.filtrar').attr('href');
			var data = href.substr(-4);
			var d = new Date(ev.date);
			var ano = d.getFullYear();
			window.location = href.replace(data, ano);
		});
}

//Script para as páginas de transparência
function contapublica () {
	$(".datepickercontas").datetimepicker({
		format: 'YYYY',
		viewMode: 'years',
	})
	.on('dp.change', function(ev){
		var href = $('a.filtrar').attr('href');
		var data = href.substr(-4);
		var d = new Date(ev.date);
		var ano = d.getFullYear();
		//window.location = href.replace(data, ano);
		$('a.filtrar').attr('href', href.replace(data, ano));
	});

	$(".datepickercontas2").datetimepicker({
		format: 'YYYY',
		viewMode: 'years',
	})
	.on('dp.change', function(ev){
		var href = $('a.filtrar').attr('href');
		var d = new Date(ev.date);
		var ano = d.getFullYear();
		//window.location = href.replace(data, ano);
		$('a.filtrar').attr('href', href+'/'+ano);
	});
}

/**
 * Cria um botão abaixo da classe especificada para cadastrar novos dados
 */
function form_botao_dialog () {
	$('.criar_botao_dialog').each(function(){
		var url = $(this).attr('data-url');
		var description = $(this).attr('data-description');
		$(this).parent().append('<br/><a class="btn btn-mini modal_geral" data-toggle="modal" href="#geralModal" data-url="'+ url +'">'+ description +'</a>');

		var field = $(this);

		$('#geralModal').on('submit', 'form', function(e){
			e.preventDefault();
			var url = $(this).attr('action');
			var dados = $(this).serialize();
			$.post(url, dados, function(data){
				if (data.error == false) {
					$('#geralModal').modal('hide')
					$('#geralModal').html('');
					field.append(data.novo);
					var name = field.attr('name');
					name = name.replace('[]', '');
					$('#'+name+'_chzn ul').prepend(data.novo_chzn);
				} else {
					$('#geralModal .modal-body').html(data.data);
				}
			}, 'JSON');
		});

	});
}

function inscritos () {
	$('a.excluir_inscrito').click(function(){
		var el = $(this);
		$('#excluirInscrito .modal-body').html('');
		var url = $(this).attr('data-url');
		$.get(url, function(data){
			$('#excluirInscrito .modal-body').html(data);
			$('.confirma_excluir_inscrito').click(function(){
				$.post(url, {excluir: true}, function(info) {
					if(info.excluir) {
						el.parents('tr').remove();
						$('#excluirInscrito').modal('hide');
					}
				}, 'json');
			})
		});
	});
}

function whatsShare(url, name){
	var fbpopup = window.open("https://wa.me/?text="+name+' '+url, "pop", "width=600, height=600, scrollbars=no");
	return false;
};