package miu.edu.alumni.service;

import miu.edu.alumni.model.Student;

import java.util.List;
import java.util.Optional;

public interface StudentService {
    List<Student> findAll();
    Optional<Student> findById(Long id);
    Optional<Student> findByUserId(String id);
    Student save(Student student);
    void delete(Long id);
}
