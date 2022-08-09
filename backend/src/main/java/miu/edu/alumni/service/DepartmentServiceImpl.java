package miu.edu.alumni.service;

import lombok.RequiredArgsConstructor;
import miu.edu.alumni.model.Department;
import miu.edu.alumni.repository.DepartmentRepository;
import org.keycloak.representations.idm.RoleRepresentation;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DepartmentServiceImpl implements DepartmentService {

    private final DepartmentRepository repository;
    private final KeycloakService keycloak;

    @Override
    public List<Department> findAll() {
        return repository.findAll();
    }

    @Override
    public Optional<Department> findById(Long id) {
        return repository.findById(id);
    }
    @Override
    public Department save(Department department) {
        return repository.save(department);
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }

    @Override
    public List<Department> filter(Map<String, Object> params) {
        if (!params.isEmpty()) {
            Specification<Department> query = Specification.where(null);
            for (String key : params.keySet()) {
                query = query.and(valueEquals(key, params.get(key)));
            }
            return repository.findAll(query);
        }
        return repository.findAll();
    }

    @Override
    public List<Department> query(String string) {
        if (!string.isEmpty()) {
            Specification<Department> query = Specification
                    .where(valueContains("firstName", string))
                    .or(valueContains("lastname", string))
                    .or(valueContains("email", string));

            return repository.findAll(query);
        }
        return repository.findAll();
    }

    static Specification<Department> valueContains(String property, Object value) {
        return (student, cq, cb) -> cb.like(student.get(property), "%" + value.toString() + "%");
    }

    static Specification<Department> valueEquals(String property, Object value) {
        return (student, cq, cb) -> cb.equal(student.get(property), value);
    }
}
