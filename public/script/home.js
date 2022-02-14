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

      var title = document.getElementById('dialogTitle')
      title.innerHTML = selItem[0] + " - " + selItem[1];

      //画像
      var image = document.getElementById('ImagePanel')
      image.innerHTML = "<img src=\"./image/" + selItem[0] + ".jpg\"></image>"
      //Google Mapリンク
      var ma_link = document.getElementById('mapLink')
      ma_link.innerHTML = "<a href=\"https://www.google.com/maps/dir/?api=1&destination=" + selItem[1] + "+" + selItem[0] +
        "\" target=\"_blank\" class=\"link_ma\"><span>Map</span></a>"
      // 食べログリンク
      var ta_link = document.getElementById('tabelogLink')
      ta_link.innerHTML = "<a href=\"https://tabelog.com/" + selItem[2] + "\" target=\"_blank\" class=\"link_ta\"><span>tabelog</span></a>"
      //ツイッターリンク
      var tw_link = document.getElementById('TweetLink')
      tw_link.innerHTML = "<a href=\"http://twitter.com/share?url=https://trysail.jp/&text="
        + selItem[0] + "\" target=\"_blank\" class=\"link_tw\"><span>Tweet</span></a>"

      modal.style.display = "block";

      //ダイアログ中央配置
      var content = document.getElementById('myModalContent');
      content.style.top = (window.innerHeight - content.clientHeight) / 2 + "px";
      content.style.left = (window.innerWidth - content.clientWidth) / 2 + "px";

    }