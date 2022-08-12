package miu.edu.alumni.service;

import lombok.RequiredArgsConstructor;
import miu.edu.alumni.model.Comment;
import miu.edu.alumni.model.Student;
import miu.edu.alumni.repository.CommentRepository;
import miu.edu.alumni.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentRepository repository;
    private final StudentRepository studentRepository;


    public List<Comment> findCommentsByStudent(Long id) {
        Optional<Student> optional = studentRepository.findById(id);
        return optional.map(repository::findAllByStudent)
                .orElseGet(ArrayList::new);
    }

    @Override
    public Comment save(Comment comment) {
        return repository.save(comment);
    }

    @Override
    public Comment update(Comment comment) {
        return repository.save(comment);
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }
}
