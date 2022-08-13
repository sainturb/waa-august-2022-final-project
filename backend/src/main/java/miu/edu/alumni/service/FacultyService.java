package miu.edu.alumni.service;

import miu.edu.alumni.model.Faculty;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface FacultyService {
    List<Faculty> findAll();
    Optional<Faculty> findById(Long id);
    Optional<Faculty> findByUserId(String id);

    Optional<Faculty> findByEmail(String email);
    Faculty save(Faculty student);
    void delete(Long id);

    List<Faculty> filter(Map<String, Object> params);

    List<Faculty> query(String string);
}
