const addLineNumbers = () => {
	var pre = document.getElementsByTagName("pre")
    var pl = pre.length

    var startNumber = 1
	for (var i = 0; i < pl; i++) {
		pre[i].innerHTML =
			'<span class="line-number"></span>' +
			pre[i].innerHTML +
			'<span class="cl"></span>'
        var num = pre[i].innerHTML.split(/\n/).length
        
		for (var j = 0; j < num; j++) {
            var line_num = pre[i].getElementsByTagName("span")[0]
            line_num.innerHTML += "<span>" + (j + startNumber) + "</span>"
        }
        
        startNumber += num
	}
}

export default addLineNumbers
