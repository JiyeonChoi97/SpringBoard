package com.myweb.ctrl;

import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.myweb.domain.CommentDTO;
import com.myweb.domain.CommentVO;
import com.myweb.domain.Criteria;
import com.myweb.service.CommentService;

@RestController
@RequestMapping("/comment/*")
public class CommentCtrl {
	private static final Logger log = LoggerFactory.getLogger(CommentCtrl.class);
	
	@Inject
	private CommentService csv;
	
	@GetMapping(value="/p/{pno}/{page}", produces={MediaType.APPLICATION_XML_VALUE, MediaType.APPLICATION_JSON_UTF8_VALUE})
	public ResponseEntity<CommentDTO> list(@PathVariable("pno")int pno, @PathVariable("page")int page){
		log.info(">>> 댓글 리스트 페이징 - GET >>> " + pno+"번 글의 "+page+"페이지 댓글 리스트");
		Criteria cri = new Criteria(page, 10);
//		CommentDTO cdto = new CommentDTO();
//		cdto = csv.list(cri, pno);
//		ResponseEntity<CommentDTO> re = new ResponseEntity<CommentDTO>(cdto, HttpStatus.OK);
//		return re;
		return new ResponseEntity<CommentDTO>(csv.list(cri, pno), HttpStatus.OK);
	}
	
	@PostMapping(value="/new", consumes="application/json", produces="application/text; charset=utf-8")
	public ResponseEntity<String> write(@RequestBody CommentVO cvo){
		log.info(">>>> 댓글 기록 - POST");
		int isOk = csv.write(cvo);		
		return isOk == 1? new ResponseEntity<>("댓글이 등록 되었습니다.", HttpStatus.OK) : new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	}
}
