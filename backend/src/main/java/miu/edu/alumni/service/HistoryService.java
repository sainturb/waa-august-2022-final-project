package miu.edu.alumni.service;

import miu.edu.alumni.model.JobHistory;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface HistoryService {
    List<JobHistory> findAll();
    Optional<JobHistory> findById(Long id);
    JobHistory save(JobHistory history);
    void delete(Long id);

    List<JobHistory> filter(Map<String, Object> params);

    List<JobHistory> query(String string);

    List<JobHistory> myAll(String username);
}
