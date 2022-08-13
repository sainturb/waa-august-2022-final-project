package miu.edu.alumni.service;

import miu.edu.alumni.model.Student;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface StudentService {
    List<Student> findAll();
    Optional<Student> findById(Long id);
    Optional<Student> findByUserId(String id);

    Optional<Student> findByEmail(String email);
    Student save(Student student);
    void delete(Long id);

    List<Student> filter(Map<String, Object> params);

    List<Student> query(String string);
}
