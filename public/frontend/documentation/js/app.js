$(function()  {
  // Enable Tooltip //
  $('.tooltip-default').tooltip({
    container: 'body'
  });

  $('.tooltip-gray').tooltip({
    container: 'body',
    template: '<div class="tooltip tooltip-gray" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>' 
  });

  $('.tooltip-primary').tooltip({
    container: 'body',
    template: '<div class="tooltip tooltip-primary" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>' 
  });

  $('.tooltip-success').tooltip({
    container: 'body',
    template: '<div class="tooltip tooltip-success" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>' 
  });

  $('.tooltip-danger').tooltip({
    container: 'body',
    template: '<div class="tooltip tooltip-danger" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>' 
  });

  // Enable Popover //
  $('[data-toggle="popover"]').popover();

  // Animated Dropdown //
  $('.dropdown-hover').hover(function() {
    $(this).find('.dropdown-menu').dropdown('toggle');
  }).click(function(e) {
    e.stopPropagation();
  });

  $('.dropdown, .btn-group').on('show.bs.dropdown', function () {
    var $this = $(this);
    $this.children('.dropdown-animated').removeClass('closed');
    $this.children('.dropdown-animated').addClass('opened');
  }).on('hide.bs.dropdown', function () {
    var $this = $(this);
    $this.children('.dropdown-animated').removeClass('opened');
    $this.children('.dropdown-animated').addClass('closed');
  });

  // Clickable Dropdown //
  $('.clickable-dropdown').click(function(e)  {
    e.stopPropagation();
  });

  // Collapse //
  $('.sub-menu').on('show.bs.collapse', function (e) {
    var $this = $(this);
    e.stopPropagation();

    $this.parent().addClass('opened');
    $this.removeClass('closed');
    $this.addClass('opened');
  }).on('shown.bs.collapse', function () {
    var $this = $(this);
    $this.removeClass('opened');  
  }).on('hide.bs.collapse', function (e) {
    var $this = $(this);
    e.stopPropagation();
    $this.parent().removeClass('opened');
    $this.removeClass('opened');
    $this.addClass('closed');
  }).on('hidden.bs.collapse', function () {
    var $this = $(this);
    $this.removeClass('closed');
  });

  // Refresh Widget //
  $('.refresh-widget').click(function() {
    var loadingWrap = $(this).parents('.panel').find('.loading-wrap');
    loadingWrap.addClass('loading');

    setTimeout(function() {
      loadingWrap.removeClass('loading');
    },1500);

    return false;
  });

  // Fullscreen Widget //
  $('.fullscreen-widget').click(function() {
    var loadingWrap = $(this).parents('.panel').toggleClass('widget-fullscreen-mode');
    $('body').toggleClass('fullscreen-mode');
    
    return false;
  });
});