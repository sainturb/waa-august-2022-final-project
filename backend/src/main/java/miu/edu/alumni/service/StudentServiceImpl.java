package miu.edu.alumni.service;

import lombok.RequiredArgsConstructor;
import miu.edu.alumni.model.Department;
import miu.edu.alumni.model.Student;
import miu.edu.alumni.repository.DepartmentRepository;
import miu.edu.alumni.repository.StudentRepository;
import org.keycloak.representations.idm.RoleRepresentation;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class StudentServiceImpl implements StudentService {

    private final StudentRepository repository;
    private final DepartmentRepository majorRepository;
    private final KeycloakService keycloak;

    @Override
    public List<Student> findAll() {
        return repository.findAll();
    }

    @Override
    public Optional<Student> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    public Optional<Student> findByUserId(String id) {
        return repository.findByUserId(id);
    }

    @Override
    public Optional<Student> findByEmail(String email) {
        return repository.findByEmail(email);
    }

    @Override
    public Student save(Student student) {
        Student created = repository.save(student);
        if (Objects.nonNull(student.getId())) {
            RoleRepresentation roleRepresentation = keycloak.findRoleByName("student");
            keycloak.assignRole(student.getUserId(), roleRepresentation);
        }
        return created;
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }

    @Override
    public List<Student> filter(Map<String, Object> params) {
        if (!params.isEmpty()) {
            Specification<Student> query = Specification.where(null);
            for (String key : params.keySet()) {
                if (key.equals("major")) {
                    Long id = Long.valueOf(params.get(key).toString());
                    Optional<Department> majorOptional = majorRepository.findById(id);
                    if (majorOptional.isPresent()) {
                        query = query.and(valueEquals(key, majorOptional.get()));
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
    public List<Student> query(String string) {
        if (!string.isEmpty()) {
            Specification<Student> query = Specification
                    .where(valueContains("firstName", string))
                    .or(valueContains("lastname", string))
                    .or(valueContains("email", string));
            return repository.findAll(query);
        }
        return repository.findAll();
    }

    static Specification<Student> valueContains(String property, Object value) {
        return (student, cq, cb) -> cb.like(student.get(property), "%" + value.toString() + "%");
    }

    static Specification<Student> valueEquals(String property, Object value) {
        return (student, cq, cb) -> cb.equal(student.get(property), value);
    }
}

