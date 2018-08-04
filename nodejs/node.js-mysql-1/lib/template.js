module.exports = {
  HTML:function(title, list, body, control){
    return `
    <!doctype html>
    <html>
    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">WEB</a></h1>
      <a href="/author">author</a>
      ${list}
      ${control}
      ${body}
    </body>
    </html>
    `;
  },list:function(topics){
    var list = '<ul>';
    var i = 0;
    while(i < topics.length){
      list = list + `<li><a href="/?id=${topics[i].id}">${topics[i].title}</a></li>`;
      i = i + 1;
    }
    list = list+'</ul>';
    return list;
  },authorSelect:function(authors, author_id){
    var tag = '';
    var i = 0;
    while(i < authors.length){
      var selected = '';
      if(authors[i].id === author_id) {
        selected = ' selected'; //selected 속성이 들어가면 그게 ui화면에서 선택이 되는거임.
      }
      tag += `<option value="${authors[i].id}"${selected}>${authors[i].name}</option>`;
      i++;
    }
    return `
      <select name="author">
        ${tag}
      </select>
    `
  },authorTable:function(authors) {
    var tag = '<table>';
    //테이블의 제목부분.
      tag+= `
      <tr>
        <td>저자명</td>
        <td>저서</td>
        <td>업데이트</td>
        <td>저자 삭제</td>
        <td>저자의 저서까지 전체 삭제</td>
      </tr>
      `
    for (var i = 0; i < authors.length; i++) {
      tag += `
              <tr>
                <td>${authors[i].name}</td>
                <td>${authors[i].profile}</td>
                <td><a href="/author/update?id=${authors[i].id}">update</a></td>
                <td>
                  <form action="/author/delete_process" method="post">
                    <input type="hidden" name="id" value=${authors[i].id}>
                    <input type="submit" value="delete">
                  </form>
                </td>
                <td>
                  <form action="/author/customizing_delete_process" method="post">
                    <input type="hidden" name="id" value=${authors[i].id}>
                    <input type="submit" value="All delete" >
                  </form>
                </td>
              </tr>
             `
    }
    tag +='</table>'
    return tag;
  }
}
