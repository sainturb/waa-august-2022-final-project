package miu.edu.alumni.service;

import lombok.RequiredArgsConstructor;
import miu.edu.alumni.model.Faculty;
import miu.edu.alumni.model.Student;
import miu.edu.alumni.repository.StudentRepository;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class StudentServiceImpl implements StudentService {

    private final StudentRepository repository;

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
    public Student save(Student student) {
        return repository.save(student);
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
                query.and(valueEquals(key, params.get(key)));
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
        return (student, cq, cb) -> cb.equal(student.get("lastname"), value);
    }
}

