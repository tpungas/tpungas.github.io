
$(function(){
  // Привязываем обработчик событий к документу
  $(document).on('keydown', function(event){
    var key = $('.key[data-key="' + event.which + '"]');
    var audio = $('audio[data-key="' + event.which + '"]')[0];
    
    // Если нет соответствующего аудио, просто выходим
    if(!audio) return;
    
    key.addClass('playing');
    audio.currentTime = 0; // Сбрасываем время до 0 перед воспроизведением
    audio.play();
  });
  
  $(document).on('keyup', function(event){
    var key = $('.key[data-key="' + event.which + '"]');
    key.removeClass('playing');
  });
});