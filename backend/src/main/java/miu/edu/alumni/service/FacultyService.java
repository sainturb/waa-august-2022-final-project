package miu.edu.alumni.service;

import miu.edu.alumni.model.Faculty;

import java.util.List;
import java.util.Optional;

public interface FacultyService {
    List<Faculty> findAll();
    Optional<Faculty> findById(Long id);
    Optional<Faculty> findByUserId(String id);
    Faculty save(Faculty student);
    void delete(Long id);
}
