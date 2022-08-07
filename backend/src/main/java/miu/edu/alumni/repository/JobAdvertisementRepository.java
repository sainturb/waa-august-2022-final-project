package miu.edu.alumni.repository;

import miu.edu.alumni.model.JobAdvertisement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobAdvertisementRepository extends JpaRepository<JobAdvertisement, Long> {
}
