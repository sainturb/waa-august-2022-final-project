package miu.edu.alumni.service;

import miu.edu.alumni.model.Comment;
import miu.edu.alumni.model.Tag;

import java.util.List;

public interface CommentService {
    List<Comment> findCommentsByStudent(Long id);
    Comment save(Comment comment);
    Comment update(Comment comment);
    void delete(Long id);
}
