package com.myweb.service;

import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.myweb.domain.CommentDTO;
import com.myweb.domain.CommentVO;
import com.myweb.domain.Criteria;
import com.myweb.persistence.CommentDAO;

@Service
public class CommentServiceImp implements CommentService {
	private static final Logger log = LoggerFactory.getLogger(CommentServiceImp.class);
	
	@Inject
	private CommentDAO cdao;

	@Override
	public int write(CommentVO cvo) {
		return cdao.insert(cvo);
	}

	@Override
	public CommentDTO list(Criteria cri, int pno) {
		return new CommentDTO(cdao.selectOne(pno), cdao.selectList(pno, cri));
	}

	@Override
	public int modify(CommentVO cvo) {
		return cdao.update(cvo);
	}

	@Override
	public int remove(int cno) {
		return cdao.delete(cno);
	}
	
	
}
