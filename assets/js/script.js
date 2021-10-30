"use strict";

jQuery(function ($) {
  // この中であればWordpressでも「$」が使用可能になる
  // $("#MenuButton").click(function () {
  //   // $(".l-drawer-menu").toggleClass("is-show");
  //   // $(".p-drawer-menu").toggleClass("is-show");
  //   $(".js-drawer-open").toggleClass("open");
  //   $(".drawer-menu").toggleClass("open");
  //   $("html").toggleClass("is-fixed");
  // });
  //ヘッダー背景変化
  $(window).on('scroll', function () {
    if ($('.p-hero').height() < $(this).scrollTop()) {
      $('.p-header').addClass('is-scrolled');
    } else {
      $('.p-header').removeClass('is-scrolled');
    }
  });
  var topBtn = $('.c-page-top');
  topBtn.hide(); // ボタンの表示設定

  $(window).scroll(function () {
    if ($(this).scrollTop() > $('.p-hero').height()) {
      // 指定px以上のスクロールでボタンを表示
      topBtn.fadeIn();
    } else {
      // 画面が指定pxより上ならボタンを非表示
      topBtn.fadeOut();
    }
  }); // ボタンをクリックしたらスクロールして上に戻る

  topBtn.click(function () {
    $('body,html').animate({
      scrollTop: 0
    }, 300, 'swing');
    return false;
  }); //アコーディオンをクリックした時の動作

  $('.js-accordion').on('click', function () {
    //タイトル要素をクリックしたら
    $('.p-faq__data').slideUp(500); //クラス名.boxがついたすべてのアコーディオンを閉じる

    var findElm = $(this).next(".p-faq__data"); //タイトル直後のアコーディオンを行うエリアを取得

    if ($(this).hasClass('close')) {
      //タイトル要素にクラス名closeがあれば
      $(this).removeClass('close'); //クラス名を除去    
    } else {
      //それ以外は
      $('.close').removeClass('close'); //クラス名closeを全て除去した後

      $(this).addClass('close'); //クリックしたタイトルにクラス名closeを付与し

      $(findElm).slideDown(500); //アコーディオンを開く
    }
  }); //ページが読み込まれた際にopenクラスをつけ、openがついていたら開く動作※不必要なら下記全て削除

  $(window).on('load', function () {
    $('.p-faq__item:first-of-type').addClass("open"); //accordion-areaのはじめのliにあるsectionにopenクラスを追加

    $(".open").each(function (index, element) {
      //openクラスを取得
      var Title = $(element).children('.p-faq__def-title'); //openクラスの子要素のtitleクラスを取得

      $(Title).addClass('close'); ///タイトルにクラス名closeを付与し

      var Box = $(element).children('.p-faq__data'); //openクラスの子要素boxクラスを取得
      // console.log(Box);

      $(Box).slideDown(500); //アコーディオンを開く
      // $(Box).addClass(".test"); //アコーディオンを開く
    });
  }); // スムーススクロール (絶対パスのリンク先が現在のページであった場合でも作動)

  $(document).on('click', 'a[href*="#"]', function () {
    var time = 400;
    var header = $('header').innerHeight();
    var target = $(this.hash);
    if (!target.length) return;
    var targetY = target.offset().top - header;
    $('html,body').animate({
      scrollTop: targetY
    }, time, 'swing');
    return false;
  });
});