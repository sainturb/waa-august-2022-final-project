package miu.edu.alumni.repository;

import miu.edu.alumni.model.ActivityLog;
import miu.edu.alumni.model.Faculty;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ActivityLogRepository extends JpaRepository<ActivityLog, Long> {
}
