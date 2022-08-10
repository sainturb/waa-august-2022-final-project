package miu.edu.alumni.service;

import lombok.RequiredArgsConstructor;
import miu.edu.alumni.model.JobHistory;
import miu.edu.alumni.repository.JobHistoryRepository;
import miu.edu.alumni.repository.StudentRepository;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class HistoryServiceImpl implements HistoryService {

    private final JobHistoryRepository repository;

    private final KeycloakService keycloakService;

    @Override
    public List<JobHistory> findAll() {
        return repository.findAll();
    }

    @Override
    public Optional<JobHistory> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    public JobHistory save(JobHistory history) {
        return repository.save(history);
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }

    @Override
    public List<JobHistory> filter(Map<String, Object> params) {
        if (!params.isEmpty()) {
            Specification<JobHistory> query = Specification.where(null);
            for (String key : params.keySet()) {
                query = query.and(valueEquals(key, params.get(key)));
            }
            return repository.findAll(query);
        }
        return repository.findAll();
    }

    @Override
    public List<JobHistory> query(String string) {
        if (!string.isEmpty()) {
            Specification<JobHistory> query = Specification
                    .where(valueContains("companyName", string));
            return repository.findAll(query);
        }
        return repository.findAll();
    }


    @Override
    public List<JobHistory> myAll(String username) {
        Specification<JobHistory> query = Specification
                .where(valueEquals("createdBy", username));
        return repository.findAll(query);
    }

    @Override
    public List<JobHistory> findUserId(String userId) {
        return myAll(keycloakService.findById(userId).getUsername());
    }

    static Specification<JobHistory> valueContains(String property, Object value) {
        return (history, cq, cb) -> cb.like(history.get(property), "%" + value.toString() + "%");
    }

    static Specification<JobHistory> valueEquals(String property, Object value) {
        return (history, cq, cb) -> cb.equal(history.get(property), value);
    }
}

