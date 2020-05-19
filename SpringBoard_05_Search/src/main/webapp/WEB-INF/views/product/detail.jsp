<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<jsp:include page="../00_header.jsp"></jsp:include>
<jsp:include page="../10_nav.jsp"></jsp:include>

<h2>상품 상세 정보</h2>
<table class="table table-bordered">
	<tr>
		<th>등록번호</th>
		<td>${pvo.pno }</td>
	</tr>
	<tr>
		<th>상품이름</th>
		<td>${pvo.title }</td>
	</tr>
	<tr>
		<th>등록자</th>
		<td>${pvo.writer }</td>
	</tr>
	<tr>
		<th>조회수</th>
		<td>${pvo.readcount }</td>
	</tr>
	<tr>
		<th>상품등록일</th>
		<td>${pvo.regd8 }</td>
	</tr>
	<tr>
		<th>최종수정일</th>
		<td>${pvo.modd8 }</td>
	</tr>
	<tr>
		<th>상세설명</th>
		<td>${pvo.content }</td>
	</tr>
	<tr>
		<th>상품 이미지</th>
		<td>
		<c:choose>
			<c:when test="${!pvo.imgfile.equals('NONE') }">
				<img src="/images/${pvo.imgfile }" width="33%">
			</c:when>
			<c:otherwise>
				${pvo.imgfile }
			</c:otherwise>
		</c:choose>
		</td>
	</tr>
	<tr>
		<td colspan="2">
		<a href="/product/list?pageNum=${cri.pageNum }&amount=${cri.amount }&type=${cri.type }&keyword=${cri.keyword }"
		 class="btn btn-outline-secondary">목록</a>
		<a href="/product/modify?pno=${pvo.pno }&pageNum=${cri.pageNum }&amount=${cri.amount }&type=${cri.type }&keyword=${cri.keyword }"
			class="btn btn-outline-warning">수정</a>
			<button type="button" class="btn btn-outline-danger" id="rmBtn">삭제</button>
		</td>
	</tr>
</table>
<form action="/product/remove" method="post" id="rmForm">
	<input type="hidden" name="pno" value="${pvo.pno }">
	<input type="hidden" name="imgfile" value="${pvo.imgfile }">
	<input type="hidden" name="pageNum" value="<c:out value='${cri.pageNum }' />">
	<input type="hidden" name="amount" value="<c:out value='${cri.amount }' />">
	<input type="hidden" name="type" value="<c:out value='${cri.type }' />">
	<input type="hidden" name="keyword" value="<c:out value='${cri.keyword }' />">
</form>
<script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"
	integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n"
	crossorigin="anonymous"></script>
<script>
	$(function() {
		$(document).on("click", "#rmBtn", function() {
			$("#rmForm").submit();
		});
	});
	let result = '<c:out value="${result}" />';
	if (result == 'modify_ok') {
		alert("상품 수정이 완료되었습니다~!");
	}
	result = "";
</script>
<jsp:include page="../90_footer.jsp"></jsp:include>
