/**
 * Created by bangbang on 14/10/10.
 * 二改 by Mifeng on 25/4/30
 * 三改 by JDA-XJH on 09/02/2026 (translate to spanish)
 */
$(document).ready(function (){
  new Clipboard('#copy')
    $('#search').on('click', function (){
        var keyword = $('#kw').val();
        if (keyword === '') {
            $('#kw').focus();
            return;
        }
        var kw = encodeURIComponent($('#kw').val());
        var link = window.location.origin + window.location.pathname + '?q=' + kw;
        $.ajax({
          url: '/s/create',
          data: {keyword: keyword},
          method: 'post',
          success: function (data) {
            if (data){
              link = location.origin + '/s/' + data['uniqId'];
            }
            $('#link').show();
            $('#instructions').text('Copia la siguiente dirección');
            $('#lmbtfyLink').val(link).focus().select();
          },
          error: function () {
            $('#link').show();
            $('#instructions').text('Copia la siguiente dirección');
            $('#lmbtfyLink').val(link).focus().select();
          }
        });
    });
    var $container = $('.container');
    $container.on('click', '#go', function (){
        var link = $('#lmbtfyLink').val();
        if (!!link){
            window.location = link;
        }
    });
    var $kw = $('#kw');
    $kw.on('keydown', function (e) {
        if (e.keyCode === 13){
            $('#search').trigger('click');
        }
    });
    if (!!window.location.search){
        var search = window.location.search
        var kw
        if (typeof URLSearchParams !== 'undefined') {
          var s = new URLSearchParams(search)
          kw = s.get('q')
        } else {
          var match = window.location.search.match(/q=(.*?)(?:&|$)/)
          if (match) {
            kw = decodeURIComponent(match[1]);
          }
        }
        if (!kw) kw = decodeURIComponent(window.location.search.substr(1))
        var $instructions = $('#instructions');
        var $arrow = $('#arrow');
        setTimeout(function (){
            $instructions.text('1, Coloque el cursor del ratón sobre el cuadro de entrada');
            $arrow.show().animate({
                left: $kw.offset().left + 10 + 'px',
                top: ($kw.offset().top + $kw.height()/2) + 'px'
            }, 2000, function (){
                $instructions.text('2, Ingrese su pregunta');
                $arrow.hide();
                var $kw = $('#kw');
                $kw.focus();
                var i = 0;
                var interval = setInterval(function (){
                    $kw.val(kw.substr(0,i));
                    i++;
                    if (i > kw.length){
                        clearInterval(interval);
                        $instructions.text('3, Clica boton de "Buscar en Baidu"');
                        $arrow.show();
                        var $search = $('#search');
                        $arrow.animate({
                            left: $search.offset().left + $search.width()/2 + 'px',
                            top: $search.offset().top + $search.height()/2 + 'px'
                        }, 1000, function () {
                            $instructions.html('<strong>¿ESO ES TAN DIFÍCIL PARA TI?(INÚTIL)</strong>');
                            setTimeout(function (){
                                window.location = 'http://www.baidu.com/s?ie=utf-8&wd=' + encodeURIComponent(kw);
                            }, 2000);
                        })
                    }
                }, 200);
            });
        }, 1000);
    }
});
