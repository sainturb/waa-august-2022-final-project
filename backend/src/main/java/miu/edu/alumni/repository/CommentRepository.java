package miu.edu.alumni.repository;

import miu.edu.alumni.model.Comment;
import miu.edu.alumni.model.Student;
import miu.edu.alumni.model.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    List<Comment> findAllByStudent(Student student);
}
