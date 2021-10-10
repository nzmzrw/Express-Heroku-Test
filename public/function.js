//動的リスト生成用
const tr_s = '<tr style="background: red;">';
const tr_e = '</tr>';
const td_s = '<td>';
const td_e = '</td>';

//検索ボタン
function Search()
{
    MainTable();
}

//動的リスト生成
function MainTable()
{
    var t_text = "";

    for(var count = 0;count < 2;count++)
    {
    t_text += tr_s;
    
    t_text += td_s;
    t_text += "test";
    t_text += td_e;
    t_text += td_s;
    t_text += "test";
    t_text += td_e;
    t_text += td_s;
    t_text += "test";
    
    t_text += td_e;
    t_text += tr_e;
    }

    s_result.innerHTML += t_text;
}