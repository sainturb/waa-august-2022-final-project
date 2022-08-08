package miu.edu.alumni.repository;

import miu.edu.alumni.model.JobHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface JobHistoryRepository extends JpaRepository<JobHistory, Long>, JpaSpecificationExecutor<JobHistory> {
    List<JobHistory> findByCreatedBy(String username);
}
