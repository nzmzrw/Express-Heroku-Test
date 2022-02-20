var modal;
    window.onload = function () {
      modal = document.getElementById("myModal");
    }
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }

    // Enter検知で検索開始
    function Keyinput(e) {
      var input = document.getElementById("inputText");
      alert(input.value);
    }

    // 検索ボタン
    function Search() {
      var input = document.getElementById("inputText").value;
      var rowElement = document.getElementById("mainTable").rows;
      for (let cnt = 0; cnt < rowElement.length; cnt++) {
        if (!rowElement[cnt].id.includes(input)) {
          rowElement[cnt].style.display = "none";
        }
        else {
          rowElement[cnt].style.display = "";
        }
      }
    }

    //検索クリア
    function Reset() {
      var rowElement = document.getElementById("mainTable").rows;
      for (let cnt = 0; cnt < rowElement.length; cnt++) {
        rowElement[cnt].style.display = "";
      }
    }

    // ダイアログ表示
    function Show(e) {
      var selItem = e.getAttribute("id").split(",");
      if (selItem.length != 3) {
        alert("Selected Item Error.");
      }

      // [0] 店名
      // [1] 駅名
      // [2] リンク

      var mapsvg = "<svg role=\"img\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24px\" height=\"32px\" viewBox=\"0 0 24 24\" aria-labelledby=\"exploreIconTitle\" stroke=\"#ff5454\" stroke-width=\"2.25\" stroke-linecap=\"square\" stroke-linejoin=\"miter\" fill=\"none\" color=\"#3232fb\"> <title id=\"exploreIconTitle\">Explore</title> <polygon points=\"14.121 14.121 7.05 16.95 9.879 9.879 16.95 7.05\"/> <circle cx=\"12\" cy=\"12\" r=\"10\"/> </svg>"
      var tabsvg = "<svg role=\"img\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24px\" height=\"32px\" viewBox=\"0 0 24 24\" aria-labelledby=\"newIconTitle\" stroke=\"#e09500\" stroke-width=\"2.25\" stroke-linecap=\"square\" stroke-linejoin=\"miter\" fill=\"none\" color=\"#3232fb\"> <title id=\"newIconTitle\">New</title> <path d=\"M19 14V22H2.99997V4H13\"/> <path d=\"M17.4608 4.03921C18.2418 3.25817 19.5082 3.25816 20.2892 4.03921L20.9608 4.71079C21.7418 5.49184 21.7418 6.75817 20.9608 7.53921L11.5858 16.9142C11.2107 17.2893 10.702 17.5 10.1716 17.5L7.5 17.5L7.5 14.8284C7.5 14.298 7.71071 13.7893 8.08579 13.4142L17.4608 4.03921Z\"/> <path d=\"M16.25 5.25L19.75 8.75\"/> </svg>"

      var title = document.getElementById('dialogTitle')
      title.innerHTML = selItem[0] + " - " + selItem[1];

      //画像
      var image = document.getElementById('ImagePanel')
      image.innerHTML = "<img src=\"./image/" + selItem[0] + ".jpg\"></image>"
      
      //Google Mapリンク
      var ma_link = document.getElementById('mapLink')
      ma_link.innerHTML = "<a href=\"https://www.google.com/maps/dir/?api=1&destination=" + selItem[1] + "+" + selItem[0] +
        "\" target=\"_blank\" class=\"link_ma\">" + mapsvg + "<span>MAP</span></a>"
      
      // 食べログリンク
      var ta_link = document.getElementById('tabelogLink')
      ta_link.innerHTML = "<a href=\"https://tabelog.com/" + selItem[2] + "\" target=\"_blank\" class=\"link_ta\">" + tabsvg + "<span>tabelog</span></a>"

      modal.style.display = "block";

      //ダイアログ中央配置
      var content = document.getElementById('myModalContent');
      content.style.top = (window.innerHeight - content.clientHeight) / 2 + "px";
      content.style.left = (window.innerWidth - content.clientWidth) / 2 + "px";

    }