package miu.edu.alumni.service;

import lombok.RequiredArgsConstructor;
import miu.edu.alumni.model.*;
import miu.edu.alumni.repository.DepartmentRepository;
import miu.edu.alumni.repository.FacultyRepository;
import org.keycloak.representations.idm.RoleRepresentation;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Root;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FacultyServiceImpl implements FacultyService {

    private final FacultyRepository repository;
    private final DepartmentRepository departmentRepository;
    private final KeycloakService keycloak;

    @Override
    public List<Faculty> findAll() {
        return repository.findAll();
    }

    @Override
    public Optional<Faculty> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    public Optional<Faculty> findByUserId(String id) {
        return repository.findByUserId(id);
    }

    @Override
    public Optional<Faculty> findByEmail(String email) {
        return repository.findByEmail(email);
    }

    @Override
    public Faculty save(Faculty faculty) {
        Faculty created = repository.save(faculty);
        RoleRepresentation roleRepresentation = keycloak.findRoleByName("faculty");
        keycloak.assignRole(faculty.getUserId(), roleRepresentation);
        return created;
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }

    @Override
    public List<Faculty> filter(Map<String, Object> params) {
        if (!params.isEmpty()) {
            Specification<Faculty> query = Specification.where(null);
            for (String key : params.keySet()) {
                if (key.equals("department")) {
                    Long id = Long.valueOf(params.get(key).toString());
                    Optional<Department> departmentOptional = departmentRepository.findById(id);
                    if (departmentOptional.isPresent()) {
                        query = query.and(valueEquals(key, departmentOptional.get()));
                    }
                } else {
                    query = query.and(valueEquals(key, params.get(key)));
                }
            }
            return repository.findAll(query);
        }
        return repository.findAll();
    }

    @Override
    public List<Faculty> query(String string) {
        if (!string.isEmpty()) {
            Specification<Faculty> query = Specification
                    .where(valueContains("firstName", string))
                    .or(valueContains("lastname", string))
                    .or(valueContains("email", string));

            return repository.findAll(query);
        }
        return repository.findAll();
    }

    static Specification<Faculty> valueContains(String property, Object value) {
        return (student, cq, cb) -> cb.like(student.get(property), "%" + value.toString() + "%");
    }

    static Specification<Faculty> valueEquals(String property, Object value) {
        return (student, cq, cb) -> cb.equal(student.get(property), value);
    }
}
