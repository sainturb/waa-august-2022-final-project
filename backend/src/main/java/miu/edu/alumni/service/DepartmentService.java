package miu.edu.alumni.service;

import miu.edu.alumni.model.Department;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface DepartmentService {
    List<Department> findAll();
    Optional<Department> findById(Long id);
    Department save(Department department);
    void delete(Long id);
    List<Department> filter(Map<String, Object> params);
    List<Department> query(String string);
}
