function dpTime(modd8) {
	let today = new Date();
	let mdobj = new Date(modd8);
	
	let todayYear = today.getFullYear();
	let todayMonth = today.getMonth() + 1;
	let todayDate = today.getDate();
	
	let year = mdobj.getFullYear();
	let month = mdobj.getMonth() + 1;
	let day = mdobj.getDate();
	let hour = mdobj.getHours();
	let min = mdobj.getMinutes();
	let sec = mdobj.getSeconds();
	
	hour = (hour > 9 ? "" : "0") + hour;
	min = (hour > 9 ? "" : "0") + min;
	sec = (hour > 9 ? "" : "0") + sec;
	month = (hour > 9 ? "" : "0") + month;
	day = (hour > 9 ? "" : "0") + day;
	
	let diff = todayYear == year && todayMonth == month && todayDate == day;
	let timeArrStr = [hour,":",min,":",sec].join("");
	let dateArrStr = [year,"/",month,"/",day].join("");
	
	return diff ? timeArrStr : dateArrStr + " - " + timeArrStr;
}

function printList(cmtList, cmtTotal, page) {
	if(page < 1){
		page = 1;
	} else if (cmtList == null || cmtList.length == 0){
		return;
	}
	let cmtListULTag = $("#cmtListULTag"); // html 객체(노드)를 가져옴
	let cmtStr = "";
	for (var i = 0; i < cmtList.length; i++) {
		cmtStr += "<li class='list-group-item d-flex justify-content-between align-items-center'>";
		cmtStr += "<span class='badge badge-secondary'>"+cmtList[i].writer+"</span>";
		cmtStr += "<span class='cmtText'>"+cmtList[i].content+"</span>";
		cmtStr += "<span class='badge badge-light'>"+dpTime(cmtList[i].modd8)+"</span>";
		cmtStr += "<button type='button' class='btn btn-outline-warning btn-sm' id='modCmtBtn'>수정</button>";
		cmtStr += "<button type='button' class='btn btn-outline-danger btn-sm' id='delCmtBtn'>삭제</button>";
		cmtStr += "</li>";
	}
	cmtListULTag.html(cmtStr).trigger("create");
}

function listComment(pno, page) {
	let pageNo = page > 1? page : 1;
	$.getJSON("/comment/p/"+pno+"/"+pageNo+".json", function(cdto) {
		printList(cdto.list, cdto.commentcnt, pageNo);
	}).fail(function() {
		alert("댓글 리스트 출력 실패");
		
	}); // /comment/list?pno=25&page=1
	// /comment/p/25/1
}

function addComment(params) { // 이벤트 핸들링으로 전송된 객체는 객체이름.data.keyName으로 접근
//	console.log("check2");
	let pno = params.data.pno;
	let writer = params.data.writer;
	var content = $("#cmtText").val();
//	console.log("check3 : " + pno+"/"+writer+"/"+content);
	if(content==null || content==''){
		alert("댓글 내용을 입력해주세요.");
		return false;
	} else{
		let cmtData = {pno:pno, writer:writer, content:content};
		$.ajax({
			type: "post",
			url: "/comment/new",
			data: JSON.stringify(cmtData),
			contentType: "application/json; charset=utf-8"
		}).done(function(result){
			alert(result);
			listComment(pno,1);
		}).fail(function() {
			alert("댓글 등록 실패!");
			
		}).always(function() {
			$("#cmtText").val("");
		});
	}
	
}